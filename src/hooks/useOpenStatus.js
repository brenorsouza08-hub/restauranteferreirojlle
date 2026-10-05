import { useEffect, useState } from 'react'
import { hours } from '../data/site'

const DAY_NAMES = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

// Horário atual em Joinville (America/Sao_Paulo), independente do fuso do visitante.
function nowInJoinville() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (t) => parts.find((p) => p.type === t)?.value
  return { day: WEEKDAY_INDEX[get('weekday')], minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

export function getOpenStatus() {
  const { day, minutes } = nowInJoinville()
  for (const h of hours) {
    if (h.weekdays.includes(day) && minutes >= h.open * 60 && minutes < h.close * 60) {
      return { open: true, label: `Aberto agora · ${h.label} até ${h.close}h` }
    }
  }
  for (let offset = 0; offset < 8; offset++) {
    const d = (day + offset) % 7
    const next = hours
      .filter((h) => h.weekdays.includes(d) && (offset > 0 || minutes < h.open * 60))
      .sort((a, b) => a.open - b.open)[0]
    if (next) {
      const when = offset === 0 ? 'hoje' : offset === 1 ? 'amanhã' : DAY_NAMES[d]
      return { open: false, label: `Fechado agora · ${next.label} ${when} às ${next.open}h` }
    }
  }
  return { open: false, label: 'Fechado agora' }
}

export function useOpenStatus() {
  const [status, setStatus] = useState(null)
  useEffect(() => {
    const update = () => setStatus(getOpenStatus())
    update()
    const t = setInterval(update, 60_000)
    return () => clearInterval(t)
  }, [])
  return status
}
