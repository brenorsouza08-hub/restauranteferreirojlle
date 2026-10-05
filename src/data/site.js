// Informações reais do Restaurante Ferreiro.
// Todo o conteúdo do site sai daqui — nada é inventado nos componentes.

const WHATSAPP_NUMBER = '5547999008643'

export const whatsapp = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`

export const site = {
  name: 'Ferreiro',
  fullName: 'Restaurante Ferreiro',
  cuisine: 'Cozinha Ítalo-Fusion',
  tagline: 'Uma experiência que começa à mesa.',
  city: 'Joinville',
  state: 'Santa Catarina',
  address: {
    street: 'R. Tijucas, 388',
    district: 'América',
    city: 'Joinville – SC',
  },
  phoneDisplay: '+55 47 99900-8643',
  instagram: {
    handle: '@restauranteferreirojlle',
    url: 'https://www.instagram.com/restauranteferreirojlle/',
  },
  rating: { value: '4,8', count: 251 },
  priceRange: 'R$ 100–200 por pessoa',
  links: {
    reserve: whatsapp('Olá! Gostaria de fazer uma reserva no Restaurante Ferreiro.'),
    event: whatsapp('Olá! Gostaria de conversar sobre um evento no espaço privativo do Restaurante Ferreiro.'),
    contact: whatsapp('Olá! Gostaria de falar com o Restaurante Ferreiro.'),
    menu: whatsapp('Olá! Gostaria de conhecer o cardápio completo do Restaurante Ferreiro.'),
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=' +
      encodeURIComponent('Restaurante Ferreiro, R. Tijucas, 388 - América, Joinville - SC'),
    mapEmbed:
      'https://www.google.com/maps?q=' +
      encodeURIComponent('R. Tijucas, 388 - América, Joinville - SC') +
      '&z=16&output=embed',
  },
}

// day: 0 = domingo … 6 = sábado
export const hours = [
  { id: 'almoco', label: 'Almoço', days: 'Sábado e Domingo', time: '12h — 15h', weekdays: [6, 0], open: 12, close: 15 },
  { id: 'jantar', label: 'Jantar', days: 'Terça a Sábado', time: '19h — 23h', weekdays: [2, 3, 4, 5, 6], open: 19, close: 23 },
]

export const nav = [
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Contato', href: '#contato' },
]

// `image`: substituir pela fotografia oficial de cada prato quando disponível
// (ex.: import risotto from '../assets/pratos/risotto.webp').
export const dishes = [
  { name: 'Risotto', image: null },
  { name: 'Tartar de Mignon', image: null },
  { name: 'Spaghetti de Bacalhau Alla Putanesca', image: null },
  { name: 'Banana com Queijo Coalho e Melado', image: null },
  { name: 'Panceta Glaceada', image: null },
  { name: 'Boeuf Bourguignon', image: null },
  { name: 'Risoto de Ostra com Morango', image: null },
  { name: 'Atum em Crosta de Torresmo', image: null },
  { name: 'Foie Gras', image: null },
  { name: 'Gnocchi', image: null },
  { name: 'Spätzle', image: null },
  { name: 'Ravioli', image: null },
]

export const drinks = ['Aperol Spritz', 'Primitivo de Puglia', 'Sangria', 'Moscow Mule', 'Suco de Abacaxi']

export const reviews = [
  'Ambiente aconchegante, comida deliciosa e ótimo serviço.',
  'Ótimas opções de pratos executivos no almoço a preço justo.',
  'O único arrependimento foi ter pedido o “prato kids” pra minha filha (5 anos).',
]
