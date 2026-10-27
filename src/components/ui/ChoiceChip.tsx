import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ChoiceChipProps {
  name: string
  value: string
  checked: boolean
  onChange: () => void
  disabled?: boolean
  className?: string
  children: ReactNode
}

/** Lựa chọn dạng nút (ngày, giờ, thợ). Là radio thật nên mũi tên/Tab/Space hoạt động như chuẩn. */
export const ChoiceChip = ({
  name,
  value,
  checked,
  onChange,
  disabled,
  className,
  children,
}: ChoiceChipProps) => (
  <label className={cn('relative block', disabled && 'cursor-not-allowed', className)}>
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="peer sr-only"
    />
    <span
      className={cn(
        'flex min-h-11 items-center justify-center rounded-field border border-line bg-surface px-3 py-1.5 text-center text-sm font-medium text-ink transition-colors',
        'peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white hover:border-muted',
        'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink',
        'peer-disabled:border-line peer-disabled:bg-paper peer-disabled:text-muted/60 peer-disabled:line-through',
      )}
    >
      {children}
    </span>
  </label>
)
