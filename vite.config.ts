import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3456,
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      'supernal-linkedin-formatter': path.resolve(__dirname, '../../packages/@supernal-social/linkedin-formatter/src/index.ts'),
    },
  },
})

