"use client";

import * as React from "react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "li" | "span";
};

/**
 * Reveal — pure-CSS fade-up that runs on mount.
 * Bulletproof: no Framer Motion, no IntersectionObserver, no client state.
 */
export function Reveal({
  children,
  delay = 0,
  y: _y = 14,
  className,
  as = "div",
}: RevealProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      className={`reveal ${className ?? ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  gap?: number;
};

/**
 * Stagger — CSS-driven sequential reveal of children.
 * Walks children with React.Children.map and applies an incrementing delay.
 */
export function Stagger({ children, className, gap = 0.07 }: StaggerProps) {
  const items = React.Children.toArray(children);
  return (
    <div className={className}>
      {items.map((child, i) => {
        if (!React.isValidElement(child)) return child;
        // Pass a delay-prop down via styling override on StaggerItem
        return React.cloneElement(child as React.ReactElement<{ _staggerDelay?: number }>, {
          _staggerDelay: i * gap,
        });
      })}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
  y: _y = 12,
  _staggerDelay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  _staggerDelay?: number;
}) {
  return (
    <div
      className={`reveal ${className ?? ""}`}
      style={{ animationDelay: `${_staggerDelay}s` }}
    >
      {children}
    </div>
  );
}

/**
 * Subtle parallax — moves a child a few pixels with scroll.
 * Used sparingly on hero accents.
 */
export function SoftDrift({
  children,
  className,
  amount = 30,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        setOffset(-progress * amount);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [amount]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `translate3d(0, ${offset}px, 0)`, willChange: "transform" }}
    >
      {children}
    </div>
  );
}
