import { useReducedMotion } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'
import { Link, useLocation } from 'react-router'

interface AnchorLinkProps {
  /** id của section trên trang chủ (không có dấu #). */
  target: string
  className?: string
  children: ReactNode
  onNavigate?: () => void
}

/**
 * Liên kết tới một section của trang chủ.
 * Đang ở trang chủ: cuộn mượt tại chỗ. Ở trang khác: về trang chủ, ScrollManager sẽ cuộn tới đúng chỗ.
 */
export const AnchorLink = ({ target, className, children, onNavigate }: AnchorLinkProps) => {
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion()

  const onClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    onNavigate?.()
    if (pathname !== '/') return
    const element = document.getElementById(target)
    if (!element) return
    event.preventDefault()
    element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${target}`)
  }

  return (
    <Link to={{ pathname: '/', hash: `#${target}` }} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
