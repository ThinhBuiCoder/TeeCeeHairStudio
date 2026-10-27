import type { ImageName } from '@/lib/images'

export interface GalleryItem {
  id: string
  /** Tên ảnh trong src/assets/images. */
  imageName: ImageName
  alt: string
  caption: string
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
  email: string | null
  facebook: string | null
  instagram: string | null
  tiktok: string | null
  mapEmbedUrl: string | null
  mapDirectionsUrl: string | null
  /** Link hệ thống đặt lịch; null thì nút "Đặt lịch" ở banner gọi số điện thoại của tiệm. */
  bookingUrl: string | null
}

export interface BookingRequest {
  name: string
  phone: string
  guests: number
  /** Khách thích yên tĩnh, trò chuyện vừa phải. */
  quiet: boolean
  /** Khách muốn được tư vấn kỹ về kiểu tóc. */
  consult: boolean
  date: string
  time: string
  note: string
}

export interface BookingResult {
  id: string
  request: BookingRequest
  createdAt: string
}
