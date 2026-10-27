import { useEffect } from 'react'
import { useLocation } from 'react-router'

const MAX_ATTEMPTS = 40
const RETRY_MS = 50

/**
 * Chuyển trang thì cuộn lên đầu; có #hash thì cuộn tới section tương ứng (React Router không tự làm).
 * Các section dưới Hero dựng sau khung hình đầu nên thử lại vài lần cho tới khi phần tử xuất hiện.
 */
export const ScrollManager = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    let attempts = 0
    let timer = 0
    const tryScroll = (): void => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'instant' })
      } else if (++attempts < MAX_ATTEMPTS) {
        timer = window.setTimeout(tryScroll, RETRY_MS)
      }
    }
    timer = window.setTimeout(tryScroll, RETRY_MS)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return null
}
