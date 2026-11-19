import Prose from "@/components/Prose";
import { IS_DEMO } from "@/lib/site";
export const metadata = { title: "Integritetspolicy" };
export default function Page() {
  return (
    <Prose eyebrow="GDPR" title="Integritetspolicy">
      {IS_DEMO && <p className="demo-note"><b>DEMO: </b>Utkast. Ska granskas av arrangören innan publicering.</p>}
      <p className="hint">Version 1.0</p>
      <h3>Vem ansvarar?</h3>
      <p>Arrangören av cupen är personuppgiftsansvarig för uppgifter som lämnas vid anmälan.</p>
      <h3>Vilka uppgifter och varför?</h3>
      <p>Namn, födelsedatum, klubb, klass, e-post och telefon, för att hantera din anmälan, dela in klasser och kontakta dig om tävlingen. För åkare under 18 år även vårdnadshavarens namn och telefon. Vi frågar inte efter hälsouppgifter.</p>
      <h3>Resultat</h3>
      <p>Placering, namn och klubb publiceras i resultatlistor och cupställning. Det är en del av tävlandet.</p>
      <h3>Bilder</h3>
      <p>Bilder och film där du syns publiceras bara om du har kryssat i det. Du kan ta tillbaka samtycket när som helst.</p>
      <h3>Var lagras uppgifterna?</h3>
      <p>På servrar inom EU. Uppgifterna skickas inte till AI-tjänster och delas inte med någon utanför cupens arrangörer.</p>
      <h3>Hur länge?</h3>
      <p>Kontaktuppgifter raderas 12 månader efter säsongens slut. Resultat sparas i arkivet.</p>
      <h3>Dina rättigheter</h3>
      <p>Du kan få ut, rätta eller radera dina uppgifter genom att mejla arrangören. Du kan också klaga hos Integritetsskyddsmyndigheten (IMY).</p>
    </Prose>
  );
}
