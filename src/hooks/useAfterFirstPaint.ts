import { useEffect, useState } from 'react'

/** false ở lần render đầu, true ngay sau khi trình duyệt đã vẽ khung hình đầu tiên. */
export const useAfterFirstPaint = (): boolean => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Hai lần rAF: lần 1 chạy trước khi vẽ, lần 2 chạy sau khi đã vẽ xong khung hình đầu.
    let second = 0
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setReady(true))
    })
    return () => {
      cancelAnimationFrame(first)
      cancelAnimationFrame(second)
    }
  }, [])

  return ready
}
