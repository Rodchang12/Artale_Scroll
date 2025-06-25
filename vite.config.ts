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
  build: {
    // 增加 chunk 大小警告閾值 (單位為 kB)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 自定義分塊策略
        manualChunks: {
          // 將 Vue 相關庫分到一個文件中
          'vue-vendor': ['vue', 'vue-router'],
          // 將 Ant Design 相關庫分到一個文件中
          'ant-design-vendor': ['ant-design-vue', '@ant-design/icons-vue'],
        },
      },
    },
  },
})
