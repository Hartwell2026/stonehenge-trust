import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Payload = {
  name?: string;
  org?: string;
  email?: string;
  phone?: string;
  inquiry?: string;
  message?: string;
  // honeypot — bots fill this, humans don't
  website?: string;
};

const INQUIRY_LABELS: Record<string, string> = {
  iso: "ISO Management Systems",
  acd: "ACD Responsible Distribution",
  epa: "EPA Regulatory Compliance",
  supplier: "Supplier Credentials",
  other: "Other",
};

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toAddr = process.env.LEADS_TO_EMAIL || "info@stonehengetrust.com";
  const fromAddr =
    process.env.LEADS_FROM_EMAIL || "Stonehenge Trust <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Email delivery not configured. Set RESEND_API_KEY in environment.",
        configured: false,
      },
      { status: 503 }
    );
  }

  let body: Payload = {};
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — silently drop bots
  if (body.website && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const org = (body.org || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const inquiry = (body.inquiry || "other").trim();
  const message = (body.message || "").trim();

  if (!name || !org || !email || !message) {
    return NextResponse.json(
      { error: "Name, organization, email, and message are required." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Email address looks invalid." }, { status: 400 });
  }
  if (name.length > 200 || org.length > 200 || email.length > 200 || message.length > 4000) {
    return NextResponse.json({ error: "One or more fields exceed allowed length." }, { status: 400 });
  }

  const practice = INQUIRY_LABELS[inquiry] || INQUIRY_LABELS.other;
  const subject = `[Stonehenge Trust] ${practice} — ${org}`;

  const text = [
    `Practice area: ${practice}`,
    "",
    `Name: ${name}`,
    `Organization: ${org}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    "",
    "Message",
    "-------",
    message,
    "",
    "—",
    `Submitted via the Stonehenge Trust website contact form.`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #2A2E33; max-width: 640px; line-height: 1.55;">
      <p style="font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: #5C6B3E; margin: 0 0 16px;">
        Stonehenge Trust · Scoping Inquiry
      </p>
      <h1 style="font-family: Aldrich, 'Helvetica Neue', sans-serif; font-size: 24px; color: #0F2A44; margin: 0 0 24px;">
        ${esc(practice)}
      </h1>
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; width:100%; border-top: 1px solid #E5E2D8;">
        <tr>
          <td style="padding:14px 0; border-bottom:1px solid #E5E2D8; font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:#5B6470; width:140px; vertical-align:top;">Name</td>
          <td style="padding:14px 0; border-bottom:1px solid #E5E2D8; font-size:14px; color:#0F2A44;">${esc(name)}</td>
        </tr>
        <tr>
          <td style="padding:14px 0; border-bottom:1px solid #E5E2D8; font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:#5B6470; vertical-align:top;">Organization</td>
          <td style="padding:14px 0; border-bottom:1px solid #E5E2D8; font-size:14px; color:#0F2A44;">${esc(org)}</td>
        </tr>
        <tr>
          <td style="padding:14px 0; border-bottom:1px solid #E5E2D8; font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:#5B6470; vertical-align:top;">Email</td>
          <td style="padding:14px 0; border-bottom:1px solid #E5E2D8; font-size:14px; color:#0F2A44;"><a href="mailto:${esc(email)}" style="color:#0F2A44; text-decoration:underline;">${esc(email)}</a></td>
        </tr>
        ${
          phone
            ? `<tr>
                <td style="padding:14px 0; border-bottom:1px solid #E5E2D8; font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:#5B6470; vertical-align:top;">Phone</td>
                <td style="padding:14px 0; border-bottom:1px solid #E5E2D8; font-size:14px; color:#0F2A44;">${esc(phone)}</td>
              </tr>`
            : ""
        }
      </table>
      <div style="margin-top:32px;">
        <p style="font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:#5C6B3E; margin:0 0 12px;">
          What they&rsquo;re carrying
        </p>
        <div style="border-left:2px solid #5C6B3E; padding:8px 0 8px 18px; font-size:15px; color:#2A2E33; white-space:pre-wrap;">
          ${esc(message).replace(/\n/g, "<br>")}
        </div>
      </div>
      <hr style="border:0; border-top:1px solid #E5E2D8; margin:32px 0 16px;">
      <p style="font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:#8C95A0; margin:0;">
        Submitted via stonehengetrust.com
      </p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromAddr,
      to: [toAddr],
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Email service returned an error." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown server error." },
      { status: 500 }
    );
  }
}
