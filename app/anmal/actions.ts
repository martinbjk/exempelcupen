"use server";
import { getCompetition } from "@/lib/data";
import { IS_DEMO } from "@/lib/site";

export type FormState = { ok: boolean; errors: string[]; summary?: { name: string; email: string; comp: string; klass: string; minor: boolean; demo: boolean } };

const ageAt = (born: string, at: string) => {
  const b = new Date(born), d = new Date(at);
  let a = d.getFullYear() - b.getFullYear();
  if (d < new Date(d.getFullYear(), b.getMonth(), b.getDate())) a--;
  return a;
};

/** Validerar anmälan på servern. I demo-läget sparas ingenting. */
export async function register(_prev: FormState, fd: FormData): Promise<FormState> {
  const v = (k: string) => String(fd.get(k) ?? "").trim();
  const errors: string[] = [];
  const comp = getCompetition(v("tavling"));
  if (!comp) errors.push("Välj en tävling.");
  if (!["Junior", "Tjej", "Open"].includes(v("klass"))) errors.push("Välj en klass.");
  if (!v("fornamn") || !v("efternamn")) errors.push("Fyll i för- och efternamn.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v("fodd"))) errors.push("Fyll i födelsedatum.");
  if (!/^\S+@\S+\.\S+$/.test(v("epost"))) errors.push("Kontrollera e-postadressen, den ser inte komplett ut.");
  if (v("telefon").replace(/\D/g, "").length < 7) errors.push("Fyll i ett telefonnummer.");
  const minor = !!comp && /^\d{4}-\d{2}-\d{2}$/.test(v("fodd")) && ageAt(v("fodd"), comp.datum) < 18;
  if (minor && (!v("vh_namn") || !v("vh_telefon") || fd.get("vh_ok") !== "on"))
    errors.push("Vårdnadshavarens namn, telefon och godkännande behövs eftersom du är under 18.");
  if (fd.get("gdpr") !== "on") errors.push("Kryssa i att du godkänner integritetspolicyn.");
  if (errors.length) return { ok: false, errors };

  if (!IS_DEMO) {
    // Skarp version: spara i databas inom EU, logga samtycke (tid + policyversion), skicka bekräftelsemejl.
    // Kopplas in när arrangören har valt databas och mejltjänst.
  }
  return { ok: true, errors: [], summary: { name: v("fornamn"), email: v("epost"), comp: `${comp!.ort} ${comp!.datum}`, klass: v("klass"), minor, demo: IS_DEMO } };
}
