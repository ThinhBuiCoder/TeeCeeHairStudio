import { ButtonLink } from '@/components/ui/Button'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { Reveal } from '@/components/ui/Reveal'
import { business } from '@/config/business'
import { telHref } from '@/lib/contact'

/**
 * Banner kêu gọi đặt lịch. Nút dẫn tới business.bookingUrl; khi chưa có thì gọi số điện thoại của tiệm
 * (không để nút trỏ vào link trống).
 */
export const BookingSection = () => {
  const href = business.bookingUrl ?? (business.phone ? telHref(business.phone) : null)

  return (
    <section
      id="dat-lich"
      aria-labelledby="booking-title"
      className="on-dark relative isolate overflow-hidden bg-ink"
    >
      {/* TODO: ảnh dựng AI dùng tạm, thay bằng ảnh chụp thật của tiệm. */}
      <ResponsiveImage name="facade" alt="" sizes="100vw" className="absolute inset-0 -z-20" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/75" />

      <div className="container-page py-24 text-center md:py-32">
        <Reveal>
          <h2
            id="booking-title"
            className="mx-auto max-w-2xl text-5xl text-white uppercase sm:text-6xl"
          >
            Đặt lịch hẹn
          </h2>
          {href ? (
            <ButtonLink
              href={href}
              external={Boolean(business.bookingUrl)}
              variant="gold"
              size="lg"
              className="mt-9 px-10"
            >
              Đặt lịch
            </ButtonLink>
          ) : (
            <p className="mt-9 text-white/75">Thông tin đặt lịch đang được cập nhật.</p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
