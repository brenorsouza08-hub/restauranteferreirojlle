import { useScrollProgress } from '../../hooks/useParallax'

// Texto revelado palavra por palavra conforme a rolagem.
export default function ScrollWords({ text, className = '', as: Tag = 'p' }) {
  const words = text.split(' ')
  const ref = useScrollProgress((p, r) => {
    // começa quando o topo do bloco passa de 85% da viewport e termina em ~45%
    const vh = window.innerHeight
    const local = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.45 + r.height * 0.4)))
    ref.current?.style.setProperty('--p', (local * (words.length + 2)).toFixed(3))
  })
  return (
    <Tag ref={ref} className={className} style={{ '--p': 0 }}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block transition-[opacity] duration-300 motion-reduce:!opacity-100"
          style={{ opacity: `clamp(0.14, calc(var(--p) - ${i}), 1)` }}
        >
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
