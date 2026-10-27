import { Clock } from 'lucide-react'
import { Monogram } from '@/components/brand/Monogram'
import { Wordmark } from '@/components/brand/Wordmark'
import { AnchorLink } from '@/components/ui/AnchorLink'
import { buttonClasses } from '@/components/ui/buttonStyles'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { business } from '@/config/business'
import { useNow } from '@/hooks/useNow'
import { cn } from '@/lib/cn'
import { isOpenNow } from '@/lib/slots'

/** Banner toàn chiều rộng: logo, khẩu hiệu, giờ làm việc và nút đặt lịch ở giữa. */
export const Hero = () => {
  const open = isOpenNow(useNow())

  return (
    <section
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex h-[88svh] max-h-[56rem] min-h-[40rem] items-center justify-center overflow-hidden bg-ink"
    >
      {/* TODO: ảnh dựng AI dùng tạm, thay bằng ảnh chụp thật của tiệm. */}
      <ResponsiveImage
        name="hero-interior"
        alt="Không gian bên trong TEECEE HAIR STUDIO: gương lớn viền đèn LED ấm, ghế da đen và nhiều cây xanh"
        sizes="100vw"
        eager
        className="absolute inset-0 -z-20"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/60" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 via-transparent to-ink/80"
      />

      <div className="container-page flex max-w-3xl flex-col items-center pt-28 pb-20 text-center">
        <Monogram size={88} className="border border-gold-light/60" />
        <h1 id="hero-title" className="mt-5">
          <Wordmark tone="dark" size="lg" />
        </h1>
        <p className="mt-6 max-w-lg text-base text-balance text-white/90 sm:text-xl">
          {business.tagline}
        </p>

        <p className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-full border border-white/25 bg-ink/50 px-4 py-2 text-sm text-white backdrop-blur-sm">
          <span className="inline-flex items-center gap-2">
            <Clock aria-hidden="true" className="size-4 text-gold-light" />
            Giờ làm việc:
            <strong className="font-semibold">
              {business.hours.open} – {business.hours.close}
            </strong>
            , mỗi ngày
          </span>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
              open ? 'border-white/40 text-white' : 'border-white/25 text-white/70',
            )}
          >
            <span
              aria-hidden="true"
              className={cn('size-2 rounded-full', open ? 'bg-leaf' : 'bg-white/40')}
            />
            {open ? 'Đang mở cửa' : 'Đã đóng cửa'}
          </span>
        </p>

        <AnchorLink target="dat-lich" className={buttonClasses('gold', 'lg', 'mt-9 px-10')}>
          Đặt lịch hẹn
        </AnchorLink>
      </div>
    </section>
  )
}
