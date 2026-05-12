import type { ClientInfo, ClientRole, DispatchEvent, Identity, SessionState } from './types'

export type JoinAck = { ok: true; clientId: string } | { ok: false; error: string }

export interface ClientToServerEvents {
  'session:join': (
    msg: { sessionId: string; role: ClientRole; identity?: Identity },
    ack: (res: JoinAck) => void,
  ) => void
  'event:dispatch': (msg: DispatchEvent) => void
}

export interface ServerToClientEvents {
  'session:state': (msg: { state: SessionState; clients: ClientInfo[] }) => void
  'session:error': (msg: { message: string }) => void
}

export interface InterServerEvents {}

export interface SocketData {
  sessionId?: string
  clientId?: string
  role?: ClientRole
}
