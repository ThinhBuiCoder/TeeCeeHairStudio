import { Seo } from '@/components/layout/Seo'
import { ButtonLink } from '@/components/ui/Button'

const NotFoundPage = () => (
  <>
    <Seo
      title="Không tìm thấy trang | TEECEE HAIR STUDIO"
      description="Trang bạn tìm không tồn tại. Quay về trang chủ TEECEE HAIR STUDIO để đặt lịch hoặc xem dịch vụ."
    />
    <section className="flex min-h-[70vh] items-center pt-24">
      <div className="container-page text-center">
        <p className="eyebrow text-gold-dark">Lỗi 404</p>
        <h1 className="mt-4 text-5xl text-ink sm:text-6xl">Không tìm thấy trang</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Đường dẫn này không tồn tại hoặc đã được chuyển đi. Bạn có thể quay về trang chủ hoặc đặt
          lịch ngay.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink to="/">Về trang chủ</ButtonLink>
          <ButtonLink to="/dat-lich" variant="outline">
            Đặt lịch
          </ButtonLink>
        </div>
      </div>
    </section>
  </>
)

export default NotFoundPage
