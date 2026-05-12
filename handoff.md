# Handoff

Snapshot of where this project is and the load-bearing decisions, so a fresh
session (or a new dev) can pick up without re-litigating.

## What this is

Hackathon boilerplate for a rush-delivery dispatch demo (`pat-spec.md`):
- Desktop "parent" pairs with N mobile "drivers" per session via QR scan
- All clients sync over WebSockets through a server-authoritative reducer
- Single ngrok tunnel exposes the whole thing publicly

The reference flow implements `pat-spec.md`: dispatch a delivery with
`quality` (one reserved driver at a time, 30s claim window, fallback on
reject/expire) or `speed` (blast all drivers, first claim wins).

## Repo layout

```
hackathon/
├── deps/curri-ui/          pre-built UI kit (do not modify)
├── apps/
│   ├── web/                Next.js 15 (React 19), styled-components, @curri/ui
│   └── server/             Express + Socket.IO gateway
├── packages/
│   ├── shared/             types + typed dispatch union ← the contract
│   └── tsconfig/           strict TS base
├── pnpm-workspace.yaml
├── ngrok.yml               single tunnel → port 4000
├── README.md               setup + topology
├── ngrok-instructions.md   ngrok-specific setup, troubleshooting
└── pat-spec.md             the spec the demo implements
```

## Architecture (load-bearing)

**Express on `:4000` is the public gateway, not Next.js on `:3000`.**

```
public ── ngrok ── Express :4000 ──┬── /health, /sessions, /webhooks, /socket.io (handled here)
                                    └── everything else → proxy to Next :3000 (HTML + HMR ws)
```

We arrived at this via elimination — Next.js rewrites silently strip the
trailing slash from `/socket.io/` destinations, breaking Socket.IO. Flipping
gateway to Express dodges that entirely and gives us a single same-origin URL,
which means: no CORS plumbing, no env vars threading server URL into the
client, and free-tier ngrok (one tunnel) works as-is.

The gateway proxy is `http-proxy-middleware` (`apps/server/src/index.ts`),
which also forwards Next's HMR WebSocket upgrade (`/_next/webpack-hmr`)
because the custom `http.Server` swallows the upgrade event otherwise.

## The contract (what dev-split is keyed off of)

`packages/shared/src/dispatch.ts` defines the typed event union:

```ts
DesktopDispatch = delivery:dispatch | delivery:restart
DriverDispatch  = driver:setBlend | delivery:claim | delivery:reject
ServerDispatch  = blast:expire
```

Every action that crosses the wire is one of these. Add a new action by
adding a variant in `dispatch.ts` and a case in `apps/server/src/reducer.ts`.
Devs working in parallel should lock this union shape early — UI work and
server policy can move independently behind it.

## Server policy lives in two files

- `apps/server/src/reducer.ts` — pure reducer. Scoring policy
  (`driverScore = (accept + quality) / 2`) is in `packages/shared/src/types.ts`
  so the desktop can show it.
- `apps/server/src/sessions.ts` — `BlastTimer` reconciles `setTimeout`s
  against the current `blasts` list after every state change. Timer fires →
  re-enters via `blast:expire`, which is just another reducer event. Keeps the
  reducer pure.

## Run it

```sh
pnpm install
cp apps/web/.env.local.example apps/web/.env.local
cp apps/server/.env.example apps/server/.env
pnpm dev
# Open http://localhost:4000  ← gateway. NOT :3000 (Next direct has no API).
```

For public ngrok exposure see `ngrok-instructions.md`. Two non-obvious bits:
- Free-tier ngrok needs `ngrok config add-authtoken <token>` AND an
  email-verified account. Otherwise: `ERR_NGROK_4018`.
- The `pnpm ngrok` script chains the global config (token) and repo config
  (tunnels) because ngrok 3 treats a single `--config` flag as the sole
  source of truth.

After `ngrok start`, paste the public URL into `apps/web/.env.local`:

