import Link from "next/link";

export function LegalLayout({
  kicker,
  title,
  lastUpdated,
  children,
}: {
  kicker: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-sh-bone text-sh-graphite">
      <header className="bg-sh-navy text-sh-bone">
        <div className="mx-auto max-w-2xl px-6 pt-28 pb-14 md:pt-32">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-sh-olive-light">
            {kicker}
          </span>
          <h1 className="font-display mt-4 text-[clamp(32px,5vw,52px)] leading-[1.08] tracking-tight">
            {title}
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-sh-bone/50">
            Last updated · {lastUpdated}
          </p>
          <Link
            href="/"
            className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.3em] text-sh-olive-light hover:text-sh-bone"
          >
            ← Back to Stonehenge Trust
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <div className="text-[15px] leading-7 text-sh-slate [&_a]:font-medium [&_a]:text-sh-olive [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded [&_code]:bg-sh-navy/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13px] [&_code]:text-sh-navy [&_h2]:mt-10 [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-sh-navy [&_h3]:mt-6 [&_h3]:mb-1 [&_h3]:font-semibold [&_h3]:text-sh-navy [&_li]:mt-1.5 [&_p]:mt-3 [&_strong]:text-sh-navy [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </section>
    </main>
  );
}
