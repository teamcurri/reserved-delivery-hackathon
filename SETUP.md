# Agent Setup Reference

This file is a quick operational guide for coding agents working in this repository.

## Project Snapshot

- Monorepo managed with `pnpm` workspaces
- Runtime stack:
  - `apps/web`: Next.js 15 + React 19 (internal dev port `3000`)
  - `apps/server`: Express + Socket.IO (public gateway on port `4000`)
  - `packages/shared`: shared event/types contracts
- Node requirement: `>=20.18.0`
- Package manager: `pnpm@10.22.0`

## One-Time Setup

From repository root:

```bash
pnpm install
cp apps/web/.env.local.example apps/web/.env.local
cp apps/server/.env.example apps/server/.env
```

## Daily Dev Commands

From repository root:

```bash
pnpm dev
```

This runs both apps in parallel:
- Next.js on `:3000` (internal)
- Express gateway on `:4000` (external entrypoint)

Use `http://localhost:4000` for manual testing. Do not use `:3000` directly for feature validation because API and WebSocket assumptions are same-origin through the Express gateway.

## Build and Verification

From repository root:

```bash
pnpm build
pnpm lint
pnpm typecheck
```

## Ngrok Workflow (for phone/public testing)

One-time auth:

```bash
ngrok config add-authtoken <YOUR_TOKEN>
```

Start tunnel (repo script):

```bash
pnpm ngrok
```

Then set `NEXT_PUBLIC_WEB_URL` in `apps/web/.env.local` to the HTTPS tunnel URL and restart `pnpm dev`.

## Routing and Architecture Notes

- Public traffic should terminate at `apps/server` on `:4000`
- Express handles:
  - `/health`
  - `/sessions`
  - `/webhooks`
  - `/socket.io`
- Non-API requests are reverse-proxied to Next.js on `:3000`

## Agent Guardrails

- Treat `README.md` as source of truth for topology and workflow
- Treat `ngrok-instructions.md` as source of truth for public tunnel setup
- Avoid editing generated artifacts:
  - `apps/web/.next/**`
  - `**/tsconfig.tsbuildinfo`
- Prefer edits in:
  - `apps/web/src/**`
  - `apps/server/src/**`
  - `packages/shared/src/**`

## Session/Test URLs

- Desktop view: `http://localhost:4000`
- Mobile join route: `http://localhost:4000/m/<sessionId>`
- Health check: `http://localhost:4000/health`
