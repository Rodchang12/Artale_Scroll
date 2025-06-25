<template>
  <div
    style="
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 24px;
    "
  >
    <div style="max-width: 1200px; margin: 0 auto">
      <!-- 標題區域 -->
      <a-row justify="center" style="margin-bottom: 40px">
        <a-col span="24" style="text-align: center">
          <div style="margin-bottom: 24px">
            <span style="font-size: 4rem; margin-right: 16px">🎲</span>
            <h1
              style="
                display: inline-block;
                font-size: 3rem;
                font-weight: bold;
                color: #fff;
                margin: 0;
              "
            >
              卷軸模擬器
            </h1>
          </div>
          <router-link to="/">
            <a-button type="default" size="large" style="border-radius: 24px">
              <template #icon>
                <LeftOutlined />
              </template>
              返回首頁
            </a-button>
          </router-link>
        </a-col>
      </a-row>

      <!-- 主要遊戲區域 -->
      <a-card
        style="
          margin-bottom: 24px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.95);
        "
        :bordered="false"
      >
        <!-- 選擇機率顯示 -->
        <a-row justify="center" style="margin-bottom: 40px">
          <a-col span="24" style="text-align: center">
            <a-typography-title :level="3" style="margin-bottom: 16px">
              {{
                successRate
                  ? `已選擇：${successRate}% 成功機率`
                  : '請選擇卷軸類型'
              }}
            </a-typography-title>
            <a-divider style="width: 120px; margin: 0 auto" />
          </a-col>
        </a-row>

        <!-- 卷軸選擇區域 -->
        <a-row justify="center" :gutter="[48, 24]" style="margin-bottom: 40px">
          <!-- 10%卷軸 -->
          <a-col :xs="12" :sm="8" :md="6">
            <a-card
              hoverable
              @click="selectScroll(10)"
              :style="{
                borderRadius: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                border:
                  successRate === 10
                    ? '3px solid #faad14'
                    : '1px solid #d9d9d9',
                background: successRate === 10 ? '#fff7e6' : '#fff',
                transform: successRate === 10 ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }"
            >
              <template #cover>
                <div style="padding: 24px; position: relative">
                  <div
                    v-if="successRate === 10"
                    style="position: absolute; top: 8px; right: 8px"
                  >
                    <a-badge :count="1" style="background: #faad14">
                      <CheckOutlined style="color: #fff" />
                    </a-badge>
                  </div>
                  <div style="font-size: 4rem; margin-bottom: 8px">📜</div>
                </div>
              </template>
              <a-card-meta title="低風險卷軸" description="10% 成功機率" />
              <a-typography-text type="secondary" style="font-size: 12px">
                適合保守策略
              </a-typography-text>
            </a-card>
          </a-col>

          <!-- 60%卷軸 -->
          <a-col :xs="12" :sm="8" :md="6">
            <a-card
              hoverable
              @click="selectScroll(60)"
              :style="{
                borderRadius: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                border:
                  successRate === 60
                    ? '3px solid #faad14'
                    : '1px solid #d9d9d9',
                background: successRate === 60 ? '#fff7e6' : '#fff',
                transform: successRate === 60 ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }"
            >
              <template #cover>
                <div style="padding: 24px; position: relative">
                  <div
                    v-if="successRate === 60"
                    style="position: absolute; top: 8px; right: 8px"
                  >
                    <a-badge :count="1" style="background: #faad14">
                      <CheckOutlined style="color: #fff" />
                    </a-badge>
                  </div>
                  <div style="font-size: 4rem; margin-bottom: 8px">📃</div>
                </div>
              </template>
              <a-card-meta title="高效率卷軸" description="60% 成功機率" />
              <a-typography-text type="secondary" style="font-size: 12px">
                推薦選擇
              </a-typography-text>
            </a-card>
          </a-col>
        </a-row>

        <!-- 開始按鈕 -->
        <a-row justify="center">
          <a-col>
            <a-button
              type="primary"
              size="large"
              @click="simulateScrolls"
              :disabled="!scrollSelected"
              style="
                height: 64px;
                padding: 0 48px;
                border-radius: 32px;
                font-size: 18px;
                font-weight: bold;
              "
            >
              <template #icon>
                <span style="font-size: 24px; margin-right: 8px">🎯</span>
              </template>
              開始強化！
            </a-button>
            <div
              v-if="!scrollSelected"
              style="margin-top: 12px; text-align: center"
            >
              <a-typography-text type="warning">
                ✨ 請先選擇一個卷軸類型
              </a-typography-text>
            </div>
          </a-col>
        </a-row>
      </a-card>

      <!-- 統計面板 -->
      <a-row :gutter="[24, 24]" style="margin-bottom: 24px">
        <!-- 即時統計 -->
        <a-col :xs="24" :lg="12">
          <a-card
            title="📊 即時統計"
            style="border-radius: 16px"
            :bordered="false"
          >
            <a-row :gutter="[16, 16]">
              <a-col span="12">
                <a-statistic
                  title="連續成功"
                  :value="consecutiveSuccess"
                  :value-style="{
                    color: '#52c41a',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }"
                />
              </a-col>
              <a-col span="12">
                <a-statistic
                  title="連續失敗"
                  :value="consecutiveFailure"
                  :value-style="{
                    color: '#ff4d4f',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }"
                />
              </a-col>
            </a-row>
          </a-card>
        </a-col>

        <!-- 累計統計 -->
        <a-col :xs="24" :lg="12">
          <a-card
            title="🏆 累計記錄"
            style="border-radius: 16px"
            :bordered="false"
          >
            <a-row :gutter="[16, 16]">
              <a-col span="12">
                <a-statistic
                  title="總成功次數"
                  :value="totalSuccessCount"
                  :value-style="{
                    color: '#1890ff',
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }"
                />
              </a-col>
              <a-col span="12">
                <a-statistic
                  title="總失敗次數"
                  :value="totalFailureCount"
                  :value-style="{
                    color: '#722ed1',
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }"
                />
              </a-col>
              <a-col span="24" style="text-align: center; margin-top: 16px">
                <a-statistic
                  title="總體成功率"
                  :value="rateDisplay || '0%'"
                  :value-style="{
                    color: '#faad14',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }"
                />
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>

      <!-- 結果顯示區域 -->
      <div v-if="results.length > 0" style="margin-bottom: 24px">
        <a-card style="border-radius: 16px" :bordered="false">
          <a-row justify="center">
            <a-col span="24" style="text-align: center">
              <a-typography-title :level="2" style="margin-bottom: 32px">
                <span style="font-size: 2rem; margin-right: 12px">🎊</span>
                強化結果
              </a-typography-title>

              <a-result
                :status="lastResult ? 'success' : 'error'"
                :title="lastResult ? '強化成功！' : '強化失敗！'"
                :sub-title="
                  lastResult ? '恭喜您獲得了升級！' : '很遺憾，請再試一次'
                "
              >
                <template #icon>
                  <div style="font-size: 6rem; animation: bounce 1s infinite">
                    {{ lastResult ? '🎉' : '💥' }}
                  </div>
                </template>
                <template #extra>
                  <a-typography-text style="font-size: 16px; color: #666">
                    {{
                      lastResult
                        ? '✨ 好運氣！繼續保持這個勢頭！'
                        : '💪 別放棄，下一次就是您的機會！'
                    }}
                  </a-typography-text>
                </template>
              </a-result>
            </a-col>
          </a-row>
        </a-card>
      </div>

      <!-- 控制按鈕區域 -->
      <a-card style="border-radius: 16px" :bordered="false">
        <a-row justify="center" :gutter="[16, 16]">
          <a-col :xs="24" :sm="12" :md="8">
            <a-button
              block
              size="large"
              @click="reset"
              style="height: 48px; border-radius: 24px"
            >
              <template #icon>
                <ReloadOutlined />
              </template>
              重置當前
            </a-button>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8">
            <a-button
              block
              danger
              size="large"
              @click="resetStats"
              style="height: 48px; border-radius: 24px"
            >
              <template #icon>
                <DeleteOutlined />
              </template>
              清空統計
            </a-button>
          </a-col>
        </a-row>
        <a-row justify="center" style="margin-top: 16px">
          <a-col span="24" style="text-align: center">
            <a-typography-text type="secondary">
              提示：重置當前僅清除結果，清空統計會重置所有數據
            </a-typography-text>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import {
    LeftOutlined,
    CheckOutlined,
    ReloadOutlined,
    DeleteOutlined,
  } from '@ant-design/icons-vue'

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
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
</style>
