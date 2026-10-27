const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'] as const

const pad = (n: number): string => String(n).padStart(2, '0')

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
