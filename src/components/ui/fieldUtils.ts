/** Trỏ aria-describedby tới lỗi (ưu tiên) hoặc gợi ý của trường `id`. */
export const describedBy = (id: string, error?: string, hint?: string): string | undefined =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined
