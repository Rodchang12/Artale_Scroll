<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800"
  >
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-6">
            關於 Artale 卷軸
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            了解我們的專案和使用的技術
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2
              class="text-2xl font-semibold text-gray-800 dark:text-white mb-4"
            >
              🎯 專案目標
            </h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              這個專案旨在創建一個卷軸模擬器，幫助玩家理解遊戲中的機率機制。
              通過直觀的介面和即時統計，讓使用者能夠更好地掌握機率分布的規律。
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2
              class="text-2xl font-semibold text-gray-800 dark:text-white mb-4"
            >
              🛠️ 技術棧
            </h2>
            <ul class="text-gray-600 dark:text-gray-300 space-y-2">
              <li>• Vue 3 - 漸進式前端框架</li>
              <li>• TypeScript - 類型安全</li>
              <li>• Tailwind CSS - 實用優先的 CSS</li>
              <li>• Vue Router - 單頁應用路由</li>
              <li>• Vite - 快速建構工具</li>
            </ul>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            ✨ 功能特色
          </h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="text-3xl mb-3">🎲</div>
              <h3 class="font-semibold text-gray-800 dark:text-white mb-2">
                隨機模擬
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                基於真實隨機數生成的卷軸模擬
              </p>
            </div>
            <div class="text-center">
              <div class="text-3xl mb-3">📈</div>
              <h3 class="font-semibold text-gray-800 dark:text-white mb-2">
                即時統計
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                即時顯示成功率和結果分析
              </p>
            </div>
            <div class="text-center">
              <div class="text-3xl mb-3">🌙</div>
              <h3 class="font-semibold text-gray-800 dark:text-white mb-2">
                深色模式
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                支援淺色和深色主題切換
              </p>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link
            to="/"
            class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            返回首頁
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 關於頁面邏輯
</script>
