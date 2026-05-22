"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/customers", label: "Customers" },
  { href: "/suppliers", label: "Suppliers" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-sh-bone/85 backdrop-blur-lg border-b border-sh-stone"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="flex items-center"
            aria-label="Stonehenge Trust — Home"
          >
            <Logo variant="lockup" tone="navy" />
          </Link>

          <nav className="hidden md:flex items-center gap-9">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm tracking-wide transition-colors ${
                    active
                      ? "text-sh-navy"
                      : "text-sh-slate hover:text-sh-navy"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="ml-2 inline-block h-1 w-1 rounded-full bg-sh-olive align-middle" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="ml-3 inline-flex items-center gap-2 px-4 py-2 bg-sh-navy text-sh-bone text-sm tracking-wide hover:bg-sh-navy-ink transition-colors"
            >
              Engage
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M2 6h8m0 0L6.5 2.5M10 6L6.5 9.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="square"
                />
              </svg>
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 -mr-2 text-sh-navy"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {open ? (
                <path
                  d="M4 4l14 14M18 4L4 18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              ) : (
                <path
                  d="M3 7h16M3 15h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-sh-stone bg-sh-bone">
          <nav className="px-5 py-4 flex flex-col gap-1">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-3 text-sm tracking-wide ${
                    active
                      ? "text-sh-navy bg-sh-cream"
                      : "text-sh-slate"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-2 px-4 py-3 bg-sh-navy text-sh-bone text-sm tracking-wide text-center"
            >
              Engage Stonehenge Trust
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
