import Prose from "@/components/Prose";
export const metadata = { title: "Regler och klasser" };
export default function Page() {
  return (
    <Prose eyebrow="Regler och klasser" title="Så funkar tävlingen">
      <h3>Klasser</h3>
      <p><b>Junior</b> för yngre åkare, <b>Tjej</b> för tjejer i alla åldrar och <b>Open</b> för alla. Exakta åldersgränser bestäms av arrangören.</p>
      <h3>Poäng</h3>
      <p>Varje placering ger cuppoäng: 100, 85, 75, 65, 58, 52 och nedåt. I Street räknas de fyra bästa resultaten, i Böj de tre bästa.</p>
      <h3>Bedömning</h3>
      <p>Domarna bedömer svårighet, utförande, variation, flyt och användning av banan.</p>
      <h3>Säkerhet</h3>
      <p>Hjälm är obligatorisk för åkare under 18 år.</p>
    </Prose>
  );
}
