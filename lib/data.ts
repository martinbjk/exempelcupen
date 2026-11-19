import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { CLASSES, BEST_COUNT, pointsFor, parseCsv, type Competition, type Gren, type Klass, type Results, type StandingRow } from "./shared";
export * from "./shared";

/* ------------------------------------------------------------------
   Allt innehåll ligger i mappen /content:
   - content/tavlingar/<år>-<ort>.md   en fil per tävling
   - content/resultat/<år>-<ort>/<klass>.csv   en resultatlista per klass
   Filer som börjar med _ (t.ex. _mall.md) hoppas över.
------------------------------------------------------------------- */

const CONTENT = path.join(process.cwd(), "content");

export function getCompetitions(year?: number): Competition[] {
  const dir = path.join(CONTENT, "tavlingar");
  const list = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return {
        schema: [],
        boende: [],
        kontakter: [],
        praktiskt: [],
        hitta_hit: { buss: "", bil: "", parkering: "" },
        fest: { titel: "Efterkalas", nar: "", var: "", alder: "", text: "" },
        ...data,
        sm: data.sm ?? "",
        slutdatum: data.slutdatum ?? "",
        slug: f.replace(/\.md$/, ""),
        beskrivning: content.trim(),
      } as unknown as Competition;
    })
    .sort((a, b) => a.datum.localeCompare(b.datum));
  return year ? list.filter((c) => c.ar === year) : list;
}

export function getCompetition(slug: string) {
  return getCompetitions().find((c) => c.slug === slug);
}

export function getResults(slug: string): Results | null {
  const dir = path.join(CONTENT, "resultat", slug);
  if (!fs.existsSync(dir)) return null;
  const res: Results = {};
  for (const k of CLASSES) {
    const file = path.join(dir, `${k.toLowerCase()}.csv`);
    if (fs.existsSync(file)) res[k] = parseCsv(fs.readFileSync(file, "utf8")).rows;
  }
  return Object.keys(res).length ? res : null;
}


export function getStandings(year: number, gren: Gren, klass: Klass) {
  const comps = getCompetitions(year).filter((c) => c.gren === gren);
  const map: Record<string, StandingRow> = {};
  for (const c of comps) {
    for (const r of getResults(c.slug)?.[klass] ?? []) {
      const key = r.namn.toLowerCase();
      map[key] ??= { namn: r.namn, klubb: r.klubb, total: 0, per: {}, counted: [] };
      map[key].per[c.slug] = pointsFor(r.placering);
    }
  }
  const n = BEST_COUNT[gren];
  const rows = Object.values(map)
    .map((r) => {
      const best = Object.entries(r.per).sort((a, b) => b[1] - a[1]).slice(0, n);
      return { ...r, counted: best.map((b) => b[0]), total: best.reduce((s, b) => s + b[1], 0) };
    })
    .sort((a, b) => b.total - a.total);
  return { comps: comps.map((c) => ({ slug: c.slug, ort: c.ort })), rows, best: n };
}

