const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'] as const

const pad = (n: number): string => String(n).padStart(2, '0')

/** 50000 -> "50.000đ" */
export const formatVND = (amount: number): string =>
  `${Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`

/** 50000 -> "50K"; số không tròn nghìn thì dùng dạng đầy đủ. */
export const formatVNDShort = (amount: number): string =>
  amount % 1000 === 0 ? `${amount / 1000}K` : formatVND(amount)

/** Khoảng giá: "50K – 60K" hoặc "50K" nếu không có mức trên. */
export const formatPriceRange = (price: number, priceTo?: number): string =>
  priceTo && priceTo !== price
    ? `${formatVNDShort(price)} – ${formatVNDShort(priceTo)}`
    : formatVNDShort(price)

/** Date -> "2026-10-26" theo giờ địa phương (dùng làm giá trị form, không dùng toISOString vì lệch múi giờ). */
export const toDateKey = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

export const parseDateKey = (key: string): Date => {
  const [y = 0, m = 1, d = 1] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** "2026-10-26" -> "26/10/2026" */
export const formatDate = (key: string): string => {
  const d = parseDateKey(key)
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
}

/** "2026-10-26" -> "T2" */
export const formatWeekday = (key: string): string => WEEKDAYS[parseDateKey(key).getDay()] ?? ''

/** "2026-10-26" -> "26/10" */
export const formatDayMonth = (key: string): string => {
  const d = parseDateKey(key)
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`
}

/** 90 -> "1 giờ 30 phút", 45 -> "45 phút" */
export const formatDuration = (minutes: number): string => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} phút`
  return m === 0 ? `${h} giờ` : `${h} giờ ${m} phút`
}
