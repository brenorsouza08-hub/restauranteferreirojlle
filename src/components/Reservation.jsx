import { images } from '../data/images'
import { hours, site } from '../data/site'
import { useParallax } from '../hooks/useParallax'
import { useRevealAll } from '../hooks/useReveal'
import Button from './ui/Button'
import Eyebrow from './ui/Eyebrow'
import { WhatsAppIcon } from './ui/Icons'
import OpenStatus from './ui/OpenStatus'
import Photo from './ui/Photo'

export default function Reservation() {
  const ref = useRevealAll()
  const par = useParallax(0.12, { scale: 1.2 })

  return (
    <section id="reserva" ref={ref} aria-labelledby="res-title" className="relative overflow-hidden bg-night">
      <div className="absolute inset-0">
        <div ref={par} className="absolute inset-0 will-change-transform">
          <Photo image={images.pratos} sizes="100vw" className="h-full w-full" imgClassName="saturate-[0.8]" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-night/[0.55]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,transparent,rgb(7_6_5/0.95))]"
        />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col items-center justify-center px-5 py-32 text-center md:px-10">
        <div className="reveal">
          <Eyebrow index="09" align="center">
            Reservas
          </Eyebrow>
        </div>

        <h2 id="res-title" className="display mt-12 text-[clamp(2.9rem,8.4vw,9.5rem)] uppercase text-cream">
          <span className="line-mask" data-reveal>
            <span>Sua próxima</span>
          </span>
          <span className="line-mask" data-reveal style={{ '--d': '120ms' }}>
            <span>experiência</span>
          </span>
          <span className="line-mask" data-reveal style={{ '--d': '240ms' }}>
            <span className="italic normal-case text-gold/90">começa aqui.</span>
          </span>
        </h2>

        <div className="reveal mt-14 flex w-full max-w-sm flex-col items-center gap-6 sm:max-w-none" style={{ '--d': '380ms' }}>
          <Button href={site.links.reserve} variant="solid" className="w-full sm:w-auto sm:px-12">
            Reservar / Falar conosco
          </Button>
          <a
            href={site.links.contact}
            target="_blank"
            rel="noopener noreferrer"
            className="caption flex items-center gap-3 text-cream/75 transition-colors duration-500 hover:text-cream"
          >
            <WhatsAppIcon className="size-4 text-gold" />
            <span className="link-underline">{site.phoneDisplay}</span>
          </a>
          <OpenStatus className="text-stone" />
        </div>

        <dl className="reveal mt-20 grid w-full max-w-4xl grid-cols-1 border-t border-line text-left sm:grid-cols-3" style={{ '--d': '480ms' }}>
          {hours.map((h) => (
            <div key={h.id} className="border-b border-line py-6 sm:border-b-0 sm:border-l sm:px-6 sm:py-8 sm:first:border-l-0 sm:first:pl-0">
              <dt className="caption text-[0.6rem] text-gold/80">{h.label}</dt>
              <dd className="mt-3 font-serif text-xl text-cream">{h.days}</dd>
              <dd className="caption mt-2 text-[0.62rem] text-stone">{h.time}</dd>
            </div>
          ))}
          <div className="py-6 sm:border-l sm:border-line sm:px-6 sm:py-8">
            <dt className="caption text-[0.6rem] text-gold/80">Faixa de preço</dt>
            <dd className="mt-3 font-serif text-xl text-cream">R$ 100–200</dd>
            <dd className="caption mt-2 text-[0.62rem] text-stone">por pessoa</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
