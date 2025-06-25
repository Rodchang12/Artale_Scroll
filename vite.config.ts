import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/Artale-Scroll/', // 設定 GitHub Pages 的基礎路徑
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
