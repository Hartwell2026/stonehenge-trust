"use client";

import * as React from "react";

type Props = {
  /** Final string to render — may include numerals + non-numeric chars (e.g. "ISO 9001", "+150") */
  value: string;
  /** Optional duration ms */
  duration?: number;
  /** className applied to the rendered span */
  className?: string;
};

/**
 * CounterStat — animates the numeric portion of a string from 0 to target
 * when the element first enters the viewport. If the value is purely
 * non-numeric (e.g. "EHS&S"), it just fades in.
 */
export function CounterStat({ value, duration = 1400, className }: Props) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = React.useState(value);
  const animatedRef = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Extract the numeric segment to animate
    const match = value.match(/(\d[\d,.]*)/);
    if (!match || reduced) {
      setDisplay(value);
      return;
    }

    const rawNum = match[1].replace(/,/g, "");
    const target = Number(rawNum);
    if (!isFinite(target)) {
      setDisplay(value);
      return;
    }
    const prefix = value.slice(0, match.index ?? 0);
    const suffix = value.slice((match.index ?? 0) + match[1].length);
    const hasComma = match[1].includes(",");

    // Start hidden until in view
    setDisplay(`${prefix}0${suffix}`);

    const animate = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        // ease-out-cubic
        const eased = 1 - Math.pow(1 - p, 3);
        const v = Math.round(target * eased);
        const formatted = hasComma ? v.toLocaleString("en-US") : String(v);
        setDisplay(`${prefix}${formatted}${suffix}`);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e?.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          animate();
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}
