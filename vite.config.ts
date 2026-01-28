import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/aw_git/',
  server: {
    port: 3000,
    host: true
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
})
