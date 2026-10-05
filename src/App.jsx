import { useEffect } from 'react'
import Ambience from './components/Ambience'
import Drinks from './components/Drinks'
import Events from './components/Events'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Instagram from './components/Instagram'
import Location from './components/Location'
import Manifesto from './components/Manifesto'
import Menu from './components/Menu'
import Navbar from './components/Navbar'
import Reservation from './components/Reservation'
import Reviews from './components/Reviews'
import WhatsAppFloat from './components/WhatsAppFloat'
import Cursor from './components/ui/Cursor'
import { startScroll, stopScroll } from './lib/scroll'

export default function App() {
  useEffect(() => {
    startScroll()
    return stopScroll
  }, [])

  return (
    <>
      <a
        href="#conteudo"
        className="caption fixed left-4 top-4 z-[200] -translate-y-24 bg-cream px-5 py-3 text-ink transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        {/* imagem → texto → pausa → imagem → prato → bebida → ambiente → evento → reserva */}
        <Hero />
        <Manifesto />
        <Experience />
        <Menu />
        <Drinks />
        <Ambience />
        <Events />
        <Reviews />
        <Instagram />
        <Reservation />
        <Location />
      </main>
      <Footer />
      <WhatsAppFloat />
      <Cursor />
      <div aria-hidden="true" className="grain" />
    </>
  )
}
