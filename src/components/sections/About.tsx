import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { business } from '@/config/business'

const stats = [
  { value: `${business.hours.open} – ${business.hours.close}`, label: 'Mở cửa mỗi ngày' },
]

export const About = () => (
  <section id="gioi-thieu" aria-labelledby="about-title" className="py-20 md:py-28">
    <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <Reveal>
        <SectionHeading
          id="about-title"
          align="left"
          eyebrow="Về TEECEE"
          title={'Salon tóc nam cao cấp chuẩn phong cách Hàn Quốc'}
        />
        {/* TODO: câu chuyện thương hiệu do chủ tiệm viết lại; đoạn dưới là nội dung chung. */}
        <p className="mt-5 text-lg text-muted">
          TEECEE HAIR STUDIO là tiệm cắt tóc nam với đội ngũ chuyên nghiệp và nhiệt tình, cam kết sẽ
          mang lại những kiểu tóc hài lòng nhất cho giới trẻ "yêu cái đẹp, yêu sự chỉnh chu và hiện
          đại".
        </p>

        <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-4xl font-bold text-ink">{stat.value}</dd>
              <dd className="mt-1 text-sm text-muted" aria-hidden="true">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto max-w-md mirror-frame p-2 lg:max-w-none">
          {/* TODO: ảnh dựng AI dùng tạm, thay bằng ảnh thật. */}
          <ResponsiveImage
            name="about-mirror"
            alt="Gương lớn bo góc có viền đèn LED ấm, bên cạnh là cây xanh và kệ đen trong tiệm"
            sizes="(min-width: 1024px) 540px, 90vw"
            className="rounded-[8px]"
          />
        </div>
      </Reveal>
    </div>
  </section>
)
