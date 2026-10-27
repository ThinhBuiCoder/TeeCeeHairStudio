import { z } from 'zod'
import { business } from '@/config/business'
import { toDateKey } from '@/lib/format'
import { getAvailableSlots } from '@/lib/slots'
import { isVietnamesePhone } from '@/lib/validators'

export const NOTE_MAX = 300
export const MAX_GUESTS = 5

export const bookingSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Vui lòng nhập họ tên (ít nhất 2 ký tự).')
      .max(60, 'Họ tên tối đa 60 ký tự.'),
    phone: z
      .string()
      .trim()
      .min(1, 'Vui lòng nhập số điện thoại.')
      .refine(isVietnamesePhone, 'Số điện thoại chưa đúng. Ví dụ: 0901 234 567.'),
    guests: z.number().int().min(1).max(MAX_GUESTS),
    quiet: z.boolean(),
    consult: z.boolean(),
    date: z.string().min(1, 'Vui lòng chọn ngày.'),
    time: z.string().min(1, 'Vui lòng chọn giờ.'),
    note: z.string().max(NOTE_MAX, `Ghi chú tối đa ${NOTE_MAX} ký tự.`),
  })
  .superRefine((value, ctx) => {
    if (!value.date || !value.time) return
    const now = new Date()
    if (value.date < toDateKey(now)) {
      ctx.addIssue({
        code: 'custom',
        path: ['date'],
        message: 'Không thể đặt lịch cho ngày đã qua.',
      })
      return
    }
    // Kiểm tra lại giờ so với khung mở cửa và bước giờ (không chỉ tin vào giao diện).
    if (!getAvailableSlots(value.date, now).includes(value.time)) {
      ctx.addIssue({
        code: 'custom',
        path: ['time'],
        message: `Giờ này không còn nhận lịch. Tiệm mở cửa ${business.hours.open} – ${business.hours.close}.`,
      })
    }
  })

export type BookingFormValues = z.infer<typeof bookingSchema>
