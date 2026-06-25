import type { Metadata } from "next";
import { LegalLayout } from "@/components/consent/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Stonehenge Trust collects, uses, and protects information from visitors and clients.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout kicker="Legal" title="Privacy Policy" lastUpdated="June 25, 2026">
      <p>
        Stonehenge Trust (&ldquo;Stonehenge Trust&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;)
        respects your privacy. This policy explains what we collect when you visit
        stonehengetrust.com, interact with our website assistant, or contact us, and how we
        use it.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong>Contact information</strong> — name, organization, email, phone, and
          details you provide via our contact form or the website assistant.
        </li>
        <li>
          <strong>Conversation data</strong> — text and voice transcripts of interactions
          with our AI assistant, so our team can follow up with context.
        </li>
        <li>
          <strong>Usage and device data</strong> — pages visited, referral source,
          approximate region, and browser type, collected via cookieless analytics.
        </li>
        <li>
          <strong>Cookies and similar technologies</strong> — see our{" "}
          <a href="/cookies">Cookie Policy</a>.
        </li>
      </ul>

      <h2>2. How we use your information</h2>
      <ul>
        <li>To respond to inquiries and provide our compliance advisory services.</li>
        <li>To follow up on conversations captured through our assistant or forms.</li>
        <li>To operate, secure, and improve the website.</li>
        <li>To comply with our legal and regulatory obligations.</li>
      </ul>

      <h2>3. Service providers we use</h2>
      <ul>
        <li><strong>Retell AI</strong> — powers our website chat/voice assistant; processes the conversation while it happens.</li>
        <li><strong>Resend</strong> — delivers transactional and lead-notification emails.</li>
        <li><strong>Vercel</strong> — hosts the website and provides cookieless analytics.</li>
      </ul>

      <h2>4. Legal basis (EEA / UK visitors)</h2>
      <p>
        If you are in the European Economic Area or the United Kingdom, we rely on your
        consent, the necessity of processing to take steps at your request or perform a
        contract, or our legitimate interest in operating our business, as appropriate.
      </p>

      <h2>5. Your rights</h2>
      <p>Depending on your jurisdiction, you may have the right to:</p>
      <ul>
        <li>Access, correct, or delete your personal information.</li>
        <li>Object to or restrict certain processing.</li>
        <li>Withdraw consent where we rely on it.</li>
        <li>Lodge a complaint with your local data protection authority.</li>
      </ul>

      <h2>6. Data retention &amp; security</h2>
      <p>
        We retain information only as long as needed to provide our services or meet legal
        obligations, and we use industry-standard security measures (encryption in transit,
        access controls) to protect it.
      </p>

      <h2>7. Changes &amp; contact</h2>
      <p>
        We may update this policy periodically; the &ldquo;Last updated&rdquo; date reflects
        the latest revision. Questions or requests? Email{" "}
        <a href="mailto:info@stonehengetrust.com">info@stonehengetrust.com</a>.
      </p>
    </LegalLayout>
  );
}
