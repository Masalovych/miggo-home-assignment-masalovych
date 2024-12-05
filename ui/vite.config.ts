import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Match all requests starting with /api
      '/api': {
        target: 'http://localhost:3000', // The target server
        changeOrigin: true,               // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix
      },
    },
  },
})
