import { useEffect } from 'react'

/** Khoá cuộn trang phía sau khi menu/lightbox đang mở. */
export const useLockBodyScroll = (locked: boolean): void => {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}
