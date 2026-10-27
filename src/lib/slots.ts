import { business } from '@/config/business'
import { toDateKey } from '@/lib/format'

const pad = (n: number): string => String(n).padStart(2, '0')

export const toMinutes = (time: string): number => {
  const [h = 0, m = 0] = time.split(':').map(Number)
  return h * 60 + m
}

export const toTime = (minutes: number): string =>
  `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`

/** Các ngày có thể đặt, bắt đầu từ hôm nay. */
export const getBookableDates = (now: Date = new Date()): string[] =>
  Array.from({ length: business.hours.bookableDays }, (_, i) =>
    toDateKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() + i)),
  )

/**
 * Giờ bắt đầu còn đặt được trong ngày `date`.
 * - Nằm trong khung giờ mở cửa, bước slotMinutes; giờ muộn nhất là một bước trước giờ đóng cửa.
 * - Với hôm nay: bỏ giờ đã qua và giờ chưa đủ leadMinutes.
 */
export const getAvailableSlots = (date: string, now: Date = new Date()): string[] => {
  const { open, close, slotMinutes, leadMinutes } = business.hours
  const lastStart = toMinutes(close) - slotMinutes
  const earliest =
    date === toDateKey(now) ? now.getHours() * 60 + now.getMinutes() + leadMinutes : 0

  const slots: string[] = []
  for (let m = toMinutes(open); m <= lastStart; m += slotMinutes) {
    if (m >= earliest) slots.push(toTime(m))
  }
  return slots
}

/** Tiệm đang mở cửa vào thời điểm `now` không? (giả định mở cửa mọi ngày, TODO: xác nhận với chủ tiệm) */
export const isOpenNow = (now: Date = new Date()): boolean => {
  const minutes = now.getHours() * 60 + now.getMinutes()
  return minutes >= toMinutes(business.hours.open) && minutes < toMinutes(business.hours.close)
}
