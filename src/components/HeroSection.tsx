"use client";

import Link from "next/link";
import { HeroVideoBackground } from "./HeroVideoBackground";

/**
 * Full-bleed cinematic hero.
 * Video background covers the entire section.
 * Editorial column overlaid on the left in bone/white for legibility.
 */
export function HeroSection() {

  return (
    <section className="relative isolate overflow-hidden bg-sh-navy-deep min-h-[88vh] md:min-h-[92vh] flex flex-col">
      {/* Cinematic background */}
      <HeroVideoBackground
        src="/video/hero-loop.mp4"
        poster="/video/hero-poster.jpg"
      />

      {/* Top-left brand-film badge */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8 pt-6 md:pt-8">
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-sh-olive-light animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-sh-bone/80">
            ST · Brand Film · Now Playing
          </span>
        </div>
      </div>

      {/* Main content — editorial column */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <p
              className="reveal eyebrow"
              style={{ color: "var(--sh-olive-light)" }}
            >
              Auditing · Verification · Compliance
            </p>

            <h1
              className="reveal mt-6 font-display tracking-tight text-sh-bone"
              style={{
                animationDelay: "0.1s",
                fontSize: "clamp(2.6rem, 7.5vw, 6rem)",
                lineHeight: 1.0,
                textShadow: "0 2px 24px rgba(6, 21, 35, 0.5)",
              }}
            >
              Compliance,
              <br />
              <span
                className="font-normal block"
                style={{ color: "var(--sh-olive-light)" }}
              >
                built to hold.
              </span>
            </h1>

            <p
              className="reveal mt-8 max-w-xl text-base md:text-lg leading-relaxed"
              style={{
                animationDelay: "0.22s",
                color: "rgba(250, 250, 246, 0.82)",
                textShadow: "0 1px 12px rgba(6, 21, 35, 0.6)",
              }}
            >
              Stonehenge Trust supports chemical distributors, warehouses, and
              carriers across <span className="whitespace-nowrap">ACD Responsible Distribution</span>{" "}
              verification, ISO management systems, and EPA regulatory work —
              with audit-ready EHS&amp;S documentation engineered to withstand
              auditor, regulator, and time.
            </p>

            <div
              className="reveal mt-10 flex flex-col sm:flex-row gap-4"
              style={{ animationDelay: "0.32s" }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-sh-bone text-sh-navy text-sm tracking-wide hover:bg-sh-cream transition-colors"
              >
                Engage the firm
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M2 7h10m0 0L8 3m4 4l-4 4"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="square"
                  />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-sh-bone/60 text-sh-bone text-sm tracking-wide hover:bg-sh-bone/10 transition-colors backdrop-blur-sm"
              >
                Read our standard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip — film caption only */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8 pb-6 md:pb-10">
        <div className="flex flex-col gap-1 border-t border-sh-bone/15 pt-5 md:pt-7">
          <span
            className="font-display text-base md:text-lg leading-tight max-w-xs"
            style={{ color: "rgba(250, 250, 246, 0.92)" }}
          >
            Industrial scale, held to the standard.
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-sh-bone/55">
            3PL Intermodal · Manufacturing · R&amp;D Laboratory
          </span>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden
        className="absolute left-1/2 bottom-2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 pointer-events-none opacity-60"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-sh-bone/60">
          Scroll
        </span>
        <span
          className="block w-px h-6 bg-sh-bone/40"
          style={{
            background:
              "linear-gradient(to bottom, rgba(250,250,246,0.6), rgba(250,250,246,0))",
          }}
        />
      </div>

    </section>
  );
}
