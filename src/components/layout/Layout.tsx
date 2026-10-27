import { Outlet, useLocation } from 'react-router'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { Header } from '@/components/layout/Header'
import { ScrollManager } from '@/components/layout/ScrollManager'

export const Layout = () => {
  const { pathname } = useLocation()
  return (
    <>
      <ScrollManager />
      <a
        href="#noi-dung"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-field focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
      >
        Bỏ qua đến nội dung chính
      </a>
      <Header overHero={pathname === '/'} />
      <main id="noi-dung" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
