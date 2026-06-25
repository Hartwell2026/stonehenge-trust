"use client";

import Link from "next/link";
import { useConsent } from "./ConsentProvider";

export function CookieBanner() {
  const { bannerOpen, region, accept, reject } = useConsent();
  if (!bannerOpen) return null;

  const strict = region === "eu";

  return (
    <div
      role="dialog"
      aria-label="Cookies & your privacy"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-sh-stone-dark/60 bg-sh-cream/95 p-5 shadow-2xl shadow-sh-navy/15 backdrop-blur sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm leading-relaxed text-sh-slate">
            <p className="mb-1 text-base font-semibold text-sh-navy">
              Cookies &amp; your privacy
            </p>
            <p>
              {strict
                ? "We use cookies to operate this site and improve your experience. Choose which non-essential cookies we may use."
                : "We use cookies to operate this site and improve your experience. By continuing to browse, you agree to our use of cookies."}{" "}
              <Link
                href="/cookies"
                className="font-medium text-sh-olive underline underline-offset-2 hover:text-sh-olive-deep"
              >
                Cookie Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={reject}
              className="rounded-full border border-sh-navy/20 px-5 py-2 text-sm font-medium text-sh-navy transition-colors hover:bg-sh-navy/5"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={accept}
              className="rounded-full bg-sh-navy px-5 py-2 text-sm font-medium text-sh-bone transition-colors hover:bg-sh-navy-ink"
            >
              {strict ? "Accept" : "Got it"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
