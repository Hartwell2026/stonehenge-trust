import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Single endpoint that proxies the Retell Chat API and handles lead delivery.
 * Actions are dispatched via the `action` field on the request body.
 *
 *   POST { action: "start" }
 *     → calls Retell /create-chat, returns { chat_id, message }
 *
 *   POST { action: "send", chat_id, content }
 *     → calls Retell /create-chat-completion, returns { messages }
 *
 *   POST { action: "end", chat_id, lead: { name, email, org? } }
 *     → calls Retell /end-chat + /get-chat
 *     → emails the transcript + lead via Resend
 *     → returns { ok: true }
 *
 * Env required:
 *   RETELL_API_KEY                — server-only
 *   NEXT_PUBLIC_RETELL_AGENT_ID   — public chat agent ID
 *   RESEND_API_KEY                — to email the lead
 *   LEADS_TO_EMAIL                — where leads go
 *   LEADS_FROM_EMAIL              — Resend "from"
 */

const RETELL_BASE = "https://api.retellai.com";

type StartReq = { action: "start" };
type SendReq = { action: "send"; chat_id: string; content: string };
type EndReq = {
  action: "end";
  chat_id: string;
  lead: { name: string; email: string; org?: string; phone?: string; topic?: string };
};
type Body = StartReq | SendReq | EndReq;

type RetellMessage = {
  role: "user" | "agent" | "tool_call_invocation" | "tool_call_result";
  content?: string;
  message_id?: string;
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

async function retell(path: string, body: object, apiKey: string) {
  return fetch(`${RETELL_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

async function retellGet(path: string, apiKey: string) {
  return fetch(`${RETELL_BASE}${path}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
    cache: "no-store",
  });
}

