import { LazyMotion } from 'framer-motion'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'

// Hoạt ảnh nạp sau khi trang đã hiện.
const loadMotionFeatures = () => import('@/lib/motionFeatures').then((m) => m.default)

const App = () => (
  <LazyMotion features={loadMotionFeatures} strict>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* Form đặt lịch nay nằm ngay trên trang chủ; giữ đường dẫn cũ để link đã chia sẻ vẫn dùng được. */}
          <Route
            path="dat-lich"
            element={<Navigate to={{ pathname: '/', hash: '#dat-lich' }} replace />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </LazyMotion>
)

export default App
