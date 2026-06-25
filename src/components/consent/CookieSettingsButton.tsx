"use client";

import { useConsent } from "./ConsentProvider";

export function CookieSettingsButton({
  className,
  label = "Manage cookie settings",
}: {
  className?: string;
  label?: string;
}) {
  const { openSettings } = useConsent();
  return (
    <button
      type="button"
      onClick={openSettings}
      className={
        className ??
        "rounded-full border border-sh-navy/20 px-5 py-2 text-sm font-medium text-sh-navy transition-colors hover:bg-sh-navy/5"
      }
    >
      {label}
    </button>
  );
}
