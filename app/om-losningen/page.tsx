import Prose from "@/components/Prose";
export const metadata = { title: "Om lösningen" };
export default function Page() {
  return (
    <Prose eyebrow="För arrangörer" title="Om lösningen">
      <h3>Lätt att uppdatera</h3>
      <p>Varje tävling är en textfil med datum, plats, schema, boende, fest och kontakter. Filen redigeras direkt i GitHub i webbläsaren.</p>
      <h3>Resultat på en minut</h3>
      <p>Spara resultatlistan från Excel som CSV och ladda upp den. Cupställningen räknar själv ut de bästa resultaten.</p>
      <h3>Affischer ingår</h3>
      <p>Varje tävling får en A4-affisch med all information, och hela säsongen får en årsaffisch. Båda byggs automatiskt.</p>
      <h3>GDPR från start</h3>
      <p>Minimal insamling, vårdnadshavarens godkännande för minderåriga, ingen spårning, typsnitt från egen server och ingen AI.</p>
      <h3>Teknik</h3>
      <p>Next.js och Tailwind CSS, kod i GitHub, publicering via Vercel. Gratisnivåerna räcker troligen, men villkoren ska kontrolleras innan start.</p>
    </Prose>
  );
}
