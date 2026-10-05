import { useEffect, useRef } from 'react'

// Adiciona a classe `is-in` quando o elemento entra na viewport (uma única vez).
export function useReveal({ threshold = 0.18, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          io.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])
  return ref
}

// Observa todos os elementos `.reveal`, `.reveal-fade`, `.clip-reveal` e `[data-reveal]` dentro do container.
// Elementos com clip-path totalmente fechado não "intersectam" — para eles observamos o elemento pai.
export function useRevealAll() {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = root.querySelectorAll('.reveal, .reveal-fade, .clip-reveal, [data-reveal]')
    const map = new Map()
    targets.forEach((t) => {
      const observed = t.classList.contains('clip-reveal') ? t.parentElement : t
      if (!map.has(observed)) map.set(observed, [])
      map.get(observed).push(t)
    })
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            map.get(entry.target)?.forEach((t) => t.classList.add('is-in'))
            io.unobserve(entry.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    map.forEach((_, el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}
