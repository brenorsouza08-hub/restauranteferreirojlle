import { useState } from 'react'
import { hours, site } from '../data/site'
import { useRevealAll } from '../hooks/useReveal'
import Button from './ui/Button'
import Eyebrow from './ui/Eyebrow'
import { PinIcon } from './ui/Icons'
import OpenStatus from './ui/OpenStatus'

// Em ambientes que bloqueiam iframes (pré-visualização estática), o mapa abre o Google Maps em nova aba.
const STATIC_PREVIEW = import.meta.env.VITE_STATIC_PREVIEW === '1'

// Mapa estilizado; o Google Maps interativo é carregado sob demanda (mais leve e sem rastreamento antecipado).
function MapFrame() {
  const [active, setActive] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden border border-line bg-coal md:min-h-[560px]">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="rgb(239 231 218 / 0.08)" strokeWidth="1">
          {Array.from({ length: 14 }, (_, i) => (
            <path key={`h${i}`} d={`M-20 ${i * 48 + 10} C 180 ${i * 48 - 14}, 380 ${i * 48 + 30}, 620 ${i * 48 + 2}`} />
          ))}
          {Array.from({ length: 14 }, (_, i) => (
            <path key={`v${i}`} d={`M${i * 48 - 20} -20 C ${i * 48 + 18} 200, ${i * 48 - 22} 400, ${i * 48 + 10} 620`} />
          ))}
        </g>
        <g fill="none" stroke="rgb(182 154 106 / 0.28)" strokeWidth="1.4">
          <path d="M-20 360 C 140 330, 260 300, 620 250" />
          <path d="M210 -20 C 240 160, 290 320, 340 620" />
        </g>
      </svg>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_47%,transparent_0%,rgb(18_17_16/0.4)_45%,rgb(18_17_16/0.95)_100%)]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 px-6 text-center">
        <span className="relative flex size-16 items-center justify-center">
          <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full border border-gold/30 [animation-duration:2.8s]" />
          <span className="flex size-16 items-center justify-center rounded-full border border-gold/60 bg-ink/70 backdrop-blur">
            <PinIcon className="size-5 text-gold" />
          </span>
        </span>
        <div>
          <p className="font-serif text-2xl font-light text-cream">{site.address.street}</p>
          <p className="caption mt-2 text-[0.6rem] text-stone">
            {site.address.district} · {site.address.city}
          </p>
        </div>
        {STATIC_PREVIEW ? (
          <a
            href={site.links.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="caption link-underline py-2 text-[0.62rem] text-cream/80 transition-colors hover:text-cream"
          >
            Abrir no Google Maps
          </a>
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="caption link-underline py-2 text-[0.62rem] text-cream/80 transition-colors hover:text-cream"
          >
            Abrir mapa interativo
          </button>
        )}
      </div>

      {active && (
        <iframe
          title="Mapa: Restaurante Ferreiro, R. Tijucas, 388 – América, Joinville – SC"
          src={site.links.mapEmbed}
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-[1500ms] [filter:grayscale(1)_invert(0.92)_contrast(0.86)_sepia(0.18)_brightness(0.92)] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}

export default function Location() {
  const ref = useRevealAll()
  return (
    <section id="contato" ref={ref} aria-labelledby="loc-title" className="relative bg-ink px-5 py-32 md:px-10 md:py-44">
      <div className="mx-auto grid max-w-[1500px] gap-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="reveal">
            <Eyebrow index="10">Localização</Eyebrow>
          </div>
          <h2 id="loc-title" className="reveal mt-10 font-serif text-[2.4rem] font-light uppercase leading-none tracking-[0.12em] text-cream md:text-[2.8rem]" style={{ '--d': '100ms' }}>
            {site.fullName}
          </h2>
          <address className="reveal mt-8 font-serif text-[1.6rem] font-light not-italic leading-snug text-cream/85" style={{ '--d': '180ms' }}>
            {site.address.street}
            <br />
            {site.address.district}
            <br />
            {site.address.city}
          </address>
          <div className="reveal mt-10" style={{ '--d': '260ms' }}>
            <Button href={site.links.directions} variant="gold">
              Como chegar
            </Button>
          </div>

          <div className="reveal mt-16 border-t border-line pt-10" style={{ '--d': '320ms' }}>
            <div className="flex items-center justify-between gap-4">
              <h3 className="caption text-stone">Horários</h3>
              <OpenStatus className="text-stone" />
            </div>
            <dl className="mt-8 space-y-0">
              {hours.map((h) => (
                <div key={h.id} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-b border-line py-6 first:pt-0">
                  <dt className="caption text-gold/85">{h.label}</dt>
                  <dd className="row-span-2 font-serif text-[1.7rem] font-light text-cream">{h.time}</dd>
                  <dd className="mt-2 font-serif text-lg italic text-cream/70">{h.days}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="reveal-fade md:col-span-6 md:col-start-7" style={{ '--d': '200ms' }}>
          <MapFrame />
        </div>
      </div>
    </section>
  )
}
