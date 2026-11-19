import Prose from "@/components/Prose";
export const metadata = { title: "Cookies" };
export default function Page() {
  return (
    <Prose eyebrow="Cookies" title="Inga spårningskakor">
      <p>Sajten använder inga cookies för reklam eller spårning. Därför behövs ingen cookiebanner.</p>
      <p>Typsnitten ligger på vår egen server, så inga besöksuppgifter skickas till Google.</p>
    </Prose>
  );
}
