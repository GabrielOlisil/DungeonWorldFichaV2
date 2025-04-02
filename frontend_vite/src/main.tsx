import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routes from './routes.ts'
import AuthProvider from '~/context/AuthProvider'


createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={routes} />
    </StrictMode>
  </AuthProvider>
)
