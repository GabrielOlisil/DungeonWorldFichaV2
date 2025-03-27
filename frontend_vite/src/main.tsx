import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/Layout.tsx'
import { Router, RouterProvider } from 'react-router-dom'
import routes from './routes.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
