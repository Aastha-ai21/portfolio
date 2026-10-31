import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The WebGL scene is loaded with React.lazy, so three.js lands in its own chunk automatically.
export default defineConfig({
  plugins: [react()],
  build: { target: "es2022", chunkSizeWarningLimit: 1000 },
})
