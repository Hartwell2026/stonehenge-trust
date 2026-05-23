"use client";

import * as React from "react";
import { Reveal } from "@/components/Motion";

const INQUIRY = [
  { value: "iso", label: "ISO Management Systems" },
  { value: "acd", label: "ACD Responsible Distribution" },
  { value: "epa", label: "EPA Regulatory Compliance" },
  { value: "supplier", label: "Supplier Credentials" },
  { value: "other", label: "Other" },
];

type Status = "idle" | "submitting" | "sent" | "error";

export function ContactPage() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    setErrorMsg(null);
    setStatus("submitting");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      org: String(fd.get("org") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      inquiry: String(fd.get("inquiry") || "other"),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          data?.error ||
            `Could not submit (HTTP ${res.status}). Please email us directly.`
        );
        return;
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Network error. Please try again."
      );
    }
  };
  const sent = status === "sent";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sh-bone border-b border-sh-stone">
        <div className="absolute inset-0 fine-grid opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-20 md:pt-28 pb-12 md:pb-16">
          <Reveal>
            <p className="eyebrow">Engage the Firm</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-[2.4rem] leading-[1.06] md:text-[4.5rem] md:leading-[1.0] tracking-tight text-sh-navy max-w-4xl">
              Tell us<br />
              <span className="font-normal text-sh-olive-deep">what you&apos;re carrying.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-8 max-w-2xl text-base md:text-lg text-sh-slate leading-relaxed">
              A scoping call takes thirty minutes. If we are the right firm for
              the work, we will say so. If we are not, we will tell you who is.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form + details */}
      <section className="bg-sh-bone">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            {/* Form */}
            <div className="md:col-span-7">
              <Reveal>
                <form
                  onSubmit={onSubmit}
                  className="bg-sh-cream border border-sh-stone-dark p-7 md:p-10 relative"
                >
                  <div className="absolute inset-0 paper-grain pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-baseline justify-between border-b border-sh-stone-dark pb-4 mb-7">
                      <span className="font-mono text-xs uppercase tracking-[0.22em] text-sh-olive">
                        Scoping Inquiry
                      </span>
                      <span className="font-mono text-xs text-sh-slate">/01</span>
                    </div>

                    {sent ? (
                      <div className="py-10 text-center">
                        <p className="eyebrow">Received</p>
                        <p className="mt-4 font-display text-2xl md:text-3xl text-sh-navy leading-tight">
                          Thank you. We will respond within one business day.
                        </p>
                        <p className="mt-4 text-sh-slate text-sm">
                          For urgent regulatory matters, write directly to{" "}
                          <a
                            href="mailto:info@stonehengetrust.com"
                            className="text-sh-navy link-quiet"
                          >
                            info@stonehengetrust.com
                          </a>
                          .
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Honeypot — hidden from humans, bots fill it */}
                        <div
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            left: "-9999px",
                            top: "-9999px",
                            width: 1,
                            height: 1,
                            overflow: "hidden",
                          }}
                        >
                          <label htmlFor="website">Website</label>
                          <input
                            id="website"
                            name="website"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                          />
                        </div>

                        <Field label="Name" name="name" required />
                        <Field label="Organization" name="org" required />
                        <Field label="Email" name="email" type="email" required />
                        <Field label="Phone (optional)" name="phone" type="tel" />

                        <div>
                          <label
                            htmlFor="inquiry"
                            className="block font-mono text-xs uppercase tracking-[0.22em] text-sh-slate mb-2"
                          >
                            Practice Area
                          </label>
                          <select
                            id="inquiry"
                            name="inquiry"
                            className="w-full bg-sh-bone border border-sh-stone-dark px-4 py-3 text-sh-navy font-sans text-sm focus:outline-none focus:border-sh-navy transition-colors"
                            defaultValue="iso"
                          >
                            {INQUIRY.map((i) => (
                              <option key={i.value} value={i.value}>
                                {i.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="message"
                            className="block font-mono text-xs uppercase tracking-[0.22em] text-sh-slate mb-2"
                          >
                            What you&apos;re carrying
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={5}
                            required
                            placeholder="Facility type, jurisdictions, current obligations, deadlines, prior findings, anything relevant."
                            className="w-full bg-sh-bone border border-sh-stone-dark px-4 py-3 text-sh-navy font-sans text-sm placeholder:text-sh-slate-light focus:outline-none focus:border-sh-navy transition-colors resize-none"
                          />
                        </div>

                        {status === "error" && errorMsg && (
                          <div
                            role="alert"
                            className="border border-sh-stone-dark bg-sh-bone p-4"
                          >
                            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sh-olive">
                              Not Sent
                            </p>
                            <p className="mt-2 text-sm text-sh-graphite leading-relaxed">
                              {errorMsg}
                            </p>
                            <p className="mt-2 text-sm text-sh-slate">
                              You can also email us directly at{" "}
                              <a
                                href="mailto:info@stonehengetrust.com"
                                className="text-sh-navy link-quiet"
                              >
                                info@stonehengetrust.com
                              </a>
                              .
                            </p>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-sh-navy text-sh-bone text-sm tracking-wide hover:bg-sh-navy-ink transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {status === "submitting" ? (
                            <>
                              <span className="inline-block w-3 h-3 border border-sh-bone border-t-transparent rounded-full animate-spin" />
                              Sending&hellip;
                            </>
                          ) : (
                            <>
                              Submit inquiry
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                                <path
                                  d="M2 7h10m0 0L8 3m4 4l-4 4"
                                  stroke="currentColor"
                                  strokeWidth="1.3"
                                  strokeLinecap="square"
                                />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </Reveal>
            </div>

            {/* Details */}
            <div className="md:col-span-5 space-y-12">
              <Reveal>
                <div>
                  <p className="eyebrow">Direct</p>
                  <p className="mt-4 font-display text-2xl text-sh-navy">
                    <a
                      href="mailto:info@stonehengetrust.com"
                      className="link-quiet"
                    >
                      info@stonehengetrust.com
                    </a>
                  </p>
                  <p className="mt-2 text-sh-slate text-sm">
                    Responses within one business day.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div>
                  <p className="eyebrow">For Suppliers</p>
                  <p className="mt-4 font-display text-2xl text-sh-navy">
                    <a
                      href="mailto:suppliers@stonehengetrust.com"
                      className="link-quiet"
                    >
                      suppliers@stonehengetrust.com
                    </a>
                  </p>
                  <p className="mt-2 text-sh-slate text-sm">
                    Credential submissions and onboarding.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div>
                  <p className="eyebrow">Office Hours</p>
                  <ul className="mt-4 space-y-2 text-sh-graphite">
                    <li className="flex justify-between border-b border-sh-stone pb-2">
                      <span className="text-sm">Monday – Friday</span>
                      <span className="font-mono text-xs text-sh-slate">08:00 – 18:00 CT</span>
                    </li>
                    <li className="flex justify-between border-b border-sh-stone pb-2">
                      <span className="text-sm">Saturday</span>
                      <span className="font-mono text-xs text-sh-slate">By appointment</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm">Sunday</span>
                      <span className="font-mono text-xs text-sh-slate">Closed</span>
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="border-t border-sh-stone pt-8">
                  <p className="eyebrow">A Note on Engagement</p>
                  <p className="mt-4 text-sh-slate text-sm leading-relaxed">
                    We do not bill scoping calls. If we proceed, the engagement
                    begins with a fixed-scope letter and a named partner. We do
                    not run open-hours arrangements.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-mono text-xs uppercase tracking-[0.22em] text-sh-slate mb-2"
      >
        {label}
        {required && <span className="text-sh-olive ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-sh-bone border border-sh-stone-dark px-4 py-3 text-sh-navy font-sans text-sm focus:outline-none focus:border-sh-navy transition-colors"
      />
    </div>
  );
}
