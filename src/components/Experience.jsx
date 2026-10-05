import { images } from '../data/images'
import { site } from '../data/site'
import { useParallax } from '../hooks/useParallax'
import { useRevealAll } from '../hooks/useReveal'
import Button from './ui/Button'
import Eyebrow from './ui/Eyebrow'
import Photo from './ui/Photo'

const pillars = ['Cozinha Ítalo-Fusion', 'Ambiente acolhedor', 'Experiência gastronômica', 'Joinville • SC']

export default function Experience() {
  const ref = useRevealAll()
  const imgParallax = useParallax(0.08, { scale: 1.12 })
  const detailParallax = useParallax(-0.06)

  return (
    <section id="experiencia" ref={ref} aria-labelledby="exp-title" className="relative overflow-hidden bg-ink pb-32 md:pb-56">
      <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12 md:gap-0">
        {/* Fotografia principal (~55%) */}
        <div className="relative md:col-span-7 md:pr-6">
          <div className="clip-reveal relative aspect-[4/5] overflow-hidden md:aspect-auto md:h-[min(118vh,1100px)]">
            <div ref={imgParallax} className="absolute inset-0 will-change-transform">
              <Photo image={images.varanda} eager sizes="(min-width: 768px) 58vw, 100vw" className="h-full w-full" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />
          </div>
          <p className="caption absolute bottom-6 left-5 text-[0.6rem] text-cream/70 md:left-10">
            Ferreiro · {site.address.district}, Joinville
          </p>
        </div>

        {/* Texto */}
        <div className="relative flex flex-col justify-center px-5 md:col-span-5 md:px-10 lg:pl-16 xl:pl-24">
          <div className="reveal">
            <Eyebrow index="02">A experiência Ferreiro</Eyebrow>
          </div>
          <h2 id="exp-title" className="display mt-10 text-[clamp(2.6rem,4.6vw,5rem)] text-cream">
            <span className="line-mask" data-reveal>
              <span>Sabores que</span>
            </span>
            <span className="line-mask" data-reveal style={{ '--d': '120ms' }}>
              <span>
                pedem <em className="text-gold/90">tempo</em>.
              </span>
            </span>
          </h2>
          <p className="reveal mt-8 max-w-md text-[0.98rem] leading-[1.9] text-stone" style={{ '--d': '200ms' }}>
            Uma cozinha ítalo-fusion servida em um ambiente acolhedor, no bairro América, em Joinville. Um convite para
            sentar sem pressa e viver cada momento à mesa.
          </p>

          <ul className="mt-12 border-t border-line">
            {pillars.map((p, i) => (
              <li
                key={p}
                className="reveal group flex items-center justify-between border-b border-line py-5"
                style={{ '--d': `${250 + i * 90}ms` }}
              >
                <span className="caption text-cream transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:translate-x-2">
                  {p}
                </span>
                <span className="font-serif text-sm italic text-gold/80">0{i + 1}</span>
              </li>
            ))}
          </ul>

          <div className="reveal mt-12" style={{ '--d': '500ms' }}>
            <Button href={site.links.reserve} variant="gold">
              Reservar
            </Button>
          </div>

          {/* Detalhe sobreposto */}
          <div className="relative mt-20 hidden w-[72%] self-end lg:block">
            <div ref={detailParallax} className="will-change-transform">
              <div className="clip-reveal" style={{ '--d': '200ms' }}>
                <Photo image={images.detalhe1} eager sizes="22vw" className="zoom-frame aspect-[4/3]" />
              </div>
              <p className="caption mt-4 text-[0.6rem] text-ash">À mesa do Ferreiro</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
