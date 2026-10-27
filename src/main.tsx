// Chỉ nạp subset latin + vietnamese (đủ dấu tiếng Việt), bỏ cyrillic/greek/latin-ext cho nhẹ.
import '@fontsource/cormorant-garamond/latin-600.css'
import '@fontsource/cormorant-garamond/latin-700.css'
import '@fontsource/cormorant-garamond/vietnamese-600.css'
import '@fontsource/cormorant-garamond/vietnamese-700.css'
import '@fontsource/be-vietnam-pro/latin-400.css'
import '@fontsource/be-vietnam-pro/latin-500.css'
import '@fontsource/be-vietnam-pro/latin-600.css'
import '@fontsource/be-vietnam-pro/vietnamese-400.css'
import '@fontsource/be-vietnam-pro/vietnamese-500.css'
import '@fontsource/be-vietnam-pro/vietnamese-600.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import '@/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
