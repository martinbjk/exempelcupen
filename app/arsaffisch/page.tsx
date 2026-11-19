import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import Qr from "@/components/Qr";
import { Watermark } from "@/components/Demo";
import { BEST_COUNT, CURRENT_YEAR, getCompetitions, shortDate, type Gren } from "@/lib/data";
import { IS_DEMO, SITE_URL } from "@/lib/site";

export const metadata = { title: `Årsaffisch ${CURRENT_YEAR}` };

export default function Page() {
  const comps = getCompetitions(CURRENT_YEAR);
  const block = (g: Gren, title: string) => (
    <>
      <div className="shead">{title}</div>
      {comps.filter((c) => c.gren === g).map((c) => (
        <div className="srow" key={c.slug} style={{ color: c.farg }}>
          <span>{shortDate(c)}</span>
          <span>{c.ort.toUpperCase()}</span>{c.sm && <span className="fin">{c.sm.toUpperCase()}</span>}
        </div>
      ))}
      <div className="snote">(de bästa {BEST_COUNT[g]} resultaten räknas i {g}-cupen)</div>
    </>
  );
  return (
    <div className="wrap">
      <section className="view">
        <div className="crumb"><Link href="/tavlingar">Tävlingar</Link> / Årsaffisch {CURRENT_YEAR}</div>
        <div className="printbar"><PrintButton /><span className="hint">Affischen byggs från tävlingskalendern. Flyttas ett datum ändras affischen direkt.</span></div>
        <div className="print-area">
          <div className="sheet season">
            <Watermark />
            <div className="sz">
              <div className="stop">
                <div><div className="sbig">EXEMPEL<br />CUPEN</div><div className="t2">{CURRENT_YEAR}</div></div>
                <div className="sinfo">Fyra deltävlingar per gren.<br />Varje gren avslutas med en final.<br />2 grenar: Street &amp; Böj<br /><span style={{ color: "#0e7c86" }}>PÅHITTADE ORTER OCH DATUM{IS_DEMO && " · DEMO"}</span></div>
              </div>
              {block("Street", "STREET")}
              {block("Böj", "BÖJ")}
            </div>
            <div className="sfoot"><span>ANMÄLAN &amp; INFO<small>{SITE_URL}</small></span><Qr value={`https://${SITE_URL}`} label="QR-kod till webbplatsen" /></div>
          </div>
        </div>
      </section>
    </div>
  );
}
