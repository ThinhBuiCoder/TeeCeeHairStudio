import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  /** id của thẻ h2, để section tham chiếu bằng aria-labelledby. */
  id?: string
  /** Mặc định h2; trang con dùng h1 để mỗi trang có đúng một h1. */
  as?: 'h1' | 'h2'
}

/** Eyebrow serif hoa giãn chữ, kẹp giữa hai đường kẻ mảnh như "HAIR STUDIO" trong logo. */
export const SectionHeading = ({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'center',
  id,
  as: Heading = 'h2',
}: SectionHeadingProps) => {
  const dark = tone === 'dark'
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <p
        className={cn(
          'flex items-center gap-3 eyebrow',
          align === 'center' && 'justify-center',
          dark ? 'text-gold-light' : 'text-gold-dark',
        )}
      >
        <span
          aria-hidden="true"
          className={cn('h-px w-8', dark ? 'bg-gold-light/60' : 'bg-gold')}
        />
        {eyebrow}
        {align === 'center' && (
          <span
            aria-hidden="true"
            className={cn('h-px w-8', dark ? 'bg-gold-light/60' : 'bg-gold')}
          />
        )}
      </p>
      <Heading
        id={id}
        className={cn('mt-4 text-4xl sm:text-5xl', dark ? 'text-white' : 'text-ink')}
      >
        {title}
      </Heading>
      {description && (
        <p className={cn('mt-4 text-base sm:text-lg', dark ? 'text-white/75' : 'text-muted')}>
          {description}
        </p>
      )}
    </div>
  )
}
