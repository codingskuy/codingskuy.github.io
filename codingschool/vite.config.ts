import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  base: process.env.BASE_PATH ? `${process.env.BASE_PATH}/` : '/',
  build: {
    outDir: 'dist',
    target: 'es2022',
    rollupOptions: {
      output: {
        // React rarely changes between deploys, so keep it in its own long-cached chunk
        manualChunks: {
          react: ['react', 'react-dom', 'react-dom/client', 'scheduler'],
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
})
