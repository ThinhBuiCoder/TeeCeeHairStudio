import { getImage, type ImageName } from '@/lib/images'
import { cn } from '@/lib/cn'

interface ResponsiveImageProps {
  name: ImageName
  alt: string
  sizes: string
  /** Ảnh hero: tải ngay, ưu tiên cao. Các ảnh khác mặc định lazy. */
  eager?: boolean
  className?: string
  imgClassName?: string
}

/** <picture> AVIF > WebP, có width/height chống nhảy bố cục và khung skeleton trong lúc chờ tải. */
export const ResponsiveImage = ({
  name,
  alt,
  sizes,
  eager = false,
  className,
  imgClassName,
}: ResponsiveImageProps) => {
  const image = getImage(name)
  return (
    <div className={cn('skeleton overflow-hidden', className)}>
      <picture>
        <source type="image/avif" srcSet={image.avifSrcSet} sizes={sizes} />
        <source type="image/webp" srcSet={image.webpSrcSet} sizes={sizes} />
        <img
          src={image.src}
          alt={alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          fetchPriority={eager ? 'high' : 'auto'}
          className={cn('size-full object-cover', imgClassName)}
        />
      </picture>
    </div>
  )
}
