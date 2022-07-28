import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import sri from "rollup-plugin-sri"

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['@yozuk/yozuk-wasm'],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  plugins: [
    vue(),
    {
      enforce: "post",
      ...sri({ publicPath: "/" })
    }
  ]
})
