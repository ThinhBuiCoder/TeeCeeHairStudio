import { Link } from 'react-router'
import { Monogram } from '@/components/brand/Monogram'
import { Wordmark } from '@/components/brand/Wordmark'
import { AnchorLink } from '@/components/ui/AnchorLink'
import { business } from '@/config/business'
import { navItems } from '@/data/site'
import { formatPhoneDisplay, telHref, zaloHref } from '@/lib/contact'

const socials = [
  { label: 'Facebook', href: business.facebook },
  { label: 'Instagram', href: business.instagram },
  { label: 'TikTok', href: business.tiktok },
].filter((s): s is { label: string; href: string } => Boolean(s.href))

const linkClass =
  'inline-flex min-h-11 items-center text-white/75 transition-colors hover:text-white'

export const Footer = () => (
  <footer className="on-dark bg-ink pt-16 pb-28 text-white md:pb-10">
    <div className="container-page">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Monogram size={72} />
          <Wordmark tone="dark" size="md" className="mt-5" />
          <p className="mt-5 max-w-xs text-sm text-white/70">{business.description}</p>
        </div>

        <nav aria-label="Điều hướng chân trang">
          <h2 className="eyebrow text-gold-light">Khám phá</h2>
          <ul className="mt-4">
            {navItems.map((item) => (
              <li key={item.target}>
                <AnchorLink target={item.target} className={linkClass}>
                  {item.label}
                </AnchorLink>
              </li>
            ))}
            <li>
              <Link to="/dat-lich" className={linkClass}>
                Đặt lịch
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-gold-light">Liên hệ</h2>
          <ul className="mt-4 space-y-1">
            <li className="py-2 text-white/75">
              {business.hours.open} – {business.hours.close}, mỗi ngày
            </li>
            <li className="py-2 text-white/75">{business.address ?? 'Địa chỉ đang cập nhật'}</li>
            {business.phone && (
              <li>
                <a href={telHref(business.phone)} className={linkClass}>
                  {formatPhoneDisplay(business.phone)}
                </a>
              </li>
            )}
            {business.zalo && (
              <li>
                <a
                  href={zaloHref(business.zalo)}
                  className={linkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zalo: {formatPhoneDisplay(business.zalo)}
                </a>
              </li>
            )}
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className={linkClass} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14 border-t border-white/15 pt-6 text-sm text-white/60">
        © {new Date().getFullYear()} {business.fullName}. Bảo lưu mọi quyền.
      </div>
    </div>
  </footer>
)
