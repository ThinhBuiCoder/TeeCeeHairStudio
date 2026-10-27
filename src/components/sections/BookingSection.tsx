import { BookingForm } from '@/components/booking/BookingForm'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

/** Form đặt lịch nhúng trên trang chủ (cùng component với trang /dat-lich). */
export const BookingSection = () => (
  <section
    id="dat-lich-nhanh"
    aria-labelledby="booking-title"
    className="border-t border-line py-20 md:py-28"
  >
    <div className="container-page max-w-3xl">
      <Reveal>
        <SectionHeading
          id="booking-title"
          eyebrow="Đặt lịch online"
          title="Giữ chỗ cho bạn"
          description="Điền thông tin, chọn giờ còn trống và tiệm sẽ xác nhận qua số điện thoại."
        />
      </Reveal>
      <div className="mt-12">
        <BookingForm />
      </div>
    </div>
  </section>
)
