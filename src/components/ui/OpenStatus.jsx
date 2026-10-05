import { useOpenStatus } from '../../hooks/useOpenStatus'

export default function OpenStatus({ className = '' }) {
  const status = useOpenStatus()
  if (!status) return null
  return (
    <p className={`caption flex items-center gap-3 text-[0.62rem] ${className}`} aria-live="polite">
      <span className="relative flex size-2">
        {status.open && <span className="absolute inset-0 animate-ping rounded-full bg-gold/60" />}
        <span className={`relative size-2 rounded-full ${status.open ? 'bg-gold' : 'bg-ash'}`} />
      </span>
      {status.label}
    </p>
  )
}
