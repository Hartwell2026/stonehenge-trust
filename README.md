# Stonehenge Trust — Web

Production website for **Stonehenge Trust** — a boutique EHS&S compliance practice serving chemical distributors, warehouses, and carriers across ACD Responsible Distribution, ISO management systems, and EPA regulatory work.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript 5**
- **Aldrich** (display) + **Inter** (body) + **JetBrains Mono** (mono / citations)

## Local development

```bash
npm install
cp .env.example .env.local   # fill in the keys
npm run dev                  # http://localhost:3000
```

## Production build

```bash
npm run build
npm run start
```

## Required environment variables

| Key | Where | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Server-only | Resend API key — sends contact form leads |
| `LEADS_TO_EMAIL` | Server-only | Inbox that receives contact leads |
| `LEADS_FROM_EMAIL` | Server-only | Sender shown in lead emails (must be a verified Resend domain in prod) |
| `RETELL_API_KEY` | Server-only | Retell API key — mints web-call tokens |
| `NEXT_PUBLIC_RETELL_AGENT_ID` | Public | Retell agent the chat widget connects to |

See `.env.example` for the full template.

## Notable surfaces

- **Hero** — full-bleed cinematic video background with poster fallback + force-kick autoplay
- **Brand-film modal** — full 25s commercial accessible via the hero CTA
- **Compliance Network constellation** — Canvas2D mouse-reactive backdrop in the dark Principles band
- **Animated stat counters** — viewport-triggered count-up on the Scope-of-Practice strip
- **Standards marquee** — infinite-scroll trade-ticker of regulatory standards (ACD · ISO · EPA · OSHA · DOT)
- **Spotlight cards** — cursor-following olive radial glow on Services and Industries cards
- **Retell voice agent** — floating compliance-agent widget
- **Resend contact** — `/api/contact` validates + sends formatted HTML/text email
