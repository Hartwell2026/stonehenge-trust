import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { Logo } from "@/components/Logo";
import { HeroSection } from "@/components/HeroSection";
import { ComplianceNetwork } from "@/components/ComplianceNetwork";
import { CounterStat } from "@/components/CounterStat";
import { StandardsMarquee } from "@/components/StandardsMarquee";
import { SpotlightCard } from "@/components/SpotlightCard";
import { StructuredData } from "@/components/StructuredData";
import { FAQSection } from "@/components/FAQSection";

const SERVICES = [
  {
    code: "01",
    name: "ACD Responsible Distribution",
    body: "Third-party verification preparation, RD23 advising and gap analysis for chemical distributors operating under the Alliance for Chemical Distribution's Responsible Distribution Program.",
  },
  {
    code: "02",
    name: "ISO Management Systems",
    body: "ISO 9001 quality, 14001 environmental, and 45001 occupational health & safety — system design, documentation, internal audit, and stage-1/stage-2 certification support.",
  },
  {
    code: "03",
    name: "EPA Regulatory Compliance",
    body: "TSCA, RCRA, Clean Air Act, and SPCC programs — permitting, emissions inventories, reporting, audits, and agency response across federal and state regimes.",
  },
  {
    code: "04",
    name: "EHS&S Training & Continuous Improvement",
    body: "On-site and online training for senior management, operators, and verifiers. Refresher cycles, workshop facilitation, and a continuous-improvement cadence that holds between audits.",
  },
];

const INDUSTRIES = [
  { code: "I-01", name: "Chemical Distributors", body: "ACD member distributors preparing for or maintaining Responsible Distribution verification." },
  { code: "I-02", name: "Specialty Chemical Manufacturers", body: "Formulators and producers with ISO 9001/14001/45001 obligations and EPA air or wastewater permits." },
  { code: "I-03", name: "Warehouses & 3PLs", body: "Bulk-liquid, drum, and IBC operators carrying SPCC, RCRA, and DOT obligations." },
  { code: "I-04", name: "Bulk Carriers & Intermodal", body: "Motor carriers and rail-intermodal operators moving hazmat under DOT and ACD verifier scope." },
  { code: "I-05", name: "Importers & Tollers", body: "TSCA importer-of-record support, PMN/SNUR strategy, and toll-manufacturing compliance." },
  { code: "I-06", name: "Laboratories & R&D", body: "Research operations with EPA, OSHA, and ISO 17025 adjacent obligations." },
];

const STATS = [
  { value: "EHS&S", label: "Environmental · Health · Safety · Security", note: "Our standing scope of work" },
  { value: "ISO 9001", label: "Quality Management Systems", note: "Designed, documented, audited" },
  { value: "ISO 14001", label: "Environmental Management Systems", note: "Aligned with EPA program obligations" },
  { value: "ISO 45001", label: "Occupational Health & Safety", note: "Integrated with ACD verification scope" },
];

const STANDARDS = [
  "ACD Responsible Distribution",
  "RD23 Advisory",
  "ISO 9001 · 14001 · 45001",
  "EPA · TSCA · RCRA · CAA · SPCC",
  "OSHA HazCom",
  "DOT Hazmat",
];

const PRINCIPLES = [
  {
    n: "I",
    title: "Permanence",
    body: "Work product is built to be referenced again — by verifiers, auditors, regulators, successors. Documentation that outlasts the engagement.",
  },
  {
    n: "II",
    title: "Fiduciary",
    body: "Compliance is held in trust. Every deliverable is owed to a standard, not a stakeholder. We carry the obligation.",
  },
  {
    n: "III",
    title: "Restraint",
    body: "Boutique by design. Small bench, deep work. We take on what we can deliver, and we deliver what we take on.",
  },
];

const VERIFICATION_CYCLE = [
  ["01", "Gap Analysis", "Review of current EHS&S documentation against the ACD Responsible Distribution code. Findings package with a remediation plan."],
  ["02", "Remediation & Training", "Policy and procedure build, recordkeeping, and on-site or online training of senior management and front-line operators."],
  ["03", "Verification Readiness", "Internal mock verification, evidence package assembly, and walkthrough of the third-party verifier's likely line of inquiry."],
  ["04", "Continuous Improvement", "Between-cycle cadence — refresher training, regulatory horizon scan, recordkeeping discipline, and verification renewal planning."],
];

