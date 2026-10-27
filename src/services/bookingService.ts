import type { BookingRequest, BookingResult } from '@/types'

export interface BookingService {
  /** true = chưa gửi lịch tới đâu cả. UI dùng cờ này để báo rõ cho khách. */
  readonly isMock: boolean
  createBooking(request: BookingRequest): Promise<BookingResult>
}

export class BookingError extends Error {
  constructor(message = 'Không gửi được lịch đặt. Vui lòng thử lại.') {
    super(message)
    this.name = 'BookingError'
  }
}

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * BẢN GIẢ LẬP: chỉ chờ ~1,2 giây rồi trả về thành công, KHÔNG gửi dữ liệu đi đâu.
 * Trong `npm run dev`, thêm ?mock=fail vào địa chỉ trang để thử trạng thái lỗi.
 */
const mockBookingService: BookingService = {
  isMock: true,
  async createBooking(request) {
    await delay(1200)
    if (import.meta.env.DEV && new URLSearchParams(window.location.search).get('mock') === 'fail') {
      throw new BookingError()
    }
    return {
      id: `TC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      request,
      createdAt: new Date().toISOString(),
    }
  },
}

/*
 * TODO: thay bằng triển khai thật, giữ nguyên interface BookingService và đặt isMock: false. Ví dụ:
 *  - API riêng:      fetch('/api/bookings', { method: 'POST', body: JSON.stringify(request) })
 *  - Google Sheets:  POST tới Google Apps Script web app, mỗi lịch là một dòng
 *  - Zalo OA / email: gọi một serverless function để gửi thông báo cho tiệm
 * Lỗi mạng hoặc HTTP khác 2xx thì ném BookingError để form hiện thông báo và cho thử lại.
 */
export const bookingService: BookingService = mockBookingService
