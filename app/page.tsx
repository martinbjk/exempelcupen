import Link from "next/link";
import CompList from "@/components/CompList";
import { CURRENT_YEAR, daysUntil, getCompetitions, isDone, longDate } from "@/lib/data";
import { toListItems } from "@/lib/list";

export const revalidate = 3600;

export default function Home() {
  const comps = getCompetitions(CURRENT_YEAR);
  const next = comps.find((c) => !isDone(c));
  return (
    <>
      <div className="intro">
        <div className="wrap">
          <div>
            <span className="eyebrow">En tävlingsserie i skateboard</span>
            <h1>Exempelcupen {CURRENT_YEAR}</h1>
            <p className="lead">
              {comps.length} deltävlingar i Street och Böj. Varje gren avslutas med en final, och de bästa resultaten räknas i cupen.
            </p>
            <div className="ctas">
              <Link className="btn dark" href="#year">Se alla tävlingar</Link>
              <Link className="btn ghost" href="/arsaffisch">Årsaffisch</Link>
            </div>
          </div>
          {next && (
            <div className="nextcard">
              <span className="eyebrow">Nästa tävling</span>
              <span className="city">{next.ort}</span>
              <span>{longDate(next)} · {next.gren}</span>
              <span className="muted"><span className="days">{daysUntil(next)}</span> dagar kvar</span>
              <div className="ctas">
                <Link className="btn small" href={`/anmal?tavling=${next.slug}`}>Anmäl</Link>
                <Link className="btn ghost small" href={`/tavlingar/${next.slug}`}>Mer info</Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="wrap">
        <section className="view">
          <CompList
            items={toListItems(comps)}
            nextSlug={next?.slug}
            title={`Tävlingar ${CURRENT_YEAR}`}
            sub={`${comps.length} deltävlingar varav ${comps.filter((c) => c.sm).length} finaler. Orter och datum är påhittade.`}
          />
          <div className="two">
            <div className="panel">
              <h2>Nyheter</h2>
              <div className="news">
                <Link href="/tavlingar"><time>29 okt</time><span><b>Preliminärt program för {CURRENT_YEAR}</b><span className="muted">Åtta deltävlingar, två finaler. Datumen spikas i december.</span></span></Link>
                <Link href="/resultat"><time>25 okt</time><span><b>Resultat från finalen i Hagström</b><span className="muted">Se hur cupställningen ser ut.</span></span></Link>
                <Link href="/om"><time>1 okt</time><span><b>Vill din förening arrangera?</b><span className="muted">Anmäl intresse senast 1 december.</span></span></Link>
              </div>
            </div>
            <div className="panel">
              <h2>Genvägar</h2>
              <ul className="links" style={{ listStyle: "none" }}>
                <li><Link href="/resultat">Resultat och cupställning <span aria-hidden="true">→</span></Link></li>
                <li><Link href="/regler">Regler, klasser och poäng <span aria-hidden="true">→</span></Link></li>
                <li><Link href="/arsaffisch">Skriv ut årsaffischen <span aria-hidden="true">→</span></Link></li>
                <li><Link href="/integritet">Så hanterar vi dina uppgifter <span aria-hidden="true">→</span></Link></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
