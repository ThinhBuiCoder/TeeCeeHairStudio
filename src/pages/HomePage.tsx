import { Seo } from '@/components/layout/Seo'
import { About } from '@/components/sections/About'
import { BookingSection } from '@/components/sections/BookingSection'
import { Contact } from '@/components/sections/Contact'
import { Gallery } from '@/components/sections/Gallery'
import { Hero } from '@/components/sections/Hero'
import { Highlights } from '@/components/sections/Highlights'
import { buildHairSalonJsonLd } from '@/lib/structuredData'

const HomePage = () => (
  <>
    <Seo
      title="TEECEE HAIR STUDIO | Tiệm cắt tóc nam phong cách hiện đại"
      description="TEECEE HAIR STUDIO: tiệm cắt tóc nam sạch sẽ, hiện đại, mở cửa 8:30 – 19:30 mỗi ngày. Đặt lịch online nhanh chóng."
      jsonLd={buildHairSalonJsonLd()}
    />
    <Hero />
    <About />
    <Highlights />
    <div className="pt-20 md:pt-28">
      <Gallery />
    </div>
    <BookingSection />
    <Contact />
  </>
)

export default HomePage
