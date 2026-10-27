import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { getImage, type ImageName } from '@/lib/images'

export interface LightboxItem {
  id: string
  imageName: ImageName
  alt: string
  caption: string
}

interface LightboxProps {
  items: LightboxItem[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

const iconButton =
  'flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20'

/** Xem ảnh toàn màn hình: mũi tên trái/phải để chuyển, Esc để đóng, focus bị giữ trong hộp thoại. */
const Lightbox = ({ items, index, onClose, onNavigate }: LightboxProps) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const item = items[index]
  const count = items.length

  useLockBodyScroll(true)
  useFocusTrap(dialogRef, true, onClose)

  const go = useCallback(
    (step: number) => onNavigate((index + step + count) % count),
    [count, index, onNavigate],
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'ArrowLeft') go(-1)
      if (event.key === 'ArrowRight') go(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [go])

  if (!item) return null
  const image = getImage(item.imageName)

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Xem ảnh: ${item.caption}`}
      className="on-dark fixed inset-0 z-[100] flex flex-col bg-black/92"
    >
      {/* Nút nền: bấm ra ngoài ảnh để đóng. Bỏ khỏi thứ tự Tab vì đã có nút Đóng và phím Esc. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      <div className="relative flex items-center justify-between p-4 text-white">
        <p className="text-sm text-white/80" aria-live="polite">
          {index + 1} / {count}
        </p>
        <button type="button" onClick={onClose} className={iconButton} aria-label="Đóng">
          <X aria-hidden="true" className="size-6" />
        </button>
      </div>

      <div className="pointer-events-none relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
        {count > 1 && (
          <button
            type="button"
            onClick={() => go(-1)}
            className={`${iconButton} pointer-events-auto absolute left-2 sm:left-5`}
            aria-label="Ảnh trước"
          >
            <ChevronLeft aria-hidden="true" className="size-6" />
          </button>
        )}
        <img
          src={image.src}
          srcSet={image.webpSrcSet}
          sizes="100vw"
          alt={item.alt}
          width={image.width}
          height={image.height}
          className="pointer-events-auto max-h-full max-w-full rounded-card object-contain"
        />
        {count > 1 && (
          <button
            type="button"
            onClick={() => go(1)}
            className={`${iconButton} pointer-events-auto absolute right-2 sm:right-5`}
            aria-label="Ảnh sau"
          >
            <ChevronRight aria-hidden="true" className="size-6" />
          </button>
        )}
      </div>

      <p className="pointer-events-none relative p-4 text-center font-display text-lg font-semibold tracking-widest text-gold-light uppercase">
        {item.caption}
      </p>
    </div>,
    document.body,
  )
}

export default Lightbox
