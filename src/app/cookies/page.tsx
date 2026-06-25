import type { Metadata } from "next";
import { LegalLayout } from "@/components/consent/LegalLayout";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Stonehenge Trust uses cookies and similar technologies, and how you can control your choices.",
};

export default function CookiePolicyPage() {
  return (
    <LegalLayout kicker="Legal" title="Cookie Policy" lastUpdated="June 25, 2026">
      <p>
        This Cookie Policy explains how Stonehenge Trust (&ldquo;Stonehenge Trust&rdquo;,
        &ldquo;we&rdquo;, &ldquo;our&rdquo;) uses cookies and similar technologies on
        stonehengetrust.com. It should be read alongside our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>1. What cookies are</h2>
      <p>
        Cookies are small text files placed on your device when you visit a website.
        Similar technologies — such as local storage — work in comparable ways. They let
        a site remember your preferences and improve performance.
      </p>

      <h2>2. Our approach</h2>
      <p>
        We keep tracking to a minimum. Stonehenge Trust does{" "}
        <strong>not</strong> use third-party advertising or cross-site tracking cookies.
        Where we measure traffic, we use privacy-friendly, cookieless tools. We tailor the
        notice you see to your region:
      </p>
      <ul>
        <li>
          <strong>European Economic Area, United Kingdom &amp; Switzerland</strong> — any
          non-essential cookies are <strong>off by default</strong> and would load only
          after you accept them.
        </li>
        <li>
          <strong>United States &amp; elsewhere</strong> — you can decline non-essential
          cookies at any time using the banner or the button below.
        </li>
      </ul>
      <p>You can change your choice at any time:</p>
      <p>
        <CookieSettingsButton />
      </p>

      <h2>3. Cookies and technologies we use</h2>

      <h3>Strictly necessary (always on)</h3>
      <ul>
        <li>
          <code>sht-region</code> — a short-lived cookie recording whether you are in a
          strict-consent region, so we can show the correct notice.
        </li>
        <li>
          <code>stonehenge-trust-consent</code> — stored in your browser to remember your
          cookie choice so we don&rsquo;t ask again every visit.
        </li>
      </ul>

      <h3>Analytics (cookieless)</h3>
      <ul>
        <li>
          <strong>Vercel Web Analytics &amp; Speed Insights</strong> — privacy-friendly,{" "}
          <strong>cookieless</strong> performance and traffic measurement. They do not set
          cookies or identify you individually.
        </li>
      </ul>
      <p>
        If we introduce any consent-based analytics in future, it will load only after you
        opt in (EEA/UK/CH) or unless you opt out (elsewhere), exactly as described above.
      </p>

      <h2>4. The AI assistant</h2>
      <p>
        Our website assistant (powered by Retell AI) processes what you type or say during
        a conversation to respond and route your inquiry. See our{" "}
        <a href="/privacy">Privacy Policy</a> for how that information is handled.
      </p>

      <h2>5. Managing cookies in your browser</h2>
      <p>
        Most browsers also let you block or delete cookies through their settings. For more,
        see{" "}
        <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer">
          allaboutcookies.org
        </a>
        .
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions about cookies? Email us at{" "}
        <a href="mailto:info@stonehengetrust.com">info@stonehengetrust.com</a>.
      </p>
    </LegalLayout>
  );
}
