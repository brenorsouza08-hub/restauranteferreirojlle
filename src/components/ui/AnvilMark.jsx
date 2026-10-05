// Símbolo da bigorna com chamas, redesenhado em traço fino a partir da marca do Ferreiro.
export default function AnvilMark({ className = 'h-7 w-auto', flame = 'var(--color-gold)', body = 'currentColor' }) {
  return (
    <svg viewBox="0 0 64 60" className={className} fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path
        d="M32 26c-5-6-1-13 2-19 1.5 6 6 11 1 19M23 27c-3-4-1-8 1-11 1 4 4 7 2 11M42 27c-2-4 0-8 2-11 1 4 3 7 1 11"
        stroke={flame}
        strokeWidth="1.6"
      />
      <path
        d="M4 32.5c4-1.6 7-2 11-2h45v7h-9c-3 0-4.5 1.6-4.5 4.5v2c0 2.6 2.4 4.2 6.5 5V54H15v-5c4-.8 6.5-2.4 6.5-5v-2c0-3-2-4.5-6-4.8C10 37 6 35.6 4 32.5Z"
        stroke={body}
        strokeWidth="1.6"
      />
    </svg>
  )
}
