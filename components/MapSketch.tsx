import type { Competition } from "@/lib/shared";

function rng(seed: number) {
  let s = seed;
  return () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Enkel kartskiss. På den skarpa sajten kan den bytas mot en riktig karta. */
export default function MapSketch({ c }: { c: Competition }) {
  const r = rng([...c.slug].reduce((a, ch) => a + ch.charCodeAt(0), 0));
  const roads: string[] = [];
  for (let i = 0; i < 5; i++) {
    const y = 30 + r() * 220;
    roads.push(`M-10 ${y.toFixed(0)} C 120 ${(y + r() * 80 - 40).toFixed(0)}, 260 ${(y + r() * 80 - 40).toFixed(0)}, 410 ${(y + r() * 60 - 30).toFixed(0)}`);
  }
  for (let i = 0; i < 4; i++) {
    const x = 40 + r() * 320;
    roads.push(`M${x.toFixed(0)} -10 C ${(x + r() * 60 - 30).toFixed(0)} 100, ${(x + r() * 60 - 30).toFixed(0)} 200, ${(x + r() * 40 - 20).toFixed(0)} 290`);
  }
  const park = { x: 60 + r() * 80, y: 190 + r() * 50 };
  const label = (c.plats || c.ort).slice(0, 24);
  return (
    <svg viewBox="0 0 400 280" className="mapsvg" role="img" aria-label={`Kartskiss över området runt ${c.plats || c.ort}`}>
      <rect width="400" height="280" className="m-bg" />
      <ellipse cx={park.x} cy={park.y} rx="70" ry="38" className="m-park" />
      <path d={`M-10 250 C 90 ${(200 + r() * 40).toFixed(0)}, 230 290, 410 ${(230 + r() * 30).toFixed(0)} L410 290 L-10 290Z`} className="m-water" />
      {roads.map((d, i) => <path key={i} d={d} className={`m-road${i === 1 ? " big" : ""}`} />)}
      <g transform="translate(200 132)">
        <circle r="26" className="m-halo" />
        <path d="M0 12 C -14 -4 -14 -26 0 -26 C 14 -26 14 -4 0 12Z" className="m-pin" />
        <circle cy="-15" r="5" fill="#fff" />
      </g>
      <rect x="130" y="170" width="140" height="26" rx="2" className="m-label" />
      <text x="200" y="188" textAnchor="middle" className="m-text">{label}</text>
    </svg>
  );
}
