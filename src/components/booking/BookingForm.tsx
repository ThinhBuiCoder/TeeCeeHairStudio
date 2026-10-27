import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CalendarCheck, MapPin } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm, useWatch, type FieldErrors } from 'react-hook-form'
import { BookingSuccess } from '@/components/booking/BookingSuccess'
import { Button } from '@/components/ui/Button'
import { ChoiceChip } from '@/components/ui/ChoiceChip'
import { TextareaField, TextField } from '@/components/ui/Field'
import { business } from '@/config/business'
import { useNow } from '@/hooks/useNow'
import { bookingSchema, MAX_GUESTS, NOTE_MAX, type BookingFormValues } from '@/lib/bookingSchema'
import { mapsSearchHref } from '@/lib/contact'
import { formatDayMonth, formatWeekday } from '@/lib/format'
import { getAvailableSlots, getBookableDates } from '@/lib/slots'
import { normalizePhone } from '@/lib/validators'
import { BookingError, bookingService } from '@/services/bookingService'
import type { BookingResult } from '@/types'

const FIELD_ORDER = ['phone', 'name', 'date', 'time', 'note'] as const

const GUEST_OPTIONS = Array.from({ length: MAX_GUESTS }, (_, i) => i + 1)

const PREFERENCES = [
  { name: 'quiet', label: 'Mình thích yên tĩnh, trò chuyện vừa phải thôi' },
  { name: 'consult', label: 'Mình cần được tư vấn kỹ về kiểu tóc' },
] as const

const legendClass = 'mb-4 flex items-baseline gap-3 font-display text-2xl font-bold text-ink'
const stepClass = 'font-sans text-sm font-semibold text-gold-dark'

const getInitialValues = (now: Date): BookingFormValues => {
  const dates = getBookableDates(now)
  // Mặc định là ngày gần nhất còn giờ trống (sau giờ đóng cửa thì là ngày mai).
  const date = dates.find((d) => getAvailableSlots(d, now).length > 0) ?? dates[0] ?? ''
  return { name: '', phone: '', guests: 1, quiet: false, consult: false, date, time: '', note: '' }
}

export const BookingForm = () => {
  const now = useNow()
  const [initial] = useState(() => getInitialValues(now))
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

  const guests = useWatch({ control, name: 'guests' })
  const date = useWatch({ control, name: 'date' })
  const time = useWatch({ control, name: 'time' })
  const note = useWatch({ control, name: 'note' })

  const dates = getBookableDates(now)
  const slots = getAvailableSlots(date, now)

  const pickDate = (next: string): void => {
    setValue('date', next, { shouldValidate: true, shouldDirty: true })
    if (!getAvailableSlots(next, now).includes(getValues('time'))) setValue('time', '')
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
          guests: values.guests,
          quiet: values.quiet,
          consult: values.consult,
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
    reset(getInitialValues(now))
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
      className="space-y-9 rounded-card border border-line bg-surface p-5 shadow-soft sm:p-8"
    >
      {business.address && (
        <div className="flex items-center gap-3 rounded-field border border-line bg-paper p-4">
          <MapPin aria-hidden="true" className="size-5 shrink-0 text-gold-dark" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ink">{business.fullName}</p>
            <p className="text-sm text-muted">{business.address}</p>
          </div>
          <a
            href={business.mapDirectionsUrl ?? mapsSearchHref(business.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-charcoal px-4 text-xs font-semibold text-white transition-colors hover:bg-ink"
          >
            Xem vị trí
          </a>
        </div>
      )}

      {/* 1. Thông tin */}
      <fieldset className="min-w-0 space-y-5">
        <legend className={legendClass}>
          <span className={stepClass}>01</span>Thông tin của bạn
        </legend>
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
        <TextField
          id="booking-name"
          label="Họ và tên"
          required
          autoComplete="name"
          placeholder="Nguyễn Văn A"
          error={errors.name?.message}
          {...register('name')}
        />
      </fieldset>

      {/* 2. Số khách và mong muốn */}
      <fieldset className="min-w-0">
        <legend className={legendClass}>
          <span className={stepClass}>02</span>Số khách
        </legend>
        <div className="grid grid-cols-5 gap-2">
          {GUEST_OPTIONS.map((n) => (
            <ChoiceChip
              key={n}
              name="guests"
              value={String(n)}
              checked={guests === n}
              onChange={() => setValue('guests', n, { shouldDirty: true })}
            >
              {n}
            </ChoiceChip>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {PREFERENCES.map((option) => (
            <label
              key={option.name}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-field border border-line px-4 py-2.5 transition-colors hover:border-muted has-[:checked]:border-ink has-[:checked]:bg-ink/[0.03] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink"
            >
              <input
                type="checkbox"
                className="size-5 shrink-0 accent-ink"
                {...register(option.name)}
              />
              <span className="text-sm font-medium text-ink">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* 3. Ngày */}
      <fieldset
        id="booking-date"
        tabIndex={-1}
        aria-describedby={errors.date ? 'booking-date-error' : undefined}
        className="min-w-0 outline-none"
      >
        <legend className={legendClass}>
          <span className={stepClass}>03</span>Chọn ngày
        </legend>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 md:mx-0 md:grid md:grid-cols-7 md:overflow-visible md:px-0">
          {dates.map((d, index) => (
            <ChoiceChip
              key={d}
              name="date"
              value={d}
              checked={date === d}
              onChange={() => pickDate(d)}
              disabled={getAvailableSlots(d, now).length === 0}
              className="min-w-[4.5rem] shrink-0 md:min-w-0 md:[&>span]:px-1"
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

      {/* 4. Giờ */}
      <fieldset
        id="booking-time"
        tabIndex={-1}
        aria-describedby={errors.time ? 'booking-time-error' : undefined}
        className="min-w-0 outline-none"
      >
        <legend className={legendClass}>
          <span className={stepClass}>04</span>Chọn khung giờ
        </legend>
        {slots.length === 0 ? (
          <p
            role="status"
            className="rounded-field border border-dashed border-line p-4 text-muted"
          >
            Ngày này đã hết giờ nhận lịch. Vui lòng chọn ngày khác.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
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
          Tiệm mở cửa {business.hours.open} – {business.hours.close}.
        </p>
        {groupError(errors.time?.message, 'booking-time-error')}
      </fieldset>

      {/* 5. Ghi chú */}
      <fieldset className="min-w-0">
        <legend className={legendClass}>
          <span className={stepClass}>05</span>Ghi chú
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

      <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
        {!isSubmitting && <CalendarCheck aria-hidden="true" className="size-5" />}
        {isSubmitting ? 'Đang gửi…' : submitError ? 'Thử lại' : 'Đặt lịch'}
      </Button>
    </form>
  )
}
