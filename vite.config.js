import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['@yozuk/yozuk-wasm'],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  plugins: [vue()]
})
