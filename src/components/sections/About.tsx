import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { highlights } from '@/data/site'

export const About = () => (
  <section id="gioi-thieu" aria-labelledby="about-title" className="py-20 md:py-28">
    <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <Reveal>
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

      <div>
        <Reveal>
          <SectionHeading
            id="about-title"
            align="left"
            eyebrow="Về TEECEE"
            title="Một chỗ cắt tóc đúng nghĩa"
          />
          {/* TODO: câu chuyện thương hiệu do chủ tiệm viết lại; đoạn dưới là nội dung chung. */}
          <p className="mt-5 text-lg text-muted">
            TEECEE HAIR STUDIO là tiệm cắt tóc nam theo phong cách hiện đại: tường trắng, ghế da
            đen, gương lớn viền đèn ấm và nhiều cây xanh. Bạn ngồi xuống thoải mái, nói điều mình
            muốn, và ra về gọn gàng đúng kiểu mình thích.
          </p>
        </Reveal>

        <ul className="mt-10 space-y-7">
          {highlights.map(({ icon: Icon, title, text }, index) => (
            <li key={title}>
              <Reveal delay={index * 0.08} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold-light text-gold-dark"
                >
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-sans text-lg font-semibold tracking-normal text-ink">
                    {title}
                  </h3>
                  <p className="mt-1 text-muted">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
)
