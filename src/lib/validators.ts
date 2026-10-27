/** Bỏ khoảng trắng, dấu chấm, gạch ngang, ngoặc: "0901 234.567" -> "0901234567". */
export const normalizePhone = (value: string): string => value.replace(/[\s.\-()]/g, '')

/** Số di động Việt Nam: 0/84/+84 + đầu số 3,5,7,8,9 + 8 chữ số. */
export const isVietnamesePhone = (value: string): boolean =>
  /^(0|\+?84)(3|5|7|8|9)\d{8}$/.test(normalizePhone(value))
