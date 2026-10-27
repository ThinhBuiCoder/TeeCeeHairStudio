import { useSyncExternalStore } from 'react'

const subscribe = (callback: () => void): (() => void) => {
  const id = window.setInterval(callback, 30_000)
  return () => window.clearInterval(id)
}

/** Thời điểm hiện tại, làm mới mỗi phút (đủ cho trạng thái "Đang mở cửa"). */
export const useNow = (): Date => {
  const minute = useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / 60_000),
    () => 0,
  )
  return minute === 0 ? new Date() : new Date(minute * 60_000)
}
