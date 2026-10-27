import { Armchair, Leaf, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { NavItem } from '@/types'

export const navItems: NavItem[] = [
  { label: 'Giới thiệu', target: 'gioi-thieu' },
  { label: 'Dịch vụ', target: 'dich-vu' },
  { label: 'Bảng giá', target: 'bang-gia' },
  { label: 'Thư viện', target: 'thu-vien' },
  { label: 'Đội ngũ', target: 'doi-ngu' },
  { label: 'Liên hệ', target: 'lien-he' },
]

export interface Highlight {
  icon: LucideIcon
  title: string
  text: string
}

export const highlights: Highlight[] = [
  {
    icon: Leaf,
    title: 'Không gian sạch sẽ',
    text: 'Tường trắng, gương lớn viền đèn ấm và nhiều cây xanh. Vào là thấy dễ chịu.',
  },
  {
    icon: Armchair,
    title: 'Thợ tay nghề tốt',
    text: 'Lắng nghe bạn muốn gì, tư vấn kiểu hợp khuôn mặt rồi mới xuống tay.',
  },
  {
    icon: Wallet,
    title: 'Giá hợp lý',
    text: 'Cắt tóc 60K, gội đầu 30K. Giá niêm yết rõ ràng, không phát sinh.',
  },
]

export interface ProcessStep {
  title: string
  text: string
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Chọn dịch vụ',
    text: 'Chọn một hoặc nhiều dịch vụ. Thời lượng và giá tạm tính hiện ngay.',
  },
  {
    title: 'Chọn thợ và giờ',
    text: 'Chọn thợ quen hoặc để tiệm sắp xếp, rồi chọn ngày giờ còn trống.',
  },
  { title: 'Nhận xác nhận', text: 'Tiệm dùng số điện thoại của bạn để xác nhận lịch hẹn.' },
]
