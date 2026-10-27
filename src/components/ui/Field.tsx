import type { ComponentPropsWithRef, ReactNode } from 'react'
import { describedBy } from '@/components/ui/fieldUtils'
import { cn } from '@/lib/cn'

interface FieldShellProps {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
}

/** Nhãn + nội dung + gợi ý + lỗi. Id của gợi ý/lỗi là `${id}-hint` / `${id}-error` để nối aria-describedby. */
export const FieldShell = ({ id, label, error, hint, required, children }: FieldShellProps) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
      {label}
      {required && (
        <span aria-hidden="true" className="text-danger">
          {' '}
          *
        </span>
      )}
    </label>
    {children}
    {hint && !error && (
      <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
        {hint}
      </p>
    )}
    {error && (
      <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-danger">
        {error}
      </p>
    )}
  </div>
)

const controlClasses = (invalid: boolean): string =>
  cn(
    'w-full rounded-field border bg-surface px-4 text-base text-ink placeholder:text-muted/70',
    'transition-colors focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-0',
    invalid ? 'border-danger' : 'border-line hover:border-muted',
  )

type InputProps = ComponentPropsWithRef<'input'> & {
  id: string
  label: string
  error?: string
  hint?: string
}

export const TextField = ({ id, label, error, hint, required, className, ...rest }: InputProps) => (
  <FieldShell id={id} label={label} error={error} hint={hint} required={required}>
    <input
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, error, hint)}
      aria-required={required || undefined}
      className={cn(controlClasses(Boolean(error)), 'min-h-12', className)}
      {...rest}
    />
  </FieldShell>
)

type TextareaProps = ComponentPropsWithRef<'textarea'> & {
  id: string
  label: string
  error?: string
  hint?: string
}

export const TextareaField = ({
  id,
  label,
  error,
  hint,
  required,
  className,
  ...rest
}: TextareaProps) => (
  <FieldShell id={id} label={label} error={error} hint={hint} required={required}>
    <textarea
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, error, hint)}
      className={cn(controlClasses(Boolean(error)), 'min-h-28 resize-y py-3', className)}
      {...rest}
    />
  </FieldShell>
)
