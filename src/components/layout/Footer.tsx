import { Monogram } from '@/components/brand/Monogram'
import { Wordmark } from '@/components/brand/Wordmark'
import { business } from '@/config/business'
import { formatPhoneDisplay, mailHref, telHref } from '@/lib/contact'

const socials = [
  { label: 'Facebook', href: business.facebook },
  { label: 'Instagram', href: business.instagram },
  { label: 'TikTok', href: business.tiktok },
].filter((s): s is { label: string; href: string } => Boolean(s.href))

// Mọi dòng ở cột Giờ làm việc và Liên hệ dùng chung chiều cao tối thiểu để dòng đầu và khoảng cách thẳng hàng.
const rowClass = 'flex min-h-11 items-center text-white/75'

const linkClass = 'inline-flex min-h-11 items-center transition-colors hover:text-white'

/** Chân trang 3 cột như trang tham khảo: thương hiệu, giờ làm việc, liên hệ và mạng xã hội. */
export const Footer = () => (
  <footer className="on-dark bg-ink pt-16 pb-28 text-white md:pb-10">
    <div className="container-page">
      <div className="grid gap-12 md:grid-cols-3">
        <div className="flex w-fit flex-col items-center">
          <Monogram size={104} />
          <Wordmark tone="dark" size="md" className="mt-4" />
        </div>

        <div>
          <h2 className="eyebrow text-gold-light">Giờ làm việc</h2>
          <ul className="mt-3">
            <li className={rowClass}>
              Mỗi ngày: {business.hours.open} – {business.hours.close}
            </li>
            <li className={rowClass}>{business.address ?? 'Địa chỉ đang cập nhật'}</li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-gold-light">Liên hệ</h2>
          <ul className="mt-3">
            {business.phone && (
              <li className={rowClass}>
                <a href={telHref(business.phone)} className={linkClass}>
                  {formatPhoneDisplay(business.phone)}
                </a>
              </li>
            )}
            {business.email && (
              <li className={rowClass}>
                <a href={mailHref(business.email)} className={linkClass}>
                  {business.email}
                </a>
              </li>
            )}
            {socials.map((s) => (
              <li key={s.label} className={rowClass}>
                <a href={s.href} className={linkClass} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-md text-center text-sm text-white/70 md:max-w-none md:whitespace-nowrap">
        {business.description}
      </p>
    </div>
  </footer>
)
