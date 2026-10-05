import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { onScroll } from '../lib/scroll'
import { WhatsAppIcon } from './ui/Icons'

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)
  useEffect(() => onScroll((y) => setVisible(y > window.innerHeight * 0.7)), [])

  return (
    <a
      href={site.links.reserve}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Reservar pelo WhatsApp"
      data-cursor="hover"
      className={`group fixed bottom-5 right-5 z-[60] flex items-center gap-3 transition-[opacity,transform] duration-700 ease-[var(--ease-luxe)] md:bottom-8 md:right-8 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      tabIndex={visible ? 0 : -1}
    >
      <span className="caption hidden translate-x-2 bg-ink/80 px-4 py-3 text-cream opacity-0 backdrop-blur-md transition-all duration-700 ease-[var(--ease-luxe)] group-hover:translate-x-0 group-hover:opacity-100 md:block">
        Reservar
      </span>
      <span className="flex size-14 items-center justify-center rounded-full border border-gold/50 bg-ink/85 text-cream shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors duration-700 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
        <WhatsAppIcon className="size-[22px]" />
      </span>
    </a>
  )
}
