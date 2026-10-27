import type { TeamMember } from '@/types'

/** Lựa chọn mặc định trong form đặt lịch. */
export const ANY_STAFF_ID = 'bat-ky'

// TODO: chưa có danh sách thợ thật. Thay tên, chuyên môn và thêm imageName khi có ảnh.
export const team: TeamMember[] = [
  {
    id: 'tho-01',
    name: 'Thợ chính 01',
    role: 'Thợ cắt tóc nam',
    specialties: ['Cắt tóc nam', 'Tạo kiểu'],
    isPlaceholder: true,
  },
  {
    id: 'tho-02',
    name: 'Thợ chính 02',
    role: 'Thợ cắt tóc nam',
    specialties: ['Fade', 'Cạo mặt'],
    isPlaceholder: true,
  },
  {
    id: 'tho-03',
    name: 'Thợ chăm sóc da',
    role: 'Chăm sóc da mặt & massage',
    specialties: ['Chăm sóc da mặt', 'Massage'],
    isPlaceholder: true,
  },
]

export const getStaffName = (id: string): string =>
  id === ANY_STAFF_ID ? 'Bất kỳ thợ nào' : (team.find((t) => t.id === id)?.name ?? 'Bất kỳ thợ nào')
