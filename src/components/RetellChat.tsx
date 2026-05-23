"use client";

import * as React from "react";

type Msg = { role: "user" | "agent" | "system"; content: string };
type Phase = "intake" | "chatting" | "sending" | "sent" | "error";

/**
 * Stonehenge Trust — branded text chat widget.
 * Floats bottom-right; click to open.
 *
 * Phase 1 ("intake") — collects name + email + topic before unlocking chat
 * Phase 2 ("chatting") — text conversation with the Retell agent
 * Phase 3 ("sending") — ends the chat + emails lead+transcript via Resend
 * Phase 4 ("sent") — confirmation
 *
 * Server proxies all Retell calls through /api/retell-chat so the API key
 * never reaches the browser.
 */

const TOPICS = [
  { value: "iso", label: "ISO Management Systems" },
  { value: "acd", label: "ACD Responsible Distribution" },
  { value: "epa", label: "EPA Regulatory Compliance" },
  { value: "supplier", label: "Supplier credentials" },
  { value: "other", label: "Something else" },
];

export function RetellChat() {
  const [open, setOpen] = React.useState(false);
  const [phase, setPhase] = React.useState<Phase>("intake");

  const [name, setName] = React.useState("");
  const [org, setOrg] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [topic, setTopic] = React.useState("iso");

  const [chatId, setChatId] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [draft, setDraft] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, phase]);

  const startChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setError(null);
    setBusy(true);
    try {
      const topicLabel = TOPICS.find((t) => t.value === topic)?.label || topic;
      const res = await fetch("/api/retell-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start" }),
      });
      const data = await res.json();
      if (!res.ok || !data.chat_id) {
        throw new Error(data.error || `start failed (${res.status})`);
      }
      setChatId(data.chat_id);
      setMessages([
        {
          role: "system",
          content: `Connected. You said you're here about ${topicLabel}.`,
        },
        ...(data.greeting
          ? [{ role: "agent" as const, content: data.greeting }]
          : [
              {
                role: "agent" as const,
                content: `Hi ${name.split(" ")[0]}, welcome. Tell me a bit about what you're carrying.`,
              },
            ]),
      ]);
      setPhase("chatting");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start the chat.");
    } finally {
      setBusy(false);
    }
  };

  const sendMessage = async () => {
    const content = draft.trim();
    if (!content || !chatId || busy) return;
    setDraft("");
    setError(null);
    setMessages((m) => [...m, { role: "user", content }]);
    setBusy(true);
    try {
      const res = await fetch("/api/retell-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", chat_id: chatId, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `send failed (${res.status})`);
      if (data.reply) {
        setMessages((m) => [...m, { role: "agent", content: data.reply }]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send message.");
    } finally {
      setBusy(false);
    }
  };

  const endAndSend = async () => {
    if (!chatId) return;
    setError(null);
    setPhase("sending");
    try {
      const topicLabel = TOPICS.find((t) => t.value === topic)?.label || topic;
      const res = await fetch("/api/retell-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "end",
          chat_id: chatId,
          lead: {
            name: name.trim(),
            email: email.trim(),
            org: org.trim() || undefined,
            topic: topicLabel,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `send failed (${res.status})`);
      setPhase("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the lead.");
      setPhase("error");
    }
  };

  const reset = () => {
    setChatId(null);
    setMessages([]);
    setDraft("");
    setError(null);
    setPhase("intake");
  };

  return (
    <>
      {/* Floating action button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close compliance chat" : "Open compliance chat"}
        className="fixed bottom-6 right-6 z-40 group inline-flex items-center gap-3 px-5 py-3.5 bg-sh-navy text-sh-bone shadow-lg hover:bg-sh-navy-ink transition-colors"
      >
        <span className="relative w-8 h-8 flex items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-sh-olive-light/70" />
          <span className="absolute inset-1 rounded-full bg-sh-olive-light/15" />
          {phase === "chatting" ? (
            <span className="relative w-2.5 h-2.5 rounded-full bg-sh-olive-light animate-pulse" />
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M2 3h10v6.5H6L3.5 12V9.5H2z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="miter"
                fill="none"
              />
            </svg>
          )}
        </span>
        <span className="flex flex-col items-start leading-none">
          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-sh-olive-light">
            {phase === "chatting" ? "Live" : "Compliance Chat"}
          </span>
          <span className="font-display text-sm mt-1">
            {phase === "chatting" ? "In progress" : "Ask us anything"}
          </span>
        </span>
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Stonehenge Trust compliance chat"
          className="fixed bottom-24 right-6 z-50 w-[min(94vw,420px)] max-h-[min(78vh,640px)] bg-sh-bone border border-sh-stone-dark shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-sh-stone px-5 py-4 bg-sh-cream">
            <div className="flex flex-col leading-none">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-sh-olive">
                Stonehenge Trust
              </span>
              <span className="font-display text-base text-sh-navy mt-1">
                Compliance Chat
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
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* INTAKE */}
            {phase === "intake" && (
              <form onSubmit={startChat} className="px-5 py-5 space-y-4 overflow-y-auto">
                <p className="text-sh-slate text-sm leading-relaxed">
                  Tell us who you are and we&apos;ll connect you with our compliance
                  agent. The conversation is logged and emailed to our team.
                </p>
                <IntakeField label="Name" value={name} onChange={setName} required />
                <IntakeField label="Organization" value={org} onChange={setOrg} />
                <IntakeField label="Email" value={email} onChange={setEmail} type="email" required />
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-sh-slate mb-1.5">
                    Topic
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-sh-bone border border-sh-stone-dark px-3 py-2.5 text-sh-navy text-sm focus:outline-none focus:border-sh-navy"
                  >
                    {TOPICS.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                {error && (
                  <p className="text-sm text-sh-graphite border border-sh-stone-dark bg-sh-cream p-3">
                    {error.includes("not configured") ? (
                      <>
                        The compliance chat is not yet configured. In the
                        meantime, email us at{" "}
                        <a href="mailto:info@stonehengetrust.com" className="text-sh-navy link-quiet">
                          info@stonehengetrust.com
                        </a>
                        .
                      </>
                    ) : (
                      error
                    )}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={busy || !name.trim() || !email.trim()}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-sh-navy text-sh-bone text-sm tracking-wide hover:bg-sh-navy-ink transition-colors disabled:opacity-50"
                >
                  {busy ? (
                    <>
                      <span className="inline-block w-3 h-3 border border-sh-bone border-t-transparent rounded-full animate-spin" />
                      Connecting&hellip;
                    </>
                  ) : (
                    <>Start chat</>
                  )}
                </button>
              </form>
            )}

            {/* CHATTING */}
            {phase === "chatting" && (
              <>
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
                >
                  {messages.map((m, i) =>
                    m.role === "system" ? (
                      <p
                        key={i}
                        className="font-mono text-[10px] uppercase tracking-[0.22em] text-sh-slate text-center py-1"
                      >
                        {m.content}
                      </p>
                    ) : m.role === "agent" ? (
                      <div key={i} className="flex flex-col items-start max-w-[88%]">
                        <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-sh-olive mb-1">
                          Agent
                        </span>
                        <div className="bg-sh-cream border border-sh-stone-dark px-3.5 py-2.5 text-sm text-sh-graphite whitespace-pre-wrap">
                          {m.content}
                        </div>
                      </div>
                    ) : (
                      <div key={i} className="flex flex-col items-end self-end ml-auto max-w-[88%]">
                        <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-sh-slate mb-1">
                          You
                        </span>
                        <div className="bg-sh-navy text-sh-bone px-3.5 py-2.5 text-sm whitespace-pre-wrap">
                          {m.content}
                        </div>
                      </div>
                    )
                  )}
                  {busy && (
                    <div className="flex items-center gap-2 text-sh-slate">
                      <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-sh-olive">
                        Agent
                      </span>
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-sh-olive-light animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-sh-olive-light animate-pulse [animation-delay:120ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-sh-olive-light animate-pulse [animation-delay:240ms]" />
                      </span>
                    </div>
                  )}
                  {error && (
                    <p className="text-xs text-sh-graphite border border-sh-stone-dark bg-sh-cream p-2">
                      {error}
                    </p>
                  )}
                </div>

                {/* Composer + end */}
                <div className="border-t border-sh-stone px-3 py-3 flex flex-col gap-2 bg-sh-bone">
                  <div className="flex items-end gap-2">
                    <textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder="Type a message&hellip;"
                      rows={2}
                      className="flex-1 resize-none bg-sh-bone border border-sh-stone-dark px-3 py-2 text-sm text-sh-navy placeholder:text-sh-slate-light focus:outline-none focus:border-sh-navy"
                    />
                    <button
                      type="button"
                      onClick={sendMessage}
                      disabled={busy || !draft.trim()}
                      className="px-4 py-2 bg-sh-navy text-sh-bone text-sm hover:bg-sh-navy-ink disabled:opacity-50"
                      aria-label="Send"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2 7h10m0 0L8 3m4 4l-4 4"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="square"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={endAndSend}
                    className="self-end font-mono text-[9px] uppercase tracking-[0.28em] text-sh-slate hover:text-sh-navy"
                  >
                    End chat &amp; send transcript →
                  </button>
                </div>
              </>
            )}

            {/* SENDING */}
            {phase === "sending" && (
              <div className="px-5 py-8 text-center">
                <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-sh-olive">
                  <span className="w-1.5 h-1.5 rounded-full bg-sh-olive animate-pulse" />
                  Delivering transcript&hellip;
                </div>
              </div>
            )}

            {/* SENT */}
            {phase === "sent" && (
              <div className="px-5 py-8 text-center">
                <p className="eyebrow">Received</p>
                <p className="mt-3 font-display text-xl text-sh-navy leading-tight">
                  Thank you. Your conversation has been delivered to our team.
                </p>
                <p className="mt-3 text-sh-slate text-sm">
                  We respond within one business day.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-5 inline-flex px-4 py-2 border border-sh-stone-dark text-sh-navy text-xs uppercase tracking-[0.22em] font-mono hover:bg-sh-cream"
                >
                  Start a new chat
                </button>
              </div>
            )}

            {/* ERROR */}
            {phase === "error" && (
              <div className="px-5 py-8">
                <div className="border border-sh-stone-dark bg-sh-cream p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sh-olive">
                    Not Sent
                  </p>
                  <p className="mt-2 text-sm text-sh-graphite leading-relaxed">
                    {error || "We could not send the transcript."}
                  </p>
                  <p className="mt-2 text-sm text-sh-slate">
                    You can also email us at{" "}
                    <a href="mailto:info@stonehengetrust.com" className="text-sh-navy link-quiet">
                      info@stonehengetrust.com
                    </a>
                    .
                  </p>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-4 w-full inline-flex items-center justify-center px-4 py-2.5 border border-sh-stone-dark text-sh-navy text-sm hover:bg-sh-cream"
                >
                  Try again
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-sh-stone px-5 py-2.5 flex items-center justify-between bg-sh-cream">
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-sh-slate">
              Powered by Retell AI
            </span>
            <a
              href="mailto:info@stonehengetrust.com"
              className="font-mono text-[9px] uppercase tracking-[0.28em] text-sh-olive hover:text-sh-navy"
            >
              Or email us
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function IntakeField({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-sh-slate mb-1.5">
        {label}
        {required && <span className="text-sh-olive ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-sh-bone border border-sh-stone-dark px-3 py-2.5 text-sh-navy text-sm focus:outline-none focus:border-sh-navy"
      />
    </div>
  );
}
