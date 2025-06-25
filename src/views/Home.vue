<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
  >
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-gray-800 dark:text-white mb-6">
          Artale 卷軸模擬器
        </h1>

        <div class="flex justify-center space-x-4">
          <router-link
            to="/scroll-simulator"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            開始模擬卷軸
          </router-link>
          <router-link
            to="/about"
            class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            關於我們
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 首頁邏輯
</script>
