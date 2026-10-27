import monogramUrl from '@/assets/images/monogram.webp'
import { cn } from '@/lib/cn'

interface MonogramProps {
  className?: string
  /** Kích thước cạnh (px) để giữ chỗ, tránh nhảy bố cục. */
  size?: number
}

/** Monogram TC + vương miện cắt từ logo gốc (nền đen), chỉ đặt trên khối tối. */
export const Monogram = ({ className, size = 96 }: MonogramProps) => (
  <img
    src={monogramUrl}
    alt=""
    width={size}
    height={size}
    loading="lazy"
    decoding="async"
    className={cn('rounded-full object-cover', className)}
  />
)
