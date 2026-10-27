import { Clock, Globe, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { business } from '@/config/business'
import { formatPhoneDisplay, telHref, zaloHref } from '@/lib/contact'

interface RowProps {
  icon: LucideIcon
  label: string
  children: ReactNode
}

const Row = ({ icon: Icon, label, children }: RowProps) => (
  <li className="flex gap-4 py-4">
    <span
      aria-hidden="true"
      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold-light text-gold-dark"
    >
      <Icon className="size-5" />
    </span>
    <div className="min-w-0">
      <p className="text-sm font-semibold text-ink">{label}</p>
      <div className="mt-0.5 text-muted">{children}</div>
    </div>
  </li>
)

const pending = <span className="italic">Đang cập nhật</span>

const linkClass =
  'font-medium text-ink underline decoration-gold underline-offset-4 hover:decoration-2'

export const Contact = () => (
  <section id="lien-he" aria-labelledby="contact-title" className="py-20 md:py-28">
    <div className="container-page">
      <Reveal>
        <SectionHeading
          id="contact-title"
          eyebrow="Liên hệ"
          title="Ghé TEECEE"
          description="Đến trực tiếp hoặc liên hệ trước để tiệm giữ chỗ cho bạn."
        />
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <ul className="divide-y divide-line">
            <Row icon={MapPin} label="Địa chỉ">
              {business.address ?? pending}
              {business.mapDirectionsUrl && (
                <>
                  {' · '}
                  <a
                    href={business.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Chỉ đường
                  </a>
                </>
              )}
            </Row>
            <Row icon={Clock} label="Giờ mở cửa">
              {business.hours.open} – {business.hours.close}, mỗi ngày
            </Row>
            <Row icon={Phone} label="Điện thoại">
              {business.phone ? (
                <a href={telHref(business.phone)} className={linkClass}>
                  {formatPhoneDisplay(business.phone)}
                </a>
              ) : (
                pending
              )}
            </Row>
            <Row icon={MessageCircle} label="Zalo">
              {business.zalo ? (
                <a
                  href={zaloHref(business.zalo)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {formatPhoneDisplay(business.zalo)}
                </a>
              ) : (
                pending
              )}
            </Row>
            <Row icon={Globe} label="Facebook">
              {business.facebook ? (
                <a
                  href={business.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Trang Facebook của tiệm
                </a>
              ) : (
                pending
              )}
            </Row>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden mirror-frame p-2">
            {business.mapEmbedUrl ? (
              <iframe
                src={business.mapEmbedUrl}
                title="Bản đồ vị trí TEECEE HAIR STUDIO"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full rounded-[8px] border-0"
                allowFullScreen
              />
            ) : (
              <div className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
                {/* TODO: thay bằng iframe Google Maps khi có địa chỉ (config/business.ts > mapEmbedUrl). */}
                <ResponsiveImage
                  name="facade"
                  alt="Mặt tiền TEECEE HAIR STUDIO về đêm"
                  sizes="(min-width: 1024px) 560px, 90vw"
                  className="absolute inset-0"
                />
                <div className="on-dark absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 to-transparent p-5">
                  <p className="text-sm text-white">
                    Bản đồ sẽ hiển thị khi tiệm cập nhật địa chỉ.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
)
