import Link from "next/link";
export default function NotFound() {
  return (
    <div className="wrap"><section className="view"><h1>Sidan finns inte</h1><p className="muted">Den kan ha flyttats eller tagits bort.</p><div><Link className="btn" href="/">Till startsidan</Link></div></section></div>
  );
}
