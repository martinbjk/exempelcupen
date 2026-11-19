/* Delad kod utan filsystem – används både på servern och i webbläsaren. */
export const CLASSES = ["Junior", "Tjej", "Open"] as const;
export type Klass = (typeof CLASSES)[number];
export type Gren = "Street" | "Böj";

export const CURRENT_YEAR = 2027;
export const ARCHIVE_YEAR = 2026;
export const BEST_COUNT: Record<Gren, number> = { Street: 3, Böj: 3 };
const POINTS = [100, 85, 75, 65, 58, 52, 47, 43, 40, 37, 34, 31, 28, 25, 22, 20, 18, 16, 14, 12];
export const pointsFor = (place: number) => POINTS[place - 1] ?? 10;

export type Contact = { roll: string; organisation: string; namn: string; telefon: string; epost: string };
export type Stay = { namn: string; typ: string; erbjudande: string; kontakt: string };

export type Competition = {
  slug: string;
  ort: string;
  ar: number;
  gren: Gren;
  sm: string;
  datum: string;
  slutdatum: string;
  preliminart: boolean;
  farg: string;
  artwork: string;
  plats: string;
  adress: string;
  oppettider: string;
  arrangor: string;
  anmalan_oppen: boolean;
  schema: { tid: string; vad: string }[];
  hitta_hit: { buss: string; bil: string; parkering: string };
  boende: Stay[];
  fest: { titel: string; nar: string; var: string; alder: string; text: string };
  kontakter: Contact[];
  praktiskt: string[];
  exempeldata: boolean;
  beskrivning: string;
};

export type ResultRow = { placering: number; namn: string; klubb: string };
export type Results = Partial<Record<Klass, ResultRow[]>>;

export function parseCsv(text: string): { rows: ResultRow[]; warnings: string[] } {
  const rows: ResultRow[] = [];
  const warnings: string[] = [];
  const seen = new Set<string>();
  text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .forEach((line, i) => {
      const cells = line.split(/\t|;|,/).map((s) => s.trim());
      if (!/^\d+$/.test(cells[0])) {
        if (i > 0) warnings.push(`Rad ${i + 1} hoppades över: "${line.slice(0, 40)}"`);
        return;
      }
      const row = { placering: Number(cells[0]), namn: cells[1] ?? "", klubb: cells[2] ?? "" };
      if (!row.namn) warnings.push(`Rad ${i + 1} saknar namn`);
      if (!row.klubb) warnings.push(`${row.namn || "Rad " + (i + 1)} saknar klubb`);
      if (seen.has(row.namn.toLowerCase())) warnings.push(`${row.namn} finns två gånger`);
      seen.add(row.namn.toLowerCase());
      if (row.namn) rows.push(row);
    });
  rows.sort((a, b) => a.placering - b.placering);
  return { rows, warnings };
}

export type StandingRow = { namn: string; klubb: string; total: number; per: Record<string, number>; counted: string[] };
export type Standings = { comps: { slug: string; ort: string }[]; rows: StandingRow[]; best: number };

/* ---------- datum ---------- */
const MONTHS = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];
const WD = ["sön", "mån", "tis", "ons", "tor", "fre", "lör"];
const d = (s: string) => new Date(s + "T12:00:00");

export function longDate(c: Competition) {
  const a = d(c.datum);
  const day = c.slutdatum ? `${a.getDate()}–${d(c.slutdatum).getDate()}` : `${a.getDate()}`;
  return `${day} ${MONTHS[a.getMonth()]} ${a.getFullYear()}`;
}
export function shortDate(c: Competition) {
  const a = d(c.datum);
  const day = c.slutdatum ? `${a.getDate()}–${d(c.slutdatum).getDate()}` : `${a.getDate()}`;
  const m = MONTHS[a.getMonth()].slice(0, 3);
  return `${day} ${m[0].toUpperCase()}${m.slice(1)}`;
}
export function weekday(c: Competition) {
  return WD[d(c.datum).getDay()] + (c.slutdatum ? "–" + WD[d(c.slutdatum).getDay()] : "") + " " + d(c.datum).getFullYear();
}
export function isDone(c: Competition, now = new Date()) {
  return d(c.slutdatum || c.datum) < now;
}
export function daysUntil(c: Competition, now = new Date()) {
  return Math.ceil((d(c.datum).getTime() - now.getTime()) / 864e5);
}
