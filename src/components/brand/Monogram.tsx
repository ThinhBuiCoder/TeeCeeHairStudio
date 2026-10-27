import logoUrl from '@/assets/images/logo.jpg'
import { cn } from '@/lib/cn'

/** Kích thước gốc của logo.jpg, dùng để giữ đúng tỉ lệ. */
const LOGO_RATIO = 361 / 391

interface MonogramProps {
  className?: string
  /** Chiều rộng (px); chiều cao tự tính theo tỉ lệ logo để không nhảy bố cục. */
  size?: number
}

/**
 * Logo TC + vương miện đầy đủ (ảnh nền đen). `mix-blend-screen` làm phần nền đen hoà vào nền phía sau
 * nên không lộ khung chữ nhật; chỉ đặt trên khối tối.
 */
export const Monogram = ({ className, size = 96 }: MonogramProps) => (
  <img
    src={logoUrl}
    alt=""
    width={size}
    height={Math.round(size * LOGO_RATIO)}
    loading="lazy"
    decoding="async"
    className={cn('mix-blend-screen', className)}
  />
)
