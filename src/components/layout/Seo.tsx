import { useEffect } from 'react'

interface SeoProps {
  title: string
  description: string
  jsonLd?: Record<string, unknown>
}

/** Cập nhật <title> và meta description theo từng trang (thẻ gốc nằm sẵn trong index.html cho trình thu thập không chạy JS). */
export const Seo = ({ title, description, jsonLd }: SeoProps) => {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])

  if (!jsonLd) return null
  return <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
}
