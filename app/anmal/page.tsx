import RegisterForm from "./RegisterForm";
import { CURRENT_YEAR, getCompetitions, isDone, longDate } from "@/lib/data";
import { IS_DEMO } from "@/lib/site";

export const metadata = { title: "Anmälan" };

export default async function Page({ searchParams }: { searchParams: Promise<{ tavling?: string }> }) {
  const { tavling } = await searchParams;
  const options = getCompetitions(CURRENT_YEAR)
    .filter((c) => c.anmalan_oppen && !isDone(c))
    .map((c) => ({ slug: c.slug, datum: c.datum, label: `${c.ort} – ${longDate(c)} (${c.gren})` }));
  return (
    <div className="wrap">
      <section className="view">
        <div><h1>Anmälan</h1><p className="muted">Tar ungefär två minuter.</p></div>
        <RegisterForm options={options} preselect={tavling} demo={IS_DEMO} />
      </section>
    </div>
  );
}
