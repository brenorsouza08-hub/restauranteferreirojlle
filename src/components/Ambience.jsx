import { useRef } from 'react'
import { images } from '../data/images'
import { useScrollProgress } from '../hooks/useParallax'
import { useRevealAll } from '../hooks/useReveal'
import { prefersReducedMotion } from '../lib/scroll'
import Eyebrow from './ui/Eyebrow'
import Photo from './ui/Photo'

const ease = (t) => 1 - Math.pow(1 - t, 3)

export default function Ambience() {
  const frame = useRef(null)
  const media = useRef(null)
  const reveal = useRevealAll()

  const pin = useScrollProgress((p) => {
    if (prefersReducedMotion() || !frame.current) return
    const open = ease(Math.min(1, p / 0.55))
    const inset = (1 - open) * 9
    const side = (1 - open) * (window.innerWidth < 768 ? 5 : 11)
    frame.current.style.clipPath = `inset(${inset}% ${side}% ${inset}% ${side}%)`
    media.current.style.transform = `scale(${(1.18 - open * 0.13 - p * 0.04).toFixed(4)}) translate3d(0, ${(p * -2.5).toFixed(2)}%, 0)`
  }, 'pin')

  return (
    <section aria-labelledby="amb-title" className="relative bg-ink">
      <div ref={pin} className="relative h-[190vh] md:h-[220vh]">
        <div ref={reveal} className="sticky top-0 h-[100svh] overflow-hidden">
          <div ref={frame} className="absolute inset-0 overflow-hidden [clip-path:inset(9%_11%_9%_11%)] motion-reduce:[clip-path:none]">
            <div ref={media} className="absolute inset-0 scale-[1.18] will-change-transform">
              <Photo image={images.salaoWide} sizes="100vw" className="h-full w-full" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-ink/45" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-ink/40" />
          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-[14vh] md:px-10 md:pb-[16vh]">
            <div className="reveal">
              <Eyebrow index="05">O ambiente</Eyebrow>
            </div>
            <h2 id="amb-title" className="display mt-8 text-[clamp(2.4rem,6.6vw,7.4rem)] uppercase text-cream">
              <span className="line-mask" data-reveal>
                <span>O ambiente</span>
              </span>
              <span className="line-mask" data-reveal style={{ '--d': '120ms' }}>
                <span>também faz parte</span>
              </span>
              <span className="line-mask" data-reveal style={{ '--d': '240ms' }}>
                <span className="italic normal-case text-gold/90">da experiência.</span>
              </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
