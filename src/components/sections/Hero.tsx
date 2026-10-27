import { Clock, MapPin } from 'lucide-react'
import { AnchorLink } from '@/components/ui/AnchorLink'
import { ButtonLink } from '@/components/ui/Button'
import { buttonClasses } from '@/components/ui/buttonStyles'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { business } from '@/config/business'
import { useNow } from '@/hooks/useNow'
import { cn } from '@/lib/cn'
import { isOpenNow } from '@/lib/slots'

export const Hero = () => {
  const open = isOpenNow(useNow())

  return (
    <section
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      {/* TODO: ảnh dựng AI dùng tạm, thay bằng ảnh chụp thật của tiệm. */}
      <ResponsiveImage
        name="hero-interior"
        alt="Không gian bên trong TEECEE HAIR STUDIO: gương lớn viền đèn LED ấm, ghế da đen và nhiều cây xanh"
        sizes="100vw"
        eager
        className="absolute inset-0 -z-20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/45 to-ink/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-transparent to-ink/50"
      />

      <div className="container-page pt-32 pb-12 sm:pb-16 lg:pb-20">
        <p className="eyebrow text-gold-light">Salon tóc nam cao cấp chuẩn phong cách Hàn Quốc</p>
        <h1 className="mt-5 max-w-3xl text-4xl text-white sm:text-5xl lg:text-6xl">
          {business.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/80">
          Không gian sạch sẽ, thợ tay nghề tốt, giá hợp lý. Đặt lịch trước để không phải chờ.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/dat-lich" variant="gold" size="lg">
            Đặt lịch ngay
          </ButtonLink>
          <AnchorLink target="bang-gia" className={buttonClasses('outline-light', 'lg')}>
            Xem bảng giá
          </AnchorLink>
        </div>

        <ul className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-6 text-sm text-white/85 sm:flex-row sm:gap-10">
          <li className="flex items-center gap-3">
            <Clock aria-hidden="true" className="size-5 shrink-0 text-gold-light" />
            <span>
              <span className="sr-only">Giờ mở cửa: </span>
              {business.hours.open} – {business.hours.close}, mỗi ngày
              <span
                className={cn(
                  'ml-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
                  open ? 'border-white/40 text-white' : 'border-white/25 text-white/70',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn('size-2 rounded-full', open ? 'bg-leaf' : 'bg-white/40')}
                />
                {open ? 'Đang mở cửa' : 'Đã đóng cửa'}
              </span>
            </span>
          </li>
          <li className="flex items-center gap-3">
            <MapPin aria-hidden="true" className="size-5 shrink-0 text-gold-light" />
            <span>
              <span className="sr-only">Địa chỉ: </span>
              {business.address ?? 'Địa chỉ đang cập nhật'}
            </span>
          </li>
        </ul>
      </div>
    </section>
  )
}
