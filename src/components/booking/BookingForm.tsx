import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm, useWatch, type FieldErrors } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import { BookingSuccess } from '@/components/booking/BookingSuccess'
import { Button } from '@/components/ui/Button'
import { ChoiceChip } from '@/components/ui/ChoiceChip'
import { TextareaField, TextField } from '@/components/ui/Field'
import { business } from '@/config/business'
import { getServiceById, services, summarizeServices } from '@/data/services'
import { ANY_STAFF_ID, team } from '@/data/team'
import { useNow } from '@/hooks/useNow'
import { bookingSchema, NOTE_MAX, type BookingFormValues } from '@/lib/bookingSchema'
import { cn } from '@/lib/cn'
import {
  formatDayMonth,
  formatDuration,
  formatPriceRange,
  formatVND,
  formatWeekday,
} from '@/lib/format'
import { getAvailableSlots, getBookableDates } from '@/lib/slots'
import { normalizePhone } from '@/lib/validators'
import { BookingError, bookingService } from '@/services/bookingService'
import type { BookingResult } from '@/types'

const FIELD_ORDER = ['name', 'phone', 'serviceIds', 'staffId', 'date', 'time', 'note'] as const

const legendClass = 'mb-4 flex items-baseline gap-3 font-display text-2xl font-bold text-ink'
const stepClass = 'font-sans text-sm font-semibold text-gold-dark'

/** Đọc ?dich-vu=a,b và ?tho=id từ đường dẫn (nút "Đặt dịch vụ này", "Đặt với ..."), bỏ qua id không tồn tại. */
const getInitialValues = (params: URLSearchParams, now: Date): BookingFormValues => {
  const serviceIds = (params.get('dich-vu') ?? '')
    .split(',')
    .filter((id) => Boolean(getServiceById(id)))
  const staffParam = params.get('tho')
  const staffId = team.some((t) => t.id === staffParam) ? (staffParam as string) : ANY_STAFF_ID
  const duration = summarizeServices(serviceIds).durationMin
  const dates = getBookableDates(now)
  // Mặc định là ngày gần nhất còn giờ trống (sau giờ đóng cửa thì là ngày mai).
  const date = dates.find((d) => getAvailableSlots(d, duration, now).length > 0) ?? dates[0] ?? ''
  return { name: '', phone: '', serviceIds, staffId, date, time: '', note: '' }
}

