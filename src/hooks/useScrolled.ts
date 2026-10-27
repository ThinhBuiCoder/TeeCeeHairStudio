import { useSyncExternalStore } from 'react'

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener('scroll', callback, { passive: true })
  return () => window.removeEventListener('scroll', callback)
}

/** true khi trang đã cuộn quá `threshold` px. */
export const useScrolled = (threshold = 24): boolean =>
  useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  )