export default function HomePage() {
  return (
    <>
      <StructuredData />
      {/* ─── Hero — full-bleed cinematic background ─────────── */}
      <HeroSection />

      {/* ─── Standards strip — SGS-style institutional name-drop ─── */}
      <section className="relative bg-sh-bone border-b border-sh-stone">
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-7 md:py-9">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Logo variant="stamp" tone="navy" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-sh-slate hidden md:inline">
              Standards we navigate
            </span>
            <span className="font-mono text-xs text-sh-stone-dark hidden md:inline">/</span>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {STANDARDS.map((s) => (
                <span
                  key={s}
                  className="font-display text-sm text-sh-navy whitespace-nowrap"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Standards Marquee — trade-ticker rhythm ────────── */}
      <StandardsMarquee />

      {/* ─── Services — 4-up SGS-style card grid ─────────────── */}
      <section className="relative bg-sh-bone">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-14 md:mb-20">
            <div className="md:col-span-5">
              <Reveal>
                <p className="eyebrow">What We Do</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-display text-3xl md:text-5xl text-sh-navy leading-tight tracking-tight">
                  Four lines of work,
                  <br />
                  <span className="font-normal text-sh-olive-deep">
                    one standard of care.
                  </span>
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7 md:pt-2">
              <Reveal delay={0.16}>
                <p className="text-sh-slate text-base md:text-lg leading-relaxed">
                  Stonehenge Trust is a boutique EHS&amp;S practice serving the
                  chemical distribution and manufacturing sector. We don&apos;t
                  chase scope — each engagement is shaped around the regulatory
                  reality of the operator and delivered by the same hands that
                  scoped it.
                </p>
              </Reveal>
            </div>
          </div>

          <Stagger className="grid md:grid-cols-2 gap-px bg-sh-stone border border-sh-stone">
            {SERVICES.map((s) => (
              <StaggerItem key={s.code} className="relative bg-sh-bone p-8 md:p-10 group overflow-hidden">
                <SpotlightCard />
                <div className="relative">
                  <div className="flex items-baseline justify-between border-b border-sh-stone pb-4 mb-5">
                    <span className="font-mono text-xs text-sh-olive tracking-widest">
                      {s.code}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-sh-slate">
                      Practice Area
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-[1.65rem] text-sh-navy tracking-tight leading-tight">
                    {s.name}
                  </h3>
                  <p className="mt-4 text-sh-slate text-sm md:text-base leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Stats / scope bar — SGS-style numeric authority ─── */}
      <section className="relative bg-sh-cream border-y border-sh-stone">
        <div className="absolute inset-0 paper-grain pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
          <Reveal>
            <p className="eyebrow text-center md:text-left">Scope of Practice</p>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-sh-stone-dark/40">
            {STATS.map((s) => (
              <div
                key={s.value}
                className="bg-sh-cream p-6 md:p-8 flex flex-col gap-2"
              >
                <CounterStat
                  value={s.value}
                  className="font-display text-3xl md:text-4xl text-sh-navy tracking-tight leading-none tabular-nums"
                />
                <span className="font-display text-sm md:text-base text-sh-graphite leading-snug">
                  {s.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-sh-slate mt-1">
                  {s.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Industries — SGS-style 6-card grid ─────────────── */}
      <section className="relative bg-sh-bone">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-32">
          <div className="max-w-3xl mb-14 md:mb-16">
            <Reveal>
              <p className="eyebrow">Who We Serve</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-3xl md:text-5xl text-sh-navy leading-tight tracking-tight">
                Six sectors where our work lives.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-sh-slate text-base md:text-lg leading-relaxed">
                We work with operators whose regulatory obligations are
                continuous, not episodic — and whose compliance posture has to
                hold across verifiers, agencies, and time.
              </p>
            </Reveal>
          </div>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-sh-stone border border-sh-stone">
            {INDUSTRIES.map((i) => (
              <StaggerItem key={i.code} className="relative bg-sh-bone p-7 md:p-8 group overflow-hidden">
                <SpotlightCard size={260} />
                <div className="relative">
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-sh-olive">
                    {i.code}
                  </span>
                  <h3 className="mt-4 font-display text-xl md:text-2xl text-sh-navy tracking-tight leading-tight">
                    {i.name}
                  </h3>
                  <p className="mt-3 text-sh-slate text-sm leading-relaxed">
                    {i.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Principles (dark band) — signature constellation backdrop ─── */}
      <section className="relative bg-sh-navy text-sh-bone overflow-hidden">
        <ComplianceNetwork density={0.00009} maxLinkDist={150} className="opacity-90" />
        <div className="absolute inset-0 paper-grain pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow" style={{ color: "var(--sh-olive-light)" }}>
                The Standard
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-3xl md:text-5xl tracking-tight leading-tight">
                What we hold ourselves to.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-sh-slate-light text-base md:text-lg leading-relaxed">
                We are a small firm. Three principles shape how we take on,
                scope, and deliver work.
              </p>
            </Reveal>
          </div>

          <Stagger className="mt-16 grid md:grid-cols-3 gap-px bg-sh-navy-mute/40">
            {PRINCIPLES.map((p) => (
              <StaggerItem key={p.n} className="bg-sh-navy p-7 md:p-10">
                <span
                  className="font-display text-5xl text-sh-olive-light"
                  style={{ opacity: 0.85 }}
                >
                  {p.n}
                </span>
                <h3 className="mt-5 font-display text-2xl text-sh-bone tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-sh-slate-light text-sm leading-relaxed">
                  {p.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── ACD Verification Cycle ─────────────────────────── */}
      <section className="relative bg-sh-cream">
        <div className="absolute inset-0 paper-grain pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-5">
              <Reveal>
                <p className="eyebrow">ACD Verification</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-display text-3xl md:text-4xl text-sh-navy leading-tight tracking-tight">
                  Responsible Distribution,{" "}
                  <span className="font-normal text-sh-olive-deep">
                    verifier-ready.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 text-sh-slate leading-relaxed">
                  ACD third-party verification turns on documentation, training,
                  and discipline. We support distributors through the full
                  cycle — gap analysis, remediation, training, and the internal
                  mock verification that makes the real one a formality.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex link-quiet text-sh-navy text-sm tracking-wide"
                >
                  Schedule a scoping call
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path
                      d="M2 6h8m0 0L6.5 2.5M10 6L6.5 9.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="square"
                    />
                  </svg>
                </Link>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="md:col-span-7">
              <div className="border border-sh-stone-dark bg-sh-bone p-6 md:p-10 relative">
                <div className="flex items-baseline justify-between border-b border-sh-stone pb-4 mb-6">
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-sh-olive">
                    ACD · Verification Cycle
                  </span>
                  <span className="font-mono text-xs text-sh-slate">RD23 · 2026</span>
                </div>

                <ol className="space-y-5">
                  {VERIFICATION_CYCLE.map(([n, name, body]) => (
                    <li key={n} className="flex items-start gap-5 md:gap-7">
                      <span className="font-mono text-xs text-sh-olive tracking-widest pt-1 min-w-[2rem]">
                        {n}
                      </span>
                      <div>
                        <span className="font-display text-base md:text-lg text-sh-navy">
                          {name}
                        </span>
                        <p className="mt-1 text-sm text-sh-slate leading-relaxed">
                          {body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────── */}
      <FAQSection />

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="bg-sh-bone">
        <div className="mx-auto max-w-5xl px-5 md:px-8 py-24 md:py-32 text-center">
          <Reveal>
            <p className="eyebrow">Engagement</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-3xl md:text-5xl text-sh-navy leading-tight tracking-tight">
              We take on work we can deliver.
              <br />
              <span className="font-normal text-sh-olive-deep">
                Tell us what you&apos;re carrying.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 px-7 py-4 bg-sh-navy text-sh-bone text-sm tracking-wide hover:bg-sh-navy-ink transition-colors"
            >
              Engage Stonehenge Trust
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M2 7h10m0 0L8 3m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="square"
                />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
