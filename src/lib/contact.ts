const digitsOnly = (value: string): string => value.replace(/\D/g, '')

/** "0901234567" -> "tel:0901234567" */
export const telHref = (phone: string): string => `tel:${phone.replace(/[^\d+]/g, '')}`

/** "0901234567" -> "https://zalo.me/0901234567" */
export const zaloHref = (zalo: string): string => `https://zalo.me/${digitsOnly(zalo)}`

/** "0901234567" -> "0901 234 567" */
export const formatPhoneDisplay = (phone: string): string => {
  const d = digitsOnly(phone)
  return d.length === 10 ? `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}` : phone
}
