import { useEffect, useRef } from 'react'
import { onScroll, prefersReducedMotion } from '../lib/scroll'

// Parallax sutil: desloca o elemento proporcionalmente à sua posição na viewport.
// `speed` pequeno (0.05–0.15) para manter a sensação cinematográfica.
export function useParallax(speed = 0.1, { scale = 1 } = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: '20% 0px' })
    io.observe(el)
    const off = onScroll(() => {
      if (!visible) return
      const parent = el.parentElement.getBoundingClientRect()
      const vh = window.innerHeight
      const center = parent.top + parent.height / 2 - vh / 2
      el.style.transform = `translate3d(0, ${(-center * speed).toFixed(2)}px, 0) scale(${scale})`
    })
    return () => {
      off()
      io.disconnect()
    }
  }, [speed, scale])
  return ref
}

// Progresso (0 → 1) de um elemento na rolagem.
// mode "through": da borda inferior da viewport até sair pelo topo.
// mode "pin": enquanto uma seção alta com conteúdo sticky está fixada.
export function useScrollProgress(callback, mode = 'through') {
  const ref = useRef(null)
  const cb = useRef(callback)
  cb.current = callback
  useEffect(() => {
    const el = ref.current
    if (!el) return
    return onScroll(() => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = mode === 'pin' ? -r.top / Math.max(1, r.height - vh) : (vh - r.top) / (r.height + vh)
      cb.current(Math.min(1, Math.max(0, p)), r)
    })
  }, [mode])
  return ref
}
