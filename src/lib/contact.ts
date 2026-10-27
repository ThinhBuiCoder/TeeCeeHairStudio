const digitsOnly = (value: string): string => value.replace(/\D/g, '')

/** "0901234567" -> "tel:0901234567" */
export const telHref = (phone: string): string => `tel:${phone.replace(/[^\d+]/g, '')}`

/** "a@b.com" -> "mailto:a@b.com" */
export const mailHref = (email: string): string => `mailto:${email}`

/** Liên kết mở Google Maps tại địa chỉ (dùng khi chưa có mapDirectionsUrl riêng). */
export const mapsSearchHref = (address: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

/** "0901234567" -> "0901 234 567" */
export const formatPhoneDisplay = (phone: string): string => {
  const d = digitsOnly(phone)
  return d.length === 10 ? `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}` : phone
}
