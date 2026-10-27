import { lazy, Suspense, useMemo, useState } from 'react'
import { ImagePlaceholder } from '@/components/brand/ImagePlaceholder'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { LightboxItem } from '@/components/ui/Lightbox'
import { galleryItems } from '@/data/gallery'
import { cn } from '@/lib/cn'

// Lightbox chỉ tải khi khách bấm vào ảnh đầu tiên.
const Lightbox = lazy(() => import('@/components/ui/Lightbox'))

const ratioClass = { portrait: 'aspect-[4/5]', landscape: 'aspect-[3/2]' } as const

export const Gallery = () => {
  const [active, setActive] = useState<number | null>(null)

  // Chỉ ảnh thật mới vào lightbox; ô placeholder không mở được.
  const lightboxItems = useMemo<LightboxItem[]>(
    () =>
      galleryItems.flatMap((item) =>
        item.imageName
          ? [{ id: item.id, imageName: item.imageName, alt: item.alt, caption: item.caption }]
          : [],
      ),
    [],
  )

  return (
    <section id="thu-vien" aria-labelledby="gallery-title" className="py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="gallery-title"
            eyebrow="Thư viện"
            title="Không gian TEECEE"
            description="Sáng, sạch, nhiều cây xanh. Đến một lần là muốn quay lại."
          />
        </Reveal>

        {galleryItems.length === 0 ? (
          <p className="mt-12 text-center text-muted">Thư viện ảnh đang được cập nhật.</p>
        ) : (
          <ul className="mt-14 columns-2 gap-3 sm:gap-4 lg:columns-3">
            {galleryItems.map((item) => {
              const lightboxIndex = lightboxItems.findIndex((l) => l.id === item.id)
              return (
                <li key={item.id} className="mb-3 break-inside-avoid sm:mb-4">
                  {item.imageName ? (
                    <button
                      type="button"
                      onClick={() => setActive(lightboxIndex)}
                      aria-label={`Xem ảnh lớn: ${item.caption}`}
                      className="group relative block w-full overflow-hidden rounded-card"
                    >
                      <ResponsiveImage
                        name={item.imageName}
                        alt={item.alt}
                        sizes="(min-width: 1024px) 380px, 50vw"
                        className={cn('w-full', ratioClass[item.ratio])}
                        imgClassName="transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-4 pt-8 pb-3 text-left font-display text-sm font-semibold tracking-[0.2em] text-white uppercase opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                        {item.caption}
                      </span>
                    </button>
                  ) : (
                    <div className={cn('overflow-hidden rounded-card', ratioClass[item.ratio])}>
                      <ImagePlaceholder label={item.caption} />
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}

        {/* TODO: bỏ dòng này khi đã thay bằng ảnh chụp thật của tiệm. */}
        <p className="mt-8 text-center text-sm text-muted">
          Ảnh minh hoạ không gian tiệm. Ảnh chụp thật sẽ được cập nhật sớm.
        </p>
      </div>

      {active !== null && (
        <Suspense fallback={null}>
          <Lightbox
            items={lightboxItems}
            index={active}
            onClose={() => setActive(null)}
            onNavigate={setActive}
          />
        </Suspense>
      )}
    </section>
  )
}
