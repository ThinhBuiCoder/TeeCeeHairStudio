import type { ImageName } from '@/lib/images'
import type { NavItem } from '@/types'

export const navItems: NavItem[] = [
  { label: 'Giới thiệu', target: 'gioi-thieu' },
  { label: 'Hình ảnh', target: 'hinh-anh' },
  { label: 'Đặt lịch', target: 'dat-lich' },
  { label: 'Liên hệ', target: 'lien-he' },
]

export interface Highlight {
  imageName: ImageName
  title: string
  text: string
}

// TODO: nội dung chung, chủ tiệm viết lại theo thế mạnh thật của tiệm.
export const highlights: Highlight[] = [
  {
    imageName: 'gallery-chairs',
    title: 'Không gian sạch sẽ',
    text: 'Tường trắng, gương lớn viền đèn ấm và nhiều cây xanh. Vào là thấy dễ chịu.',
  },
  {
    imageName: 'gallery-station',
    title: 'Thợ tay nghề tốt',
    text: 'Lắng nghe bạn muốn gì, tư vấn kiểu hợp khuôn mặt rồi mới xuống tay.',
  },
  {
    imageName: 'gallery-entrance',
    title: 'Đặt lịch, không phải chờ',
    text: 'Chọn ngày giờ online, tiệm xác nhận lại qua số điện thoại của bạn.',
  },
]
