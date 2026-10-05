import { useEffect, useRef, useState } from 'react'
import { nav, site } from '../data/site'
import { lockScroll, onScroll, scrollToTarget } from '../lib/scroll'
import AnvilMark from './ui/AnvilMark'
import { InstagramIcon, WhatsAppIcon } from './ui/Icons'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const last = useRef(0)
  const menuBtn = useRef(null)

  useEffect(
    () =>
      onScroll((y) => {
        setScrolled(y > 40)
        const goingDown = y > last.current
        setHidden(goingDown && y > window.innerHeight * 1.1 && Math.abs(y - last.current) > 2)
        if (Math.abs(y - last.current) > 2) last.current = y
      }),
    [],
  )

  // Destaca o link da seção visível
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1))
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (href) => (e) => {
    e.preventDefault()
    setOpen(false)
    // aguarda o menu fechar para liberar a rolagem
    setTimeout(() => scrollToTarget(href, -40), open ? 350 : 0)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,backdrop-filter] duration-700 ease-[var(--ease-luxe)] ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled && !open
            ? 'border-b border-line bg-ink/55 backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Principal"
          className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-[padding] duration-700 ease-[var(--ease-luxe)] md:px-10 ${
            scrolled ? 'py-3.5' : 'py-5 md:py-7'
          }`}
        >
          <a href="#top" onClick={go('#top')} className="group flex items-center gap-3 text-cream" aria-label="Ferreiro — início">
            <AnvilMark className="h-7 w-auto transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:-rotate-6" />
            <span className="font-serif text-[1.45rem] font-normal tracking-[0.34em] leading-none">FERREIRO</span>
          </a>

          <ul className="hidden items-center gap-9 lg:flex xl:gap-12">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={go(item.href)}
                  aria-current={active === item.href ? 'true' : undefined}
                  className={`caption link-underline py-2 transition-colors duration-500 hover:text-cream ${
                    active === item.href ? 'text-cream' : 'text-cream/70'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={site.links.reserve}
              target="_blank"
              rel="noopener noreferrer"
              className="group/r caption relative hidden overflow-hidden border border-cream/35 px-6 py-3 text-cream transition-colors duration-700 hover:border-cream sm:inline-flex"
            >
              <span className="absolute inset-0 translate-y-[101%] bg-cream transition-transform duration-[900ms] ease-[var(--ease-luxe)] group-hover/r:translate-y-0" />
              <span className="relative transition-colors duration-700 group-hover/r:text-ink">Reservar</span>
            </a>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="flex h-12 min-w-12 items-center justify-center gap-3 px-1 text-cream lg:hidden"
            >
              <span className="caption hidden text-[0.65rem] min-[380px]:inline">{open ? 'Fechar' : 'Menu'}</span>
              <span className="relative block h-3 w-7" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-cream transition-transform duration-500 ${open ? 'translate-y-1.5 rotate-45' : ''}`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px bg-cream transition-all duration-500 ${open ? 'w-full -translate-y-1.5 -rotate-45' : 'w-4'}`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Menu mobile em tela cheia */}
      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-40 flex flex-col bg-ink transition-[opacity,visibility] duration-700 ease-[var(--ease-luxe)] lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex flex-1 flex-col justify-center px-6 pt-24">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <a
                  href={item.href}
                  onClick={go(item.href)}
                  tabIndex={open ? 0 : -1}
                  style={{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }}
                  className={`flex items-baseline gap-5 py-2 font-serif text-[2.6rem] font-light leading-tight text-cream transition-transform duration-1000 ease-[var(--ease-luxe)] ${
                    open ? 'translate-y-0' : 'translate-y-full'
                  }`}
                >
                  <span className="font-serif text-base italic text-gold">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`space-y-6 border-t border-line px-6 py-8 transition-opacity delay-300 duration-1000 ${open ? 'opacity-100' : 'opacity-0'}`}
        >
          <a
            href={site.links.reserve}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            className="caption flex min-h-14 w-full items-center justify-center gap-3 bg-cream text-ink"
          >
            <WhatsAppIcon className="size-4" /> Reservar uma experiência
          </a>
          <div className="caption flex items-center justify-between text-stone">
            <span>Joinville • SC</span>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="flex items-center gap-2 text-cream"
            >
              <InstagramIcon /> Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
