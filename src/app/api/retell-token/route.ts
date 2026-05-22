import { NextResponse } from "next/server";

/**
 * Mints a Retell web-call access token server-side.
 * Keeps the RETELL_API_KEY secret — only the short-lived access_token reaches the browser.
 *
 * Env required:
 *   RETELL_API_KEY               – server-only, from https://dashboard.retellai.com
 *   NEXT_PUBLIC_RETELL_AGENT_ID  – public, the agent that will answer calls
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST() {
  const apiKey = process.env.RETELL_API_KEY;
  const agentId = process.env.NEXT_PUBLIC_RETELL_AGENT_ID;

  if (!apiKey || !agentId) {
    return NextResponse.json(
      {
        error:
          "Retell not configured. Set RETELL_API_KEY and NEXT_PUBLIC_RETELL_AGENT_ID in .env.local",
        configured: false,
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agent_id: agentId }),
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json(
        { error: `Retell API ${res.status}: ${body.slice(0, 200)}` },
        { status: 502 }
      );
    }

    const data = (await res.json()) as { access_token?: string; call_id?: string };
    if (!data.access_token) {
      return NextResponse.json(
        { error: "Retell returned no access_token" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      accessToken: data.access_token,
      callId: data.call_id ?? null,
      configured: true,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "unknown error" },
      { status: 500 }
    );
  }
}
