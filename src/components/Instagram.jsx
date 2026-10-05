import { images } from '../data/images'
import { site } from '../data/site'
import { useRevealAll } from '../hooks/useReveal'
import Button from './ui/Button'
import Eyebrow from './ui/Eyebrow'
import { InstagramIcon } from './ui/Icons'
import Photo from './ui/Photo'

// Grade assimétrica: uma fotografia dominante + quatro detalhes
const tiles = [
  { image: images.salao, className: 'col-span-2 aspect-square md:row-span-2 md:aspect-auto' },
  { image: images.detalhe1, className: 'aspect-square' },
  { image: images.detalhe3, className: 'aspect-square' },
  { image: images.lounge, className: 'aspect-square' },
  { image: images.detalhe2, className: 'aspect-square' },
]

export default function Instagram() {
  const ref = useRevealAll()
  return (
    <section id="galeria" ref={ref} aria-labelledby="ig-title" className="relative bg-ink px-5 pb-32 md:px-10 md:pb-52">
      <div className="mx-auto max-w-[1600px] border-t border-line pt-24 md:pt-36">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="reveal">
              <Eyebrow index="08">Galeria</Eyebrow>
            </div>
            <h2 id="ig-title" className="display mt-10 text-[clamp(2.5rem,5.6vw,6rem)] uppercase text-cream">
              <span className="line-mask" data-reveal>
                <span>Ferreiro,</span>
              </span>
              <span className="line-mask" data-reveal style={{ '--d': '120ms' }}>
                <span className="italic normal-case text-gold/90">pelo nosso olhar.</span>
              </span>
            </h2>
          </div>
          <div className="reveal md:col-span-4 md:text-right" style={{ '--d': '200ms' }}>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-serif text-2xl italic text-cream/85 md:text-3xl"
            >
              {site.instagram.handle}
            </a>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-2 md:mt-20 md:grid-cols-4 md:gap-3">
          {tiles.map((t, i) => (
            <a
              key={i}
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view"
              aria-label={`${t.image.alt} — ver no Instagram`}
              className={`clip-reveal group relative block overflow-hidden ${t.className}`}
              style={{ '--d': `${i * 110}ms` }}
            >
              <Photo image={t.image} eager sizes={i === 0 ? '(min-width:768px) 50vw, 100vw' : '(min-width:768px) 25vw, 50vw'} className="zoom-frame absolute inset-0 h-full w-full" />
              <span aria-hidden="true" className="absolute inset-0 bg-ink/0 transition-colors duration-1000 group-hover:bg-ink/45" />
              <span
                aria-hidden="true"
                className="caption absolute bottom-5 left-5 flex translate-y-3 items-center gap-2 text-[0.6rem] text-cream opacity-0 transition-all duration-700 ease-[var(--ease-luxe)] group-hover:translate-y-0 group-hover:opacity-100"
              >
                <InstagramIcon className="size-3.5" /> Ver no Instagram
              </span>
            </a>
          ))}
        </div>

        <div className="reveal mt-14 flex justify-center md:mt-20">
          <Button href={site.instagram.url} variant="outline">
            Seguir no Instagram
          </Button>
        </div>
      </div>
    </section>
  )
}