export async function POST(req: Request) {
  const retellKey = process.env.RETELL_API_KEY;
  const agentId = process.env.NEXT_PUBLIC_RETELL_AGENT_ID;

  if (!retellKey || !agentId) {
    return NextResponse.json(
      {
        error:
          "Retell chat not configured. Set RETELL_API_KEY and NEXT_PUBLIC_RETELL_AGENT_ID.",
        configured: false,
      },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // ─── START ───────────────────────────────────────────────────
  if (body.action === "start") {
    try {
      const res = await retell("/create-chat", { agent_id: agentId }, retellKey);
      if (!res.ok) {
        const t = await res.text();
        return NextResponse.json(
          { error: `Retell create-chat ${res.status}: ${t.slice(0, 200)}` },
          { status: 502 }
        );
      }
      const data = (await res.json()) as {
        chat_id?: string;
        message_with_tool_calls?: RetellMessage[];
      };
      if (!data.chat_id) {
        return NextResponse.json({ error: "No chat_id from Retell." }, { status: 502 });
      }
      // Extract first agent greeting if present
      const greet =
        (data.message_with_tool_calls || [])
          .filter((m) => m.role === "agent" && m.content)
          .pop()?.content || null;
      return NextResponse.json({ chat_id: data.chat_id, greeting: greet });
    } catch (e) {
      return NextResponse.json(
        { error: e instanceof Error ? e.message : "Unknown error" },
        { status: 500 }
      );
    }
  }

  // ─── SEND ────────────────────────────────────────────────────
  if (body.action === "send") {
    const content = (body.content || "").trim();
    if (!body.chat_id || !content) {
      return NextResponse.json(
        { error: "chat_id and content required." },
        { status: 400 }
      );
    }
    try {
      const res = await retell(
        "/create-chat-completion",
        { chat_id: body.chat_id, content },
        retellKey
      );
      if (!res.ok) {
        const t = await res.text();
        return NextResponse.json(
          { error: `Retell completion ${res.status}: ${t.slice(0, 200)}` },
          { status: 502 }
        );
      }
      const data = (await res.json()) as {
        messages?: RetellMessage[];
      };
      // Return only the assistant messages from this turn
      const reply = (data.messages || [])
        .filter((m) => m.role === "agent" && m.content)
        .map((m) => m.content!)
        .join("\n\n");
      return NextResponse.json({ reply });
    } catch (e) {
      return NextResponse.json(
        { error: e instanceof Error ? e.message : "Unknown error" },
        { status: 500 }
      );
    }
  }

  // ─── END + EMAIL LEAD ────────────────────────────────────────
  if (body.action === "end") {
    const { chat_id, lead } = body;
    if (!chat_id) {
      return NextResponse.json({ error: "chat_id required." }, { status: 400 });
    }
    if (!lead?.name || !lead?.email || !isEmail(lead.email)) {
      return NextResponse.json(
        { error: "Lead requires a name and a valid email." },
        { status: 400 }
      );
    }

    // 1. End the chat (ignore failure — chat may have already ended)
    try {
      await retell("/end-chat", { chat_id }, retellKey);
    } catch {
      /* tolerated */
    }

    // 2. Fetch the chat for transcript + analysis
    let transcript = "";
    let summary = "";
    try {
      const res = await retellGet(`/get-chat/${chat_id}`, retellKey);
      if (res.ok) {
        const data = (await res.json()) as {
          transcript?: string;
          message_with_tool_calls?: RetellMessage[];
          chat_analysis?: { chat_summary?: string };
        };
        transcript =
          data.transcript ||
          (data.message_with_tool_calls || [])
            .filter((m) => (m.role === "user" || m.role === "agent") && m.content)
            .map((m) => `${m.role === "agent" ? "Agent" : "Visitor"}: ${m.content}`)
            .join("\n\n");
        summary = data.chat_analysis?.chat_summary || "";
      }
    } catch {
      /* tolerated */
    }

    // 3. Email the lead via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const toAddr = process.env.LEADS_TO_EMAIL || "hello@stonehengetrust.com";
    const fromAddr =
      process.env.LEADS_FROM_EMAIL || "Stonehenge Trust <onboarding@resend.dev>";

    if (!resendKey) {
      return NextResponse.json(
        { error: "Email delivery not configured." },
        { status: 503 }
      );
    }

    const subject = `[Stonehenge Trust] Chat lead — ${lead.org || lead.name}`;
    const text = [
      `New chat lead from the Stonehenge Trust website.`,
      "",
      `Name:           ${lead.name}`,
      lead.org ? `Organization:   ${lead.org}` : null,
      `Email:          ${lead.email}`,
      lead.phone ? `Phone:          ${lead.phone}` : null,
      lead.topic ? `Topic:          ${lead.topic}` : null,
      "",
      summary ? `Summary\n-------\n${summary}\n` : "",
      "Transcript",
      "----------",
      transcript || "(no transcript available)",
    ]
      .filter((l) => l !== null)
      .join("\n");

    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#2A2E33;max-width:680px;line-height:1.55;">
        <p style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#5C6B3E;margin:0 0 12px;">
          Stonehenge Trust · Chat Lead
        </p>
        <h1 style="font-family:Aldrich,'Helvetica Neue',sans-serif;font-size:22px;color:#0F2A44;margin:0 0 20px;">
          ${esc(lead.org || lead.name)}
        </h1>
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;border-top:1px solid #E5E2D8;">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #E5E2D8;font-family:monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#5B6470;width:130px;vertical-align:top;">Name</td>
            <td style="padding:12px 0;border-bottom:1px solid #E5E2D8;font-size:14px;color:#0F2A44;">${esc(lead.name)}</td>
          </tr>
          ${
            lead.org
              ? `<tr>
                  <td style="padding:12px 0;border-bottom:1px solid #E5E2D8;font-family:monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#5B6470;vertical-align:top;">Organization</td>
                  <td style="padding:12px 0;border-bottom:1px solid #E5E2D8;font-size:14px;color:#0F2A44;">${esc(lead.org)}</td>
                </tr>`
              : ""
          }
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #E5E2D8;font-family:monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#5B6470;vertical-align:top;">Email</td>
            <td style="padding:12px 0;border-bottom:1px solid #E5E2D8;font-size:14px;color:#0F2A44;"><a href="mailto:${esc(lead.email)}" style="color:#0F2A44;">${esc(lead.email)}</a></td>
          </tr>
          ${
            lead.phone
              ? `<tr>
                  <td style="padding:12px 0;border-bottom:1px solid #E5E2D8;font-family:monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#5B6470;vertical-align:top;">Phone</td>
                  <td style="padding:12px 0;border-bottom:1px solid #E5E2D8;font-size:14px;color:#0F2A44;">${esc(lead.phone)}</td>
                </tr>`
              : ""
          }
          ${
            lead.topic
              ? `<tr>
                  <td style="padding:12px 0;border-bottom:1px solid #E5E2D8;font-family:monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#5B6470;vertical-align:top;">Topic</td>
                  <td style="padding:12px 0;border-bottom:1px solid #E5E2D8;font-size:14px;color:#0F2A44;">${esc(lead.topic)}</td>
                </tr>`
              : ""
          }
        </table>
        ${
          summary
            ? `<div style="margin-top:24px;">
                <p style="font-family:monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#5C6B3E;margin:0 0 8px;">Chat summary</p>
                <div style="border-left:2px solid #5C6B3E;padding:6px 0 6px 14px;font-size:14px;color:#2A2E33;">${esc(summary).replace(/\n/g, "<br>")}</div>
              </div>`
            : ""
        }
        <div style="margin-top:24px;">
          <p style="font-family:monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#5C6B3E;margin:0 0 8px;">Transcript</p>
          <pre style="background:#FAFAF6;border:1px solid #E5E2D8;padding:14px;font-family:monospace;font-size:12px;line-height:1.55;white-space:pre-wrap;color:#2A2E33;border-radius:2px;">${esc(transcript || "(no transcript)")}</pre>
        </div>
        <hr style="border:0;border-top:1px solid #E5E2D8;margin:24px 0 12px;">
        <p style="font-family:monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#8C95A0;margin:0;">
          Captured via the Stonehenge Trust chat widget
        </p>
      </div>
    `;

    try {
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from: fromAddr,
        to: [toAddr],
        replyTo: lead.email,
        subject,
        text,
        html,
      });
      if (error) {
        return NextResponse.json(
          { error: error.message || "Email failed." },
          { status: 502 }
        );
      }
      return NextResponse.json({ ok: true });
    } catch (e) {
      return NextResponse.json(
        { error: e instanceof Error ? e.message : "Unknown error" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
