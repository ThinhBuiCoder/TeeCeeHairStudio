import { business } from '@/config/business'
import { cn } from '@/lib/cn'

interface WordmarkProps {
  /** light = chữ tối trên nền sáng; dark = chữ sáng trên nền tối. */
  tone?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: { main: 'text-xl tracking-[0.34em]', sub: 'text-[0.5625rem] tracking-[0.24em]' },
  md: { main: 'text-2xl tracking-[0.36em]', sub: 'text-[0.65rem] tracking-[0.26em]' },
  lg: { main: 'text-4xl tracking-[0.38em]', sub: 'text-sm tracking-[0.28em]' },
} as const

// TODO: thay bằng file logo vector thật khi chủ tiệm cung cấp.
/** Chữ TEECEE giãn rộng, "HAIR STUDIO" nhỏ kẹp giữa hai đường kẻ mảnh như logo gốc. */
export const Wordmark = ({ tone = 'light', size = 'md', className }: WordmarkProps) => {
  const s = sizes[size]
  const ink = tone === 'light' ? 'text-ink' : 'text-white'
  const sub = tone === 'light' ? 'text-gold-dark' : 'text-gold-light'
  const line = tone === 'light' ? 'bg-gold' : 'bg-gold-light/70'

  return (
    <span className={cn('inline-flex flex-col items-center leading-none', className)}>
      <span className="sr-only">{business.fullName}</span>
      <span
        aria-hidden="true"
        className={cn('font-display font-bold uppercase', s.main, ink)}
        // Bù khoảng trống do letter-spacing ở ký tự cuối để chữ nằm đúng giữa.
        style={{ marginRight: '-0.36em' }}
      >
        {business.name}
      </span>
      <span aria-hidden="true" className="mt-1.5 flex w-full items-center gap-2">
        <span className={cn('h-px flex-1', line)} />
        <span className={cn('font-display font-semibold uppercase', s.sub, sub)}>
          {business.subtitle}
        </span>
        <span className={cn('h-px flex-1', line)} />
      </span>
    </span>
  )
}
