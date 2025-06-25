<script setup lang="ts">
  // App.vue 主組件
</script>

<template>
  <div id="app">
    <!-- 導航欄 -->
    <nav class="bg-white dark:bg-gray-800 shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link
              to="/"
              class="text-xl font-bold text-gray-800 dark:text-white"
            >
              Artale 卷軸
            </router-link>
          </div>
          <div class="flex space-x-4">
            <router-link
              to="/"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md transition"
              :class="{
                'text-blue-500 dark:text-blue-400': $route.path === '/',
              }"
            >
              首頁
            </router-link>
            <router-link
              to="/scroll-simulator"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md transition"
              :class="{
                'text-blue-500 dark:text-blue-400':
                  $route.path === '/scroll-simulator',
              }"
            >
              卷軸模擬器
            </router-link>
            <router-link
              to="/about"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md transition"
              :class="{
                'text-blue-500 dark:text-blue-400': $route.path === '/about',
              }"
            >
              關於
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- 路由視圖 -->
    <RouterView />
  </div>
</template>
