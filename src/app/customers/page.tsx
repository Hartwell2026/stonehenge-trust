import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "Stonehenge Trust serves chemical distributors, warehouses and 3PL operators, bulk carriers, specialty chemical manufacturers, and importers — ACD Responsible Distribution, ISO 9001/14001/45001, and EPA regulatory work.",
  alternates: { canonical: "/customers" },
};

const VERTICALS = [
  {
    code: "C-01",
    name: "Specialty Chemical Manufacturing",
    body: "Formulators and producers carrying ISO 14001 and ACD obligations alongside batch-level recordkeeping. We handle the regulatory file end to end.",
  },
  {
    code: "C-02",
    name: "Industrial Coatings & Surface Treatment",
    body: "Air emission permits, NESHAP/NSPS work, and annual demonstrations for facilities operating under Title V regimes.",
  },
  {
    code: "C-03",
    name: "Energy Services & Midstream",
    body: "Compliance documentation across multi-state operations — including EPA air, water, and waste obligations with state-level overlays.",
  },
  {
    code: "C-04",
    name: "Food-Grade & Process Manufacturing",
    body: "ISO 9001/45001 systems integrated with EPA discharge and air programs for facilities where audit posture is continuous, not annual.",
  },
];

const ENGAGE = [
  {
    n: "I",
    name: "Discovery",
    body: "A scoping call. We map what you carry — obligations, deadlines, prior findings — and tell you whether we are the right firm.",
  },
  {
    n: "II",
    name: "Engagement",
    body: "A fixed-scope letter, named partner, and a calendarized delivery plan. No open hours, no scope creep.",
  },
  {
    n: "III",
    name: "Annual Cycle",
    body: "If the work continues, it attaches to the ACD annual rhythm. Each cycle closes with a board-ready memo.",
  },
];

export default function CustomersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sh-bone border-b border-sh-stone">
        <div className="absolute inset-0 fine-grid opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-20 md:pt-28 pb-16 md:pb-24">
          <Reveal>
            <p className="eyebrow">Who We Serve</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-[2.4rem] leading-[1.06] md:text-[4.5rem] md:leading-[1.0] tracking-tight text-sh-navy max-w-4xl">
              Industrial operators<br />
              <span className="font-normal text-sh-olive-deep">who file what they sign.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-8 max-w-2xl text-base md:text-lg text-sh-slate leading-relaxed">
              We work with mid-market industrial operators who carry meaningful
              regulatory obligations and want their compliance posture handled
              with the seriousness those obligations deserve.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Verticals */}
      <section className="bg-sh-bone">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <Reveal>
                <p className="eyebrow">Sectors</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-display text-3xl md:text-4xl text-sh-navy tracking-tight leading-tight">
                  Where our work lives.
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 text-sh-slate text-sm md:text-base leading-relaxed">
                  Four sectors where ISO management systems, ACD cycles, and EPA
                  obligations overlap meaningfully — and where boutique attention
                  changes the outcome.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-8">
              <Stagger className="grid gap-px bg-sh-stone">
                {VERTICALS.map((v) => (
                  <StaggerItem key={v.code} className="bg-sh-bone p-7 md:p-10">
                    <div className="flex items-start gap-6 md:gap-10">
                      <span className="font-mono text-xs text-sh-olive tracking-widest pt-1.5 min-w-[2.75rem]">
                        {v.code}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-display text-xl md:text-2xl text-sh-navy tracking-tight">
                          {v.name}
                        </h3>
                        <p className="mt-3 text-sh-slate text-sm md:text-base leading-relaxed">
                          {v.body}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement model */}
      <section className="bg-sh-cream relative">
        <div className="absolute inset-0 paper-grain pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow">Engagement Model</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-3xl md:text-5xl text-sh-navy tracking-tight leading-tight">
                How a customer becomes a file we carry.
              </h2>
            </Reveal>
          </div>

          <Stagger className="mt-16 grid md:grid-cols-3 gap-px bg-sh-stone-dark/60">
            {ENGAGE.map((e) => (
              <StaggerItem key={e.n} className="bg-sh-cream p-7 md:p-10">
                <span
                  className="font-display text-5xl text-sh-olive"
                  style={{ opacity: 0.9 }}
                >
                  {e.n}
                </span>
                <h3 className="mt-5 font-display text-2xl text-sh-navy tracking-tight">
                  {e.name}
                </h3>
                <p className="mt-3 text-sh-slate text-sm md:text-base leading-relaxed">
                  {e.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Customer charter */}
      <section className="bg-sh-navy text-sh-bone relative overflow-hidden">
        <div className="absolute inset-0 fine-grid-dark opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-5 md:px-8 py-24 md:py-32">
          <Reveal>
            <p className="eyebrow" style={{ color: "var(--sh-olive-light)" }}>
              Customer Charter
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-3xl md:text-5xl tracking-tight leading-tight">
              What customers can expect from us.
            </h2>
          </Reveal>

          <Stagger className="mt-12 space-y-px bg-sh-navy-mute/40">
            {[
              ["One named partner per engagement — present at scoping, delivery, and close-out."],
              ["Fixed-scope letters. No hours-based billing. No surprise variations."],
              ["Documentation written for the next reader, not the next meeting."],
              ["Honest scoping. If we are not the right firm, we say so on the first call."],
              ["Quarterly close-out memos for engagements on the annual cycle."],
            ].map(([line], i) => (
              <StaggerItem key={i} className="bg-sh-navy py-5 md:py-7 px-2 flex items-start gap-5">
                <span className="font-mono text-xs text-sh-olive-light tracking-widest mt-1 min-w-[2rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sh-bone text-base md:text-lg leading-relaxed">
                  {line}
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2}>
            <Link
              href="/contact"
              className="mt-14 inline-flex items-center gap-2 px-7 py-4 bg-sh-bone text-sh-navy text-sm tracking-wide hover:bg-sh-cream transition-colors"
            >
              Start a scoping call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 7h10m0 0L8 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