export const BookingForm = () => {
  const [searchParams] = useSearchParams()
  const now = useNow()
  const [initial] = useState(() => getInitialValues(searchParams, now))
  const [result, setResult] = useState<BookingResult | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const submittingRef = useRef(false)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: initial,
    mode: 'onTouched',
  })

  const serviceIds = useWatch({ control, name: 'serviceIds' })
  const staffId = useWatch({ control, name: 'staffId' })
  const date = useWatch({ control, name: 'date' })
  const time = useWatch({ control, name: 'time' })
  const note = useWatch({ control, name: 'note' })

  const summary = summarizeServices(serviceIds)
  const dates = getBookableDates(now)
  const slots = getAvailableSlots(date, summary.durationMin, now)

  const clearTimeIfUnavailable = (nextDate: string, nextServiceIds: string[]): void => {
    const nextSlots = getAvailableSlots(
      nextDate,
      summarizeServices(nextServiceIds).durationMin,
      now,
    )
    if (!nextSlots.includes(getValues('time'))) setValue('time', '')
  }

  const toggleService = (id: string): void => {
    const next = serviceIds.includes(id) ? serviceIds.filter((s) => s !== id) : [...serviceIds, id]
    setValue('serviceIds', next, { shouldValidate: true, shouldDirty: true })
    clearTimeIfUnavailable(date, next)
  }

  const pickDate = (next: string): void => {
    setValue('date', next, { shouldValidate: true, shouldDirty: true })
    clearTimeIfUnavailable(next, serviceIds)
  }

  const onSubmit = async (values: BookingFormValues): Promise<void> => {
    if (submittingRef.current) return // chống bấm gửi hai lần
    submittingRef.current = true
    setSubmitError(null)
    try {
      setResult(
        await bookingService.createBooking({
          name: values.name.trim(),
          phone: normalizePhone(values.phone),
          serviceIds: values.serviceIds,
          staffId: values.staffId,
          date: values.date,
          time: values.time,
          note: values.note.trim(),
        }),
      )
    } catch (error) {
      setSubmitError(
        error instanceof BookingError
          ? error.message
          : 'Có lỗi xảy ra khi gửi lịch. Vui lòng thử lại hoặc liên hệ trực tiếp với tiệm.',
      )
    } finally {
      submittingRef.current = false
    }
  }

  // Đưa focus tới trường lỗi đầu tiên (các nhóm chọn không có ref nên tự tìm theo id).
  const onInvalid = (invalid: FieldErrors<BookingFormValues>): void => {
    const first = FIELD_ORDER.find((field) => invalid[field])
    if (first) document.getElementById(`booking-${first}`)?.focus()
  }

  const resetAll = (): void => {
    setResult(null)
    setSubmitError(null)
    reset(getInitialValues(new URLSearchParams(), now))
  }

  if (result) return <BookingSuccess result={result} onReset={resetAll} />

  const groupError = (message?: string, id?: string) =>
    message ? (
      <p id={id} className="mt-2 text-sm font-medium text-danger">
        {message}
      </p>
    ) : null

  return (
    <form
      noValidate
      onSubmit={(event) => void handleSubmit(onSubmit, onInvalid)(event)}
      aria-busy={isSubmitting}
      className="space-y-10 rounded-card border border-line bg-surface p-6 shadow-soft sm:p-10"
    >
      {/* 1. Thông tin */}
      <fieldset className="min-w-0 space-y-5">
        <legend className={legendClass}>
          <span className={stepClass}>01</span>Thông tin của bạn
        </legend>
        <TextField
          id="booking-name"
          label="Họ tên"
          required
          autoComplete="name"
          placeholder="Nguyễn Văn A"
          error={errors.name?.message}
          {...register('name')}
        />
        <TextField
          id="booking-phone"
          label="Số điện thoại"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0901 234 567"
          hint="Tiệm chỉ dùng số điện thoại này để xác nhận lịch hẹn của bạn."
          error={errors.phone?.message}
          {...register('phone')}
        />
      </fieldset>

      {/* 2. Dịch vụ */}
      <fieldset
        id="booking-serviceIds"
        tabIndex={-1}
        aria-describedby={errors.serviceIds ? 'booking-serviceIds-error' : undefined}
        className="min-w-0 outline-none"
      >
        <legend className={legendClass}>
          <span className={stepClass}>02</span>Chọn dịch vụ
        </legend>
        {services.length === 0 ? (
          <p className="rounded-field border border-dashed border-line p-4 text-muted">
            Danh sách dịch vụ đang được cập nhật. Vui lòng liên hệ trực tiếp với tiệm để đặt lịch.
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => {
              const checked = serviceIds.includes(service.id)
              return (
                <li key={service.id}>
                  <label
                    className={cn(
                      'flex min-h-14 cursor-pointer items-start gap-3 rounded-field border p-3.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink',
                      checked ? 'border-ink bg-ink/[0.03]' : 'border-line hover:border-muted',
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleService(service.id)}
                      className="mt-1 size-5 shrink-0 accent-ink"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-ink">{service.name}</span>
                      <span className="block text-sm text-muted">
                        {formatDuration(service.durationMin)} ·{' '}
                        {formatPriceRange(service.price, service.priceTo)}
                      </span>
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        )}
        {groupError(errors.serviceIds?.message, 'booking-serviceIds-error')}

        <p aria-live="polite" className="mt-4 rounded-field bg-paper px-4 py-3 text-sm text-ink">
          {serviceIds.length === 0 ? (
            'Chọn dịch vụ để xem tổng thời lượng và giá tạm tính.'
          ) : (
            <>
              Tổng thời lượng: <strong>{formatDuration(summary.durationMin)}</strong> · Tạm tính:{' '}
              <strong>
                {summary.hasRange ? 'từ ' : ''}
                {formatVND(summary.total)}
              </strong>
            </>
          )}
        </p>
      </fieldset>

      {/* 3. Thợ */}
      <fieldset className="min-w-0">
        <legend className={legendClass}>
          <span className={stepClass}>03</span>Chọn thợ
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[{ id: ANY_STAFF_ID, name: 'Bất kỳ thợ nào' }, ...team].map((member) => (
            <ChoiceChip
              key={member.id}
              name="staff"
              value={member.id}
              checked={staffId === member.id}
              onChange={() => setValue('staffId', member.id, { shouldDirty: true })}
            >
              {member.name}
            </ChoiceChip>
          ))}
        </div>
      </fieldset>

      {/* 4. Ngày giờ */}
      <fieldset
        id="booking-date"
        tabIndex={-1}
        aria-describedby={errors.date ? 'booking-date-error' : undefined}
        className="min-w-0 outline-none"
      >
        <legend className={legendClass}>
          <span className={stepClass}>04</span>Chọn ngày
        </legend>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 md:mx-0 md:grid md:grid-cols-7 md:overflow-visible md:px-0">
          {dates.map((d, index) => (
            <ChoiceChip
              key={d}
              name="date"
              value={d}
              checked={date === d}
              onChange={() => pickDate(d)}
              disabled={getAvailableSlots(d, summary.durationMin, now).length === 0}
              className="min-w-[4.5rem] shrink-0 md:min-w-0"
            >
              <span className="flex flex-col items-center leading-tight">
                <span className="text-xs opacity-80">
                  {index === 0 ? 'Hôm nay' : formatWeekday(d)}
                </span>
                <span>{formatDayMonth(d)}</span>
              </span>
            </ChoiceChip>
          ))}
        </div>
        {groupError(errors.date?.message, 'booking-date-error')}
      </fieldset>

      <fieldset
        id="booking-time"
        tabIndex={-1}
        aria-describedby={errors.time ? 'booking-time-error' : undefined}
        className="min-w-0 outline-none"
      >
        <legend className={legendClass}>
          <span className={stepClass}>05</span>Chọn giờ
        </legend>
        {slots.length === 0 ? (
          <p
            role="status"
            className="rounded-field border border-dashed border-line p-4 text-muted"
          >
            Ngày này đã hết giờ nhận lịch cho các dịch vụ bạn chọn. Vui lòng chọn ngày khác.
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {slots.map((slot) => (
              <ChoiceChip
                key={slot}
                name="time"
                value={slot}
                checked={time === slot}
                onChange={() => setValue('time', slot, { shouldValidate: true, shouldDirty: true })}
              >
                {slot}
              </ChoiceChip>
            ))}
          </div>
        )}
        <p className="mt-3 text-sm text-muted">
          Tiệm mở cửa {business.hours.open} – {business.hours.close}. Giờ muộn nhất tự điều chỉnh
          theo thời lượng dịch vụ bạn chọn.
        </p>
        {groupError(errors.time?.message, 'booking-time-error')}
      </fieldset>

      {/* 6. Ghi chú */}
      <fieldset className="min-w-0">
        <legend className={legendClass}>
          <span className={stepClass}>06</span>Ghi chú
        </legend>
        <TextareaField
          id="booking-note"
          label="Ghi chú cho tiệm (không bắt buộc)"
          placeholder="Ví dụ: muốn cắt fade, có mang ảnh mẫu..."
          maxLength={NOTE_MAX + 50}
          hint={`${note.length}/${NOTE_MAX} ký tự`}
          error={errors.note?.message}
          {...register('note')}
        />
      </fieldset>

      {submitError && (
        <div
          role="alert"
          className="flex gap-3 rounded-field border border-danger/40 bg-danger/5 p-4 text-sm text-ink"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-danger" />
          <p>{submitError} Thông tin bạn đã nhập vẫn được giữ lại.</p>
        </div>
      )}

      <Button type="submit" size="lg" loading={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? 'Đang gửi…' : submitError ? 'Thử lại' : 'Xác nhận đặt lịch'}
      </Button>
    </form>
  )
}
