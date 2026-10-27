import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'gold' | 'neutral' | 'dark' | 'warning'

const tones: Record<Tone, string> = {
  gold: 'border-gold/50 bg-gold/10 text-gold-dark',
  neutral: 'border-line bg-surface text-muted',
  dark: 'border-gold-light/40 bg-white/5 text-gold-light',
  warning: 'border-warning/40 bg-warning/10 text-warning',
}

export const Badge = ({
  tone = 'gold',
  children,
  className,
}: {
  tone?: Tone
  children: ReactNode
  className?: string
}) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide',
      tones[tone],
      className,
    )}
  >
    {children}
  </span>
)
