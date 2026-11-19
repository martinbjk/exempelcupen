import Link from "next/link";
import { notFound } from "next/navigation";
import Artwork from "@/components/Artwork";
import MapSketch from "@/components/MapSketch";
import ResultTabs from "@/components/ResultTabs";
import { DemoNote } from "@/components/Demo";
import { CLASSES, getCompetition, getCompetitions, getResults, isDone, longDate } from "@/lib/data";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getCompetitions().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCompetition((await params).slug);
  return { title: c ? `${c.ort} ${c.ar}` : "Tävling" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCompetition((await params).slug);
  if (!c) notFound();
  const done = isDone(c);
  const res = getResults(c.slug);
  const q = encodeURIComponent(c.plats ? `${c.plats}, ${c.adress}` : c.ort);
  const secs: [string, string][] = [["schema", "Schema"], ["hitta-hit", "Hitta hit"], ["boende", "Boende"], ["fest", "Fest"], ["kontakt", "Kontakt"], ["praktiskt", "Praktiskt"]];
  if (res) secs.push(["resultat", "Resultat"]);
  const ex = (on: boolean) => (on && c.exempeldata ? <span className="chip" style={{ marginLeft: 6 }}>Exempel</span> : null);

  return (
    <div className="wrap">
      <section className="view" style={{ gap: 20 }}>
        <div className="crumb"><Link href="/tavlingar">Tävlingar</Link> / {c.ort} {c.ar}</div>
        <div className="comphead">
          <div>
            <span className="eyebrow"><span className="dot" style={{ background: c.farg }} />Exempelcupen {c.gren}{c.sm && ` · ${c.sm}`}</span>
            <h1>{c.ort}</h1>
            <p className="date">{longDate(c)}{c.preliminart && <span className="hint"> · preliminärt datum</span>}</p>
          </div>
          <div className="ctas">
            {!done && c.anmalan_oppen && <Link className="btn" href={`/anmal?tavling=${c.slug}`}>Anmäl dig</Link>}
            <Link className="btn ghost" href={`/tavlingar/${c.slug}/affisch`}>Skriv ut affisch</Link>
          </div>
        </div>
        <nav className="secnav" aria-label="Hoppa till">
          {secs.map(([id, label]) => <a key={id} href={`#${id}`} className="secbtn">{label}</a>)}
        </nav>
        {c.exempeldata && <DemoNote>Uppgifterna på den här sidan är exempel och ska ersättas av arrangören.</DemoNote>}
        <div className="compgrid">
          <div className="secs">
            {c.beskrivning && <div className="panel"><p>{c.beskrivning}</p></div>}
            <div className="panel sec" id="schema"><h2>Schema</h2>
              <div className="sched">{c.schema.flatMap((s, i) => [<b key={"t" + i}>{s.tid}</b>, <span key={"v" + i}>{s.vad}</span>])}</div>
              <p className="hint">Slutligt schema publiceras senast två veckor före tävlingen.</p></div>
            <div className="panel sec" id="hitta-hit"><h2>Hitta hit</h2>
              <div className="mapwrap"><MapSketch c={c} /></div>
              <dl className="facts">
                <dt>Adress</dt><dd>{c.plats ? <><b>{c.plats}</b>, {c.adress}</> : "Meddelas"}</dd>
                <dt>Buss/tåg</dt><dd>{c.hitta_hit.buss}</dd>
                <dt>Bil</dt><dd>{c.hitta_hit.bil}</dd>
                <dt>Parkering</dt><dd>{c.hitta_hit.parkering}{ex(true)}</dd>
              </dl>
              <div className="ctas"><a className="btn ghost small" href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer">Öppna i Google Maps ↗</a></div>
            </div>
            <div className="panel sec" id="boende"><h2>Boende</h2>
              <div className="rowlist">{c.boende.map((s) => (
                <div key={s.namn}><span><b>{s.namn}</b> <span className="chip">{s.typ}</span></span><span>{s.erbjudande}</span><span className="hint" style={{ userSelect: "all" }}>{s.kontakt}</span></div>
              ))}</div></div>
            <div className="panel sec" id="fest"><h2>{c.fest.titel}{ex(true)}</h2>
              <dl className="facts"><dt>När</dt><dd>{c.fest.nar}</dd><dt>Var</dt><dd>{c.fest.var}</dd><dt>Ålder</dt><dd>{c.fest.alder}</dd></dl>
              <p>{c.fest.text}</p></div>
            <div className="panel sec" id="kontakt"><h2>Kontaktpersoner och ansvariga{ex(true)}</h2>
              <div className="contacts">{c.kontakter.map((p) => (
                <div className="person" key={p.roll}><span className="role">{p.roll}</span><b>{p.namn}</b><span className="muted">{p.organisation}</span><span style={{ userSelect: "all" }}>{p.telefon}</span><span style={{ userSelect: "all" }}>{p.epost}</span></div>
              ))}</div>
              <p className="hint">Vid olycka eller akut skada: ring 112 först och kontakta sedan säkerhetsansvarig.</p></div>
            <div className="panel sec" id="praktiskt"><h2>Praktisk info</h2>
              <ul className="plist">{c.praktiskt.map((p) => <li key={p}>{p}</li>)}</ul>
              {c.oppettider && <p><b>Öppettider:</b> {c.oppettider}</p>}</div>
            {res && <div className="panel sec" id="resultat"><h2>Resultat</h2>
              {c.exempeldata && <p className="hint">Namnen är påhittade i demon.</p>}
              <ResultTabs results={res} /></div>}
          </div>
          <aside className="side2">
            <div className="artbox"><Artwork c={c} /></div>
            <div className="panel"><dl className="facts">
              <dt>Datum</dt><dd>{longDate(c)}</dd>
              <dt>Plats</dt><dd>{c.plats ? <>{c.plats}<br />{c.adress}</> : "Meddelas"}</dd>
              <dt>Klasser</dt><dd>{CLASSES.join(", ")}</dd>
              <dt>Arrangör</dt><dd>{c.arrangor}</dd>
            </dl></div>
          </aside>
        </div>
      </section>
    </div>
  );
}
