'use client'

import { io, type Socket } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '@hackathon/shared'

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>

let socket: AppSocket | undefined

export function getSocket(): AppSocket {
  if (!socket) {
    // No URL → socket.io-client connects to window.location.origin with the
    // default /socket.io path, which Next.js rewrites to Express on :4000.
    socket = io({
      transports: ['websocket', 'polling'],
      autoConnect: true,
    })
  }
  return socket
}
