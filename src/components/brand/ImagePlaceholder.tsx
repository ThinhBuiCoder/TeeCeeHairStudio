import { Monogram } from '@/components/brand/Monogram'
import { cn } from '@/lib/cn'

interface ImagePlaceholderProps {
  label?: string
  className?: string
}

/** Ô giữ chỗ mang thương hiệu cho ảnh chưa có (ảnh thợ, ảnh kiểu tóc...). Không dùng ảnh stock gây hiểu lầm. */
export const ImagePlaceholder = ({
  label = 'Ảnh sắp cập nhật',
  className,
}: ImagePlaceholderProps) => (
  <div
    role="img"
    aria-label={label}
    className={cn(
      'on-dark flex h-full w-full flex-col items-center justify-center gap-3 bg-charcoal p-4 text-center',
      className,
    )}
  >
    <Monogram size={56} className="opacity-70" />
    <span className="font-display text-xs font-semibold tracking-[0.3em] text-gold-light uppercase">
      {label}
    </span>
  </div>
)
