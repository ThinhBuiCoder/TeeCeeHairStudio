import { ImagePlaceholder } from '@/components/brand/ImagePlaceholder'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { team } from '@/data/team'

export const Team = () => {
  const sample = team.some((member) => member.isPlaceholder)

  return (
    <section
      id="doi-ngu"
      aria-labelledby="team-title"
      className="border-t border-line bg-surface py-20 md:py-28"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="team-title"
            eyebrow="Đội ngũ"
            title="Người cầm kéo"
            description={
              sample
                ? 'Thông tin đội ngũ đang được cập nhật. Bạn có thể đặt lịch với "Bất kỳ thợ nào" để tiệm sắp xếp.'
                : 'Chọn thợ quen hoặc để tiệm sắp xếp cho bạn.'
            }
          />
        </Reveal>

        {team.length === 0 ? (
          <p className="mt-12 text-center text-muted">Danh sách thợ đang được cập nhật.</p>
        ) : (
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <li key={member.id}>
                <Reveal delay={index * 0.08} className="h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-paper shadow-soft">
                    <div className="aspect-[4/5]">
                      {member.imageName ? (
                        <ResponsiveImage
                          name={member.imageName}
                          alt={`${member.name}, ${member.role}`}
                          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 90vw"
                          className="size-full"
                        />
                      ) : (
                        <ImagePlaceholder label="Ảnh thợ sắp cập nhật" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-2xl text-ink">{member.name}</h3>
                      <p className="mt-1 text-sm text-muted">{member.role}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {member.specialties.map((s) => (
                          <li key={s}>
                            <Badge tone="neutral">{s}</Badge>
                          </li>
                        ))}
                      </ul>
                      <ButtonLink
                        to={{ pathname: '/dat-lich', search: `?tho=${member.id}` }}
                        variant="outline"
                        className="mt-6 w-full"
                      >
                        Đặt với {member.name}
                      </ButtonLink>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
