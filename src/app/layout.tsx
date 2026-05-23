import type { Metadata } from "next";
import { Aldrich, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RetellChat } from "@/components/RetellChat";

const aldrich = Aldrich({
  subsets: ["latin"],
  variable: "--font-aldrich",
  weight: "400",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stonehengetrust.com"),
  title: {
    default: "Stonehenge Trust — ISO, ACD & EPA Compliance",
    template: "%s — Stonehenge Trust",
  },
  description:
    "A boutique compliance firm guiding industrial operators through ISO management systems, Annual Compliance Demonstrations, and EPA regulatory work. Built on permanence and trust.",
  openGraph: {
    title: "Stonehenge Trust",
    description:
      "ISO · ACD · EPA compliance — boutique authority for industrial operators.",
    type: "website",
    siteName: "Stonehenge Trust",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${aldrich.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sh-bone text-sh-graphite">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <RetellChat />
      </body>
    </html>
  );
}
