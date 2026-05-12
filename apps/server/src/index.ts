import 'dotenv/config'
import http from 'node:http'
import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import { createProxyMiddleware } from 'http-proxy-middleware'
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from '@hackathon/shared'
import { BlastTimer, InMemorySessionStore } from './sessions.js'
import { wireSocket } from './socket.js'
import { webhookRouter } from './routes/webhooks.js'

const PORT = Number(process.env.PORT ?? 4000)
const WEB_ORIGIN = process.env.WEB_ORIGIN ?? 'http://localhost:3000'
const PROXY_NEXT = process.env.PROXY_NEXT !== 'false'

const store = new InMemorySessionStore()
const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '1mb' }))

app.get('/health', (_req, res) => {
  res.json({ ok: true, sessions: store.size() })
})

app.post('/sessions', (_req, res) => {
  const session = store.create()
  res.json({ sessionId: session.id })
})

app.get('/sessions/:id', (req, res) => {
  const session = store.get(req.params.id)
  if (!session) {
    res.status(404).json({ error: 'not found' })
    return
  }
  res.json(session)
})

const httpServer = http.createServer(app)

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: { origin: true, credentials: true },
})

const timer = new BlastTimer(store, (session) => {
  io.to(session.id).emit('session:state', {
    state: session.state,
    clients: session.clients,
  })
})

app.use('/webhooks', webhookRouter(io, timer))

wireSocket(io, store, timer)

if (PROXY_NEXT) {
  const nextProxy = createProxyMiddleware({
    target: WEB_ORIGIN,
    ws: true,
    changeOrigin: true,
    logger: console,
  })
  app.use((req, res, next) => {
    const p = req.path
    if (
      p === '/health' ||
      p.startsWith('/sessions') ||
      p.startsWith('/webhooks') ||
      p.startsWith('/socket.io')
    ) {
      return next()
    }
    return nextProxy(req, res, next)
  })
  httpServer.on('upgrade', (req, socket, head) => {
    if (req.url && !req.url.startsWith('/socket.io')) {
      nextProxy.upgrade?.(req as any, socket as any, head)
    }
  })
}

httpServer.listen(PORT, () => {
  console.log(`[server] listening on :${PORT}`)
  console.log(`[server] web origin: ${WEB_ORIGIN}`)
  console.log(`[server] proxying non-API paths to Next: ${PROXY_NEXT}`)
})
