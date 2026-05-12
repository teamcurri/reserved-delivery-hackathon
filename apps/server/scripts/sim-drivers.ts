/**
 * Simulated driver harness for testing dispatch scenarios.
 *
 * Spawns N bot drivers that:
 *   1. Connect to the gateway as `mobile` clients
 *   2. Skip the quiz UI by emitting a synthetic `driver:onboarding { step:'done' }`
 *      snapshot + a `driver:setBlend` with random blend and an SD-disk location
 *   3. Listen for `session:state` pushes and react to any pending blast that
 *      targets them
 *
 * Behavior per blast (per bot):
 *   - With probability `blend.accept` → claim after a 0.5–3s delay.
 *   - On reserved offers, half of non-accepts explicitly reject (also delayed).
 *   - Otherwise let the 30s server timer expire the blast.
 *
 * Tying behavior to the bot's own `blend.accept` is intentional: the wave
 * algo ranks by the same field, so high-accept bots both rank higher AND
 * actually claim more often, producing a coherent demo.
 *
 * Usage:
 *   pnpm --filter @hackathon/server sim <sessionId> [count=5] [gatewayUrl]
 * or from repo root:
 *   pnpm sim <sessionId> [count=5] [gatewayUrl]
 *
 * Defaults: count=5, gatewayUrl=http://localhost:4000.
 * SIGINT cleanly disconnects all bots.
 */

import { io, type Socket } from 'socket.io-client'
import {
  type Blast,
  type DriverBlend,
  type LatLng,
  type SessionState,
  rollSanDiegoLocation,
} from '@hackathon/shared'

type JoinAck = { ok: true; clientId: string } | { ok: false; error: string }

type Bot = {
  socket: Socket
  clientId: string
  name: string
  blend: DriverBlend
  location: LatLng
  processed: Set<string>
}

const args = process.argv.slice(2)
const sessionId = args[0]
const count = Number.parseInt(args[1] ?? '5', 10)
const gatewayUrl =
  args[2] ?? process.env.SIM_GATEWAY_URL ?? 'http://localhost:4000'

if (!sessionId) {
  console.error(
    'Usage: pnpm sim <sessionId> [count=5] [gatewayUrl=http://localhost:4000]',
  )
  process.exit(1)
}

if (!Number.isInteger(count) || count < 1) {
  console.error(`invalid count: ${args[1]}`)
  process.exit(1)
}

const bots: Bot[] = []

function randDelayMs(): number {
  return 500 + Math.random() * 2500
}

async function spawnBot(name: string): Promise<Bot> {
  const blend: DriverBlend = {
    accept: Math.random(),
    quality: Math.random(),
  }
  const location = rollSanDiegoLocation()

  const socket: Socket = io(gatewayUrl, {
    transports: ['websocket', 'polling'],
    reconnection: false,
  })

  await new Promise<void>((resolve, reject) => {
    socket.once('connect', () => resolve())
    socket.once('connect_error', (err) => reject(err))
  })

  const ack = await new Promise<JoinAck>((resolve) => {
    socket.emit(
      'session:join',
      { sessionId, role: 'mobile', identity: { name } },
      (res: JoinAck) => resolve(res),
    )
  })

  if (!ack.ok) {
    socket.disconnect()
    throw new Error(`join failed: ${ack.error}`)
  }

  const clientId = ack.clientId

  // Synthetic onboarding so the spectator/desktop sees the bot as fully
  // onboarded ("✓ done") in the driver table.
  socket.emit('event:dispatch', {
    type: 'driver:onboarding',
    payload: {
      step: 'done',
      answers: {
        box: 'box',
        seatbelt: true,
        schoolZoneMph: 25,
        mom: Math.random() > 0.5,
        reactionMs: Math.round(200 + Math.random() * 500),
      },
    },
  })

  // The actual scoring inputs.
  socket.emit('event:dispatch', {
    type: 'driver:setBlend',
    payload: { blend, location },
  })

  const bot: Bot = {
    socket,
    clientId,
    name,
    blend,
    location,
    processed: new Set(),
  }

  socket.on('session:state', (msg: { state: SessionState }) => {
    const mine = msg.state.blasts.filter(
      (b: Blast) =>
        b.driverId === clientId &&
        b.outcome === 'pending' &&
        !bot.processed.has(b.blastId),
    )
    for (const blast of mine) {
      bot.processed.add(blast.blastId)
      onOffer(bot, blast.blastId, blast.reserved)
    }
  })

  return bot
}

function onOffer(bot: Bot, blastId: string, reserved: boolean): void {
  const r = Math.random()
  const delay = randDelayMs()

  if (r < bot.blend.accept) {
    setTimeout(() => {
      bot.socket.emit('event:dispatch', {
        type: 'delivery:claim',
        payload: { blastId },
      })
      console.log(`  ${bot.name} → claim ${blastId} (after ${Math.round(delay)}ms)`)
    }, delay)
    return
  }

  if (reserved && Math.random() < 0.5) {
    setTimeout(() => {
      bot.socket.emit('event:dispatch', {
        type: 'delivery:reject',
        payload: { blastId },
      })
      console.log(`  ${bot.name} → reject ${blastId} (after ${Math.round(delay)}ms)`)
    }, delay)
    return
  }

  console.log(`  ${bot.name} → ignore ${blastId} (will expire)`)
}

async function main(): Promise<void> {
  console.log(`Spawning ${count} bots → session ${sessionId} @ ${gatewayUrl}\n`)
  for (let i = 0; i < count; i++) {
    const name = `Bot${String(i + 1).padStart(2, '0')}`
    try {
      const bot = await spawnBot(name)
      bots.push(bot)
      console.log(
        `✓ ${name} joined · accept=${bot.blend.accept.toFixed(2)} quality=${bot.blend.quality.toFixed(2)} · ` +
          `loc=(${bot.location.lat.toFixed(4)}, ${bot.location.lng.toFixed(4)})`,
      )
    } catch (e) {
      console.error(`✗ ${name} failed: ${(e as Error).message}`)
    }
    // Small gap so the server's state broadcasts settle between joins.
    await new Promise((r) => setTimeout(r, 100))
  }
  console.log(
    `\nAll bots online (${bots.length}/${count}). Watching for offers… (Ctrl-C to disconnect)\n`,
  )
}

process.on('SIGINT', () => {
  console.log(`\nDisconnecting ${bots.length} bots…`)
  for (const bot of bots) bot.socket.disconnect()
  process.exit(0)
})

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
