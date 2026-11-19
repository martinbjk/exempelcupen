import Link from "next/link";
import ThemeButton from "./ThemeButton";
import { IS_DEMO } from "@/lib/site";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: 300 }}>
          <b>Exempelcupen</b>
          <span className="muted">En påhittad tävlingsserie som visar hur en cupsajt kan fungera.</span>
          {IS_DEMO && <span style={{ color: "#cc1720", fontWeight: 700 }}>DEMO – påhittat innehåll</span>}
        </div>
        <div className="cols">
          <div>
            <b>Cupen</b>
            <Link href="/tavlingar">Tävlingar 2027</Link>
            <Link href="/arsaffisch">Årsaffisch</Link>
            <Link href="/resultat">Resultat och cupställning</Link>
            <Link href="/regler">Regler och klasser</Link>
          </div>
          <div>
            <b>Information</b>
            <Link href="/om">Om cupen</Link>
            <Link href="/kontakt">Kontakt</Link>
            <Link href="/integritet">Integritetspolicy</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
          <div>
            <b>För arrangörer</b>
            <Link href="/admin">Ladda upp resultat</Link>
            <Link href="/om-losningen">Om lösningen</Link>
            <ThemeButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
