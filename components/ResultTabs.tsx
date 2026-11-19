"use client";
import { useState } from "react";
import { CLASSES, pointsFor, type Results } from "@/lib/shared";
import ResultTable from "./ResultTable";

export default function ResultTabs({ results }: { results: Results }) {
  const avail = CLASSES.filter((k) => results[k]?.length);
  const [k, setK] = useState(avail[0]);
  if (!k) return <p className="muted">Inga resultat ännu.</p>;
  return (
    <>
      <div><div className="tabs" role="group" aria-label="Välj klass">
        {avail.map((x) => <button key={x} className="tab" type="button" aria-pressed={x === k} onClick={() => setK(x)}>{x}</button>)}
      </div></div>
      <ResultTable rows={results[k]!} />
      <p className="hint">Cuppoäng: 1:a {pointsFor(1)}, 2:a {pointsFor(2)}, 3:e {pointsFor(3)} och nedåt.</p>
    </>
  );
}
