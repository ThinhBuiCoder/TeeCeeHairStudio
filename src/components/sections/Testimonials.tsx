import { Quote } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SAMPLE_TESTIMONIALS, testimonials } from '@/data/testimonials'

export const Testimonials = () => {
  if (testimonials.length === 0) return null

  return (
    <section
      id="cam-nhan"
      aria-labelledby="testimonials-title"
      className="border-t border-line py-20 md:py-28"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="testimonials-title"
            eyebrow="Cảm nhận"
            title="Khách nói gì về TEECEE"
          />
          {SAMPLE_TESTIMONIALS && (
            <p className="mt-4 text-center">
              <Badge tone="warning">Dữ liệu mẫu, sẽ thay bằng đánh giá thật của khách</Badge>
            </p>
          )}
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <li key={t.id}>
              <Reveal delay={index * 0.08} className="h-full">
                <figure className="flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-soft">
                  <Quote aria-hidden="true" className="size-7 text-gold" />
                  <blockquote className="mt-4 flex-1 text-ink">{t.text}</blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                    <span className="font-semibold text-ink">{t.name}</span>
                    <span className="text-muted"> · {t.context}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
