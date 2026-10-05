import { images } from '../data/images'
import { site } from '../data/site'
import { useParallax } from '../hooks/useParallax'
import { useRevealAll } from '../hooks/useReveal'
import Button from './ui/Button'
import Eyebrow from './ui/Eyebrow'
import Photo from './ui/Photo'

export default function Events() {
  const ref = useRevealAll()
  const par = useParallax(0.07, { scale: 1.12 })
  const word = useParallax(-0.12)

  return (
    <section id="eventos" ref={ref} aria-labelledby="events-title" className="relative overflow-hidden bg-umber py-32 md:py-52">
      {/* palavra de fundo editorial */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-10 select-none overflow-hidden md:top-16">
        <div ref={word} className="will-change-transform">
          <p className="display whitespace-nowrap text-center text-[26vw] italic leading-none text-transparent [-webkit-text-stroke:1px_rgb(182_154_106/0.13)]">
            Celebrar
          </p>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1500px] items-center gap-16 px-5 md:grid-cols-12 md:gap-10 md:px-10">
        <div className="order-2 md:order-1 md:col-span-5">
          <div className="reveal">
            <Eyebrow index="06">Eventos</Eyebrow>
          </div>
          <h2 id="events-title" className="display mt-10 text-[clamp(2.5rem,4.8vw,5.2rem)] uppercase text-cream">
            <span className="line-mask" data-reveal>
              <span>Momentos que</span>
            </span>
            <span className="line-mask" data-reveal style={{ '--d': '120ms' }}>
              <span>merecem ser</span>
            </span>
            <span className="line-mask" data-reveal style={{ '--d': '240ms' }}>
              <span className="italic normal-case text-gold/90">celebrados.</span>
            </span>
          </h2>
          <p className="reveal mt-10 max-w-sm font-serif text-[1.5rem] font-light italic leading-snug text-cream/85 md:text-[1.75rem]" style={{ '--d': '300ms' }}>
            Um espaço privativo para eventos e momentos especiais.
          </p>
          <div className="reveal mt-12" style={{ '--d': '420ms' }}>
            <Button href={site.links.event} variant="solid">
              Falar sobre um evento
            </Button>
          </div>
        </div>

        <div className="relative order-1 md:order-2 md:col-span-6 md:col-start-7">
          <div
            aria-hidden="true"
            className="reveal-fade absolute -bottom-5 -left-5 top-5 right-5 border border-wine/70 md:-bottom-8 md:-left-8 md:top-8 md:right-8"
            style={{ '--d': '600ms' }}
          />
          <div className="clip-reveal relative aspect-[4/5] overflow-hidden" data-cursor="view">
            <div ref={par} className="absolute inset-0 will-change-transform">
              <Photo image={images.lounge} eager sizes="(min-width:768px) 45vw, 100vw" className="h-full w-full" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-umber/70 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
