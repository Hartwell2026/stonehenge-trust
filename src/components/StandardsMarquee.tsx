import * as React from "react";

const ITEMS = [
  "ACD Responsible Distribution",
  "ISO 9001",
  "ISO 14001",
  "ISO 45001",
  "EPA · TSCA",
  "EPA · RCRA",
  "EPA · Clean Air Act",
  "EPA · SPCC",
  "OSHA HazCom",
  "DOT Hazmat",
  "Title V Air Permitting",
  "NESHAP · NSPS",
  "RD23 Advisory",
  "Third-Party Verification",
  "EHS&S",
];

/**
 * StandardsMarquee — trade-journal style infinite-scroll ticker of regulatory
 * standards. Pauses on hover.
 *
 * Pure CSS animation (set in globals.css as .marquee-track) — no JS.
 */
export function StandardsMarquee() {
  // Duplicate the list so the loop reads continuous
  const stream = [...ITEMS, ...ITEMS];

  return (
    <section
      aria-label="Standards we navigate"
      className="relative bg-sh-navy-ink text-sh-bone overflow-hidden border-y border-sh-navy-mute/40"
    >
      {/* Edge fades */}
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(9,27,44,1), rgba(9,27,44,0))",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgba(9,27,44,1), rgba(9,27,44,0))",
        }}
      />

      <div className="py-4 group relative">
        <div className="flex gap-12 marquee-track whitespace-nowrap will-change-transform">
          {stream.map((item, i) => (
            <div key={`${item}-${i}`} className="flex items-center gap-12">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-sh-olive-light">
                {item}
              </span>
              <span
                aria-hidden
                className="inline-block w-1 h-1 rounded-full bg-sh-olive-light/60"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
