import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Geo-aware cookie-consent regime selector.
 *
 * Reads the visitor's country (Vercel injects `x-vercel-ip-country` at the edge)
 * and writes a non-httpOnly `sht-region` cookie the client consent UI reads:
 *   - "eu"  → strict opt-in (EEA + UK + Switzerland)
 *   - "row" → notice + opt-out
 *
 * QA: append `?geo=DE` or `?geo=US` to any URL to force a country locally.
 */
const STRICT_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
]);

export function proxy(request: NextRequest) {
  const override = request.nextUrl.searchParams.get("geo");
  const country = (override || request.headers.get("x-vercel-ip-country") || "")
    .toUpperCase();

  const region = !country ? "eu" : STRICT_COUNTRIES.has(country) ? "eu" : "row";

  if (request.cookies.get("sht-region")?.value === region) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.cookies.set("sht-region", region, {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    httpOnly: false,
  });
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|opengraph-image|twitter-image|.*\\.[\\w]+$).*)",
  ],
};
