import { Clock } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { serviceCategories, services } from '@/data/services'
import { formatDuration, formatPriceRange } from '@/lib/format'

export const Services = () => {
  const order = new Map<string, number>()
  const groups = serviceCategories
    .map((category) => ({
      category,
      items: services.filter((s) => s.category === category.id),
    }))
    .filter((group) => group.items.length > 0)

  // Chia nhóm vào 2 cột sao cho cân nhau (theo số dòng) thay vì ép hàng, tránh khoảng trống lớn ở cột ngắn.
  const columns: (typeof groups)[] = [[], []]
  const weights = [0, 0]
  groups.forEach((group, index) => {
    const target = (weights[0] ?? 0) <= (weights[1] ?? 0) ? 0 : 1
    columns[target]?.push(group)
    weights[target] = (weights[target] ?? 0) + group.items.length + 1
    order.set(group.category.id, index)
  })

  return (
    <section
      id="dich-vu"
      aria-labelledby="services-title"
      className="border-t border-line bg-surface py-20 md:py-28"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="services-title"
            eyebrow="Dịch vụ"
            title="Chọn kiểu của bạn"
            description="Cắt tóc, gội đầu, chăm sóc da mặt, massage và chăm sóc tay chân. Chọn một hoặc nhiều dịch vụ khi đặt lịch."
          />
        </Reveal>

        {groups.length === 0 ? (
          <div className="mx-auto mt-14 max-w-md rounded-card border border-dashed border-line p-8 text-center">
            <p className="font-semibold text-ink">Danh sách dịch vụ đang được cập nhật</p>
            <p className="mt-2 text-muted">
              Bạn vẫn có thể đặt lịch và trao đổi trực tiếp với tiệm.
            </p>
            <ButtonLink to="/dat-lich" className="mt-5">
              Đặt lịch
            </ButtonLink>
          </div>
        ) : (
          <div className="mt-14 grid gap-y-12 lg:grid-cols-2 lg:items-start lg:gap-x-16">
            {columns.map((column, columnIndex) => (
              // Mobile: cột là `contents` và nhóm xếp theo thứ tự menu gốc; desktop: hai cột độc lập.
              <div key={columnIndex} className="contents lg:block lg:space-y-12">
                {column.map(({ category, items }) => (
                  <div key={category.id} style={{ order: order.get(category.id) }}>
                    <Reveal>
                      <h3 className="border-b border-gold pb-3 eyebrow text-gold-dark">
                        {category.label}
                      </h3>
                      <ul className="divide-y divide-line">
                        {items.map((service) => (
                          <li
                            key={service.id}
                            className="flex items-start justify-between gap-4 py-5"
                          >
                            <div className="min-w-0">
                              <p className="font-display text-2xl leading-tight font-bold text-ink">
                                {service.name}
                              </p>
                              <p className="mt-1 text-sm text-muted">{service.description}</p>
                              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                                <Clock aria-hidden="true" className="size-4" />
                                {formatDuration(service.durationMin)}
                              </p>
                            </div>
                            <div className="flex shrink-0 flex-col items-end gap-3">
                              <p className="font-semibold whitespace-nowrap text-ink">
                                {formatPriceRange(service.price, service.priceTo)}
                              </p>
                              <ButtonLink
                                to={{ pathname: '/dat-lich', search: `?dich-vu=${service.id}` }}
                                variant="outline"
                                className="text-xs"
                              >
                                Đặt dịch vụ này
                                <span className="sr-only">: {service.name}</span>
                              </ButtonLink>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
