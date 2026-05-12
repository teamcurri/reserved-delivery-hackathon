import { Router } from 'express'
import type { Server } from 'socket.io'
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from '@hackathon/shared'
import type { BlastTimer } from '../sessions.js'

type IOServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>

export function webhookRouter(_io: IOServer, timer: BlastTimer): Router {
  const router = Router()

  router.post('/:source', (req, res) => {
    const { source } = req.params
    const sessionId = typeof req.query.sessionId === 'string' ? req.query.sessionId : undefined
    if (!sessionId) {
      res.status(400).json({ error: 'missing ?sessionId' })
      return
    }
    const updated = timer.apply(
      sessionId,
      { type: `webhook:${source}`, payload: req.body },
      undefined,
    )
    if (!updated) {
      res.status(404).json({ error: 'session not found' })
      return
    }
    res.json({ ok: true })
  })

  return router
}
