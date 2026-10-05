import { reviews, site } from '../data/site'
import { useRevealAll } from '../hooks/useReveal'
import Eyebrow from './ui/Eyebrow'
import { Star } from './ui/Icons'

export default function Reviews() {
  const ref = useRevealAll()
  return (
    <section ref={ref} aria-labelledby="reviews-title" className="relative bg-ink px-5 py-32 md:px-10 md:py-52">
      <div className="mx-auto max-w-[1400px]">
        <div className="reveal">
          <Eyebrow index="07" align="center">
            Avaliações
          </Eyebrow>
        </div>

        <div className="mt-14 flex flex-col items-center text-center">
          <p className="reveal display flex items-start text-[clamp(7rem,22vw,17rem)] leading-[0.8] text-cream" style={{ '--d': '100ms' }}>
            <span className="sr-only">Nota </span>
            {site.rating.value}
            <Star className="ml-3 mt-[0.12em] size-[0.22em] text-gold md:ml-5" />
          </p>
          <div className="reveal mt-10 flex items-center gap-1.5 text-gold" style={{ '--d': '200ms' }} aria-hidden="true">
            {[1, 1, 1, 1, 0.8].map((f, i) => (
              <Star key={i} className="size-4" fill={f} />
            ))}
          </div>
          <p className="reveal caption mt-5 text-stone" style={{ '--d': '260ms' }}>
            {site.rating.count} avaliações no Google
          </p>

          <h2 id="reviews-title" className="display mt-20 max-w-4xl text-[clamp(2rem,4.2vw,4.2rem)] uppercase text-cream md:mt-28">
            <span className="line-mask" data-reveal>
              <span>Uma experiência reconhecida</span>
            </span>
            <span className="line-mask" data-reveal style={{ '--d': '120ms' }}>
              <span className="italic normal-case text-gold/90">por quem viveu.</span>
            </span>
          </h2>
        </div>

        <div className="mt-20 grid border-t border-line md:mt-28 md:grid-cols-3">
          {reviews.map((r, i) => (
            <figure
              key={r}
              className={`reveal flex flex-col justify-between gap-10 border-b border-line py-12 md:border-b-0 md:px-10 md:py-16 ${
                i > 0 ? 'md:border-l' : ''
              }`}
              style={{ '--d': `${i * 140}ms` }}
            >
              <div>
                <span aria-hidden="true" className="block font-serif text-7xl italic leading-[0.5] text-gold/60">
                  “
                </span>
                <blockquote className="mt-6 font-serif text-[1.6rem] font-light italic leading-[1.3] text-cream md:text-[1.75rem]">
                  {r}
                </blockquote>
              </div>
              <figcaption className="caption flex items-center gap-3 text-[0.6rem] text-ash">
                <span aria-hidden="true" className="h-px w-6 bg-gold/50" />
                Avaliação no Google
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
