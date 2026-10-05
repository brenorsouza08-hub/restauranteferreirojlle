import { useEffect, useRef, useState } from 'react'
import { images } from '../data/images'
import { site } from '../data/site'
import { onScroll, prefersReducedMotion, scrollToTarget } from '../lib/scroll'
import Button from './ui/Button'
import { Star } from './ui/Icons'

const TITLE = 'FERREIRO'

export default function Hero() {
  const [ready, setReady] = useState(false)
  const media = useRef(null)
  const content = useRef(null)

  useEffect(() => {
    // garante a sequência mesmo se a imagem demorar
    const t = setTimeout(() => setReady(true), 1400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return
    return onScroll((y) => {
      const vh = window.innerHeight
      if (y > vh * 1.2) return
      if (media.current) media.current.style.transform = `translate3d(0, ${y * 0.22}px, 0)`
      if (content.current) {
        content.current.style.transform = `translate3d(0, ${y * 0.1}px, 0)`
        content.current.style.opacity = String(Math.max(0, 1 - y / (vh * 0.75)))
      }
    })
  }, [])

  const s = (delay) => ({ transitionDelay: `${delay}ms` })
  const on = ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'

  return (
    <section id="top" aria-label="Apresentação" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink">
      {/* Fotografia */}
      <div ref={media} className="absolute inset-0 will-change-transform">
        <div
          className={`absolute inset-0 transition-[opacity,transform] duration-[3400ms] ease-[var(--ease-luxe)] ${
            ready ? 'scale-[1.04] opacity-100' : 'scale-[1.16] opacity-0'
          }`}
        >
          <picture>
            <source media="(max-width: 767px)" srcSet={images.heroMobile.src} />
            <img
              src={images.hero.src}
              srcSet={images.hero.srcSet}
              sizes="100vw"
              alt={images.hero.alt}
              fetchPriority="high"
              decoding="async"
              onLoad={() => setReady(true)}
              ref={(el) => {
                if (el?.complete && el.naturalWidth) setReady(true)
              }}
              className="absolute inset-0 h-full w-full object-cover object-[50%_60%]"
            />
          </picture>
          {/* profundidade de campo: bordas desfocadas */}
          <picture aria-hidden="true">
            <source media="(max-width: 767px)" srcSet={images.heroMobile.src} />
            <img
              src={images.hero.src}
              srcSet={images.hero.srcSet}
              sizes="100vw"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[50%_60%] blur-[7px] [mask-image:radial-gradient(ellipse_62%_55%_at_50%_58%,transparent_40%,black_85%)]"
            />
          </picture>
        </div>
      </div>

      {/* Luz e sombra */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink/50" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_55%,transparent_0%,rgb(11_10_9/0.55)_65%,rgb(11_10_9/0.92)_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/80 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-soft-light bg-[radial-gradient(ellipse_50%_40%_at_20%_40%,rgb(182_154_106/0.35),transparent_70%)]"
      />

      {/* Conteúdo */}
      <div ref={content} className="relative z-10 flex h-full flex-col items-center justify-center px-5 pt-10 text-center will-change-transform">
        <h1 className="display text-cream" aria-label={`${site.name} — ${site.cuisine}`}>
          <span aria-hidden="true" className="flex justify-center text-[clamp(3.4rem,16.5vw,14.5rem)] tracking-[0.06em]">
            {TITLE.split('').map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.06em]">
                <span
                  className={`inline-block transition-transform duration-[1700ms] ease-[var(--ease-luxe)] ${
                    ready ? 'translate-y-0' : 'translate-y-[105%]'
                  }`}
                  style={s(450 + i * 75)}
                >
                  {ch}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <div className={`mt-5 flex items-center gap-4 transition-all duration-[1600ms] ease-[var(--ease-luxe)] md:mt-7 ${on}`} style={s(1250)}>
          <span aria-hidden="true" className="h-px w-8 bg-gold/70 md:w-14" />
          <p className="caption text-[0.68rem] text-cream/90 md:text-xs">{site.cuisine}</p>
          <span aria-hidden="true" className="h-px w-8 bg-gold/70 md:w-14" />
        </div>

        <p
          className={`mt-8 max-w-xl font-serif text-[1.65rem] font-light italic leading-snug text-cream/90 transition-all duration-[1600ms] ease-[var(--ease-luxe)] md:mt-10 md:text-[2.1rem] ${on}`}
          style={s(1550)}
        >
          {site.tagline}
        </p>

        <div
          className={`mt-10 flex w-full max-w-sm flex-col gap-3 transition-all duration-[1600ms] ease-[var(--ease-luxe)] sm:w-auto sm:max-w-none sm:flex-row sm:gap-4 md:mt-12 ${on}`}
          style={s(1900)}
        >
          <Button href={site.links.reserve} variant="solid">
            Reservar uma experiência
          </Button>
          <Button href="#cardapio" variant="outline">
            Explorar o cardápio
          </Button>
        </div>
      </div>

      {/* Rodapé do hero */}
      <div
        className={`absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-[1600px] items-end justify-between px-5 pb-6 transition-opacity duration-[2000ms] md:px-10 md:pb-9 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
        style={s(2400)}
      >
        <p className="caption text-[0.62rem] text-cream/60">Joinville • Santa Catarina</p>
        <button
          type="button"
          onClick={() => scrollToTarget('#manifesto')}
          className="absolute left-1/2 bottom-6 hidden -translate-x-1/2 flex-col items-center gap-3 text-cream/60 md:flex md:bottom-9"
          aria-label="Rolar para a próxima seção"
        >
          <span className="caption text-[0.6rem]">Role</span>
          <span className="scroll-cue" />
        </button>
        <p className="caption flex items-center gap-2 text-[0.62rem] text-cream/60">
          <Star className="size-3 text-gold" /> {site.rating.value} · Google
        </p>
      </div>
    </section>
  )
}
