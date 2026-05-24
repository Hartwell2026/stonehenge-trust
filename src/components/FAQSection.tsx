"use client";

import * as React from "react";
import { Reveal } from "./Motion";

const FAQ_ITEMS = [
  {
    q: "What is ACD Responsible Distribution?",
    a: "ACD Responsible Distribution is the Alliance for Chemical Distribution's third-party-verified EHS&S program for chemical distributors. It covers management commitment, regulatory compliance, employee training, product stewardship, security, emergency response, transportation, and continuous improvement. Member companies are verified against the Responsible Distribution code on a recurring cycle by approved external verifiers.",
  },
  {
    q: "Who needs ACD Responsible Distribution verification?",
    a: "ACD member chemical distributors must complete third-party verification against the Responsible Distribution code as a condition of membership. Non-members increasingly pursue equivalent verification to meet customer purchasing requirements, insurance criteria, and supply-chain due-diligence expectations.",
  },
  {
    q: "How is ACD Responsible Distribution different from ISO 14001?",
    a: "ISO 14001 is a generic environmental management system standard applicable to any industry, verified by accredited registrars. ACD Responsible Distribution is chemical-distribution-specific, covering EHS, security, transportation, and product stewardship together, and verified by ACD-approved third parties. Many distributors hold both: ISO 14001 for general environmental management and ACD for distribution-specific obligations.",
  },
  {
    q: "What chemical-industry sectors does Stonehenge Trust serve?",
    a: "Stonehenge Trust serves chemical distributors, chemical warehouses and 3PL operators handling hazardous materials, bulk chemical carriers (rail, truck, intermodal), specialty chemical manufacturers and formulators, importers of record for regulated chemical products, and food-grade or process manufacturers with overlapping ISO and EPA programs.",
  },
  {
    q: "What jurisdictions does Stonehenge Trust cover for EPA work?",
    a: "Stonehenge Trust covers federal EPA programs across all 50 US states, with state-agency overlays as required by the operating facility's location. Common federal frameworks include TSCA, RCRA, the Clean Air Act (Title V, NESHAP, NSPS), the Clean Water Act, and SPCC. State-level air, water, and waste regulations are addressed alongside the federal baseline.",
  },
  {
    q: "How long does a typical ACD verification project take?",
    a: "A first-time ACD verification engagement typically runs 4 to 9 months end to end: gap assessment and scope (4–6 weeks), documentation build and remediation (8–16 weeks), internal audit and management review (4–6 weeks), and verifier window scheduling. Recurring re-verification cycles are tighter, usually 2 to 4 months, depending on the scope of changes since the prior cycle.",
  },
  {
    q: "Is Stonehenge Trust an ACD-accredited verifier?",
    a: "Stonehenge Trust is an advisory and audit-preparation firm, not an ACD-accredited third-party verifier. We prepare distributor and warehouse operators for verification, build the EHS&S management system and the verifier-ready documentation package, and run internal audits. Independent third-party verification is then performed by an ACD-approved external verifier.",
  },
];

/**
 * FAQSection — visible accordion that mirrors the FAQPage JSON-LD.
 *
 * Brand-aligned editorial register. Native <details>/<summary> for
 * zero-JS keyboard accessibility + SEO crawlability (rendered text is
 * always in the DOM).
 */
export function FAQSection() {
  return (
    <section className="relative bg-sh-bone border-t border-sh-stone">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow">Common Questions</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-3xl md:text-4xl text-sh-navy leading-tight tracking-tight">
                Answers we give on every first call.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-sh-slate text-sm md:text-base leading-relaxed">
                Practical, declarative answers to the questions buyers ask
                before they even open a scoping conversation. If yours
                isn&apos;t here, write to{" "}
                <a
                  href="mailto:info@stonehengetrust.com"
                  className="text-sh-navy link-quiet"
                >
                  info@stonehengetrust.com
                </a>
                .
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <div className="border-t border-sh-stone">
              {FAQ_ITEMS.map((item, i) => (
                <details
                  key={item.q}
                  className="group border-b border-sh-stone py-5 md:py-6"
                >
                  <summary className="flex items-start gap-5 md:gap-7 cursor-pointer list-none">
                    <span className="font-mono text-xs text-sh-olive tracking-widest pt-1 min-w-[2.25rem]">
                      Q{String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="flex-1 font-display text-base md:text-lg text-sh-navy leading-snug">
                      {item.q}
                    </h3>
                    <span
                      aria-hidden
                      className="relative w-4 h-4 mt-1.5 shrink-0 text-sh-olive transition-transform duration-200 group-open:rotate-45"
                    >
                      <span className="absolute inset-x-0 top-1/2 h-px bg-current -translate-y-1/2" />
                      <span className="absolute inset-y-0 left-1/2 w-px bg-current -translate-x-1/2" />
                    </span>
                  </summary>
                  <div className="mt-4 pl-[3.6rem] md:pl-[3.85rem] pr-2 text-sh-slate text-sm md:text-base leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
