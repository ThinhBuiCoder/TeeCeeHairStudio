import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { highlights } from '@/data/site'

/** Dải nền tối với ba thẻ ảnh + chữ, như khối giữa trang tham khảo. Nói về điểm mạnh của tiệm, không liệt kê dịch vụ hay giá. */
export const Highlights = () => (
  <section aria-labelledby="highlights-title" className="on-dark bg-ink py-20 text-white md:py-28">
    <div className="container-page">
      <Reveal>
        <SectionHeading
          id="highlights-title"
          tone="dark"
          eyebrow="TEECEE"
          title="Vì sao chọn TEECEE"
          description="Một chỗ cắt tóc sạch sẽ, thoải mái, để bạn ngồi xuống là yên tâm."
        />
      </Reveal>

      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {highlights.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={index * 0.08} className="h-full">
              <article className="h-full overflow-hidden rounded-card bg-surface text-ink">
                <ResponsiveImage
                  name={item.imageName}
                  alt=""
                  sizes="(min-width: 768px) 380px, 90vw"
                  className="aspect-[3/2] w-full"
                />
                <div className="p-6">
                  <h3 className="text-2xl">{item.title}</h3>
                  <p className="mt-2 text-muted">{item.text}</p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
)
