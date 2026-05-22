"use client";

import * as React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  src: string;
};

export function VideoModal({ open, onClose, src }: Props) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Close on Escape, prevent body scroll while open
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // Reset video when closed
  React.useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (open && videoRef.current) {
      // small delay so the autoplay attribute can take over after mount
      const t = setTimeout(() => {
        videoRef.current?.play().catch(() => {
          /* user-gesture required — silent */
        });
      }, 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Stonehenge Trust commercial"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm animate-[fadeIn_220ms_ease-out]"
      style={{
        animation: "modal-fade 220ms ease-out both",
      }}
    >
      <button
        type="button"
        aria-label="Close commercial"
        onClick={onClose}
        className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 flex items-center justify-center text-sh-bone/80 hover:text-sh-bone transition-colors z-10"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
          <path
            d="M4 4l14 14M18 4L4 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl px-4 md:px-6"
      >
        <div className="relative aspect-video w-full bg-black overflow-hidden shadow-[0_30px_120px_-20px_rgba(0,0,0,0.8)]">
          <video
            ref={videoRef}
            src={src}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.28em] text-sh-bone/55 text-center">
          Stonehenge Trust · Commercial · 00:25
        </p>
      </div>

      <style jsx>{`
        @keyframes modal-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
