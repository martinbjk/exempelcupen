import Prose from "@/components/Prose";
import { IS_DEMO } from "@/lib/site";
export const metadata = { title: "Kontakt" };
export default function Page() {
  return (
    <Prose eyebrow="Kontakt" title="Frågor om cupen?">
      <p>Mejla tävlingsansvarig för cupen: <b style={{ userSelect: "all" }}>tavling@exempel.se</b>{IS_DEMO && " (exempeladress i demon)"}.</p>
      <p>Frågor om en specifik deltävling ställer du till arrangörsföreningen. Kontaktuppgifter finns på varje tävlingssida.</p>
    </Prose>
  );
}
