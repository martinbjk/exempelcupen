import Link from "next/link";
import { notFound } from "next/navigation";
import Artwork from "@/components/Artwork";
import PrintButton from "@/components/PrintButton";
import Qr from "@/components/Qr";
import { Watermark } from "@/components/Demo";
import { CLASSES, getCompetition, getCompetitions, longDate } from "@/lib/data";
import { IS_DEMO, SITE_URL } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return getCompetitions().map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCompetition((await params).slug);
  return { title: c ? `Affisch ${c.ort} ${c.ar}` : "Affisch" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCompetition((await params).slug);
  if (!c) notFound();
  const citySize = Math.min(13, 92 / Math.max(6, c.ort.length));
  return (
    <div className="wrap">
      <section className="view">
        <div className="crumb"><Link href="/tavlingar">Tävlingar</Link> / <Link href={`/tavlingar/${c.slug}`}>{c.ort}</Link> / Affisch</div>
        <div className="printbar">
          <PrintButton />
          <span className="hint">Välj A4 i utskriftsrutan. För A3, välj &quot;Anpassa till sida&quot;.</span>
        </div>
        <div className="print-area">
          <div className="sheet">
            <Watermark />
            <div className="cp">
              <div className="cp-top"><span>EXEMPELCUPEN {c.ar}{IS_DEMO && " · DEMO"}</span><span className="red">{c.gren.toUpperCase()}{c.sm && ` · ${c.sm.toUpperCase()}`}</span></div>
              <div className="cp-city" style={{ fontSize: `${citySize}cqw` }}>{c.ort.toUpperCase()}</div>
              <div className="cp-date">{longDate(c).toUpperCase()}{c.preliminart && <small>PRELIMINÄRT DATUM</small>}</div>
              <div className="cp-mid">
                <div className="cp-art"><Artwork c={c} /></div>
                <div className="cp-facts">
                  <div><div className="l" style={{ color: c.farg }}>Plats</div><div className="v">{c.plats ? `${c.plats}, ${c.adress}` : "Hall och adress meddelas av arrangören"}</div></div>
                  {c.oppettider && <div><div className="l" style={{ color: c.farg }}>Hallen är öppen</div><div className="v">{c.oppettider}</div></div>}
                  <div><div className="l" style={{ color: c.farg }}>Klasser</div><div className="v">{CLASSES.join(" · ")}</div></div>
                  <div><div className="l" style={{ color: c.farg }}>Arrangör</div><div className="v">{c.arrangor}</div></div>
                  <div className="cp-reg">
                    <div><div className="h">ANMÄL DIG</div><p><b>{SITE_URL}/anmal</b><br />eller skanna QR-koden.<br />Under 18: vårdnadshavare godkänner.</p></div>
                    <Qr value={`https://${SITE_URL}/anmal?tavling=${c.slug}`} label="QR-kod till anmälan" />
                  </div>
                </div>
              </div>
              <div className="cp-boxes">
                <div className="cp-box"><h4 style={{ color: c.farg }}>SCHEMA</h4>{c.schema.slice(0, 8).map((s, i) => <div className="row" key={i}><b>{s.tid}</b><span>{s.vad}</span></div>)}</div>
                <div className="cp-box"><h4 style={{ color: c.farg }}>BOENDE</h4>{c.boende.slice(0, 3).map((s) => <div key={s.namn}><b>{s.namn}</b><div className="muted2">{s.erbjudande}</div></div>)}</div>
                <div className="cp-box dark"><h4>{c.fest.titel.toUpperCase()}</h4><div>{c.fest.nar}, {c.fest.var}.</div><div>{c.fest.text}</div><div className="muted2">{c.fest.alder}</div></div>
                <div className="cp-box"><h4 style={{ color: c.farg }}>KONTAKT</h4>{c.kontakter.slice(0, 4).map((p) => <div key={p.roll}><div className="muted2" style={{ fontSize: "1.25cqw", fontWeight: 800, textTransform: "uppercase" }}>{p.roll}</div><b>{p.namn}</b> {p.telefon}</div>)}</div>
                <div className="cp-box"><h4 style={{ color: c.farg }}>HITTA HIT</h4><div><b>Buss/tåg</b><div className="muted2">{c.hitta_hit.buss}</div></div><div><b>Bil</b><div className="muted2">{c.hitta_hit.bil}</div></div><div><b>Parkering</b><div className="muted2">{c.hitta_hit.parkering}</div></div></div>
                <div className="cp-box"><h4 style={{ color: c.farg }}>BRA ATT VETA</h4><ul>{c.praktiskt.slice(0, 5).map((p) => <li key={p}>{p}</li>)}</ul></div>
              </div>
              <div className="cp-foot"><span>Exempelcupen {c.ar} · påhittad tävlingsserie</span><span>{IS_DEMO ? "DEMO · uppgifterna är exempel" : SITE_URL}</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
