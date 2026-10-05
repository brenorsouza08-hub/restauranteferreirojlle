import { site } from '../data/site'
import { scrollToTarget } from '../lib/scroll'
import AnvilMark from './ui/AnvilMark'

const links = [
  { label: 'Instagram', href: site.instagram.url },
  { label: 'WhatsApp', href: site.links.contact },
  { label: 'Localização', href: site.links.directions },
  { label: 'Cardápio', href: '#cardapio' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-night px-5 pb-28 pt-24 md:px-10 md:pb-10 md:pt-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <AnvilMark className="h-10 w-auto text-cream" />
            <p className="mt-8 font-serif text-3xl tracking-[0.3em] text-cream">FERREIRO</p>
            <p className="caption mt-3 text-[0.6rem] text-gold/80">{site.cuisine}</p>
          </div>
          <address className="font-serif text-xl font-light not-italic leading-relaxed text-cream/80 md:col-span-3">
            {site.address.street} — {site.address.district}
            <br />
            Joinville — SC
          </address>
          <nav aria-label="Rodapé" className="md:col-span-3 md:col-start-10">
            <ul className="space-y-3">
              {links.map((l) => {
                const external = l.href.startsWith('http')
                return (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      onClick={(e) => {
                        if (!external) {
                          e.preventDefault()
                          scrollToTarget(l.href, -40)
                        }
                      }}
                      className="caption link-underline py-1 text-cream/80 transition-colors hover:text-cream"
                    >
                      {l.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <p
          aria-hidden="true"
          className="display mt-24 select-none whitespace-nowrap text-center text-[16.5vw] leading-[0.75] tracking-[0.02em] text-transparent [-webkit-text-stroke:1px_rgb(239_231_218/0.14)] md:mt-32"
        >
          FERREIRO
        </p>

        <div className="caption mt-10 flex flex-col gap-3 border-t border-line pt-8 text-[0.58rem] text-ash sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {site.fullName}</span>
          <span>Joinville • Santa Catarina</span>
        </div>
      </div>
    </footer>
  )
}
