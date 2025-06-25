import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/Artale_Scroll/',
  resolve: {
    alias: {
      '@': './src',
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'ant-design-vendor': ['ant-design-vue', '@ant-design/icons-vue'],
        },
      },
    },
  },
})
