# Hackathon Boilerplate

Desktop "parent" + N mobile clients per session, synchronized over WebSockets.
Pre-wired with `@curri/ui` (from `deps/curri-ui`), Next.js 15, Express + Socket.IO,
and an ngrok config for public exposure.

## Topology

Express is the **public gateway** on `:4000`. It serves the API and Socket.IO
directly, and reverse-proxies everything else (HTML pages, `/_next/*`, HMR
WebSocket) to Next.js on `:3000`. One port out, one ngrok tunnel needed.

```
   public/internet ─── ngrok ───┐
                                 ▼
              ┌──────────────────────────────────────┐
              │   apps/server (4000)  ← gateway      │
              │   Express + Socket.IO                │
              │   /health, /sessions, /webhooks,     │
              │   /socket.io ← handled here          │
              │   anything else → proxy to :3000     │
              └──────────────┬───────────────────────┘
                             │ http + ws upgrade
              ┌──────────────▼───────────────────────┐
              │   apps/web (3000)  Next.js 15        │
              │   /            → desktop (parent)    │
              │   /m/[sessionId] → mobile join page  │
              └──────────────────────────────────────┘
```

All clients (desktop + N mobiles) hit a single origin (`localhost:4000` or the
ngrok URL). Same-origin means no CORS gymnastics and no env var threading.

## Stack

- pnpm workspace
- `apps/web` — Next.js 15 (App Router, React 19), styled-components, `@curri/ui`
- `apps/server` — Express + Socket.IO + zod
- `packages/shared` — typed event schemas, session types
- `packages/tsconfig` — shared strict TS base

## Quickstart

```bash
# 1. Install
pnpm install

# 2. Copy env examples
cp apps/web/.env.local.example apps/web/.env.local
cp apps/server/.env.example apps/server/.env

# 3. Run both apps
pnpm dev
# → next on :3000 (internal)
# → express gateway on :4000 (public)
```

Open <http://localhost:4000> as desktop. Open
<http://localhost:4000/m/SESSION_ID> in another browser to simulate a mobile
(substitute the session ID shown on the desktop). Don't use port 3000 directly
in dev — the FE expects API/WS on the same origin, which only works through
Express.

## With ngrok (public URLs)

Free-tier ngrok allows one simultaneous tunnel — which is fine, because
Express is the single public entrypoint.

```bash
# One-time auth (use the token from https://dashboard.ngrok.com/get-started/your-authtoken)
ngrok config add-authtoken <YOUR_TOKEN>

# Run the tunnel — chains your global config (for the authtoken) with the
# repo's ngrok.yml (for tunnel definitions)
pnpm ngrok
```

Copy the HTTPS URL ngrok prints, then set it in `apps/web/.env.local`:

```
NEXT_PUBLIC_WEB_URL=https://<tunnel>.ngrok-free.dev
```

This URL is what gets embedded in the QR code on the desktop page. Restart
`pnpm dev` after editing.

> ngrok free-tier URLs change every run. For stable URLs, claim a domain at
> <https://dashboard.ngrok.com/domains> and add `domain: <name>.ngrok-free.dev`
> under the `web` tunnel in `ngrok.yml`.

## Event protocol

Two channels (defined in `packages/shared/src/events.ts`):

- `session:join { sessionId, role, identity? }` — client → server (with ack)
- `event:dispatch { type, payload }` — client → server
- `session:state { state, clients }` — server → all clients in the room

The typed payload union for `event:dispatch` lives in
`packages/shared/src/dispatch.ts` (`DesktopDispatch | DriverDispatch |
ServerDispatch`). Adding a new action means adding a variant there and a case
in `apps/server/src/reducer.ts`. This is the **contract** to coordinate around
when splitting work across multiple devs.

The reference app implements a rush-delivery dispatch flow per `pat-spec.md`:
- desktop fills a delivery + picks `quality` or `speed`
- `quality` blasts one reserved driver at a time (30s window, falls back to
  next-best on reject/expire)
- `speed` blasts all drivers at once, first claim wins
- mobile drivers self-report a `{ distance, accept, quality }` blend; the
  server uses `driverScore(blend) = (accept + quality) / 2` to rank

## Webhook receiver

Hit `POST /webhooks/:source?sessionId=<id>` and the request body will be
broadcast into the named session's room as an `event:dispatch` of type
`webhook:<source>`. Useful for third-party integrations during demos.

```bash
# Local — hits Express directly (4000) or via the Next rewrite (3000)
curl -X POST "http://localhost:3000/webhooks/example?sessionId=SESSION_ID" \
  -H "content-type: application/json" \
  -d '{"hello":"world"}'

# ngrok — any third party can POST to your public URL
curl -X POST "https://<tunnel>.ngrok-free.app/webhooks/stripe?sessionId=SESSION_ID" \
  -H "content-type: application/json" \
  -d '{"event":"payment.succeeded"}'
```

## Layout

```
hackathon/
├── deps/curri-ui/                  Pre-built UI kit (do not modify)
├── apps/
│   ├── web/                        Next.js 15 (desktop + mobile in one app)
│   └── server/                     Express + Socket.IO
├── packages/
│   ├── shared/                     Shared types + event schemas
│   └── tsconfig/                   Strict TS base
├── pnpm-workspace.yaml
├── ngrok.yml
└── package.json
```
