// Pequena legenda editorial: número da seção + linha fina + título.
export default function Eyebrow({ index, children, className = '', align = 'left' }) {
  return (
    <div className={`caption flex items-center gap-4 text-stone ${align === 'center' ? 'justify-center' : ''} ${className}`}>
      {index && <span className="font-serif text-[0.95rem] italic tracking-normal text-gold normal-case">{index}</span>}
      <span aria-hidden="true" className="h-px w-10 bg-gold/50" />
      <span>{children}</span>
      {align === 'center' && <span aria-hidden="true" className="h-px w-10 bg-gold/50" />}
    </div>
  )
}
