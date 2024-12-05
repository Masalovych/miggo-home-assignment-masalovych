import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Axios from 'axios'

import queryClient from './queryClient.ts'

import {
  QueryClientProvider,
} from '@tanstack/react-query'

Axios.defaults.baseURL = '/api/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
