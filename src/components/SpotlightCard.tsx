"use client";

import * as React from "react";

/**
 * SpotlightCard — renders an extra layer that follows the pointer with a
 * soft olive radial glow when the user hovers. The layer is positioned
 * absolutely inside a `position: relative` parent, so this can be dropped
 * inside any existing card without changing layout.
 *
 * Designed as decoration — the underlying card content stays fully readable.
 */
export function SpotlightCard({
  size = 320,
  color = "rgba(138, 153, 112, 0.18)",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    parent.style.setProperty("--sp-x", "50%");
    parent.style.setProperty("--sp-y", "50%");
    parent.style.setProperty("--sp-o", "0");

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      parent.style.setProperty("--sp-x", `${e.clientX - r.left}px`);
      parent.style.setProperty("--sp-y", `${e.clientY - r.top}px`);
      parent.style.setProperty("--sp-o", "1");
    };
    const onLeave = () => parent.style.setProperty("--sp-o", "0");

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${className ?? ""}`}
      style={{
        opacity: "var(--sp-o, 0)" as unknown as number,
        background: `radial-gradient(${size}px circle at var(--sp-x, 50%) var(--sp-y, 50%), ${color}, transparent 60%)`,
      }}
    />
  );
}
