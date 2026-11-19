import Link from "next/link";
import CompList from "@/components/CompList";
import { CURRENT_YEAR, getCompetitions, isDone } from "@/lib/data";
import { toListItems } from "@/lib/list";

export const revalidate = 3600;
export const metadata = { title: `Tävlingar ${CURRENT_YEAR}` };

export default function Page() {
  const comps = getCompetitions(CURRENT_YEAR);
  return (
    <div className="wrap">
      <section className="view">
        <div className="listhead">
          <div><h1>Tävlingar {CURRENT_YEAR}</h1><p className="muted">Preliminärt program. Klicka på en ort för schema, boende, fest och kontakt.</p></div>
          <Link className="btn ghost" href="/arsaffisch">Skriv ut årsaffisch</Link>
        </div>
        <CompList items={toListItems(comps)} nextSlug={comps.find((c) => !isDone(c))?.slug} />
        <div className="panel"><h2>Tidigare säsonger</h2><p className="muted">Säsongen 2026 med resultat finns under <Link href="/resultat">Resultat</Link>.</p></div>
      </section>
    </div>
  );
}
