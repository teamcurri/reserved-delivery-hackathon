'use client'

import { useCallback, useEffect, useState } from 'react'
import type {
  ClientInfo,
  ClientRole,
  DispatchEvent,
  Identity,
  SessionState,
} from '@hackathon/shared'
import { getSocket } from './socket'

type Status = 'idle' | 'connecting' | 'joined' | 'error'

export function useSession(
  sessionId: string | undefined,
  role: ClientRole,
  identity: Identity | undefined,
  enabled: boolean,
) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | undefined>()
  const [state, setState] = useState<SessionState | undefined>()
  const [clients, setClients] = useState<ClientInfo[]>([])
  const [clientId, setClientId] = useState<string | undefined>()

  useEffect(() => {
    if (!enabled || !sessionId) return

    const socket = getSocket()
    setStatus('connecting')

    const onState = (msg: { state: SessionState; clients: ClientInfo[] }) => {
      setState(msg.state)
      setClients(msg.clients)
    }
    const onError = (msg: { message: string }) => {
      setError(msg.message)
      setStatus('error')
    }

    socket.on('session:state', onState)
    socket.on('session:error', onError)

    const join = () => {
      socket.emit('session:join', { sessionId, role, identity }, (res) => {
        if (res.ok) {
          setClientId(res.clientId)
          setStatus('joined')
        } else {
          setError(res.error)
          setStatus('error')
        }
      })
    }

    if (socket.connected) {
      join()
    } else {
      socket.once('connect', join)
    }

    return () => {
      socket.off('session:state', onState)
      socket.off('session:error', onError)
    }
  }, [enabled, sessionId, role, identity?.name])

  const dispatch = useCallback((event: DispatchEvent) => {
    getSocket().emit('event:dispatch', event)
  }, [])

  return { status, error, state, clients, clientId, dispatch }
}
