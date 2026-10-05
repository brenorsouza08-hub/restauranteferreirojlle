import { useState } from 'react'

// Fotografia com fade-in suave ao carregar.
// `eager`: para fotos dentro de máscaras (clip-path), que o lazy-loading nativo não detecta como visíveis.
export default function Photo({ image, sizes = '100vw', className = '', imgClassName = '', priority = false, eager = false, ...rest }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`relative overflow-hidden bg-graphite ${className}`} {...rest}>
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={image.srcSet ? sizes : undefined}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={priority || eager ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : eager ? 'low' : undefined}
        decoding="async"
        ref={(el) => {
          if (el?.complete && el.naturalWidth && !loaded) setLoaded(true)
        }}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[opacity,filter,transform] duration-[1800ms] ease-[var(--ease-soft)] ${
          loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
        } ${imgClassName}`}
      />
    </div>
  )
}
