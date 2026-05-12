import type { Server } from 'socket.io'
import { z } from 'zod'
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from '@hackathon/shared'
import type { SessionStore, BlastTimer } from './sessions.js'

const joinSchema = z.object({
  sessionId: z.string().min(1),
  role: z.enum(['parent', 'mobile']),
  identity: z.object({ name: z.string().min(1).max(64) }).optional(),
})

const dispatchSchema = z.object({
  type: z.string().min(1),
  payload: z.unknown().optional(),
})

type IOServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>

export function wireSocket(io: IOServer, store: SessionStore, timer: BlastTimer): void {
  io.on('connection', (socket) => {
    socket.on('session:join', (raw, ack) => {
      const parsed = joinSchema.safeParse(raw)
      if (!parsed.success) {
        ack({ ok: false, error: 'invalid join payload' })
        return
      }
      const { sessionId, role, identity } = parsed.data
      const session = store.get(sessionId)
      if (!session) {
        ack({ ok: false, error: 'session not found' })
        return
      }
      if (role === 'parent' && session.clients.some((c) => c.role === 'parent')) {
        ack({ ok: false, error: 'session already has a parent' })
        return
      }
      const client = store.addClient(sessionId, { role, identity })
      if (!client) {
        ack({ ok: false, error: 'failed to register client' })
        return
      }
      socket.data.sessionId = sessionId
      socket.data.clientId = client.clientId
      socket.data.role = role
      socket.join(sessionId)
      ack({ ok: true, clientId: client.clientId })
      io.to(sessionId).emit('session:state', {
        state: session.state,
        clients: session.clients,
      })
    })

    socket.on('event:dispatch', (raw) => {
      const parsed = dispatchSchema.safeParse(raw)
      if (!parsed.success) {
        socket.emit('session:error', { message: 'invalid dispatch payload' })
        return
      }
      const { sessionId, clientId } = socket.data
      if (!sessionId || !clientId) {
        socket.emit('session:error', { message: 'not joined to a session' })
        return
      }
      const session = store.get(sessionId)
      const by = session?.clients.find((c) => c.clientId === clientId)
      const updated = timer.apply(sessionId, parsed.data as never, by)
      if (!updated) {
        socket.emit('session:error', { message: 'session not found' })
        return
      }
    })

    socket.on('disconnect', () => {
      const { sessionId, clientId } = socket.data
      if (!sessionId || !clientId) return
      store.removeClient(sessionId, clientId)
      const session = store.get(sessionId)
      if (session) {
        io.to(sessionId).emit('session:state', {
          state: session.state,
          clients: session.clients,
        })
      }
    })
  })
}
