import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routes from './routes.ts'
import { StrictMode } from 'react'


createRoot(document.getElementById('root')!).render(

  <StrictMode>

    <RouterProvider router={routes} />

  </StrictMode>

)
