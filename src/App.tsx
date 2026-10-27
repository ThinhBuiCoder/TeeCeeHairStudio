import { LazyMotion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import { Spinner } from '@/components/ui/Spinner'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'

// Hoạt ảnh nạp sau khi trang đã hiện.
const loadMotionFeatures = () => import('@/lib/motionFeatures').then((m) => m.default)

// Trang đặt lịch tải khi cần, giữ bundle trang chủ nhẹ.
const BookingPage = lazy(() => import('@/pages/BookingPage'))

const PageFallback = () => (
  <div className="flex min-h-[100svh] items-center justify-center text-muted" role="status">
    <Spinner className="size-6" />
    <span className="sr-only">Đang tải…</span>
  </div>
)

const App = () => (
  <LazyMotion features={loadMotionFeatures} strict>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="dat-lich"
            element={
              <Suspense fallback={<PageFallback />}>
                <BookingPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </LazyMotion>
)

export default App
