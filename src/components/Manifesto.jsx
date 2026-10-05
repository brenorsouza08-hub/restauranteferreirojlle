import { useRevealAll } from '../hooks/useReveal'
import AnvilMark from './ui/AnvilMark'
import Eyebrow from './ui/Eyebrow'
import ScrollWords from './ui/ScrollWords'

export default function Manifesto() {
  const ref = useRevealAll()
  return (
    <section id="manifesto" ref={ref} aria-labelledby="manifesto-title" className="relative bg-ink px-5 py-36 md:px-10 md:py-60">
      <div className="mx-auto max-w-[1400px]">
        <div className="reveal">
          <Eyebrow index="01">Manifesto</Eyebrow>
        </div>

        <h2 id="manifesto-title" className="display mt-14 text-[clamp(2.7rem,7.4vw,8rem)] uppercase text-cream md:mt-20">
          <span className="line-mask reveal-line" data-reveal>
            <span>Mais do que</span>
          </span>
          <span className="line-mask reveal-line" data-reveal style={{ '--d': '120ms' }}>
            <span>uma refeição.</span>
          </span>
          <span className="line-mask reveal-line md:pl-[16%]" data-reveal style={{ '--d': '260ms' }}>
            <span className="italic text-gold/90">Uma experiência.</span>
          </span>
        </h2>

        <div className="mt-20 grid gap-12 md:mt-32 md:grid-cols-12">
          <div className="reveal-fade hidden items-start md:col-span-4 md:flex" data-reveal>
            <div className="flex flex-col items-center gap-6 pl-2 text-cream/70">
              <AnvilMark className="h-12 w-auto" />
              <span className="h-28 w-px bg-gradient-to-b from-gold/60 to-transparent" />
            </div>
          </div>
          <ScrollWords
            className="font-serif text-[1.65rem] font-light leading-[1.35] text-cream md:col-span-8 md:text-[2.4rem] lg:text-[2.75rem]"
            text="O Ferreiro apresenta uma proposta de cozinha ítalo-fusion em um ambiente pensado para transformar uma refeição em experiência."
          />
        </div>
      </div>
    </section>
  )
}
