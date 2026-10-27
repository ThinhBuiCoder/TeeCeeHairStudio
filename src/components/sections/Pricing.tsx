import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { serviceCategories, services } from '@/data/services'
import { formatDuration, formatPriceRange } from '@/lib/format'

export const Pricing = () => {
  const featured = services.find((s) => s.featured)
  const others = services.filter((s) => !s.featured)

  return (
    <section
      id="bang-gia"
      aria-labelledby="pricing-title"
      className="on-dark bg-charcoal py-20 text-white md:py-28"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="pricing-title"
            tone="dark"
            eyebrow="Bảng giá"
            title="Giá rõ ràng, không phát sinh"
            description="Mức giá tham khảo, giá chính thức được xác nhận tại tiệm."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          {featured && (
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex flex-col justify-between mirror-frame bg-white/[0.03] p-8 sm:p-10">
                <div>
                  <Badge tone="dark">Dịch vụ chính</Badge>
                  <h3 className="mt-5 text-3xl text-white sm:text-4xl">{featured.name}</h3>
                  <p className="mt-3 text-white/75">{featured.description}</p>
                </div>
                <div className="mt-10">
                  <p className="font-display text-6xl font-bold text-gold-light sm:text-7xl">
                    {formatPriceRange(featured.price, featured.priceTo)}
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    {formatDuration(featured.durationMin)}
                  </p>
                  <ButtonLink
                    to={{ pathname: '/dat-lich', search: `?dich-vu=${featured.id}` }}
                    variant="gold"
                    size="lg"
                    className="mt-7 w-full sm:w-auto"
                  >
                    Đặt dịch vụ này
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <div className="space-y-8">
              {serviceCategories.map((category) => {
                const items = others.filter((s) => s.category === category.id)
                if (items.length === 0) return null
                return (
                  <div key={category.id}>
                    <h3 className="eyebrow text-gold-light">{category.label}</h3>
                    <ul className="mt-3">
                      {items.map((service) => (
                        <li key={service.id} className="flex items-baseline gap-3 py-2.5">
                          <span className="text-white">{service.name}</span>
                          <span
                            aria-hidden="true"
                            className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-white/30"
                          />
                          <span className="font-semibold whitespace-nowrap text-gold-light">
                            {formatPriceRange(service.price, service.priceTo)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
