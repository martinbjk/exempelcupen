"use client";
import { useState } from "react";
import { CLASSES, type Standings } from "@/lib/shared";

export default function CupTable({ data }: { data: Record<string, Standings> }) {
  const [g, setG] = useState("Street");
  const [k, setK] = useState("Junior");
  const s = data[`${g}|${k}`];
  return (
    <div className="panel">
      <div className="sel">
        <div className="fld"><label htmlFor="cup-g">Gren</label>
          <select id="cup-g" value={g} onChange={(e) => setG(e.target.value)}><option>Street</option><option>Böj</option></select></div>
        <div className="fld"><label htmlFor="cup-c">Klass</label>
          <select id="cup-c" value={k} onChange={(e) => setK(e.target.value)}>{CLASSES.map((x) => <option key={x}>{x}</option>)}</select></div>
      </div>
      {!s?.rows.length ? <p className="muted">Inga resultat ännu.</p> : (
        <>
          <div className="tbl-wrap"><table>
            <thead><tr><th>#</th><th>Namn</th><th>Klubb</th>{s.comps.map((c) => <th key={c.slug}>{c.ort}</th>)}<th>Poäng</th></tr></thead>
            <tbody>{s.rows.map((r, i) => (
              <tr key={r.namn}><td className="pl">{i + 1}</td><td><b>{r.namn}</b></td><td>{r.klubb}</td>
                {s.comps.map((c) => { const v = r.per[c.slug]; return <td key={c.slug}>{v == null ? <span className="muted">–</span> : r.counted.includes(c.slug) ? v : <span className="x" title="Räknas inte">{v}</span>}</td>; })}
                <td className="tot">{r.total}</td></tr>
            ))}</tbody>
          </table></div>
          <p className="hint">De {s.best} bästa resultaten räknas. Överstrukna poäng räknas inte. Tabellen räknas om automatiskt när en ny resultatfil läggs upp.</p>
        </>
      )}
    </div>
  );
}
