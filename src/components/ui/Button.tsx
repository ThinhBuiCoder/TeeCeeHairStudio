import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type To } from 'react-router'
import { Spinner } from '@/components/ui/Spinner'
import { buttonClasses, type ButtonSize, type ButtonVariant } from '@/components/ui/buttonStyles'

interface StyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & StyleProps & { loading?: boolean }

export const Button = ({
  variant,
  size,
  loading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) => (
  <button
    type={type}
    className={buttonClasses(variant, size, className)}
    disabled={disabled || loading}
    aria-busy={loading || undefined}
    {...rest}
  >
    {loading && <Spinner />}
    {children}
  </button>
)

interface ButtonLinkProps extends StyleProps {
  /** Điều hướng nội bộ qua React Router. */
  to?: To
  /** Liên kết ngoài hoặc tel:/mailto:. */
  href?: string
  className?: string
  children: ReactNode
  external?: boolean
  onClick?: () => void
}

export const ButtonLink = ({
  to,
  href,
  variant,
  size,
  className,
  children,
  external,
  onClick,
}: ButtonLinkProps) => {
  const classes = buttonClasses(variant, size, className)
  if (to !== undefined) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }
  return (
    <a
      href={href}
      className={classes}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
