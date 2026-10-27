import { CalendarCheck, MessageCircle, Phone } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { business } from '@/config/business'
import { telHref, zaloHref } from '@/lib/contact'

const fab =
  'flex size-12 items-center justify-center rounded-full shadow-soft transition-transform hover:scale-105'

/**
 * Nút nổi chỉ hiện trên mobile: Gọi điện và Zalo khi tiệm đã có số; chưa có thì dùng nút Đặt lịch
 * (không để nút trỏ vào số trống). Ẩn trên trang đặt lịch vì đã ở đúng chỗ.
 */
export const FloatingContact = () => {
  const { pathname } = useLocation()
  if (pathname === '/dat-lich') return null

  const hasAny = Boolean(business.phone || business.zalo)

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3 md:hidden">
      {business.zalo && (
        <a
          href={zaloHref(business.zalo)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nhắn Zalo cho tiệm"
          className={`${fab} bg-info text-white`}
        >
          <MessageCircle aria-hidden="true" className="size-5" />
        </a>
      )}
      {business.phone && (
        <a
          href={telHref(business.phone)}
          aria-label="Gọi điện cho tiệm"
          className={`${fab} bg-leaf text-white`}
        >
          <Phone aria-hidden="true" className="size-5" />
        </a>
      )}
      {!hasAny && (
        <Link to="/dat-lich" aria-label="Đặt lịch" className={`${fab} bg-ink text-gold-light`}>
          <CalendarCheck aria-hidden="true" className="size-5" />
        </Link>
      )}
    </div>
  )
}
