import { useEffect, useRef, useState, type ReactNode } from 'react'

interface DeferUntilVisibleProps {
  children: ReactNode
  /** Chiều cao giữ chỗ trước khi nội dung được dựng, tránh nhảy bố cục. */
  minHeight: string
  /** Bắt đầu dựng khi cách khung nhìn bấy nhiêu. */
  rootMargin?: string
}

/** Chỉ dựng (và tải code của) phần bên dưới khi người dùng cuộn gần tới, để không tranh băng thông với phần đầu trang. */
export const DeferUntilVisible = ({
  children,
  minHeight,
  rootMargin = '900px 0px',
}: DeferUntilVisibleProps) => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || visible) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [visible, rootMargin])

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible && children}
    </div>
  )
}
