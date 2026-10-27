import type { Service, ServiceCategory } from '@/types'

// Tên dịch vụ và giá lấy từ menu "Hair & Skincare Menu" thật của tiệm.
// TODO: xác nhận với chủ tiệm. Menu không ghi thời lượng (trừ "Nhổ tóc bạc 30 phút"),
// nên durationMin của các dịch vụ còn lại là ƯỚC LƯỢNG để tính khung giờ đặt lịch.

export const serviceCategories: ServiceCategory[] = [
  { id: 'toc-da-dau', label: 'Chăm sóc tóc & da đầu' },
  { id: 'da-mat-body', label: 'Chăm sóc da mặt & body' },
  { id: 'tay-chan', label: 'Chăm sóc tay chân' },
]

export const services: Service[] = [
  // Chăm sóc tóc & da đầu
  {
    id: 'cat-toc',
    name: 'Cắt tóc',
    description: 'Tư vấn kiểu hợp khuôn mặt, cắt tỉa và hoàn thiện đường nét.',
    durationMin: 30, // TODO: ước lượng
    price: 60000,
    category: 'toc-da-dau',
    featured: true,
  },
  {
    id: 'goi-dau',
    name: 'Gội đầu',
    description: 'Gội sạch, massage da đầu nhẹ nhàng.',
    durationMin: 15, // TODO: ước lượng
    price: 30000,
    category: 'toc-da-dau',
  },
  {
    id: 'goi-dau-duong-sinh',
    name: 'Gội đầu dưỡng sinh',
    description: 'Gội đầu thư giãn kết hợp chăm sóc da đầu.',
    durationMin: 30, // TODO: ước lượng
    price: 50000,
    category: 'toc-da-dau',
  },
  {
    id: 'nho-toc-bac',
    name: 'Nhổ tóc bạc',
    description: 'Nhổ tóc bạc gọn gàng, nhẹ tay.',
    durationMin: 30,
    price: 30000,
    category: 'toc-da-dau',
  },

  // Chăm sóc da mặt & body
  {
    id: 'cao-mat',
    name: 'Cạo mặt',
    description: 'Cạo mặt êm, sạch.',
    durationMin: 15, // TODO: ước lượng
    price: 20000,
    category: 'da-mat-body',
  },
  {
    id: 'lam-sach-tai',
    name: 'Làm sạch tai',
    description: 'Làm sạch tai nhẹ nhàng, vệ sinh.',
    durationMin: 15, // TODO: ước lượng
    price: 40000,
    category: 'da-mat-body',
  },
  {
    id: 'lot-mun',
    name: 'Lột mụn',
    description: 'Làm sạch mụn trên da mặt.',
    durationMin: 20, // TODO: ước lượng
    price: 30000,
    category: 'da-mat-body',
  },
  {
    id: 'xong-hoi-hut-mun',
    name: 'Xông hơi hút mụn',
    description: 'Xông hơi làm mềm da và hút mụn.',
    durationMin: 20, // TODO: ước lượng
    price: 50000,
    category: 'da-mat-body',
  },
  {
    id: 'danh-mi',
    name: 'Đánh mí',
    description: 'Chăm sóc vùng mí mắt.', // TODO: xác nhận mô tả với chủ tiệm
    durationMin: 15, // TODO: ước lượng
    price: 30000,
    category: 'da-mat-body',
  },
  {
    id: 'dap-mat-na',
    name: 'Đắp mặt nạ',
    description: 'Đắp mặt nạ dưỡng da.',
    durationMin: 15, // TODO: ước lượng
    price: 25000,
    category: 'da-mat-body',
  },
  {
    id: 'tay-da-chet',
    name: 'Tẩy da chết',
    description: 'Tẩy tế bào chết, da mịn và sạch hơn.',
    durationMin: 15, // TODO: ước lượng
    price: 25000,
    category: 'da-mat-body',
  },
  {
    id: 'massage-mat',
    name: 'Massage mặt',
    description: 'Massage thư giãn vùng mặt.',
    durationMin: 15, // TODO: ước lượng
    price: 30000,
    category: 'da-mat-body',
  },
  {
    id: 'massage-tay',
    name: 'Massage tay',
    description: 'Massage thư giãn tay.',
    durationMin: 15, // TODO: ước lượng
    price: 30000,
    category: 'da-mat-body',
  },
  {
    id: 'massage-chan',
    name: 'Massage chân',
    description: 'Massage thư giãn chân.',
    durationMin: 15, // TODO: ước lượng
    price: 30000,
    category: 'da-mat-body',
  },
  {
    id: 'massage-co-vai-gay',
    name: 'Massage cổ vai gáy',
    description: 'Massage giảm mỏi vùng cổ, vai, gáy.',
    durationMin: 20, // TODO: ước lượng
    price: 50000,
    category: 'da-mat-body',
  },

  // Chăm sóc tay chân
  {
    id: 'cat-mong-tay',
    name: 'Cắt móng tay',
    description: 'Cắt và làm gọn móng tay.',
    durationMin: 15, // TODO: ước lượng
    price: 25000,
    category: 'tay-chan',
  },
  {
    id: 'cat-mong-chan',
    name: 'Cắt móng chân',
    description: 'Cắt và làm gọn móng chân.',
    durationMin: 15, // TODO: ước lượng
    price: 25000,
    category: 'tay-chan',
  },
  {
    id: 'lam-sach-got-chan',
    name: 'Làm sạch gót chân',
    description: 'Làm sạch và làm mềm gót chân.',
    durationMin: 20, // TODO: ước lượng
    price: 50000,
    category: 'tay-chan',
  },
]

export const getServiceById = (id: string): Service | undefined => services.find((s) => s.id === id)

/** Tổng thời lượng (phút) và tiền tạm tính (mức thấp nhất) của các dịch vụ đã chọn. */
export const summarizeServices = (
  ids: string[],
): { durationMin: number; total: number; hasRange: boolean } => {
  const picked = ids.map(getServiceById).filter((s): s is Service => Boolean(s))
  return {
    durationMin: picked.reduce((sum, s) => sum + s.durationMin, 0),
    total: picked.reduce((sum, s) => sum + s.price, 0),
    hasRange: picked.some((s) => s.priceTo !== undefined && s.priceTo !== s.price),
  }
}
