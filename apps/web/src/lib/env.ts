// Single-origin deployment: the web app talks to the server via Next.js rewrites,
// so client-side fetches and Socket.IO connect to the page's own origin.
//
// NEXT_PUBLIC_WEB_URL is still used to embed the public URL in the QR code
// shown on desktop. Leave it as the default for local dev; set it to your ngrok
// URL when exposing publicly.

export const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL ?? 'http://localhost:3000'
