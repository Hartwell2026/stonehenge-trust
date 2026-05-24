// JSON-LD for Stonehenge Trust — read by Google, Bing, and AI search engines.
// ProfessionalService is the right schema.org subtype for a regulatory
// consultancy. Service catalog enumerates offerings; FAQPage gets cited
// directly in AI search responses.

const ORG = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://stonehengetrust.com/#organization",
  name: "Stonehenge Trust",
  url: "https://stonehengetrust.com",
  logo: "https://stonehengetrust.com/brand/logo.svg",
  image: "https://stonehengetrust.com/opengraph-image",
  description:
    "A boutique compliance firm guiding chemical distributors, manufacturers, and industrial operators through ISO 9001/14001/45001 management systems, ACD Responsible Distribution verification, and EPA regulatory programs.",
  slogan: "Compliance, built to hold.",
  foundingDate: "2026-05-15",
  founder: { "@type": "Organization", name: "Stonehenge Trust" },
  areaServed: [{ "@type": "Country", name: "United States" }],
  knowsAbout: [
    "ACD Responsible Distribution",
    "ISO 9001 quality management",
    "ISO 14001 environmental management",
    "ISO 45001 occupational health and safety",
    "EPA TSCA compliance",
    "EPA RCRA compliance",
    "Clean Air Act compliance",
    "SPCC plans",
    "chemical distributor compliance",
    "EHS&S training",
  ],
  serviceType: [
    "Regulatory compliance consulting",
    "ISO management system certification consulting",
    "EPA permit and reporting support",
    "ACD Responsible Distribution verification preparation",
  ],
};

const SERVICE_CATALOG = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Chemical Industry Compliance Consulting",
  provider: { "@type": "ProfessionalService", name: "Stonehenge Trust" },
  areaServed: "United States",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Stonehenge Trust services",
    itemListElement: [
      { "@type": "OfferCatalog", name: "ACD Responsible Distribution" },
      { "@type": "OfferCatalog", name: "ISO 9001 / 14001 / 45001 Management Systems" },
      { "@type": "OfferCatalog", name: "EPA Regulatory Compliance (TSCA, RCRA, CAA, SPCC)" },
      { "@type": "OfferCatalog", name: "EHS&S Training & Continuous Improvement" },
    ],
  },
};

const FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is ACD Responsible Distribution and who needs it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Responsible Distribution is the Alliance for Chemical Distribution's mandatory third-party verified program for member distributors. It covers product stewardship, environmental performance, employee safety, community responsibility, and security across the full chemical-handling lifecycle. Stonehenge Trust prepares ACD members for RD23 verification, performs gap analysis against the code, and supports continuous-improvement between audit cycles.",
      },
    },
    {
      "@type": "Question",
      name: "Which ISO management systems does Stonehenge Trust support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We design, document, internally audit, and prepare clients for certification of ISO 9001 (quality), ISO 14001 (environmental), and ISO 45001 (occupational health & safety) — including integrated systems that share documentation across all three standards.",
      },
    },
    {
      "@type": "Question",
      name: "What EPA programs do you advise on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TSCA (chemical inventory, PMN/SNUR, Section 8 reporting), RCRA (hazardous waste generator, treatment, storage), Clean Air Act (Title V, NESHAP, emissions inventory), and SPCC (oil spill prevention). We handle permitting, reporting, internal audit, and agency response — federal and state.",
      },
    },
    {
      "@type": "Question",
      name: "How does Stonehenge Trust differ from larger compliance firms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We are a senior-expert boutique — fewer accounts, deeper bench per account, principals who stay on the file. Our work product is built to be audit-defensible. Clients hire us when they have been burned by a generic consultancy and need depth over a help-desk.",
      },
    },
    {
      "@type": "Question",
      name: "Who are typical Stonehenge Trust clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ACD-member chemical distributors, specialty chemical manufacturers, bulk warehouses and 3PLs (drum, IBC, bulk-liquid), motor and rail-intermodal carriers, importers and toll manufacturers, and laboratory or R&D operations with EPA, OSHA, or ISO 17025 adjacent obligations.",
      },
    },
  ],
};

// WebPage schema with author + publication dates — satisfies LinkedIn Post
// Inspector, Facebook OG debugger, and Google rich-result author signals.
const WEBPAGE = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://stonehengetrust.com/#webpage",
  url: "https://stonehengetrust.com/",
  name: "Stonehenge Trust — ISO, ACD & EPA Compliance",
  description:
    "Boutique compliance firm guiding chemical distributors, manufacturers, and industrial operators through ISO 9001/14001/45001, ACD Responsible Distribution, and EPA regulatory programs.",
  inLanguage: "en-US",
  isPartOf: { "@id": "https://stonehengetrust.com/#organization" },
  about: { "@id": "https://stonehengetrust.com/#organization" },
  author: { "@id": "https://stonehengetrust.com/#organization" },
  publisher: { "@id": "https://stonehengetrust.com/#organization" },
  datePublished: "2026-05-15T00:00:00Z",
  dateModified: "2026-05-24T00:00:00Z",
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://stonehengetrust.com/opengraph-image",
    width: 1200,
    height: 630,
  },
};

export function StructuredData() {
  const modified = new Date().toISOString();
  return (
    <>
      {/* LinkedIn Post Inspector + Facebook Open Graph debugger fields.
          Rendered as raw <meta> tags so they emit `property=` (not `name=`)
          which the metadata.other API can't produce. React 19 hoists these
          into <head> automatically. */}
      <meta property="article:author" content="Stonehenge Trust" />
      <meta property="article:publisher" content="https://stonehengetrust.com" />
      <meta property="article:published_time" content="2026-05-15T00:00:00Z" />
      <meta property="article:modified_time" content={modified} />
      <meta property="article:section" content="Compliance" />
      <meta property="og:updated_time" content={modified} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_CATALOG) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ) }} />
    </>
  );
}
