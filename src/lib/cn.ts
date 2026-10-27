/** Ghép class có điều kiện, bỏ giá trị falsy. */
export const cn = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ')
