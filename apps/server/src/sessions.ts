import { nanoid } from 'nanoid'
import {
  type ClientInfo,
  type DispatchEvent,
  type Session,
  initialSessionState,
} from '@hackathon/shared'
import { reduce } from './reducer.js'

export interface SessionStore {
  create(): Session
  get(id: string): Session | undefined
  addClient(id: string, client: Omit<ClientInfo, 'clientId' | 'joinedAt'>): ClientInfo | undefined
  removeClient(id: string, clientId: string): void
  applyEvent(id: string, event: DispatchEvent, by: ClientInfo | undefined): Session | undefined
  delete(id: string): void
  size(): number
}

export class InMemorySessionStore implements SessionStore {
  private sessions = new Map<string, Session>()

  create(): Session {
    const id = nanoid(8)
    const session: Session = {
      id,
      createdAt: Date.now(),
      state: initialSessionState(),
      clients: [],
    }
    this.sessions.set(id, session)
    return session
  }

  get(id: string): Session | undefined {
    return this.sessions.get(id)
  }

  addClient(
    id: string,
    client: Omit<ClientInfo, 'clientId' | 'joinedAt'>,
  ): ClientInfo | undefined {
    const session = this.sessions.get(id)
    if (!session) return undefined
    const full: ClientInfo = {
      ...client,
      clientId: nanoid(10),
      joinedAt: Date.now(),
    }
    session.clients.push(full)
    return full
  }

  removeClient(id: string, clientId: string): void {
    const session = this.sessions.get(id)
    if (!session) return
    session.clients = session.clients.filter((c) => c.clientId !== clientId)
    if (session.clients.length === 0) {
      this.sessions.delete(id)
    }
  }

  applyEvent(id: string, event: DispatchEvent, by: ClientInfo | undefined): Session | undefined {
    const session = this.sessions.get(id)
    if (!session) return undefined
    session.state = reduce(session.state, event, { by, session })
    return session
  }

  delete(id: string): void {
    this.sessions.delete(id)
  }

  size(): number {
    return this.sessions.size
  }
}

/**
 * Drives server-originated events (currently just blast expiry). Reconcile is
 * called by the wiring layer after every state-changing event, and sets up /
 * tears down timers to keep server timeouts in sync with the current `blasts`
 * list. When a timer fires, it re-enters via `applyAndBroadcast` so the
 * resulting state change is broadcast to all clients in the room.
 */
export class BlastTimer {
  private timers = new Map<string, NodeJS.Timeout>()

  constructor(
    private store: SessionStore,
    private broadcast: (session: Session) => void,
  ) {}

  apply(sessionId: string, event: DispatchEvent, by: ClientInfo | undefined): Session | undefined {
    const session = this.store.applyEvent(sessionId, event, by)
    if (!session) return undefined
    this.reconcile(session)
    this.broadcast(session)
    return session
  }

  private reconcile(session: Session) {
    const live = new Set<string>()
    for (const blast of session.state.blasts) {
      if (blast.outcome !== 'pending') continue
      live.add(blast.blastId)
      if (this.timers.has(blast.blastId)) continue
      const ms = Math.max(0, blast.expiresAt - Date.now())
      const timer = setTimeout(() => {
        this.timers.delete(blast.blastId)
        this.apply(session.id, { type: 'blast:expire', payload: { blastId: blast.blastId } }, undefined)
      }, ms)
      this.timers.set(blast.blastId, timer)
    }
    // Drop timers for blasts that are no longer pending (claimed, rejected, restarted).
    for (const [blastId, timer] of this.timers) {
      if (!live.has(blastId)) {
        clearTimeout(timer)
        this.timers.delete(blastId)
      }
    }
  }
}
