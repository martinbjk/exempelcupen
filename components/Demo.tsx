import { IS_DEMO } from "@/lib/site";

/** Röd randig list högst upp på varje sida. */
export function DemoBar() {
  if (!IS_DEMO) return null;
  return (
    <div className="demobar" role="note">
      <div className="wrap">
        <b>DEMO</b>
        <span>Exempelsajt för en tävlingsserie i skateboard. Ingen riktig organisation.</span>
        <span>Orter, datum, namn och kontakter är påhittade. Inga anmälningar sparas.</span>
      </div>
    </div>
  );
}

/** Liten fast etikett i hörnet, syns även när man scrollat. */
export function DemoRibbon() {
  if (!IS_DEMO) return null;
  return <div className="demo-ribbon" aria-hidden="true">DEMO</div>;
}

/** Stor diagonal stämpel över affischer, följer med vid utskrift. */
export function Watermark() {
  if (!IS_DEMO) return null;
  return (
    <div className="watermark" aria-hidden="true">
      <span>DEMO</span>
    </div>
  );
}

/** Röd informationsruta i formulär och admin. */
export function DemoNote({ children }: { children: React.ReactNode }) {
  if (!IS_DEMO) return null;
  return (
    <p className="demo-note">
      <b>DEMO: </b>
      {children}
    </p>
  );
}
