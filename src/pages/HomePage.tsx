import { lazy, Suspense } from 'react'
import { DeferUntilVisible } from '@/components/ui/DeferUntilVisible'
import { Seo } from '@/components/layout/Seo'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Faq } from '@/components/sections/Faq'
import { Gallery } from '@/components/sections/Gallery'
import { Hero } from '@/components/sections/Hero'
import { Pricing } from '@/components/sections/Pricing'
import { Process } from '@/components/sections/Process'
import { Services } from '@/components/sections/Services'
import { Team } from '@/components/sections/Team'
import { Testimonials } from '@/components/sections/Testimonials'
import { useAfterFirstPaint } from '@/hooks/useAfterFirstPaint'
import { buildHairSalonJsonLd } from '@/lib/structuredData'

// Form đặt lịch (react-hook-form + zod) tải sau để trang chủ hiện nhanh hơn.
const BookingSection = lazy(() =>
  import('@/components/sections/BookingSection').then((m) => ({ default: m.BookingSection })),
)

const HomePage = () => {
  // Hero hiện trước; các section bên dưới dựng ngay sau khung hình đầu để trang lên nhanh hơn.
  const showRest = useAfterFirstPaint()

  return (
    <>
      <Seo
        title="TEECEE HAIR STUDIO | Tiệm cắt tóc nam phong cách hiện đại"
        description="TEECEE HAIR STUDIO: tiệm cắt tóc nam sạch sẽ, hiện đại. Cắt tóc 60K, chăm sóc da mặt, massage, mở cửa 8:30 – 19:30 mỗi ngày. Đặt lịch online nhanh chóng."
        jsonLd={buildHairSalonJsonLd()}
      />
      <Hero />
      {showRest && (
        <>
          <About />
          <Services />
          <Pricing />
          <Gallery />
          <Team />
          <Process />
          <DeferUntilVisible minHeight="60rem">
            <Suspense fallback={<div className="min-h-[60rem]" aria-hidden="true" />}>
              <BookingSection />
            </Suspense>
          </DeferUntilVisible>
          <Testimonials />
          <Faq />
          <Contact />
        </>
      )}
    </>
  )
}

export default HomePage
