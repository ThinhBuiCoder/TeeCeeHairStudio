import { Menu, X } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Wordmark } from '@/components/brand/Wordmark'
import { AnchorLink } from '@/components/ui/AnchorLink'
import { buttonClasses } from '@/components/ui/buttonStyles'
import { navItems } from '@/data/site'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/cn'

interface HeaderProps {
  /** true khi header nằm đè lên ảnh hero (trang chủ, chưa cuộn): chữ sáng, nền trong suốt. */
  overHero: boolean
}

/** Logo bên trái, menu bên phải, nút Đặt lịch luôn hiện (bố cục như trang tham khảo). */
export const Header = ({ overHero }: HeaderProps) => {
  const scrolled = useScrolled(24)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  useLockBodyScroll(menuOpen)
  useFocusTrap(menuRef, menuOpen, closeMenu)

  const transparent = overHero && !scrolled && !menuOpen
  const linkClass = cn(
    'inline-flex min-h-11 items-center text-sm font-medium transition-colors',
    transparent ? 'text-white/90 hover:text-white' : 'text-ink/80 hover:text-ink',
  )
  // Nút Đặt lịch đã nằm riêng bên phải nên không lặp lại trong menu.
  const menuItems = navItems.filter((item) => item.target !== 'dat-lich')

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        transparent
          ? 'on-dark bg-transparent'
          : 'border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 sm:h-20">
        <Link to="/" className="inline-flex min-h-11 shrink-0 items-center">
          <Wordmark tone={transparent ? 'dark' : 'light'} size="sm" />
        </Link>

        <nav aria-label="Điều hướng chính" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-8">
            {menuItems.map((item) => (
              <li key={item.target}>
                <AnchorLink target={item.target} className={linkClass}>
                  {item.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <AnchorLink target="dat-lich" className={buttonClasses(transparent ? 'gold' : 'primary')}>
            Đặt lịch
          </AnchorLink>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(
              'flex size-11 items-center justify-center rounded-field lg:hidden',
              transparent ? 'text-white' : 'text-ink',
            )}
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-6" />
            ) : (
              <Menu aria-hidden="true" className="size-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-paper px-5 pt-6 pb-10 sm:top-20 lg:hidden"
        >
          <nav aria-label="Điều hướng di động">
            <ul className="divide-y divide-line">
              {navItems.map((item) => (
                <li key={item.target}>
                  <AnchorLink
                    target={item.target}
                    onNavigate={closeMenu}
                    className="flex min-h-14 items-center font-display text-2xl font-semibold text-ink"
                  >
                    {item.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
