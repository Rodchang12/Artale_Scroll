<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-2xl mx-auto bg-white shadow-md rounded p-6">
      <h1 class="text-3xl font-bold text-center mb-6">卷軸模擬器</h1>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label class="block mb-1 font-medium">成功機率 (%)</label>
          <input
            v-model.number="successRate"
            type="number"
            min="0"
            max="100"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">卷軸數量</label>
          <input
            v-model.number="totalScrolls"
            type="number"
            min="1"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <div class="flex justify-between mb-6">
        <button
          @click="simulateScrolls"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          模擬
        </button>
        <button
          @click="reset"
          class="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition"
        >
          重置
        </button>
      </div>

      <div class="mb-6 text-center">
        <h2 class="text-xl font-semibold">結果統計</h2>
        <p v-if="hasRun" class="mt-2">
          成功：
          <span class="text-green-600 font-bold">{{ successCount }}</span>
          / {{ totalScrolls }}
          <br />
          成功率：
          <span class="text-blue-600 font-bold">{{ rateDisplay }}</span>
        </p>
        <p v-else class="text-gray-500">請先點擊模擬以顯示結果</p>
      </div>

      <div class="grid grid-cols-5 gap-2 text-center">
        <div
          v-for="(r, i) in results"
          :key="i"
          class="p-2 rounded text-white font-medium"
          :class="r ? 'bg-green-500' : 'bg-red-500'"
        >
          {{ r ? '成功' : '失敗' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  const successRate = ref(60)
  const totalScrolls = ref(5)
  const results = ref<boolean[]>([])
  const hasRun = computed(() => results.value.length > 0)
  const successCount = computed(() => results.value.filter(x => x).length)
  const rateDisplay = computed(() =>
    hasRun.value
      ? ((successCount.value / totalScrolls.value) * 100).toFixed(1) + '%'
      : ''
  )

  function simulateScrolls() {
    results.value = Array.from(
      { length: totalScrolls.value },
      () => Math.random() * 100 < successRate.value
    )
  }

  function reset() {
    results.value = []
  }
</script>

<style scoped>
  body {
    font-family: 'Helvetica Neue', sans-serif;
  }
</style>
