import Link from "next/link";
import { Logo } from "./Logo";

const SERVICES = [
  "ACD Responsible Distribution",
  "ISO 9001 · 14001 · 45001",
  "EPA Regulatory Compliance",
  "EHS&S Training",
  "Third-Party Verification Readiness",
];

const COMPANY = [
  { href: "/about", label: "About" },
  { href: "/customers", label: "Customers" },
  { href: "/suppliers", label: "Suppliers" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-sh-navy-ink text-sh-bone relative overflow-hidden">
      <div className="absolute inset-0 fine-grid-dark opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          {/* Brand block */}
          <div className="md:col-span-5">
            <Logo variant="lockup" tone="bone" />
            <p className="mt-6 max-w-sm text-sh-slate-light text-sm leading-relaxed">
              A boutique EHS&amp;S practice serving chemical distributors,
              warehouses, and carriers. ACD Responsible Distribution, ISO, and
              EPA work that holds under verifier, regulator, and time.
            </p>
            <div className="mt-8">
              <p className="eyebrow" style={{ color: "var(--sh-olive-light)" }}>
                Contact
              </p>
              <a
                href="mailto:hello@stonehengetrust.com"
                className="mt-2 inline-block text-sh-bone link-quiet text-sm"
              >
                hello@stonehengetrust.com
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow" style={{ color: "var(--sh-olive-light)" }}>
              Practice
            </p>
            <ul className="mt-4 space-y-3">
              {SERVICES.map((s) => (
                <li key={s} className="text-sm text-sh-slate-light">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow" style={{ color: "var(--sh-olive-light)" }}>
              Firm
            </p>
            <ul className="mt-4 space-y-3">
              {COMPANY.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-sm text-sh-slate-light hover:text-sh-bone transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow" style={{ color: "var(--sh-olive-light)" }}>
              Jurisdictions
            </p>
            <ul className="mt-4 space-y-3 text-sm text-sh-slate-light">
              <li>EPA · TSCA · RCRA · CAA</li>
              <li>OSHA · DOT Hazmat</li>
              <li>ACD · Alliance for Chemical Distribution</li>
            </ul>
          </div>
        </div>

        <hr className="mt-14 border-0 h-px bg-sh-navy-mute/40" />

        <div className="mt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-sh-slate-light/80">
          <p className="font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} Stonehenge Trust LLC. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-widest">
            Boutique · ISO · ACD · EPA
          </p>
        </div>
      </div>
    </footer>
  );
}
