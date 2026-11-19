"use client";
import { useState } from "react";
import { CLASSES, parseCsv } from "@/lib/shared";
import ResultTable from "@/components/ResultTable";

const SAMPLE = `placering,namn,klubb
1,Elton Rask,Sjöhamns Rullbrädeklubb
2,Mio Sandell,Norrviks SK
3,Ture Holm,Granåsens Skateförening
4,Alvin Brink,Ekuddens Skateförening
5,Nils Kvist,Västerlids SK`;

export default function Uploader({ comps }: { comps: { slug: string; label: string }[] }) {
  const [text, setText] = useState("");
  const [comp, setComp] = useState(comps[0]?.slug ?? "");
  const [klass, setKlass] = useState<string>("Junior");
  const [over, setOver] = useState(false);
  const parsed = text.trim() ? parseCsv(text) : null;
  const read = (f?: File) => { if (!f) return; const r = new FileReader(); r.onload = () => setText(String(r.result)); r.readAsText(f); };
  const fileName = `content/resultat/${comp}/${klass.toLowerCase()}.csv`;
  return (
    <div className="panel">
      <h2>Kontrollera en resultatlista</h2>
      <p className="muted">Klistra in från Excel eller släpp en CSV-fil. Verktyget kontrollerar listan och visar vilket filnamn den ska ha.</p>
      <fieldset>
        <div className="fld"><label htmlFor="u-comp">Tävling</label><select id="u-comp" value={comp} onChange={(e) => setComp(e.target.value)}>{comps.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}</select></div>
        <div className="fld"><label htmlFor="u-cls">Klass</label><select id="u-cls" value={klass} onChange={(e) => setKlass(e.target.value)}>{CLASSES.map((k) => <option key={k}>{k}</option>)}</select></div>
      </fieldset>
      <div className={`drop${over ? " over" : ""}`} onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false); read(e.dataTransfer.files[0]); }}>
        <b>Släpp CSV-fil här</b>
        <label className="btn ghost small" htmlFor="u-file" style={{ cursor: "pointer" }}>Välj fil</label>
        <input id="u-file" type="file" accept=".csv,.txt,.tsv" hidden onChange={(e) => read(e.target.files?.[0])} />
      </div>
      <div className="fld"><label htmlFor="u-text">Eller klistra in</label><textarea id="u-text" rows={7} value={text} onChange={(e) => setText(e.target.value)} placeholder="1	Namn Efternamn	Klubb" />
        <div><button className="btn ghost small" type="button" onClick={() => setText(SAMPLE)}>Fyll i exempel</button></div></div>
      {parsed && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <h3>Förhandsvisning · {parsed.rows.length} åkare</h3>
          {parsed.warnings.map((w) => <p className="warn" key={w}>⚠ {w}</p>)}
          {parsed.rows.length > 0 && <ResultTable rows={parsed.rows} />}
          <p>Spara listan som <code style={{ userSelect: "all" }}>{fileName}</code> i GitHub. Sajten och cupställningen uppdateras inom någon minut.</p>
        </div>
      )}
    </div>
  );
}
