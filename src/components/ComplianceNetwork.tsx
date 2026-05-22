"use client";

import * as React from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  pulsePhase: number;
};

/**
 * Compliance Network — a subtle drifting node-and-link constellation
 * rendered on a Canvas2D layer. Designed to sit behind the dark Principles
 * band as a backdrop that suggests "compliance held in a connected network."
 *
 * Brand notes:
 *   • Olive-light dots, navy-light line strokes — never flashy
 *   • Drifts on its own; gently attracts to the mouse for tactile feedback
 *   • Honors prefers-reduced-motion (renders static snapshot then stops)
 *   • Pauses when the section is offscreen (cheap)
 */
export function ComplianceNetwork({
  density = 0.00008, // nodes per pixel-squared — tuned for institutional density
  maxLinkDist = 160,
  className,
}: {
  density?: number;
  maxLinkDist?: number;
  className?: string;
}) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const stateRef = React.useRef<{
    nodes: Node[];
    mx: number;
    my: number;
    hasMouse: boolean;
    raf: number;
    visible: boolean;
    dpr: number;
    w: number;
    h: number;
  }>({ nodes: [], mx: 0, my: 0, hasMouse: false, raf: 0, visible: true, dpr: 1, w: 0, h: 0 });

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const s = stateRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      s.dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.w = rect.width;
      s.h = rect.height;
      canvas.width = Math.floor(rect.width * s.dpr);
      canvas.height = Math.floor(rect.height * s.dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);

      // Re-seed nodes proportional to area
      const count = Math.max(40, Math.min(140, Math.round(rect.width * rect.height * density)));
      s.nodes = new Array(count).fill(0).map(() => {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          pulsePhase: Math.random() * Math.PI * 2,
        };
      });
    };

    const onPointer = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      s.mx = e.clientX - rect.left;
      s.my = e.clientY - rect.top;
      s.hasMouse = true;
    };
    const onLeave = () => { s.hasMouse = false; };

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        s.visible = e?.isIntersecting ?? true;
      },
      { rootMargin: "200px" }
    );
    io.observe(wrap);

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    wrap.addEventListener("pointermove", onPointer, { passive: true });
    wrap.addEventListener("pointerleave", onLeave);

    let t = 0;
    const draw = () => {
      if (!s.visible) {
        s.raf = requestAnimationFrame(draw);
        return;
      }
      t += 1;
      ctx.clearRect(0, 0, s.w, s.h);

      // Update positions — slow drift around base point with optional mouse attract
      for (const n of s.nodes) {
        n.x += n.vx;
        n.y += n.vy;

        // Pull back toward baseline so nodes don't wander off
        n.x += (n.baseX - n.x) * 0.0028;
        n.y += (n.baseY - n.y) * 0.0028;

        if (s.hasMouse) {
          const dx = s.mx - n.x;
          const dy = s.my - n.y;
          const dsq = dx * dx + dy * dy;
          if (dsq < 220 * 220) {
            const f = 1 - dsq / (220 * 220);
            n.x += dx * 0.004 * f;
            n.y += dy * 0.004 * f;
          }
        }
      }

      // Draw links — only between near nodes
      ctx.lineWidth = 1;
      const maxSq = maxLinkDist * maxLinkDist;
      for (let i = 0; i < s.nodes.length; i++) {
        const a = s.nodes[i];
        for (let j = i + 1; j < s.nodes.length; j++) {
          const b = s.nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dsq = dx * dx + dy * dy;
          if (dsq < maxSq) {
            const alpha = (1 - Math.sqrt(dsq) / maxLinkDist) * 0.22;
            // Slight olive tint when near mouse
            if (s.hasMouse) {
              const mxa = s.mx - (a.x + b.x) / 2;
              const mya = s.my - (a.y + b.y) / 2;
              const mdsq = mxa * mxa + mya * mya;
              if (mdsq < 200 * 200) {
                const boost = 1 - mdsq / (200 * 200);
                ctx.strokeStyle = `rgba(138, 153, 112, ${(alpha + boost * 0.25).toFixed(3)})`;
              } else {
                ctx.strokeStyle = `rgba(207, 215, 195, ${alpha.toFixed(3)})`;
              }
            } else {
              ctx.strokeStyle = `rgba(207, 215, 195, ${alpha.toFixed(3)})`;
            }
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes — olive dots with gentle breath
      for (const n of s.nodes) {
        const pulse = 0.55 + 0.45 * Math.sin(t * 0.018 + n.pulsePhase);
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4 + pulse * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(178, 192, 144, ${(0.42 + pulse * 0.35).toFixed(3)})`;
        ctx.fill();
      }

      if (!reduced) s.raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      // One static frame
      draw();
    } else {
      s.raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(s.raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onPointer);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [density, maxLinkDist]);

  return (
    <div
      ref={wrapRef}
      className={className}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
