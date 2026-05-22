"use client";

import * as React from "react";

type Props = {
  src: string;
  /** Optional poster image for first paint */
  poster?: string;
};

/**
 * Full-bleed cinematic background video for the hero section.
 * - Autoplays muted, loops, plays inline (mobile-safe).
 * - Slow fade-in once first frame is decoded.
 * - Dark gradient + grain overlays baked in so foreground text stays legible.
 * - Reduced-motion respected: shows poster instead of video.
 */
export function HeroVideoBackground({ src, poster }: Props) {
  const [loaded, setLoaded] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Force-kick playback — some browsers stall autoplay on slow first byte.
  React.useEffect(() => {
    if (reduced) return;
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlay();
    const id = window.setInterval(tryPlay, 1500);
    const onVis = () => { if (!document.hidden) tryPlay(); };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Solid base — navy for cinematic feel before video paints */}
      <div className="absolute inset-0 bg-sh-navy-deep" />

      {/* Optional poster */}
      {poster && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}

      {/* The video itself */}
      {!reduced && (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setLoaded(true)}
          onCanPlay={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      )}

      {/* Legibility stack — top-to-bottom darken + side vignette + grain */}
      {/* 1. Bottom-up gradient so headlines on the lower-left stay legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-sh-navy-deep/90 via-sh-navy-deep/55 to-sh-navy-deep/30" />
      {/* 2. Left-bias darken to anchor the editorial column */}
      <div className="absolute inset-0 bg-gradient-to-r from-sh-navy-deep/75 via-sh-navy-deep/35 to-transparent" />
      {/* 3. Soft vignette at corners */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(6,21,35,0.55)_100%)]" />
      {/* 4. Cinematic film grain */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
