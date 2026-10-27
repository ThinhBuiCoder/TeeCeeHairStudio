import type { BusinessInfo } from '@/types'

/**
 * Thông tin tiệm. Sửa tại đây là đủ, giao diện tự cập nhật.
 * Giá trị null = chưa có thông tin thật; UI hiện "Đang cập nhật" và ẩn liên kết.
 */
export const business: BusinessInfo = {
  name: 'TEECEE',
  subtitle: 'HAIR STUDIO',
  fullName: 'TEECEE HAIR STUDIO',
  tagline: '𝑫𝒂̀𝒏𝒉 𝒄𝒉𝒐 𝒈𝒊𝒐̛́𝒊 𝒕𝒓𝒆̉ "𝒚𝒆̂𝒖 𝒄𝒂́𝒊 đ𝒆̣𝒑, 𝒚𝒆̂𝒖 𝒔𝒖̛̣ 𝒄𝒉𝒊̉𝒏𝒉 𝒄𝒉𝒖 𝒗𝒂̀ 𝒉𝒊𝒆̣̂𝒏 đ𝒂̣𝒊"',
  description: 'Tiệm cắt tóc nam phong cách hiện đại: không gian sạch sẽ, thợ tay nghề tốt.',

  hours: {
    // TODO: xác nhận với chủ tiệm (giờ lấy từ biển thông tin trên ảnh tiệm: 8h30 – 19h30)
    open: '08:30',
    close: '19:30',
    slotMinutes: 30,
    leadMinutes: 30,
    bookableDays: 14,
  },

  // TODO: chưa có thông tin, hỏi chủ tiệm
  address: 'V5 b01.48, Khu đô thị FPT City, Ngũ Hành Sơn, Da Nang, Vietnam, 550000',
  phone: '076 354 6486', // định dạng số nội địa, ví dụ '0901234567'
  email: 'hairstudioteecee@gmail.com',
  facebook: 'https://www.facebook.com/TeeCeeHairStudio?locale=vi_VN', // URL đầy đủ
  instagram: null,
  tiktok: null,
  mapEmbedUrl: null, // URL nhúng từ Google Maps > Chia sẻ > Nhúng bản đồ
  mapDirectionsUrl: null,

  // TODO: điền link đặt lịch (ví dụ trang EasySalon của tiệm) khi có; để null thì nút gọi số điện thoại.
  bookingUrl: null,
}
