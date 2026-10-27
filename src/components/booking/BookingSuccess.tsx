import { CheckCircle2, Info } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { business } from '@/config/business'
import { getServiceById, summarizeServices } from '@/data/services'
import { getStaffName } from '@/data/team'
import { formatDate, formatDuration, formatVND } from '@/lib/format'
import { formatPhoneDisplay, telHref, zaloHref } from '@/lib/contact'
import { bookingService } from '@/services/bookingService'
import type { BookingResult } from '@/types'

interface BookingSuccessProps {
  result: BookingResult
  onReset: () => void
}

export const BookingSuccess = ({ result, onReset }: BookingSuccessProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const { request } = result
  const summary = summarizeServices(request.serviceIds)
  const serviceNames = request.serviceIds
    .map((id) => getServiceById(id)?.name)
    .filter((name): name is string => Boolean(name))

  // Đưa focus về tiêu đề để người dùng bàn phím/đọc màn hình biết đã gửi xong.
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const rows: Array<[string, string]> = [
    ['Mã lịch', result.id],
    ['Họ tên', request.name],
    ['Số điện thoại', request.phone],
    ['Dịch vụ', serviceNames.join(', ')],
    ['Thợ', getStaffName(request.staffId)],
    ['Thời gian', `${request.time}, ${formatDate(request.date)}`],
    ['Thời lượng dự kiến', formatDuration(summary.durationMin)],
    ['Tạm tính', `${summary.hasRange ? 'từ ' : ''}${formatVND(summary.total)}`],
  ]
  if (request.note) rows.push(['Ghi chú', request.note])

  return (
    <div
      className="rounded-card border border-line bg-surface p-6 shadow-soft sm:p-10"
      role="status"
    >
      <CheckCircle2 aria-hidden="true" className="size-12 text-success" />
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-4 text-4xl text-ink outline-none sm:text-5xl"
      >
        {bookingService.isMock ? 'Đã tạo bản nháp lịch hẹn' : 'Đã ghi nhận lịch hẹn'}
      </h2>
      <p className="mt-3 text-muted">
        Tiệm sẽ dùng số điện thoại {request.phone} để xác nhận lịch với bạn.
      </p>

      {bookingService.isMock && (
        <div className="mt-6 flex gap-3 rounded-field border border-warning/40 bg-warning/10 p-4 text-sm text-ink">
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-warning" />
          <p>
            <strong>Bản demo:</strong> lịch này chưa được gửi tới tiệm. Để giữ chỗ, vui lòng{' '}
            {business.phone ? (
              <a className="font-semibold underline" href={telHref(business.phone)}>
                gọi {formatPhoneDisplay(business.phone)}
              </a>
            ) : (
              'liên hệ trực tiếp với tiệm'
            )}
            {business.zalo && (
              <>
                {' '}
                hoặc{' '}
                <a
                  className="font-semibold underline"
                  href={zaloHref(business.zalo)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  nhắn Zalo
                </a>
              </>
            )}
            .
          </p>
        </div>
      )}

      <dl className="mt-8 divide-y divide-line border-y border-line">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr]">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="font-medium break-words text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <Button onClick={onReset} variant="outline" className="mt-8">
        Đặt lịch khác
      </Button>
    </div>
  )
}
