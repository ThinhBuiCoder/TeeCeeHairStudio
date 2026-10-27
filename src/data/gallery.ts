import type { GalleryItem } from '@/types'

// TODO: ảnh dưới đây là ảnh dựng AI dùng tạm. Thay bằng ảnh chụp thật của tiệm (chạy lại `npm run images`).
// Dải ảnh đầu trang hiển thị tối đa 5 ảnh theo đúng thứ tự này.
export const galleryItems: GalleryItem[] = [
  {
    id: 'ghe-cat',
    imageName: 'gallery-chairs',
    alt: 'Hàng ghế cắt tóc da đen trước những tấm gương lớn có viền đèn LED ấm',
    caption: 'Ghế cắt tóc',
  },
  {
    id: 'khu-cho',
    imageName: 'gallery-lounge',
    alt: 'Khu ghế chờ bọc da đen với dải cây xanh ở giữa tiệm',
    caption: 'Khu ghế chờ',
  },
  {
    id: 'quay-cat',
    imageName: 'gallery-station',
    alt: 'Quầy cắt tóc màu đen có gương bo góc và kệ đựng sản phẩm',
    caption: 'Quầy cắt tóc',
  },
  {
    id: 'loi-vao',
    imageName: 'gallery-entrance',
    alt: 'Lối vào với cửa kính khung đen và nhiều cây xanh trong tiệm',
    caption: 'Lối vào',
  },
  {
    id: 'mat-tien',
    imageName: 'facade',
    alt: 'Mặt tiền TEECEE HAIR STUDIO về đêm với biển hộp sáng trắng và cửa kính khung đen',
    caption: 'Mặt tiền',
  },
]
