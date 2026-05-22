import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

export const metadata: Metadata = {
  title: "About",
  description:
    "Stonehenge Trust is a boutique compliance firm built on permanence, fiduciary care, and restraint. ISO, ACD, EPA work delivered by the people who scope it.",
};

const TIMELINE = [
  { yr: "Year One", body: "Founded as a small, founder-led practice focused on industrial EPA and ISO management systems." },
  { yr: "Origin", body: "Built on the conviction that compliance work should be held in trust — owed to the standard, not the stakeholder." },
  { yr: "Now", body: "A deliberately small bench. Direct relationships. Work product that stands up under audit." },
];

const METHOD = [
  {
    n: "01",
    title: "Scope honestly",
    body: "We take on what we can deliver. If we are not the right firm for a piece of work, we say so on the first call.",
  },
  {
    n: "02",
    title: "Document for the next reader",
    body: "Every deliverable is built to be re-opened — by an auditor, a regulator, a successor. We write for the file, not the meeting.",
  },
  {
    n: "03",
    title: "Calendarize the obligation",
    body: "Compliance is a cycle, not a project. Our work attaches to a fixed annual rhythm so nothing falls between filings.",
  },
  {
    n: "04",
    title: "Hold the line",
    body: "We do not soften findings, paper over deviations, or trade rigor for convenience. The standard is the standard.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sh-bone border-b border-sh-stone">
        <div className="absolute inset-0 fine-grid opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-20 md:pt-28 pb-16 md:pb-24">
          <Reveal>
            <p className="eyebrow">About the Firm</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-[2.4rem] leading-[1.06] md:text-[4.5rem] md:leading-[1.0] tracking-tight text-sh-navy max-w-4xl">
              A small firm. <span className="font-normal text-sh-olive-deep">A long memory.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-8 max-w-2xl text-base md:text-lg text-sh-slate leading-relaxed">
              Stonehenge Trust is a boutique compliance practice. We do ISO management
              systems, Annual Compliance Demonstrations, and EPA regulatory work for
              industrial operators who need their compliance file to read like a
              standard — not a sales document.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Founding posture */}
      <section className="bg-sh-bone">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-28">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <Reveal>
                <p className="eyebrow">Posture</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 font-display text-3xl md:text-4xl text-sh-navy tracking-tight leading-tight">
                  We are not the biggest firm in the room.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal>
                <p className="text-sh-slate text-base md:text-lg leading-relaxed">
                  The large environmental consultancies operate on bench depth and
                  geographic coverage. That is not our model. We are a boutique:
                  founder-led, deliberately small, and structured so the same hands
                  that scope an engagement deliver it.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-5 text-sh-slate text-base md:text-lg leading-relaxed">
                  Our advantage is care. A small bench means we know every file we
                  carry. There are no junior handoffs and no consulting hours billed
                  against learning curves. The partner on the engagement is the
                  partner who signs the report.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="bg-sh-cream relative">
        <div className="absolute inset-0 paper-grain pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow">The Method</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-3xl md:text-5xl text-sh-navy tracking-tight leading-tight">
                Four working rules.
              </h2>
            </Reveal>
          </div>

          <Stagger className="mt-16 grid md:grid-cols-2 gap-px bg-sh-stone-dark/60">
            {METHOD.map((m) => (
              <StaggerItem key={m.n} className="bg-sh-cream p-7 md:p-10">
                <span className="font-mono text-xs text-sh-olive tracking-widest">
                  {m.n}
                </span>
                <h3 className="mt-4 font-display text-2xl text-sh-navy tracking-tight">
                  {m.title}
                </h3>
                <p className="mt-3 text-sh-slate text-sm md:text-base leading-relaxed">
                  {m.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-sh-navy text-sh-bone relative overflow-hidden">
        <div className="absolute inset-0 fine-grid-dark opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-32">
          <Reveal>
            <p className="eyebrow" style={{ color: "var(--sh-olive-light)" }}>
              History
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-3xl md:text-5xl tracking-tight leading-tight max-w-3xl">
              We are new. We carry an old discipline.
            </h2>
          </Reveal>

          <Stagger className="mt-16 grid md:grid-cols-3 gap-px bg-sh-navy-mute/40">
            {TIMELINE.map((t) => (
              <StaggerItem key={t.yr} className="bg-sh-navy p-7 md:p-10">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-sh-olive-light">
                  {t.yr}
                </span>
                <p className="mt-5 text-sh-bone text-base leading-relaxed">
                  {t.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-sh-bone">
        <div className="mx-auto max-w-4xl px-5 md:px-8 py-24 md:py-32 text-center">
          <Reveal>
            <p
              className="font-display text-3xl md:text-5xl text-sh-navy leading-tight tracking-tight"
              style={{ fontWeight: 500 }}
            >
              <span className="text-sh-olive font-mono text-3xl align-top mr-2">&ldquo;</span>
              Compliance held in trust is compliance that holds.
              <span className="text-sh-olive font-mono text-3xl align-top ml-1">&rdquo;</span>
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-sh-slate">
              Stonehenge Trust — Founding Principle
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="/contact"
              className="mt-12 inline-flex items-center gap-2 px-7 py-4 bg-sh-navy text-sh-bone text-sm tracking-wide hover:bg-sh-navy-ink transition-colors"
            >
              Engage the firm
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
