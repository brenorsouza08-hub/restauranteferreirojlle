// Fotografias reais do Restaurante Ferreiro (perfil oficial no Instagram),
// recortadas e tratadas para o site.
import hero960 from '../assets/img/hero-960.webp'
import hero1800 from '../assets/img/hero-1800.webp'
import heroMobile from '../assets/img/hero-m-780.webp'
import salao720 from '../assets/img/salao-720.webp'
import salao1200 from '../assets/img/salao-1200.webp'
import salaoWide1100 from '../assets/img/salao-wide-1100.webp'
import salaoWide1800 from '../assets/img/salao-wide-1800.webp'
import varanda720 from '../assets/img/varanda-720.webp'
import varanda1300 from '../assets/img/varanda-1300.webp'
import lounge720 from '../assets/img/lounge-720.webp'
import lounge1200 from '../assets/img/lounge-1200.webp'
import pratos700 from '../assets/img/pratos-700.webp'
import pratos1000 from '../assets/img/pratos-1000.webp'
import taca from '../assets/img/taca-760.webp'
import detalhe1 from '../assets/img/detalhe-1-620.webp'
import detalhe2 from '../assets/img/detalhe-2-640.webp'
import detalhe3 from '../assets/img/detalhe-3-640.webp'

const img = (src, w, h, alt, srcSet) => ({ src, width: w, height: h, alt, srcSet })

export const images = {
  hero: img(hero1800, 1800, 829, 'Mesa do Restaurante Ferreiro com diversos pratos servidos', `${hero960} 960w, ${hero1800} 1800w`),
  heroMobile: img(heroMobile, 780, 1001, 'Pratos servidos à mesa do Restaurante Ferreiro'),
  salao: img(salao1200, 1200, 1415, 'Salão do Restaurante Ferreiro com piso de madeira, mezanino e pé-direito alto', `${salao720} 720w, ${salao1200} 1200w`),
  salaoWide: img(salaoWide1800, 1800, 1434, 'Salão principal do Restaurante Ferreiro', `${salaoWide1100} 1100w, ${salaoWide1800} 1800w`),
  varanda: img(varanda1300, 1300, 1435, 'Ambiente envidraçado do Restaurante Ferreiro com mesas postas', `${varanda720} 720w, ${varanda1300} 1300w`),
  lounge: img(lounge1200, 1200, 1438, 'Ambiente com poltronas de veludo verde no Restaurante Ferreiro', `${lounge720} 720w, ${lounge1200} 1200w`),
  pratos: img(pratos1000, 1000, 809, 'Pratos do Restaurante Ferreiro servidos à mesa', `${pratos700} 700w, ${pratos1000} 1000w`),
  taca: img(taca, 760, 650, 'Mesa posta com taças no Restaurante Ferreiro'),
  detalhe1: img(detalhe1, 620, 454, 'Prato servido no Restaurante Ferreiro'),
  detalhe2: img(detalhe2, 640, 444, 'Pratos servidos no Restaurante Ferreiro'),
  detalhe3: img(detalhe3, 640, 388, 'Pratos à mesa do Restaurante Ferreiro'),
}
