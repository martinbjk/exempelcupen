# Exempelcupen – webbplats för en tävlingsserie (DEMO)

En mall för en cupsajt i skateboard: tävlingskalender, en sida per tävling med schema, boende, fest, karta och kontakter, anmälan, resultat, automatisk cupställning och utskrivbara affischer.

**Allt innehåll är påhittat**: orter, datum, klubbar, åkare och kontaktpersoner. Sajten visar **DEMO** överallt.

**Teknik:** Next.js 15, TypeScript, Tailwind CSS. Koden ligger i GitHub och publiceras via Vercel.

---

## Publicera på Vercel

1. Logga in på vercel.com och välj **Add New → Project**.
2. Välj repot `exempelcupen` och tryck **Import**.
3. Ändra ingenting. Tryck **Deploy**.
4. Efter ungefär en minut får du en adress, till exempel `exempelcupen.vercel.app`.

Varje gång något ändras i GitHub publicerar Vercel en ny version automatiskt.

---

## Lägga till eller ändra en tävling

1. Öppna mappen `content/tavlingar` i GitHub.
2. Kopiera filen `_mall.md`. Döp kopian till år och ort, till exempel `2027-exempelby.md`.
3. Fyll i datum, plats, schema, boende, fest och kontakter.
4. Vill du ha en bild: ladda upp den i `public/artwork` och skriv sökvägen i fältet `artwork`. Använd bara bilder du själv äger eller har tillstånd att använda.
5. Tryck **Commit changes**.

Tävlingssidan, listan på startsidan, tävlingsaffischen och årsaffischen uppdateras automatiskt.

## Ladda upp resultat

1. Spara resultatlistan i Excel som **CSV UTF-8** (annars blir å, ä och ö fel) med tre kolumner: `placering`, `namn`, `klubb`.
2. Döp filen efter klassen: `junior.csv`, `tjej.csv` eller `open.csv`.
3. Lägg filerna i en mapp på datorn som heter som tävlingsfilen, till exempel `2027-sjohamn`.
4. Öppna mappen `content/resultat` i GitHub och välj **Add file → Upload files**.
5. Dra in hela mappen och tryck **Commit changes**.

Cupställningen räknas om automatiskt. På sidan **För arrangörer** (`/admin`) kan man först kontrollera att listan ser rätt ut.

---

## Göra sajten skarp (om någon vill använda den på riktigt)

1. Byt ut det påhittade innehållet i `content/` mot riktiga tävlingar.
2. Byt namn och adress i `lib/site.ts` och i sidhuvudet.
3. I Vercel: **Settings → Environment Variables**, lägg till `NEXT_PUBLIC_DEMO` med värdet `false` och gör **Redeploy**.

Anmälan sparar ingenting i den här versionen. Den behöver kopplas till en databas inom EU eller till arrangörens eget anmälningssystem. Platsen i koden är markerad i `app/anmal/actions.ts`.

---

## Köra lokalt (för utvecklare)

```
npm install
npm run dev
```

Öppna sedan http://localhost:3000.
