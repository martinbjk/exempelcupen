"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  ["/", "Start"],
  ["/tavlingar", "Tävlingar"],
  ["/resultat", "Resultat"],
  ["/regler", "Regler"],
  ["/om", "Om cupen"],
  ["/kontakt", "Kontakt"],
] as const;

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  return (
    <header className="top">
      <div className="wrap">
        <Link className="logo" href="/" aria-label="Exempelcupen, startsida">
          <span className="mark">EC</span>
          <span className="name">
            <b>Exempelcupen</b>
            <span>Tävlingsserie i skateboard</span>
          </span>
        </Link>
        <button className="menubtn" type="button" aria-expanded={open} aria-controls="mainNav" onClick={() => setOpen(!open)}>
          Meny
        </button>
        <nav className={`main${open ? " open" : ""}`} id="mainNav" aria-label="Huvudmeny">
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className={active(href) ? "on" : ""} aria-current={active(href) ? "page" : undefined}>
              {label}
            </Link>
          ))}
          <Link href="/anmal" className="btn small" style={{ marginLeft: 8 }}>
            Anmäl dig
          </Link>
        </nav>
      </div>
    </header>
  );
}
