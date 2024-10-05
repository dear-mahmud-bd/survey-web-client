import './index.css'
import React from 'react'
import router from './Routes/Routes.jsx'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
