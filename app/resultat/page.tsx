import Link from "next/link";
import CupTable from "@/components/CupTable";
import { ARCHIVE_YEAR, CLASSES, getCompetitions, getResults, getStandings, longDate, type Gren, type Standings } from "@/lib/data";
import { IS_DEMO } from "@/lib/site";

export const revalidate = 3600;
export const metadata = { title: "Resultat" };

export default function Page() {
  const data: Record<string, Standings> = {};
  for (const g of ["Street", "Böj"] as Gren[]) for (const k of CLASSES) data[`${g}|${k}`] = getStandings(ARCHIVE_YEAR, g, k);
  const comps = getCompetitions(ARCHIVE_YEAR).filter((c) => getResults(c.slug)).reverse();
  return (
    <div className="wrap">
      <section className="view">
        <div><h1>Resultat {ARCHIVE_YEAR}</h1><p className="muted">Cupställningen räknas automatiskt från resultatlistorna.{IS_DEMO && " Namnen i demon är påhittade."}</p></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}><h2>Cupställning</h2><CupTable data={data} /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h2>Per tävling</h2>
          <div className="clist">
            {comps.map((c) => (
              <div className="crow" key={c.slug}>
                <div className="cdate">{longDate(c).replace(/ \d{4}$/, "")}</div>
                <div className="cname"><a href={`/tavlingar/${c.slug}#resultat`}><span className="dot" style={{ background: c.farg }} />{c.ort}</a><small>{c.gren}{c.sm && ` · ${c.sm}`}</small></div>
                <div className="cgren hint">Vinnare Open: {getResults(c.slug)?.Open?.[0]?.namn ?? "–"}</div>
                <div className="cact"><Link className="btn ghost small" href={`/tavlingar/${c.slug}#resultat`}>Visa</Link></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
