<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4"
  >
    <div class="max-w-5xl mx-auto">
      <!-- 標題區域 -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center mb-6">
          <div class="text-6xl mr-4">🎲</div>
          <h1
            class="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
          >
            卷軸模擬器
          </h1>
        </div>
        <router-link
          to="/"
          class="inline-flex items-center bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          返回首頁
        </router-link>
      </div>

      <!-- 主要遊戲區域 -->
      <div
        class="bg-black/40 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-8 mb-8"
      >
        <!-- 選擇機率顯示 -->
        <div class="text-center mb-10">
          <div class="mb-8">
            <div class="text-2xl font-bold mb-2">
              <span
                class="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent"
              >
                {{
                  successRate
                    ? `已選擇：${successRate}% 成功機率`
                    : '請選擇卷軸類型'
                }}
              </span>
            </div>
            <div
              class="h-1 w-32 mx-auto bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
            ></div>
          </div>

          <!-- 卷軸選擇區域 -->
          <div class="flex justify-center space-x-12 mb-10">
            <!-- 10%卷軸 -->
            <div class="text-center group">
              <div
                @click="selectScroll(10)"
                class="relative w-28 h-28 rounded-2xl shadow-2xl flex items-center justify-center mb-4 transform transition-all duration-300 hover:scale-110 cursor-pointer group-hover:rotate-3"
                :class="[
                  successRate === 10
                    ? 'bg-gradient-to-br from-orange-400 to-red-500 ring-4 ring-yellow-400 ring-opacity-75 shadow-orange-500/50'
                    : 'bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-300 hover:to-orange-500 shadow-orange-500/30',
                ]"
              >
                <!-- 選中指示器 -->
                <div
                  v-if="successRate === 10"
                  class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-yellow-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <img
                  src="@/assets/scroll_10.png"
                  alt="10%卷軸"
                  class="w-20 h-20 drop-shadow-lg"
                />
              </div>
              <div class="text-white text-lg font-semibold mb-1">
                低風險卷軸
              </div>
              <div class="text-orange-300 text-sm">10% 成功機率</div>
              <div class="text-gray-400 text-xs mt-1">適合保守策略</div>
            </div>

            <!-- 60%卷軸 -->
            <div class="text-center group">
              <div
                @click="selectScroll(60)"
                class="relative w-28 h-28 rounded-2xl shadow-2xl flex items-center justify-center mb-4 transform transition-all duration-300 hover:scale-110 cursor-pointer group-hover:rotate-3"
                :class="[
                  successRate === 60
                    ? 'bg-gradient-to-br from-blue-400 to-purple-600 ring-4 ring-yellow-400 ring-opacity-75 shadow-blue-500/50'
                    : 'bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-300 hover:to-blue-500 shadow-blue-500/30',
                ]"
              >
                <!-- 選中指示器 -->
                <div
                  v-if="successRate === 60"
                  class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-yellow-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <img
                  src="@/assets/scroll_60.png"
                  alt="60%卷軸"
                  class="w-20 h-20 drop-shadow-lg"
                />
              </div>
              <div class="text-white text-lg font-semibold mb-1">
                高效率卷軸
              </div>
              <div class="text-blue-300 text-sm">60% 成功機率</div>
              <div class="text-gray-400 text-xs mt-1">推薦選擇</div>
            </div>
          </div>

          <!-- 開始按鈕 -->
          <div class="relative">
            <button
              @click="simulateScrolls"
              :disabled="!scrollSelected"
              class="relative px-12 py-4 text-xl font-bold text-white rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden"
              :class="[
                scrollSelected
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:via-pink-500 hover:to-red-500 shadow-purple-500/50 hover:shadow-purple-500/70'
                  : 'bg-gradient-to-r from-gray-600 to-gray-700 shadow-gray-500/30',
              ]"
            >
              <span class="relative z-10 flex items-center">
                <span class="text-3xl mr-3">🎯</span>
                開始強化！
              </span>
              <!-- 動畫背景 -->
              <div
                v-if="scrollSelected"
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"
              ></div>
            </button>
            <div
              v-if="!scrollSelected"
              class="text-amber-400 text-sm mt-3 font-medium"
            >
              ✨ 請先選擇一個卷軸類型
            </div>
          </div>
        </div>
      </div>

      <!-- 統計面板 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- 即時統計 -->
        <div
          class="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
        >
          <h3 class="text-xl font-bold text-white mb-4 flex items-center">
            <span class="text-2xl mr-2">📊</span>
            即時統計
          </h3>
          <div class="space-y-4">
            <div
              class="flex justify-between items-center p-3 bg-green-500/20 rounded-lg border border-green-500/30"
            >
              <span class="text-green-300">連續成功</span>
              <span class="text-2xl font-bold text-green-400">
                {{ consecutiveSuccess }}
              </span>
            </div>
            <div
              class="flex justify-between items-center p-3 bg-red-500/20 rounded-lg border border-red-500/30"
            >
              <span class="text-red-300">連續失敗</span>
              <span class="text-2xl font-bold text-red-400">
                {{ consecutiveFailure }}
              </span>
            </div>
          </div>
        </div>

        <!-- 累計統計 -->
        <div
          class="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
        >
          <h3 class="text-xl font-bold text-white mb-4 flex items-center">
            <span class="text-2xl mr-2">🏆</span>
            累計記錄
          </h3>
          <div class="space-y-4">
            <div
              class="flex justify-between items-center p-3 bg-blue-500/20 rounded-lg border border-blue-500/30"
            >
              <span class="text-blue-300">總成功次數</span>
              <span class="text-2xl font-bold text-blue-400">
                {{ totalSuccessCount }}
              </span>
            </div>
            <div
              class="flex justify-between items-center p-3 bg-purple-500/20 rounded-lg border border-purple-500/30"
            >
              <span class="text-purple-300">總失敗次數</span>
              <span class="text-2xl font-bold text-purple-400">
                {{ totalFailureCount }}
              </span>
            </div>
          </div>
          <div
            class="mt-4 p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30 text-center"
          >
            <div class="text-yellow-300 text-sm">總體成功率</div>
            <div class="text-2xl font-bold text-yellow-400">
              {{ rateDisplay || '0%' }}
            </div>
          </div>
        </div>
      </div>

      <!-- 結果顯示區域 -->
      <div
        v-if="results.length > 0"
        class="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-8"
      >
        <h3
          class="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center"
        >
          <span class="text-3xl mr-3">🎊</span>
          強化結果
        </h3>
        <div class="flex justify-center">
          <div
            class="relative p-8 rounded-3xl text-white font-bold text-center transform transition-all duration-500 hover:scale-105"
            :class="[
              lastResult
                ? 'bg-gradient-to-br from-green-400 to-emerald-600 shadow-2xl shadow-green-500/50'
                : 'bg-gradient-to-br from-red-400 to-rose-600 shadow-2xl shadow-red-500/50',
            ]"
          >
            <!-- 成功/失敗圖標 -->
            <div class="text-8xl mb-4 animate-bounce">
              {{ lastResult ? '🎉' : '💥' }}
            </div>
            <div class="text-3xl mb-2">
              {{ lastResult ? '強化成功！' : '強化失敗！' }}
            </div>
            <div class="text-lg opacity-90">
              {{ lastResult ? '恭喜您獲得了升級！' : '很遺憾，請再試一次' }}
            </div>

            <!-- 特效邊框 -->
            <div
              class="absolute inset-0 rounded-3xl opacity-50"
              :class="
                lastResult
                  ? 'bg-gradient-to-r from-yellow-400 via-transparent to-yellow-400'
                  : 'bg-gradient-to-r from-gray-600 via-transparent to-gray-600'
              "
            ></div>
          </div>
        </div>

        <!-- 激勵文字 -->
        <div class="text-center mt-6">
          <p class="text-gray-300 text-lg">
            {{
              lastResult
                ? '✨ 好運氣！繼續保持這個勢頭！'
                : '💪 別放棄，下一次就是您的機會！'
            }}
          </p>
        </div>
      </div>

      <!-- 控制按鈕區域 -->
      <div
        class="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
      >
        <div
          class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <button
            @click="reset"
            class="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            重置當前
          </button>
          <button
            @click="resetStats"
            class="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
            清空統計
          </button>
        </div>
        <div class="text-center mt-4 text-gray-400 text-sm">
          提示：重置當前僅清除結果，清空統計會重置所有數據
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  const successRate = ref<number | null>(null) // 初始值為 null，表示未選擇
  const results = ref<boolean[]>([])

  // 統計相關的響應式變數
  const totalSuccessCount = ref(0)
  const totalFailureCount = ref(0)
  const consecutiveSuccess = ref(0)
  const consecutiveFailure = ref(0)

  const scrollSelected = computed(() => successRate.value !== null)
  const hasRun = computed(() => results.value.length > 0)
  const lastResult = computed(() => results.value[results.value.length - 1])
  const rateDisplay = computed(() => {
    if (!hasRun.value) return ''
    const totalAttempts = totalSuccessCount.value + totalFailureCount.value
    return totalAttempts > 0
      ? ((totalSuccessCount.value / totalAttempts) * 100).toFixed(1) + '%'
      : '0%'
  })

  function selectScroll(rate: number) {
    successRate.value = rate
  }

  function simulateScrolls() {
    if (successRate.value === null) return

    const result = Math.random() * 100 < successRate.value
    results.value = [result] // 只保存最新的結果

    // 更新統計
    if (result) {
      totalSuccessCount.value += 1
      consecutiveSuccess.value += 1
      consecutiveFailure.value = 0
    } else {
      totalFailureCount.value += 1
      consecutiveFailure.value += 1
      consecutiveSuccess.value = 0
    }
  }

  function reset() {
    results.value = []
    consecutiveSuccess.value = 0
    consecutiveFailure.value = 0
  }

  function resetStats() {
    reset()
    totalSuccessCount.value = 0
    totalFailureCount.value = 0
  }
</script>

<style scoped>
  body {
    font-family: 'Helvetica Neue', sans-serif;
  }
</style>
