import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Suppliers",
  description:
    "Stonehenge Trust works with a small bench of accredited laboratory, sampling, and credentialed specialist suppliers supporting ACD, ISO, and EPA work product. Standards, onboarding, and continuity expectations.",
  alternates: { canonical: "/suppliers" },
};

const TIERS = [
  {
    code: "S-01",
    name: "Accredited Laboratories",
    body: "ISO/IEC 17025-accredited analytical labs for air, water, and waste streams. Chain-of-custody, holding times, and method coverage validated annually.",
  },
  {
    code: "S-02",
    name: "Field Sampling & Monitoring",
    body: "Credentialed field teams for stack testing, fugitive emissions, and discharge monitoring. Work product integrates directly into our reporting package.",
  },
  {
    code: "S-03",
    name: "Subject-Matter Specialists",
    body: "On-call regulatory specialists — air permitting, NESHAP, LDAR — engaged for defined scope under our partner oversight.",
  },
  {
    code: "S-04",
    name: "Document & Records Infrastructure",
    body: "Secure document management, retention, and audit-trail systems supporting long-horizon file integrity.",
  },
];

const EXPECT = [
  {
    n: "01",
    title: "Credentials in writing",
    body: "Accreditations, certifications, and scopes of work documented before engagement. We do not accept verbal assurances of standing.",
  },
  {
    n: "02",
    title: "Chain-of-custody discipline",
    body: "Sample integrity, holding times, and field-to-lab handoffs documented in a form that survives an audit four years later.",
  },
  {
    n: "03",
    title: "Direct partner contact",
    body: "Suppliers correspond directly with the partner on the engagement — not through layered project management.",
  },
  {
    n: "04",
    title: "Continuity",
    body: "We prefer long supplier relationships over rotating bids. Continuity reduces interpretive drift and improves audit defensibility.",
  },
];

export default function SuppliersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sh-bone border-b border-sh-stone">
        <div className="absolute inset-0 fine-grid opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-20 md:pt-28 pb-16 md:pb-24">
          <Reveal>
            <p className="eyebrow">Supplier Network</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-[2.4rem] leading-[1.06] md:text-[4.5rem] md:leading-[1.0] tracking-tight text-sh-navy max-w-4xl">
              A small bench<br />
              <span className="font-normal text-sh-olive-deep">we know by name.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-8 max-w-2xl text-base md:text-lg text-sh-slate leading-relaxed">
              Our work depends on a tight supplier network — accredited labs,
              credentialed field teams, and specialist advisors — held to the same
              standard of care we apply to our own deliverables.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-sh-bone">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <Reveal>
                <p className="eyebrow">Supplier Tiers</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-display text-3xl md:text-4xl text-sh-navy tracking-tight leading-tight">
                  Four categories of partner.
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 text-sh-slate text-sm md:text-base leading-relaxed">
                  Each category carries a specific qualification standard. We do
                  not engage outside these tiers without principal approval.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-8">
              <Stagger className="grid gap-px bg-sh-stone">
                {TIERS.map((t) => (
                  <StaggerItem key={t.code} className="bg-sh-bone p-7 md:p-10">
                    <div className="flex items-start gap-6 md:gap-10">
                      <span className="font-mono text-xs text-sh-olive tracking-widest pt-1.5 min-w-[2.75rem]">
                        {t.code}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-display text-xl md:text-2xl text-sh-navy tracking-tight">
                          {t.name}
                        </h3>
                        <p className="mt-3 text-sh-slate text-sm md:text-base leading-relaxed">
                          {t.body}
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

      {/* Expectations */}
      <section className="bg-sh-cream relative">
        <div className="absolute inset-0 paper-grain pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow">What We Expect</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-3xl md:text-5xl text-sh-navy tracking-tight leading-tight">
                Four working expectations.
              </h2>
            </Reveal>
          </div>

          <Stagger className="mt-16 grid md:grid-cols-2 gap-px bg-sh-stone-dark/60">
            {EXPECT.map((e) => (
              <StaggerItem key={e.n} className="bg-sh-cream p-7 md:p-10">
                <span className="font-mono text-xs text-sh-olive tracking-widest">
                  {e.n}
                </span>
                <h3 className="mt-4 font-display text-2xl text-sh-navy tracking-tight">
                  {e.title}
                </h3>
                <p className="mt-3 text-sh-slate text-sm md:text-base leading-relaxed">
                  {e.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA for new suppliers */}
      <section className="bg-sh-navy text-sh-bone relative overflow-hidden">
        <div className="absolute inset-0 fine-grid-dark opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-5 md:px-8 py-24 md:py-32 text-center">
          <Reveal>
            <p className="eyebrow" style={{ color: "var(--sh-olive-light)" }}>
              Onboarding
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-3xl md:text-5xl tracking-tight leading-tight">
              New supplier?
              <br />
              <span className="font-normal text-sh-olive-light">
                Tell us what you carry.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl mx-auto text-sh-slate-light text-base md:text-lg leading-relaxed">
              We onboard new suppliers when a specific engagement need calls for
              it. Send credentials, scopes of accreditation, and contact for the
              principal we should correspond with.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 px-7 py-4 bg-sh-bone text-sh-navy text-sm tracking-wide hover:bg-sh-cream transition-colors"
            >
              Submit supplier credentials
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
