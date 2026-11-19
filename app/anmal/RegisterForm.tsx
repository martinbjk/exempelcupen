"use client";
import Link from "next/link";
import { startTransition, useActionState, useState } from "react";
import { register, type FormState } from "./actions";

type Opt = { slug: string; label: string; datum: string };
const CLUBS = ["Norrviks SK", "Granåsens Skateförening", "Sjöhamns Rullbrädeklubb", "Älvsbacka SF", "Björkvikens Skate", "Västerlids SK", "Ekuddens Skateförening", "Hagströms Skate"];

export default function RegisterForm({ options, preselect, demo }: { options: Opt[]; preselect?: string; demo: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(register, { ok: false, errors: [] });
  const [comp, setComp] = useState(preselect && options.some((o) => o.slug === preselect) ? preselect : options[0]?.slug);
  const [born, setBorn] = useState("");
  const date = options.find((o) => o.slug === comp)?.datum;
  let minor = false;
  if (born && date) {
    const b = new Date(born), d = new Date(date);
    let a = d.getFullYear() - b.getFullYear();
    if (d < new Date(d.getFullYear(), b.getMonth(), b.getDate())) a--;
    minor = a < 18;
  }

  if (state.ok && state.summary) {
    const s = state.summary;
    return (
      <div className="mail">
        <div className="mh">{s.demo ? "DEMO · inget har sparats och inget mejl har skickats" : `Bekräftelse skickad till ${s.email}`}</div>
        <div className="mb">
          <h2>Tack {s.name}!</h2>
          <p>Anmälan till <b>{s.comp}</b> i klassen <b>{s.klass}</b> är {s.demo ? "korrekt ifylld" : "mottagen"}.</p>
          {s.minor && <p>Vårdnadshavarens godkännande är registrerat.</p>}
          {s.demo && <p className="demo-note"><b>DEMO: </b>I den skarpa versionen sparas anmälan i en databas inom EU och ett bekräftelsemejl skickas till {s.email}.</p>}
          <div className="ctas"><Link className="btn" href="/tavlingar">Tillbaka till tävlingarna</Link></div>
        </div>
      </div>
    );
  }

  return (
    <form
      className="f"
      action={action}
      noValidate
      onSubmit={(e) => {
        // Skickas manuellt så att ifyllda fält inte töms om något saknas.
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => action(fd));
      }}
    >
      {demo && <p className="demo-note"><b>DEMO: </b>Formuläret kontrollerar uppgifterna men sparar ingenting. Skriv gärna påhittade uppgifter.</p>}
      <fieldset>
        <legend>1. Tävling</legend>
        <div className="fld"><label htmlFor="tavling">Tävling</label>
          <select id="tavling" name="tavling" value={comp} onChange={(e) => setComp(e.target.value)}>{options.map((o) => <option key={o.slug} value={o.slug}>{o.label}</option>)}</select></div>
        <div className="fld"><label htmlFor="klass">Klass</label>
          <select id="klass" name="klass"><option>Junior</option><option>Tjej</option><option>Open</option></select></div>
      </fieldset>
      <fieldset>
        <legend>2. Åkare</legend>
        <div className="fld"><label htmlFor="fornamn">Förnamn</label><input id="fornamn" name="fornamn" autoComplete="given-name" /></div>
        <div className="fld"><label htmlFor="efternamn">Efternamn</label><input id="efternamn" name="efternamn" autoComplete="family-name" /></div>
        <div className="fld"><label htmlFor="fodd">Födelsedatum</label><input id="fodd" name="fodd" type="date" value={born} onChange={(e) => setBorn(e.target.value)} /><span className="hint">Behövs för att se om du är under 18.</span></div>
        <div className="fld"><label htmlFor="klubb">Klubb eller förening</label><input id="klubb" name="klubb" list="clubs" placeholder="Skriv eller välj" /><datalist id="clubs">{CLUBS.map((c) => <option key={c} value={c} />)}</datalist><span className="hint">Lämna tomt om du inte har någon.</span></div>
        <div className="fld"><label htmlFor="epost">E-post</label><input id="epost" name="epost" type="email" autoComplete="email" /></div>
        <div className="fld"><label htmlFor="telefon">Telefon</label><input id="telefon" name="telefon" type="tel" autoComplete="tel" /></div>
      </fieldset>
      {minor && (
        <div className="guard">
          <span className="t">Du är under 18. En vårdnadshavare behöver godkänna anmälan.</span>
          <div className="fld"><label htmlFor="vh_namn">Vårdnadshavarens namn</label><input id="vh_namn" name="vh_namn" /></div>
          <div className="fld"><label htmlFor="vh_telefon">Vårdnadshavarens telefon</label><input id="vh_telefon" name="vh_telefon" type="tel" /></div>
          <div className="fld full"><label className="check"><input type="checkbox" name="vh_ok" /> Jag är vårdnadshavare och godkänner anmälan.</label></div>
        </div>
      )}
      <fieldset>
        <legend>3. Övrigt</legend>
        <div className="fld full"><label htmlFor="ovrigt">Något arrangören bör veta? (frivilligt)</label><textarea id="ovrigt" name="ovrigt" maxLength={300} style={{ fontFamily: "inherit", minHeight: 70 }} /><span className="hint">Skriv inte hälsouppgifter här. Behöver du stöd på plats, kontakta arrangören direkt.</span></div>
        <div className="fld full"><label className="check"><input type="checkbox" name="bilder" /> Bilder och film där jag syns får publiceras i cupens kanaler (frivilligt).</label></div>
        <div className="fld full"><label className="check"><input type="checkbox" name="gdpr" /> Jag har läst <Link href="/integritet">integritetspolicyn</Link> och godkänner att mina uppgifter används för att hantera anmälan och resultat.</label></div>
      </fieldset>
      {state.errors.length > 0 && <div className="err" role="alert">{state.errors.map((e) => <div key={e}>{e}</div>)}</div>}
      <div><button className="btn" type="submit" disabled={pending}>{pending ? "Skickar…" : "Skicka anmälan"}</button></div>
    </form>
  );
}
