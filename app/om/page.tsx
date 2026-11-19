import Link from "next/link";
import Prose from "@/components/Prose";
export const metadata = { title: "Om cupen" };
export default function Page() {
  return (
    <Prose eyebrow="Om cupen" title="En påhittad cup som visar konceptet">
      <p>Exempelcupen är en påhittad tävlingsserie. Den visar hur en sajt för en cup kan se ut, med tävlingssidor, anmälan, resultat, cupställning och utskrivbara affischer.</p>
      <p>Cupen har två grenar, Street och Böj, med fyra deltävlingar var. Den sista i varje gren är en final.</p>
      <h3>Vill din förening arrangera?</h3>
      <p>Konceptet passar en förening, ett distrikt eller en lokal tävlingsserie. Arrangören får en färdig tävlingssida, affisch och anmälan.</p>
      <div><Link className="btn" href="/kontakt">Kontakta oss</Link></div>
    </Prose>
  );
}
