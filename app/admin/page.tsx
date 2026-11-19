import Uploader from "./Uploader";
import { DemoNote } from "@/components/Demo";
import { getCompetitions, longDate } from "@/lib/data";

export const metadata = { title: "För arrangörer" };

export default function Page() {
  const comps = getCompetitions().reverse().map((c) => ({ slug: c.slug, label: `${c.ort} – ${longDate(c)} (${c.gren})` }));
  return (
    <div className="wrap">
      <section className="view">
        <div><h1>För arrangörer</h1><p className="muted">Så uppdaterar ni sajten under säsongen. Ingen kod behövs.</p></div>
        <DemoNote>I den skarpa versionen skyddas den här sidan med inloggning.</DemoNote>
        <div className="two">
          <div className="panel">
            <h2>Ladda upp resultat</h2>
            <ol className="plist" style={{ listStyle: "decimal" }}>
              <li>Spara resultatlistan i Excel som <b>CSV UTF-8</b> med kolumnerna placering, namn, klubb. Då blir å, ä och ö rätt.</li>
              <li>Döp filerna till <code>junior.csv</code>, <code>tjej.csv</code> och <code>open.csv</code> och lägg dem i en mapp som heter som tävlingen, t.ex. <code>2027-sjohamn</code>.</li>
              <li>Öppna mappen <code>content/resultat</code> i GitHub och välj <b>Add file → Upload files</b>.</li>
              <li>Dra in hela mappen.</li>
              <li>Tryck <b>Commit changes</b>. Resultatet syns på sajten inom någon minut.</li>
            </ol>
          </div>
          <div className="panel">
            <h2>Lägga till eller ändra en tävling</h2>
            <ol className="plist" style={{ listStyle: "decimal" }}>
              <li>Öppna mappen <code>content/tavlingar</code> i GitHub.</li>
              <li>Kopiera filen <code>_mall.md</code> och döp den till t.ex. <code>2027-exempelby.md</code>.</li>
              <li>Fyll i datum, plats, schema, boende, fest och kontakter.</li>
              <li>Byt artwork genom att ladda upp en bild i <code>public/artwork</code>.</li>
              <li>Tryck <b>Commit changes</b>. Sidan, listan och affischerna uppdateras.</li>
            </ol>
          </div>
        </div>
        <Uploader comps={comps} />
      </section>
    </div>
  );
}
