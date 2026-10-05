# Restaurante Ferreiro — site-conceito

Site-conceito premium do **Restaurante Ferreiro** (Cozinha Ítalo-Fusion · R. Tijucas, 388 – América, Joinville – SC).
Direção visual *Dark Luxury + Editorial Gastronomy*.

## Stack

- React 19 + Vite
- Tailwind CSS v4 (tokens de cor e tipografia em `src/index.css`)
- Lenis (rolagem suave) + IntersectionObserver para as revelações
- Fontes auto-hospedadas: Cormorant Garamond (editorial) e Manrope (legendas)

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera /dist (caminhos relativos, pode ser hospedado em qualquer pasta)
npm run preview
```

## Estrutura

```
src/
  data/site.js        ← todas as informações do restaurante (contatos, horários, pratos, bebidas, avaliações)
  data/images.js      ← fotografias usadas no site
  components/         ← uma seção por arquivo (Hero, Manifesto, Experience, Menu, Drinks, Ambience,
                        Events, Reviews, Instagram, Reservation, Location, Footer)
  components/ui/      ← peças reutilizáveis (Button, Eyebrow, Photo, Cursor, ScrollWords, ícones…)
  hooks/              ← revelação no scroll, parallax, status "aberto agora"
  lib/scroll.js       ← rolagem suave e laço de animação compartilhado
```

## Conteúdo

Todo o texto vem de informações reais fornecidas (endereço, WhatsApp, Instagram, nota 4,8 com 251 avaliações,
faixa de preço, horários, pratos, bebidas e avaliações). Nada sobre chef, história, prêmios, ingredientes,
capacidade ou estrutura de eventos foi criado.

O indicador "Aberto agora / Fechado agora" é calculado a partir dos horários informados, no fuso de Joinville.

## Fotografias

As fotos são do perfil oficial do restaurante no Instagram, recortadas (sem logotipos ou setas do carrossel)
e tratadas com uma gradação mais escura e quente. Por virem de capturas de tela, têm resolução limitada.
Para a versão final, recomenda-se usar os arquivos originais em alta resolução.

**Pratos do cardápio:** como ainda não há uma fotografia específica de cada prato, os cards exibem um "prato"
abstrato, desenhado em CSS. Para usar fotos reais, basta preencher o campo `image` de cada prato em
`src/data/site.js`. O card passa a exibir a fotografia automaticamente:

```js
import risotto from '../assets/pratos/risotto.webp'
{ name: 'Risotto', image: { src: risotto, width: 1200, height: 1500, alt: 'Risotto do Restaurante Ferreiro' } }
```

## Acessibilidade e desempenho

- HTML semântico, link "pular para o conteúdo", foco visível, `aria-*` no menu mobile (fecha com Esc)
- `prefers-reduced-motion` desliga rolagem suave, parallax e animações
- Imagens em WebP com `srcset`, lazy-loading e fade-in; mapa do Google carregado só sob demanda
- SEO: título, descrição, Open Graph e dados estruturados `Restaurant` (JSON-LD)
