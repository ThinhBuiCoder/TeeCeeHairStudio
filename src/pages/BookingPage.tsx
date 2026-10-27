import { BookingForm } from '@/components/booking/BookingForm'
import { Seo } from '@/components/layout/Seo'
import { SectionHeading } from '@/components/ui/SectionHeading'

const BookingPage = () => (
  <>
    <Seo
      title="Đặt lịch | TEECEE HAIR STUDIO"
      description="Đặt lịch cắt tóc nam tại TEECEE HAIR STUDIO: chọn dịch vụ, thợ và giờ còn trống chỉ trong một phút."
    />
    <section aria-labelledby="booking-page-title" className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container-page max-w-3xl">
        <SectionHeading
          as="h1"
          id="booking-page-title"
          eyebrow="Đặt lịch online"
          title="Đặt lịch cắt tóc"
          description="Chọn dịch vụ, thợ và giờ còn trống. Tiệm sẽ xác nhận qua số điện thoại của bạn."
        />
        <div className="mt-12">
          <BookingForm />
        </div>
      </div>
    </section>
  </>
)

export default BookingPage
