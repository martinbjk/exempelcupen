import { pointsFor, type ResultRow } from "@/lib/shared";

export default function ResultTable({ rows }: { rows: ResultRow[] }) {
  return (
    <div className="tbl-wrap">
      <table>
        <thead><tr><th>Plac.</th><th>Namn</th><th>Klubb</th><th>Cuppoäng</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.placering + r.namn}><td className="pl">{r.placering}</td><td><b>{r.namn}</b></td><td>{r.klubb}</td><td>{pointsFor(r.placering)}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
