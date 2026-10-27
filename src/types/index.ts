import type { ImageName } from '@/lib/images'

export type ServiceCategoryId = 'toc-da-dau' | 'da-mat-body' | 'tay-chan'

export interface ServiceCategory {
  id: ServiceCategoryId
  label: string
}

export interface Service {
  id: string
  name: string
  description: string
  /** Thời lượng, tính bằng phút. */
  durationMin: number
  /** Giá (VND). Nếu có priceTo thì đây là mức thấp nhất của khoảng giá. */
  price: number
  priceTo?: number
  category: ServiceCategoryId
  featured?: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  specialties: string[]
  /** Tên ảnh trong src/assets/images; bỏ trống thì hiện ô placeholder. */
  imageName?: ImageName
  isPlaceholder?: boolean
}

export interface GalleryItem {
  id: string
  /** Tên ảnh trong src/assets/images; bỏ trống thì hiện ô placeholder. */
  imageName?: ImageName
  alt: string
  caption: string
  ratio: 'portrait' | 'landscape'
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface Testimonial {
  id: string
  name: string
  text: string
  context: string
}

export interface NavItem {
  label: string
  /** id của section trên trang chủ. */
  target: string
}

export interface BusinessHours {
  open: string
  close: string
  slotMinutes: number
  /** Khách phải đặt trước giờ hẹn tối thiểu bấy nhiêu phút. */
  leadMinutes: number
  /** Số ngày tới có thể đặt, tính cả hôm nay. */
  bookableDays: number
}

export interface BusinessInfo {
  name: string
  subtitle: string
  fullName: string
  tagline: string
  description: string
  hours: BusinessHours
  /** Các trường dưới đây là null khi chưa có thông tin thật. UI sẽ hiện "Đang cập nhật". */
  address: string | null
  phone: string | null
  zalo: string | null
  facebook: string | null
  instagram: string | null
  tiktok: string | null
  mapEmbedUrl: string | null
  mapDirectionsUrl: string | null
  priceRange: string
}

export interface BookingRequest {
  name: string
  phone: string
  serviceIds: string[]
  staffId: string
  date: string
  time: string
  note: string
}

export interface BookingResult {
  id: string
  request: BookingRequest
  createdAt: string
}
