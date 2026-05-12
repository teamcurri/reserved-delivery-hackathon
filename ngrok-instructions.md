# ngrok Setup Guide

How to expose this project to the public internet so a phone (on any network)
can scan the QR code on your desktop and join a session.

## Topology refresher

Only **one tunnel** is required — and that's good, because free-tier ngrok
only allows one. The Express server on `:4000` is the public gateway: it
serves the API + Socket.IO directly, and reverse-proxies HTML and `/_next/*`
to Next.js on `:3000`.

```
phone / desktop ── https://<tunnel>.ngrok-free.dev ── Express :4000 ── proxy ── Next :3000
```

## One-time setup

1. **Sign up** at <https://dashboard.ngrok.com/signup> and **verify your email**.
   Without verification you'll see `ERR_NGROK_4018` even with a valid token.
2. **Grab your authtoken** at <https://dashboard.ngrok.com/get-started/your-authtoken>.
3. **Install it locally**:
   ```sh
   ngrok config add-authtoken <YOUR_TOKEN>
   ```
   This writes the token to your global config:
   ```
   macOS:  ~/Library/Application Support/ngrok/ngrok.yml
   Linux:  ~/.config/ngrok/ngrok.yml
   ```
4. **Verify** with a single direct tunnel — if this prints "online" with a
   forwarding URL, you're set:
   ```sh
   ngrok http 4000
   # ctrl-c to stop
   ```

## How this repo uses ngrok

The repo ships an [`ngrok.yml`](./ngrok.yml) that defines a single `web`
tunnel pointed at port 4000 (the Express gateway). It does **not** contain
the authtoken — that lives in your global config and is merged at runtime.

The `pnpm ngrok` script chains both configs:

```sh
pnpm ngrok
# → ngrok start --all \
#     --config="$HOME/Library/Application Support/ngrok/ngrok.yml" \
#     --config=./ngrok.yml
```

This matters: ngrok 3 treats a single `--config` flag as the **sole** source
of truth, so a repo-local file without an `authtoken` field will fail auth.
Two `--config` flags merge.

## Typical workflow

```sh
# Terminal 1 — both apps
pnpm dev

# Terminal 2 — public tunnel
pnpm ngrok
```

Copy the HTTPS URL ngrok prints (something like
`https://stardom-vigorous-speed.ngrok-free.dev`) and paste it into
`apps/web/.env.local`:

```
NEXT_PUBLIC_WEB_URL=https://stardom-vigorous-speed.ngrok-free.dev
```

This is what gets embedded in the QR code on the desktop home page. Restart
Next.js (terminal 1) so it picks up the new env value.

Open the public URL on your laptop, then scan the QR with your phone — both
clients connect to the same origin and the session syncs over WebSocket.

## Stable URLs (recommended for iterating)

Free-tier random URLs change every run, which means you re-paste into
`.env.local` every time. To get a stable URL:

1. Claim a static domain at <https://dashboard.ngrok.com/domains>
   (free accounts get one).
2. Add it to [`ngrok.yml`](./ngrok.yml):
   ```yaml
   tunnels:
     web:
       proto: http
       addr: 4000
       domain: your-name.ngrok-free.dev    # ← reserved domain
   ```
3. `NEXT_PUBLIC_WEB_URL` in `.env.local` becomes a once-and-done config.

## Troubleshooting

**`ERR_NGROK_4018` — "authentication failed: verified account and authtoken"**
- The token in your config is missing, wrong, or the account isn't email-verified.
- Diagnostic: run `ngrok http 4000` directly (no `--config`). If it still
  fails, the account needs verification — log into the dashboard and check
  for a verification banner.

**`ERR_NGROK_108` (or similar) — "limited to 1 simultaneous ngrok agent session"**
- Free tier allows one tunnel at a time. Stop any other ngrok process:
  ```sh
  pkill -f ngrok
  ```

**Phone loads the page but counter doesn't sync**
- Check the inspector tab at <http://127.0.0.1:4040> — it logs every HTTP
  and WebSocket frame going through the tunnel. If `/socket.io/...`
  connections are missing or 4xx-ing, the Express gateway isn't routing.
- Confirm Express on `:4000` is up: `curl http://localhost:4000/health`.

**Browser warning page on first visit ("You are about to visit…")**
- Free-tier ngrok shows an interstitial for browser visits. Click "Visit
  Site" once per session, or upgrade to a paid plan to remove it.
- For automated/curl traffic, send the header `ngrok-skip-browser-warning: 1`.

**`/socket.io/` 308-redirected to `/socket.io` and traffic 404s**
- That happens if you try to expose Next.js directly with `rewrites`. Don't —
  the repo is set up to expose **Express** as the gateway (see Topology
  above). If you've changed `ngrok.yml` to point at `:3000`, switch it
  back to `:4000`.

## Useful endpoints

| URL                              | Purpose                                  |
| -------------------------------- | ---------------------------------------- |
| `http://127.0.0.1:4040`          | ngrok's local web inspector              |
| `http://127.0.0.1:4040/api/tunnels` | JSON of active tunnels (and their URLs) |
| `<tunnel>/health`                | Express liveness (number of sessions)    |
| `<tunnel>/socket.io/`            | Socket.IO endpoint (should 200 with payload) |

To grab the active public URL from a script:

```sh
curl -s http://127.0.0.1:4040/api/tunnels \
  | python3 -c "import sys,json;print(json.load(sys.stdin)['tunnels'][0]['public_url'])"
```