```
NEXT_PUBLIC_WEB_URL=https://<tunnel>.ngrok-free.dev
```

This is **only** for embedding the public URL into the desktop's QR code —
the client never reads it for socket connection (same-origin).

## Gotchas baked into the code

- `@curri/ui` `Heading` is `<Heading size="h1">…`, not `Heading.H1`. `Text`
  requires `size` prop. `Colors.GREY_*` not `GRAY_*`.
- `InputText`'s `onChange` event type is `React.ChangeEvent<{}>` (the curri-ui
  Input types use `InputHTMLAttributes<{}>`), so we cast inline:
  `(e.target as HTMLInputElement).value`.
- `@curri/ui` Button declines to fire `onClick` when `disabled` is truthy
  (verified in dist). Mobile pages avoid disabling the join button and
  validate inside the handler — one path that broke during testing.
- Shared package uses **extensionless imports** (`from './types'`). The
  `.js` extension form (Node ESM friendly) makes Next/webpack 500 with
  "Module not found" at runtime even though tsc is happy.
- Next.js 15 dev complains about cross-origin requests from the ngrok host
  to `/_next/*`. Suppressed via `allowedDevOrigins` in `next.config.js`.
- `react-copy-to-clipboard` and `react-media-query-hoc` are listed as
  transitive deps of `@curri/ui` but aren't imported by any code we use —
  the unmet React-19 peer-dep warnings on install are noise.

## What's done

- Workspace scaffolding, ESLint/Prettier, shared tsconfig
- Express gateway with Socket.IO + webhook receiver route
- Pure reducer covering all `pat-spec.md` transitions
- `BlastTimer` for 30s claim windows (and reject/expire fallbacks)
- Desktop dispatch console (compose form, quality "ping" view, speed batch
  view, driver table with active highlighting, history, restart)
- Mobile driver UI (identity join, blend sliders with debounce, offer view
  with countdown, accept/pass)
- ngrok config + single-tunnel topology working end-to-end

## What's not (open threads)

- **Phone smoke test not done.** I only verified WebSocket + reducer behavior
  through a Node smoke script. Last user-reported issue was "join button not
  working on mobile" — I shipped a fix (always-enabled button, explicit
  `onClick`, visible status line) but the user hadn't confirmed yet before
  the project moved.
- **No tests.** Smoke testing was scripted ad-hoc; no jest/vitest setup.
- **No persistence.** Sessions are in-memory and GC when last client leaves.
- **Auth: none.** Anyone with the session URL can join.
- **Quality scoring uses `(accept + quality) / 2`.** Distance is not factored
  into ranking — only shown as a display value via `approxMiles`. The spec
  hints at richer scoring; that's a clean replacement point in
  `packages/shared/src/types.ts::driverScore`.

## Useful smoke commands

```sh
# Verify gateway routing
curl http://localhost:4000/health
curl -X POST http://localhost:4000/sessions

# Full WS + reducer smoke test (from apps/web for module resolution)
cd apps/web && node --input-type=module -e '...' # see chat history

# Inspect active ngrok tunnel + traffic
open http://127.0.0.1:4040
curl -s http://127.0.0.1:4040/api/tunnels | python3 -c "import sys,json;print(json.load(sys.stdin)['tunnels'][0]['public_url'])"
```

## If you have to move the project

1. Update `pnpm-workspace.yaml` if any package paths change (they shouldn't
   for a plain dir move).
2. The web app references curri-ui via `"@curri/ui": "file:../../deps/curri-ui"`
   in `apps/web/package.json` — that's a relative path from
   `apps/web/node_modules/.pnpm/...` and survives a dir move as long as the
   internal layout is preserved.
3. Re-run `pnpm install` after moving so symlinks rebuild.
4. ngrok config lives outside the repo (`~/Library/Application
   Support/ngrok/ngrok.yml`) so the authtoken survives.
