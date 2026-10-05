import { useRef } from 'react'
import { scrollToTarget } from '../../lib/scroll'
import { ArrowRight, ArrowUpRight } from './Icons'

const variants = {
  solid: 'bg-cream text-ink border-cream',
  outline: 'bg-transparent text-cream border-cream/35 hover:border-cream',
  gold: 'bg-transparent text-cream border-gold/60 hover:border-gold',
}

const fills = {
  solid: 'bg-ivory',
  outline: 'bg-cream',
  gold: 'bg-gold',
}

const hoverText = {
  solid: '',
  outline: 'group-hover/btn:text-ink',
  gold: 'group-hover/btn:text-ink',
}

// Botão-link com preenchimento que sobe suavemente e leve efeito magnético.
export default function Button({ href, children, variant = 'outline', icon = 'arrow', className = '', ...rest }) {
  const ref = useRef(null)
  const external = /^https?:/.test(href)
  const isAnchor = href?.startsWith('#')

  const onClick = (e) => {
    if (isAnchor) {
      e.preventDefault()
      scrollToTarget(href, -40)
    }
    rest.onClick?.(e)
  }

  const onMove = (e) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) / r.width
    const y = (e.clientY - r.top - r.height / 2) / r.height
    el.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  const Icon = external ? ArrowUpRight : ArrowRight

  return (
    <a
      ref={ref}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      className={`group/btn relative inline-flex min-h-[52px] items-center justify-center gap-4 overflow-hidden border px-7 py-4 transition-[transform,border-color,color] duration-700 ease-[var(--ease-luxe)] ${variants[variant]} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 translate-y-[101%] transition-transform duration-[900ms] ease-[var(--ease-luxe)] group-hover/btn:translate-y-0 ${fills[variant]}`}
      />
      <span className={`caption relative z-10 transition-colors duration-700 ${hoverText[variant]}`}>{children}</span>
      {icon && (
        <span className={`relative z-10 transition-[transform,color] duration-700 ease-[var(--ease-luxe)] group-hover/btn:translate-x-1 ${hoverText[variant]}`}>
          <Icon className="size-4" />
        </span>
      )}
    </a>
  )
}

// Link textual com underline animado.
export function TextLink({ href, children, className = '' }) {
  const external = /^https?:/.test(href)
  const isAnchor = href?.startsWith('#')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={(e) => {
        if (isAnchor) {
          e.preventDefault()
          scrollToTarget(href, -40)
        }
      }}
      data-cursor="hover"
      className={`caption group/tl inline-flex items-center gap-3 py-3 text-cream ${className}`}
    >
      <span className="link-underline">{children}</span>
      <ArrowRight className="size-4 transition-transform duration-700 ease-[var(--ease-luxe)] group-hover/tl:translate-x-1.5" />
    </a>
  )
}
