import type { Metadata } from "next";
import { Aldrich, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
    "A boutique compliance firm guiding industrial operators through ISO management systems, ACD Responsible Distribution verification, and EPA regulatory work. Built on permanence and trust.",
  applicationName: "Stonehenge Trust",
  category: "business",
  authors: [{ name: "Stonehenge Trust", url: "https://stonehengetrust.com" }],
  creator: "Stonehenge Trust",
  publisher: "Stonehenge Trust",
  keywords: [
    "ACD Responsible Distribution",
    "ISO 9001 14001 45001 consulting",
    "EPA regulatory compliance",
    "TSCA RCRA SPCC consultant",
    "chemical compliance services",
    "EHS&S training",
    "Responsible Distribution verification",
    "chemical distributor compliance",
    "management system certification",
    "boutique compliance firm",
  ],
  alternates: {
    canonical: "https://stonehengetrust.com/",
  },
  openGraph: {
    title: "Stonehenge Trust — ISO, ACD & EPA Compliance",
    description:
      "Boutique compliance for chemical distributors, manufacturers, and bulk handlers — ISO 9001/14001/45001, ACD Responsible Distribution, EPA regulatory programs.",
    url: "https://stonehengetrust.com",
    siteName: "Stonehenge Trust",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stonehenge Trust",
    description:
      "ISO · ACD · EPA compliance — boutique authority for industrial operators.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "rdEONhMzLqoPpV0cMym7iu4RpDPckKEUtKs175p3fPI",
  },
  // LinkedIn / Facebook Post Inspector fields. LinkedIn looks for these
  // even on non-article pages — without them it reports "No author found"
  // and "No publication date found".
  other: {
    "article:author": "Stonehenge Trust",
    "article:publisher": "https://stonehengetrust.com",
    "article:published_time": "2026-05-15T00:00:00Z",
    "article:modified_time": new Date().toISOString(),
    "article:section": "Compliance",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
