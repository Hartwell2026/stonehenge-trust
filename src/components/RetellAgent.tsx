"use client";

import * as React from "react";
import { RetellWebClient } from "retell-client-js-sdk";

type CallState = "idle" | "connecting" | "live" | "error" | "ended";

/**
 * Brand-aligned Retell voice-agent widget.
 * Floats bottom-right; click to open panel; click "Start call" to talk to the agent.
 *
 * Setup:
 *   1. Create a Retell agent at https://dashboard.retellai.com
 *   2. Add RETELL_API_KEY (server) and NEXT_PUBLIC_RETELL_AGENT_ID (public) to .env.local
 *   3. Restart `next start`
 *
 * If env vars are missing, the widget opens to a clean "Configure Retell" panel
 * instead of erroring out.
 */
export function RetellAgent() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<CallState>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [muted, setMuted] = React.useState(false);
  const clientRef = React.useRef<RetellWebClient | null>(null);

  React.useEffect(() => {
    const c = new RetellWebClient();
    clientRef.current = c;

    c.on("call_started", () => setState("live"));
    c.on("call_ended", () => setState("ended"));
    c.on("error", (e: unknown) => {
      setState("error");
      setError(e instanceof Error ? e.message : String(e));
    });

    return () => {
      try {
        c.stopCall();
      } catch {
        /* noop */
      }
    };
  }, []);

  const startCall = async () => {
    setError(null);
    setState("connecting");
    try {
      const res = await fetch("/api/retell-token", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setState("error");
        setError(data.error || `Server returned ${res.status}`);
        return;
      }
      await clientRef.current?.startCall({ accessToken: data.accessToken });
    } catch (e) {
      setState("error");
      setError(e instanceof Error ? e.message : "Unknown error");
    }
  };

  const endCall = () => {
    try {
      clientRef.current?.stopCall();
    } catch {
      /* noop */
    }
    setState("ended");
  };

  const toggleMute = () => {
    const c = clientRef.current;
    if (!c) return;
    if (muted) {
      c.unmute();
      setMuted(false);
    } else {
      c.mute();
      setMuted(true);
    }
  };

  return (
    <>
      {/* Floating action button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close compliance agent" : "Open compliance agent"}
        className="fixed bottom-6 right-6 z-40 group inline-flex items-center gap-3 px-5 py-3.5 bg-sh-navy text-sh-bone shadow-lg hover:bg-sh-navy-ink transition-colors"
      >
        <span className="relative w-8 h-8 flex items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-sh-olive-light/70" />
          <span className="absolute inset-1 rounded-full bg-sh-olive-light/15" />
          {state === "live" ? (
            <span className="relative w-2.5 h-2.5 rounded-full bg-sh-olive-light animate-pulse" />
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M7 1.5a2.2 2.2 0 0 0-2.2 2.2v3.3a2.2 2.2 0 1 0 4.4 0V3.7A2.2 2.2 0 0 0 7 1.5Zm-4 5.5a4 4 0 0 0 8 0M7 11v1.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="square"
              />
            </svg>
          )}
        </span>
        <span className="flex flex-col items-start leading-none">
          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-sh-olive-light">
            {state === "live" ? "Live" : "Compliance Agent"}
          </span>
          <span className="font-display text-sm mt-1">
            {state === "live" ? "On call" : "Speak with us"}
          </span>
        </span>
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Stonehenge Trust compliance agent"
          className="fixed bottom-24 right-6 z-50 w-[min(92vw,380px)] bg-sh-bone border border-sh-stone-dark shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-sh-stone px-5 py-4 bg-sh-cream">
            <div className="flex flex-col leading-none">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-sh-olive">
                Stonehenge Trust
              </span>
              <span className="font-display text-base text-sh-navy mt-1">
                Compliance Agent
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="p-1.5 text-sh-slate hover:text-sh-navy transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 3l8 8M11 3L3 11"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="square"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-6">
            {state === "idle" && (
              <>
                <p className="text-sh-slate text-sm leading-relaxed">
                  Talk with a voice agent trained on Stonehenge Trust&apos;s
                  practice — ACD Responsible Distribution, ISO, EPA. Use the
                  microphone for a short live conversation about your needs.
                </p>
                <button
                  type="button"
                  onClick={startCall}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-sh-navy text-sh-bone text-sm tracking-wide hover:bg-sh-navy-ink transition-colors"
                >
                  Start call
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path
                      d="M2 6h8m0 0L6.5 2.5M10 6L6.5 9.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="square"
                    />
                  </svg>
                </button>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-sh-slate-light text-center">
                  Browser microphone required · No recording stored
                </p>
              </>
            )}

            {state === "connecting" && (
              <div className="py-6 text-center">
                <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-sh-olive">
                  <span className="w-1.5 h-1.5 rounded-full bg-sh-olive animate-pulse" />
                  Connecting…
                </div>
              </div>
            )}

            {state === "live" && (
              <>
                <div className="flex items-center justify-center gap-2 py-3">
                  <span className="w-2 h-2 rounded-full bg-sh-olive-light animate-pulse" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-sh-olive">
                    Live · Speak now
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 border border-sh-stone-dark text-sh-navy text-sm hover:bg-sh-cream transition-colors"
                  >
                    {muted ? "Unmute" : "Mute"}
                  </button>
                  <button
                    type="button"
                    onClick={endCall}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-sh-navy text-sh-bone text-sm hover:bg-sh-navy-ink transition-colors"
                  >
                    End call
                  </button>
                </div>
              </>
            )}

            {state === "ended" && (
              <div className="py-4 text-center">
                <p className="font-display text-base text-sh-navy">
                  Call ended.
                </p>
                <p className="mt-2 text-sh-slate text-sm">
                  Thank you. A team member will follow up by email.
                </p>
                <button
                  type="button"
                  onClick={() => setState("idle")}
                  className="mt-5 inline-flex items-center justify-center px-5 py-2.5 border border-sh-stone-dark text-sh-navy text-sm hover:bg-sh-cream transition-colors"
                >
                  Start another call
                </button>
              </div>
            )}

            {state === "error" && (
              <div className="py-3">
                <div className="border border-sh-stone-dark bg-sh-cream p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sh-olive">
                    Not Connected
                  </p>
                  <p className="mt-2 text-sh-slate text-sm leading-relaxed">
                    {error?.includes("not configured") ? (
                      <>
                        The Retell voice agent is not yet configured. Set{" "}
                        <code className="font-mono text-xs bg-sh-bone px-1 py-0.5">
                          RETELL_API_KEY
                        </code>{" "}
                        and{" "}
                        <code className="font-mono text-xs bg-sh-bone px-1 py-0.5">
                          NEXT_PUBLIC_RETELL_AGENT_ID
                        </code>{" "}
                        in <code className="font-mono text-xs">.env.local</code>,
                        then restart the server.
                      </>
                    ) : (
                      error || "Could not start the call."
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setState("idle");
                  }}
                  className="mt-4 w-full inline-flex items-center justify-center px-5 py-2.5 border border-sh-stone-dark text-sh-navy text-sm hover:bg-sh-cream transition-colors"
                >
                  Back
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-sh-stone px-5 py-3 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-sh-slate">
              Powered by Retell AI
            </span>
            <a
              href="mailto:hello@stonehengetrust.com"
              className="font-mono text-[9px] uppercase tracking-[0.28em] text-sh-olive hover:text-sh-navy transition-colors"
            >
              Or email us
            </a>
          </div>
        </div>
      )}
    </>
  );
}
