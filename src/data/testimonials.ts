import type { Testimonial } from '@/types'

// TODO: DỮ LIỆU MẪU, KHÔNG PHẢI ĐÁNH GIÁ THẬT. Thay bằng cảm nhận thật của khách (xin phép trước khi đăng)
// rồi đặt SAMPLE_TESTIMONIALS = false để ẩn nhãn "dữ liệu mẫu".
export const SAMPLE_TESTIMONIALS = true

export const testimonials: Testimonial[] = [
  {
    id: 'm1',
    name: 'Khách hàng A',
    text: 'Chỗ này để hiển thị cảm nhận thật của khách về không gian tiệm.',
    context: 'Cắt tóc',
  },
  {
    id: 'm2',
    name: 'Khách hàng B',
    text: 'Chỗ này để hiển thị cảm nhận thật của khách về tay nghề của thợ.',
    context: 'Cắt tóc nam',
  },
  {
    id: 'm3',
    name: 'Khách hàng C',
    text: 'Chỗ này để hiển thị cảm nhận thật của khách về giá cả và thời gian chờ.',
    context: 'Cắt tóc, gội đầu',
  },
]
