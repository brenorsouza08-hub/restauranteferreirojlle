import { images } from '../data/images'
import { drinks } from '../data/site'
import { useParallax } from '../hooks/useParallax'
import { useRevealAll } from '../hooks/useReveal'
import Eyebrow from './ui/Eyebrow'
import Photo from './ui/Photo'

export default function Drinks() {
  const ref = useRevealAll()
  const par = useParallax(0.07, { scale: 1.12 })
  return (
    <section ref={ref} aria-labelledby="drinks-title" className="relative overflow-hidden bg-night py-32 md:py-52">
      {/* brilho bordô muito discreto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[20%] top-1/4 h-[70vh] w-[70vw] bg-[radial-gradient(closest-side,rgb(90_31_36/0.28),transparent)]"
      />
      <div className="relative mx-auto grid max-w-[1500px] gap-16 px-5 md:grid-cols-12 md:gap-10 md:px-10">
        <div className="md:col-span-5">
          <div className="clip-reveal relative aspect-[4/5] overflow-hidden md:sticky md:top-28">
            <div ref={par} className="absolute inset-0 will-change-transform">
              <Photo image={images.taca} eager sizes="(min-width:768px) 40vw, 100vw" className="h-full w-full" imgClassName="brightness-[0.8] saturate-[0.85]" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/40" />
            <p className="caption absolute bottom-6 left-6 text-[0.6rem] text-cream/70">Taças à mesa</p>
          </div>
        </div>

        <div className="flex flex-col justify-center md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
          <div className="reveal">
            <Eyebrow index="04">Bebidas</Eyebrow>
          </div>
          <h2 id="drinks-title" className="display mt-10 text-[clamp(2rem,4vw,4.4rem)] uppercase text-cream">
            <span className="line-mask" data-reveal>
              <span>O acompanhamento</span>
            </span>
            <span className="line-mask" data-reveal style={{ '--d': '120ms' }}>
              <span className="italic normal-case text-gold/90">perfeito.</span>
            </span>
          </h2>

          <ul className="mt-14 border-t border-line md:mt-20">
            {drinks.map((d, i) => (
              <li key={d} className="reveal border-b border-line" style={{ '--d': `${150 + i * 90}ms` }}>
                <div className="group flex items-baseline gap-6 py-6 md:py-7" data-cursor="hover">
                  <span className="w-8 font-serif text-base italic text-gold/70">0{i + 1}</span>
                  <span className="font-serif text-[1.9rem] font-light leading-none text-cream transition-[transform,color] duration-1000 ease-[var(--ease-luxe)] group-hover:translate-x-3 group-hover:italic group-hover:text-ivory md:text-[2.6rem]">
                    {d}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto h-px w-0 self-center bg-gold/60 transition-[width] duration-1000 ease-[var(--ease-luxe)] group-hover:w-16"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
