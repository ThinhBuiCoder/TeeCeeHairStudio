import type { GalleryItem } from '@/types'

// TODO: ảnh dưới đây là ảnh dựng AI dùng tạm. Thay bằng ảnh chụp thật của tiệm (chạy lại `npm run images`).
// Mục không có imageName hiện ô "Ảnh sắp cập nhật".
export const galleryItems: GalleryItem[] = [
  {
    id: 'mat-tien',
    imageName: 'facade',
    alt: 'Mặt tiền TEECEE HAIR STUDIO về đêm với biển hộp sáng trắng và cửa kính khung đen',
    caption: 'Mặt tiền',
    ratio: 'landscape',
  },
  {
    id: 'khu-cho',
    imageName: 'gallery-lounge',
    alt: 'Khu ghế chờ bọc da đen với dải cây xanh ở giữa tiệm',
    caption: 'Khu ghế chờ',
    ratio: 'portrait',
  },
  {
    id: 'ghe-cat',
    imageName: 'gallery-chairs',
    alt: 'Hàng ghế cắt tóc da đen trước những tấm gương lớn có viền đèn LED ấm',
    caption: 'Ghế cắt tóc',
    ratio: 'landscape',
  },
  {
    id: 'loi-vao',
    imageName: 'gallery-entrance',
    alt: 'Lối vào với cửa kính khung đen và nhiều cây xanh trong tiệm',
    caption: 'Lối vào',
    ratio: 'portrait',
  },
  {
    id: 'quay-cat',
    imageName: 'gallery-station',
    alt: 'Quầy cắt tóc màu đen có gương bo góc và kệ đựng sản phẩm',
    caption: 'Quầy cắt tóc',
    ratio: 'landscape',
  },
  {
    id: 'kieu-toc-1',
    alt: 'Chỗ dành cho ảnh kiểu tóc nam do thợ TEECEE thực hiện',
    caption: 'Kiểu tóc',
    ratio: 'portrait',
  },
]
