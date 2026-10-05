import { useEffect, useRef, useState } from 'react'

// Cursor discreto: ponto + anel com inércia. Expande sobre links e mostra "Ver" nas fotografias.
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (fine.matches && !reduce.matches) setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return
    document.documentElement.classList.add('has-cursor')

    const pos = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    let raf = 0
    let state = ''

    const move = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      const target = e.target.closest?.('[data-cursor], a, button')
      const next = target ? target.getAttribute('data-cursor') || 'hover' : ''
      if (next !== state) {
        state = next
        ring.current.dataset.state = state
        dot.current.dataset.state = state
      }
    }
    const leave = () => {
      pos.x = pos.y = -100
    }
    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16
      ringPos.y += (pos.y - ringPos.y) * 0.16
      dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseleave', leave)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div ref={dot} className="absolute left-0 top-0">
        <span className="block size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream transition-[opacity,transform] duration-500 [[data-state=view]_&]:scale-0" />
      </div>
      <div ref={ring} className="group/cursor absolute left-0 top-0">
        <span
          className="flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 transition-[width,height,background-color,border-color] duration-700 ease-[var(--ease-luxe)]
          group-data-[state=hover]/cursor:size-14 group-data-[state=hover]/cursor:border-gold/70
          group-data-[state=view]/cursor:size-20 group-data-[state=view]/cursor:border-transparent group-data-[state=view]/cursor:bg-cream/90"
        >
          <span className="caption text-[0.6rem] text-ink opacity-0 transition-opacity duration-500 group-data-[state=view]/cursor:opacity-100">
            Ver
          </span>
        </span>
      </div>
    </div>
  )
}
