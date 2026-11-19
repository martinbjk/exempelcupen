/** Demo-läge är PÅ tills NEXT_PUBLIC_DEMO uttryckligen sätts till "false" i Vercel. */
export const IS_DEMO = process.env.NEXT_PUBLIC_DEMO !== "false";
export const SITE_URL = "exempelcupen.se"; // påhittad adress – byt till er egen
export const DEMO_TEXT = "Detta är en demo med påhittat innehåll.";
