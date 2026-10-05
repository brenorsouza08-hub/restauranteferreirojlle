const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.25, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const ArrowRight = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)

export const ArrowUpRight = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const InstagramIcon = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" />
  </svg>
)

export const WhatsAppIcon = ({ className = 'size-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M12.04 2.5a9.43 9.43 0 0 0-8.1 14.24L2.5 21.5l4.9-1.4A9.43 9.43 0 1 0 12.04 2.5Zm0 17.2a7.8 7.8 0 0 1-3.98-1.09l-.29-.17-2.9.83.85-2.82-.19-.3a7.78 7.78 0 1 1 6.5 3.55Zm4.28-5.83c-.23-.12-1.38-.68-1.6-.76-.21-.08-.37-.12-.53.12-.16.23-.6.76-.74.92-.14.15-.27.17-.5.06a6.37 6.37 0 0 1-3.18-2.78c-.24-.41.24-.38.69-1.27.08-.15.04-.29-.02-.4-.06-.12-.53-1.28-.73-1.75-.19-.46-.39-.4-.53-.4h-.45a.87.87 0 0 0-.63.29 2.65 2.65 0 0 0-.83 1.97 4.6 4.6 0 0 0 .96 2.44 10.5 10.5 0 0 0 4.03 3.56c1.5.65 2.08.7 2.83.6.46-.07 1.38-.57 1.58-1.12.2-.55.2-1.02.14-1.12-.06-.1-.21-.16-.44-.27Z" />
  </svg>
)

export const PinIcon = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
)

export const Star = ({ className = 'size-4', fill = 1 }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <defs>
      <linearGradient id={`star-${Math.round(fill * 100)}`}>
        <stop offset={fill} stopColor="currentColor" />
        <stop offset={fill} stopColor="currentColor" stopOpacity=".18" />
      </linearGradient>
    </defs>
    <path
      fill={`url(#star-${Math.round(fill * 100)})`}
      d="m12 3.2 2.6 5.6 6.1.7-4.5 4.2 1.2 6.1L12 16.8l-5.4 3 1.2-6.1-4.5-4.2 6.1-.7L12 3.2Z"
    />
  </svg>
)
