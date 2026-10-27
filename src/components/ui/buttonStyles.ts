import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'gold' | 'outline' | 'outline-light'
export type ButtonSize = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-field text-sm font-semibold tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-white hover:bg-charcoal',
  gold: 'bg-gold text-ink hover:bg-gold-light',
  outline: 'border border-ink/30 text-ink hover:border-ink hover:bg-ink/5',
  'outline-light': 'border border-white/40 text-white hover:border-white hover:bg-white/10',
}

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-11 px-5',
  lg: 'min-h-12 px-7 text-base',
}

export const buttonClasses = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string => cn(base, variants[variant], sizes[size], className)
