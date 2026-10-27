import { useEffect, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Giữ phím Tab trong `containerRef` khi `active`, đóng bằng Esc, và trả focus về phần tử đã mở nó.
 * `onEscape` nên ổn định (useCallback) hoặc chấp nhận effect chạy lại.
 */
export const useFocusTrap = (
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  onEscape: () => void,
): void => {
  useEffect(() => {
    const container = containerRef.current
    if (!active || !container) return

    const opener = document.activeElement as HTMLElement | null
    const getItems = (): HTMLElement[] =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
    getItems()[0]?.focus()

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onEscape()
        return
      }
      if (event.key !== 'Tab') return
      const items = getItems()
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      opener?.focus?.()
    }
  }, [active, containerRef, onEscape])
}
