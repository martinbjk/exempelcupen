import type { Metadata } from "next";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/600.css";
import "@fontsource/archivo/700.css";
import "@fontsource/archivo/800.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DemoBar, DemoRibbon } from "@/components/Demo";
import { IS_DEMO } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: IS_DEMO ? "DEMO · Exempelcupen 2027" : "Exempelcupen 2027", template: IS_DEMO ? "%s · DEMO Exempelcupen" : "%s · Exempelcupen" },
  description: "Exempelsajt för en tävlingsserie i skateboard, Street och Böj.",
  // Demon ska inte synas på Google.
  robots: IS_DEMO ? { index: false, follow: false } : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <DemoBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <DemoRibbon />
      </body>
    </html>
  );
}
