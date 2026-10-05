import { useEffect, useRef, useState } from 'react'
import { images } from '../data/images'
import { dishes, site } from '../data/site'
import { useRevealAll } from '../hooks/useReveal'
import { onScroll, prefersReducedMotion } from '../lib/scroll'
import Button from './ui/Button'
import Eyebrow from './ui/Eyebrow'
import Photo from './ui/Photo'

const pad = (n) => String(n).padStart(2, '0')

// Três composições alternadas para dar ritmo editorial à galeria
const layouts = [
  { plate: 'w-[96%] -right-[34%] top-[13%]', light: 'at_78%_36%' },
  { plate: 'w-[96%] -left-[36%] top-[20%]', light: 'at_22%_42%' },
  { plate: 'w-[66%] left-[17%] top-[26%]', light: 'at_50%_45%' },
]

function DishCard({ dish, index, total }) {
  const layout = layouts[index % layouts.length]
  const wine = index % 4 === 1
  return (
    <article
      data-cursor="hover"
      className="group relative flex h-full shrink-0 snap-start flex-col overflow-hidden border border-line bg-coal transition-colors duration-1000 hover:border-gold/30"
    >
      {dish.image ? (
        <>
          <Photo image={dish.image} sizes="(min-width:1024px) 26vw, 78vw" className="zoom-frame absolute inset-0" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        </>
      ) : (
        <>
          {/* luz sobre a mesa */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-80 transition-opacity duration-1000 group-hover:opacity-100"
            style={{
              background: `radial-gradient(ellipse 75% 45% ${layout.light.replaceAll('_', ' ')}, ${
                wine ? 'rgb(90 31 36 / 0.42)' : 'rgb(182 154 106 / 0.16)'
              }, transparent 70%)`,
            }}
          />
          <div aria-hidden="true" className={`plate absolute ${layout.plate}`} />
        </>
      )}

      <header className="relative flex items-start justify-between px-6 pt-5 md:px-7 md:pt-6">
        <span className="font-serif text-[4.2rem] font-light italic leading-none text-gold/45 transition-colors duration-1000 group-hover:text-gold/80 md:text-[5rem]">
          {pad(index + 1)}
        </span>
        <span className="caption mt-4 text-[0.58rem] text-ash">
          {pad(index + 1)} / {pad(total)}
        </span>
      </header>

      <footer className="relative mt-auto bg-gradient-to-t from-coal via-coal/80 to-transparent px-6 pb-7 pt-16 md:px-7 md:pb-8">
        <span
          aria-hidden="true"
          className="mb-5 block h-px w-8 bg-gold/70 transition-[width] duration-1000 ease-[var(--ease-luxe)] group-hover:w-20"
        />
        <h3 className="font-serif text-[1.95rem] font-light leading-[1.05] text-cream transition-transform duration-1000 ease-[var(--ease-luxe)] group-hover:-translate-y-1 md:text-[2.3rem]">
          {dish.name}
        </h3>
      </footer>
    </article>
  )
}

function PhotoPanel({ image, caption, className = '' }) {
  return (
    <figure data-cursor="view" className={`group relative h-full shrink-0 snap-start overflow-hidden ${className}`}>
      <Photo image={image} sizes="(min-width:1024px) 45vw, 85vw" className="zoom-frame h-full w-full" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
      <figcaption className="caption absolute bottom-6 left-6 text-[0.6rem] text-cream/80">{caption}</figcaption>
    </figure>
  )
}

export default function Menu() {
  const ref = useRevealAll()
  const pin = useRef(null)
  const track = useRef(null)
  const bar = useRef(null)
  const [pinned, setPinned] = useState(false)
  const [height, setHeight] = useState(0)
  const [current, setCurrent] = useState(1)

  const half = Math.ceil(dishes.length / 2)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setPinned(mq.matches && !prefersReducedMotion())
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Rolagem horizontal fixada (desktop)
  useEffect(() => {
    if (!pinned) {
      if (track.current) track.current.style.transform = ''
      return
    }
    const measure = () => {
      const distance = track.current.scrollWidth - window.innerWidth
      setHeight(distance + window.innerHeight)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    window.addEventListener('resize', measure)
    const off = onScroll(() => {
      const r = pin.current.getBoundingClientRect()
      const distance = track.current.scrollWidth - window.innerWidth
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)))
      track.current.style.transform = `translate3d(${(-p * distance).toFixed(1)}px,0,0)`
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
      setCurrent(Math.min(dishes.length, Math.max(1, Math.round(p * (dishes.length - 1)) + 1)))
    })
    return () => {
      off()
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [pinned])

  const cardClass = 'w-[78vw] max-w-[360px] lg:w-[25vw] lg:max-w-[420px]'

  const panels = (
    <>
      <PhotoPanel image={images.pratos} caption="À mesa do Ferreiro" className="w-[86vw] lg:w-[44vw]" />
      {dishes.slice(0, half).map((d, i) => (
        <div key={d.name} className={`h-full shrink-0 ${cardClass}`}>
          <DishCard dish={d} index={i} total={dishes.length} />
        </div>
      ))}
      <PhotoPanel image={images.detalhe2} caption="Ítalo-Fusion" className="w-[86vw] lg:w-[34vw]" />
      {dishes.slice(half).map((d, i) => (
        <div key={d.name} className={`h-full shrink-0 ${cardClass}`}>
          <DishCard dish={d} index={half + i} total={dishes.length} />
        </div>
      ))}
      <div className="flex h-full w-[86vw] shrink-0 snap-start flex-col justify-center border border-line px-8 lg:w-[34vw] lg:px-14">
        <p className="caption text-gold/80">Cardápio</p>
        <p className="display mt-6 text-[clamp(2.2rem,3.4vw,3.6rem)] text-cream">
          A próxima descoberta <em className="text-gold/90">é sua.</em>
        </p>
        <div className="mt-10 flex flex-col gap-3">
          <Button href={site.links.reserve} variant="solid">
            Reservar
          </Button>
          <Button href={site.links.menu} variant="outline">
            Pedir o cardápio completo
          </Button>
        </div>
      </div>
    </>
  )

  return (
    <section id="cardapio" ref={ref} aria-labelledby="menu-title" className="relative bg-ink pt-12 md:pt-24">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <div className="reveal">
            <Eyebrow index="03">Cardápio</Eyebrow>
          </div>
          <h2 id="menu-title" className="display mt-10 text-[clamp(2.8rem,6.4vw,7rem)] uppercase text-cream">
            <span className="line-mask" data-reveal>
              <span>Uma cozinha</span>
            </span>
            <span className="line-mask" data-reveal style={{ '--d': '120ms' }}>
              <span>
                para <em className="normal-case text-gold/90">descobrir</em>
              </span>
            </span>
          </h2>
        </div>
        <div className="flex flex-col justify-end md:col-span-4 md:col-start-9">
          <p className="reveal font-serif text-[1.45rem] font-light italic leading-snug text-cream/80 md:text-[1.7rem]" style={{ '--d': '200ms' }}>
            Alguns dos sabores que fazem parte da experiência Ferreiro.
          </p>
          <p className="reveal caption mt-6 hidden text-[0.6rem] text-ash lg:block" style={{ '--d': '300ms' }}>
            Role para percorrer →
          </p>
          <p className="reveal caption mt-6 text-[0.6rem] text-ash lg:hidden" style={{ '--d': '300ms' }}>
            Deslize para o lado →
          </p>
        </div>
      </div>

      {pinned ? (
        <div ref={pin} className="relative mt-16" style={{ height: height || '300vh' }}>
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            <div
              ref={track}
              className="flex h-[min(72vh,700px)] gap-5 pl-10 pr-10 will-change-transform"
              aria-label="Pratos do cardápio"
            >
              {panels}
            </div>
            <div className="mx-10 mt-10 flex items-center gap-6">
              <span className="caption w-16 text-[0.6rem] text-cream/70">{pad(current)}</span>
              <div className="relative h-px flex-1 bg-line">
                <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-gold/70" />
              </div>
              <span className="caption w-16 text-right text-[0.6rem] text-ash">{pad(dishes.length)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={track}
          className="no-scrollbar mt-14 flex h-[min(118vw,560px)] snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-5 px-5 pb-2 md:gap-5 md:scroll-pl-10 md:px-10"
          aria-label="Pratos do cardápio"
          tabIndex={0}
        >
          {panels}
        </div>
      )}
      <div className="h-24 md:h-40" />
    </section>
  )
}
