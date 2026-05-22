import * as React from "react";

type LogoProps = {
  variant?: "mark" | "lockup" | "stamp";
  tone?: "navy" | "bone" | "olive";
  className?: string;
};

const TONE = {
  navy: "var(--sh-navy)",
  bone: "var(--sh-bone)",
  olive: "var(--sh-olive)",
};

/**
 * Stonehenge Trust monogram — ST trilithon.
 * Two uprights (S, T) bound by a horizontal lintel.
 * Designed as a "carved stone" mark — scalable, favicon-safe.
 */
function Trilithon({ tone = "navy" }: { tone?: keyof typeof TONE }) {
  const c = TONE[tone];
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      style={{ display: "block" }}
    >
      <title>Stonehenge Trust</title>
      {/* lintel */}
      <rect x="6" y="10" width="52" height="9" rx="1" fill={c} />
      {/* uprights — slightly wider at the base for stone weight */}
      <path
        d="M 8 21 L 22 21 L 23 56 L 7 56 Z"
        fill={c}
      />
      <path
        d="M 42 21 L 56 21 L 57 56 L 41 56 Z"
        fill={c}
      />
      {/* S-bar inscribed on left upright */}
      <rect x="11" y="32" width="8" height="2.2" fill="var(--sh-bone)" opacity="0.92" />
      <rect x="11" y="40" width="8" height="2.2" fill="var(--sh-bone)" opacity="0.92" />
      {/* T-bar inscribed on right upright */}
      <rect x="44" y="32" width="10" height="2.2" fill="var(--sh-bone)" opacity="0.92" />
      <rect x="48" y="32" width="2.2" height="14" fill="var(--sh-bone)" opacity="0.92" />
    </svg>
  );
}

export function Logo({ variant = "lockup", tone = "navy", className = "" }: LogoProps) {
  if (variant === "mark") {
    return (
      <span className={`inline-block ${className}`} style={{ width: 36, height: 36 }}>
        <Trilithon tone={tone} />
      </span>
    );
  }

  if (variant === "stamp") {
    const c = TONE[tone];
    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1.5 border ${className}`}
        style={{ borderColor: c, color: c }}
      >
        <span style={{ width: 16, height: 16 }}>
          <Trilithon tone={tone} />
        </span>
        <span
          className="font-mono uppercase"
          style={{ fontSize: "0.625rem", letterSpacing: "0.2em" }}
        >
          Stonehenge Verified
        </span>
      </span>
    );
  }

  // lockup
  const c = TONE[tone];
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span style={{ width: 34, height: 34 }}>
        <Trilithon tone={tone} />
      </span>
      <span className="flex flex-col leading-none" style={{ color: c }}>
        <span
          className="font-display"
          style={{
            fontSize: "1.125rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          Stonehenge
        </span>
        <span
          className="font-mono uppercase"
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.32em",
            marginTop: "3px",
            opacity: 0.78,
          }}
        >
          Trust
        </span>
      </span>
    </span>
  );
}
