import type { Competition } from "@/lib/shared";

/** Arrangörens bild, eller en gul platshållare om ingen bild är uppladdad. */
export default function Artwork({ c }: { c: Competition }) {
  if (c.artwork)
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="imgfill" src={c.artwork} alt={`Tävlingsaffisch för Exempelcupen ${c.ort}`} />;
  return (
    <div className="genart">
      <span className="gname">{c.ort.toUpperCase()}</span>
      <span className="gtag">{c.gren}{c.sm ? ` · ${c.sm}` : ""}</span>
      <span className="gtag" style={{ background: "#fff", color: "#111" }}>Artwork laddas upp av arrangören</span>
    </div>
  );
}
