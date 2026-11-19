"use client";
import Link from "next/link";
import { useState } from "react";

export type ListItem = {
  slug: string; ort: string; gren: string; sm: string; farg: string; plats: string;
  short: string; weekday: string; done: boolean; hasResults: boolean; open: boolean;
};

export default function CompList({ items, nextSlug, title, sub, filter = true }: { items: ListItem[]; nextSlug?: string; title?: string; sub?: string; filter?: boolean }) {
  const [g, setG] = useState("Alla");
  const list = items.filter((c) => g === "Alla" || c.gren === g);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }} id="year">
      {(title || filter) && (
        <div className="listhead">
          <div>
            {title && <h2>{title}</h2>}
            {sub && <p className="hint">{sub}</p>}
          </div>
          {filter && (
            <div className="tabs" role="group" aria-label="Filtrera gren">
              {["Alla", "Street", "Böj"].map((x) => (
                <button key={x} className="tab" type="button" aria-pressed={g === x} onClick={() => setG(x)}>{x}</button>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="clist">
        <div className="crow head"><span>Datum</span><span>Ort</span><span>Gren</span><span /></div>
        {list.map((c) => (
          <div key={c.slug} className={`crow${c.slug === nextSlug ? " isnext" : ""}`}>
            <div className="cdate">{c.short}<small>{c.weekday}</small></div>
            <div className="cname">
              <Link href={`/tavlingar/${c.slug}`}><span className="dot" style={{ background: c.farg }} aria-hidden="true" />{c.ort}</Link>
              <small>{c.plats || "Plats meddelas"}{c.slug === nextSlug && <> · <b>Nästa tävling</b></>}</small>
            </div>
            <div className="cgren chips">
              <span className="chip">{c.gren}</span>
              {c.sm && <span className="chip red">{c.sm}</span>}
            </div>
            <div className="cact">
              {c.done ? (
                c.hasResults && <Link className="btn ghost small" href={`/tavlingar/${c.slug}#resultat`}>Resultat</Link>
              ) : (
                <>
                  <Link className="btn ghost small" href={`/tavlingar/${c.slug}`}>Info</Link>
                  {c.open && <Link className="btn small" href={`/anmal?tavling=${c.slug}`}>Anmäl</Link>}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
