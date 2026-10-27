import { Mail, Phone } from 'lucide-react'
import { business } from '@/config/business'
import { mailHref, telHref } from '@/lib/contact'

const fab =
  'flex size-12 items-center justify-center rounded-full shadow-soft transition-transform hover:scale-105'

/** Nút nổi chỉ hiện trên mobile: Gọi điện và Email, mỗi nút chỉ hiện khi tiệm đã có thông tin. */
export const FloatingContact = () => {
  if (!business.phone && !business.email) return null

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3 md:hidden">
      {business.email && (
        <a
          href={mailHref(business.email)}
          aria-label="Gửi email cho tiệm"
          className={`${fab} bg-info text-white`}
        >
          <Mail aria-hidden="true" className="size-5" />
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
    </div>
  )
}
