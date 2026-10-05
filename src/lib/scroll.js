import Lenis from 'lenis'

// Rolagem suave (Lenis) + um único laço de animação compartilhado
// por todos os efeitos que dependem da posição de rolagem.

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis = null
const listeners = new Set()
let frame = 0
let started = false

const tick = (time) => {
  lenis?.raf(time)
  frame = requestAnimationFrame(tick)
}

const notify = () => {
  const y = lenis ? lenis.scroll : window.scrollY
  listeners.forEach((fn) => fn(y))
}

export function startScroll() {
  if (started) return lenis
  started = true
  if (!prefersReducedMotion()) {
    lenis = new Lenis({ duration: 1.25, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true })
    lenis.on('scroll', notify)
    frame = requestAnimationFrame(tick)
  }
  window.addEventListener('scroll', () => !lenis && notify(), { passive: true })
  window.addEventListener('resize', notify)
  return lenis
}

export function onScroll(fn) {
  listeners.add(fn)
  fn(lenis ? lenis.scroll : window.scrollY)
  return () => listeners.delete(fn)
}

export function scrollToTarget(target, offset = 0) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.8 })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

export function stopScroll() {
  cancelAnimationFrame(frame)
  lenis?.destroy()
  lenis = null
  started = false
}
