import { lazy, Suspense, useState } from 'react'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { galleryItems } from '@/data/gallery'
import { cn } from '@/lib/cn'

// Lightbox chỉ tải khi khách bấm vào ảnh đầu tiên.
const Lightbox = lazy(() => import('@/components/ui/Lightbox'))

/** Với 5 ảnh: hàng trên 3 ô, hàng dưới 2 ô rộng hơn; trên điện thoại ảnh đầu chiếm cả hàng. */
const spanClass = (index: number): string =>
  index === 0 ? 'col-span-2 md:col-span-2' : index < 3 ? 'md:col-span-2' : 'md:col-span-3'

const aspectClass = (index: number): string =>
  index === 0
    ? 'aspect-[3/2] md:aspect-[4/3]'
    : index < 3
      ? 'aspect-[4/5] md:aspect-[4/3]'
      : 'aspect-[4/5] md:aspect-[3/2]'

export const Gallery = () => {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="hinh-anh" aria-labelledby="gallery-title" className="pb-20 md:pb-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="gallery-title"
            eyebrow="Hình ảnh"
            title="Không gian TEECEE"
            description="Sáng, sạch, nhiều cây xanh. Đến một lần là muốn quay lại."
          />
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-6">
          {galleryItems.map((item, index) => (
            <li key={item.id} className={spanClass(index)}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Xem ảnh lớn: ${item.caption}`}
                className={cn(
                  'group relative block w-full overflow-hidden rounded-card',
                  aspectClass(index),
                )}
              >
                <ResponsiveImage
                  name={item.imageName}
                  alt={item.alt}
                  sizes="(min-width: 1024px) 560px, 50vw"
                  className="size-full"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-4 pt-8 pb-3 text-left font-display text-sm font-semibold tracking-[0.2em] text-white uppercase opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {item.caption}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active !== null && (
        <Suspense fallback={null}>
          <Lightbox
            items={galleryItems}
            index={active}
            onClose={() => setActive(null)}
            onNavigate={setActive}
          />
        </Suspense>
      )}
    </section>
  )
}
