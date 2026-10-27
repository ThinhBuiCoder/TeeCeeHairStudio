import { ChevronDown } from 'lucide-react'
import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'

export interface AccordionItem {
  id: string
  title: string
  content: string
}

/** Accordion theo mẫu WAI-ARIA: nút có aria-expanded/aria-controls, phím mũi tên lên/xuống, Home/End. */
export const Accordion = ({ items }: { items: AccordionItem[] }) => {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(new Set())
  const baseId = useId()
  const triggers = useRef<Array<HTMLButtonElement | null>>([])

  const toggle = (id: string): void =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const onKeyDown = (event: KeyboardEvent, index: number): void => {
    const last = items.length - 1
    const target =
      event.key === 'ArrowDown'
        ? index === last
          ? 0
          : index + 1
        : event.key === 'ArrowUp'
          ? index === 0
            ? last
            : index - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null
    if (target === null) return
    event.preventDefault()
    triggers.current[target]?.focus()
  }

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const open = openIds.has(item.id)
        const panelId = `${baseId}-panel-${item.id}`
        const buttonId = `${baseId}-button-${item.id}`
        return (
          <div key={item.id}>
            <h3 className="font-sans text-base font-semibold tracking-normal">
              <button
                ref={(el) => {
                  triggers.current[index] = el
                }}
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-ink"
              >
                {item.title}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'size-5 shrink-0 text-gold-dark transition-transform duration-200',
                    open && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={cn(
                'grid transition-[grid-template-rows] duration-200',
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-muted">{item.content}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
