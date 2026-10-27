import { CheckCircle2, Info } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { business } from '@/config/business'
import { formatDate } from '@/lib/format'
import { formatPhoneDisplay, mailHref, telHref } from '@/lib/contact'
import { bookingService } from '@/services/bookingService'
import type { BookingResult } from '@/types'

interface BookingSuccessProps {
  result: BookingResult
  onReset: () => void
}

export const BookingSuccess = ({ result, onReset }: BookingSuccessProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const { request } = result
  const preferences = [
    request.quiet && 'Thích yên tĩnh, trò chuyện vừa phải',
    request.consult && 'Cần tư vấn kỹ về kiểu tóc',
  ].filter((text): text is string => Boolean(text))

  // Đưa focus về tiêu đề để người dùng bàn phím/đọc màn hình biết đã gửi xong.
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const rows: Array<[string, string]> = [
    ['Mã lịch', result.id],
    ['Họ tên', request.name],
    ['Số điện thoại', request.phone],
    ['Số khách', String(request.guests)],
    ['Thời gian', `${request.time}, ${formatDate(request.date)}`],
  ]
  if (preferences.length > 0) rows.push(['Mong muốn', preferences.join('; ')])
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
            {business.email && (
              <>
                {' '}
                hoặc{' '}
                <a className="font-semibold underline" href={mailHref(business.email)}>
                  gửi email
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
