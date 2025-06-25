<template>
  <div style="padding: 24px">
    <div style="max-width: 1200px; margin: 0 auto">
      <!-- 主要遊戲區域 -->
      <a-card
        :bordered="false"
        style="
          margin-bottom: 24px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.95);
        "
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
        <a-row justify="center" :gutter="[24, 24]" style="margin-bottom: 40px">
          <!-- 10%卷軸 -->
          <a-col :xs="12" :sm="8" :md="6">
            <div
              @click="selectScroll(10)"
              :style="{
                borderRadius: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                border:
                  successRate === 10
                    ? '3px solid #faad14'
                    : '3px solid transparent',
                backgroundColor: '#fff',
                padding: '16px',
                transition: 'border-color 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              }"
            >
              <img src="@/assets/scroll_10.png" alt="10%卷軸" />
            </div>
          </a-col>

          <!-- 60%卷軸 -->
          <a-col :xs="12" :sm="8" :md="6">
            <div
              @click="selectScroll(60)"
              :style="{
                borderRadius: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                border:
                  successRate === 60
                    ? '3px solid #faad14'
                    : '3px solid transparent',
                backgroundColor: '#fff',
                padding: '16px',
                transition: 'border-color 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              }"
            >
              <img src="@/assets/scroll_60.png" alt="60%卷軸" />
            </div>
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

        <!-- 統計面板 -->
        <div style="margin-top: 40px">
          <!-- 即時統計 -->
          <a-row justify="center" style="margin-bottom: 24px">
            <a-col span="24" style="text-align: center">
              <a-typography-title
                :level="4"
                style="margin-bottom: 20px; color: #666"
              >
                即時統計
              </a-typography-title>
            </a-col>
          </a-row>

          <a-row
            :gutter="[24, 24]"
            justify="center"
            style="margin-bottom: 32px"
          >
            <a-col :xs="12" :sm="8" :md="6">
              <div
                style="
                  text-align: center;
                  padding: 16px;
                  background: #f6ffed;
                  border-radius: 8px;
                  border: 1px solid #b7eb8f;
                "
              >
                <div style="color: #999; font-size: 14px; margin-bottom: 8px">
                  連續成功
                </div>
                <div style="color: #52c41a; font-size: 28px; font-weight: bold">
                  {{ consecutiveSuccess }}
                </div>
              </div>
            </a-col>
            <a-col :xs="12" :sm="8" :md="6">
              <div
                style="
                  text-align: center;
                  padding: 16px;
                  background: #fff2f0;
                  border-radius: 8px;
                  border: 1px solid #ffccc7;
                "
              >
                <div style="color: #999; font-size: 14px; margin-bottom: 8px">
                  連續失敗
                </div>
                <div style="color: #ff4d4f; font-size: 28px; font-weight: bold">
                  {{ consecutiveFailure }}
                </div>
              </div>
            </a-col>
          </a-row>

          <!-- 累計統計 -->
          <a-row justify="center" style="margin-bottom: 24px">
            <a-col span="24" style="text-align: center">
              <a-typography-title
                :level="4"
                style="margin-bottom: 20px; color: #666"
              >
                累計統計
              </a-typography-title>
            </a-col>
          </a-row>

          <a-row
            :gutter="[24, 24]"
            justify="center"
            style="margin-bottom: 32px"
          >
            <a-col :xs="12" :sm="8" :md="6">
              <div
                style="
                  text-align: center;
                  padding: 16px;
                  background: #f0f9ff;
                  border-radius: 8px;
                  border: 1px solid #91d5ff;
                "
              >
                <div style="color: #999; font-size: 14px; margin-bottom: 8px">
                  ✅ 總成功次數
                </div>
                <div style="color: #1890ff; font-size: 24px; font-weight: bold">
                  {{ totalSuccessCount }}
                </div>
              </div>
            </a-col>
            <a-col :xs="12" :sm="8" :md="6">
              <div
                style="
                  text-align: center;
                  padding: 16px;
                  background: #fafafa;
                  border-radius: 8px;
                  border: 1px solid #d9d9d9;
                "
              >
                <div style="color: #999; font-size: 14px; margin-bottom: 8px">
                  ❌ 總失敗次數
                </div>
                <div style="color: #722ed1; font-size: 24px; font-weight: bold">
                  {{ totalFailureCount }}
                </div>
              </div>
            </a-col>
          </a-row>

          <!-- 總體成功率 -->
          <a-row justify="center">
            <a-col :xs="20" :sm="16" :md="12" :lg="8">
              <div
                style="
                  text-align: center;
                  padding: 24px;
                  background: linear-gradient(135deg, #fff9e6 0%, #ffeaa7 100%);
                  border-radius: 12px;
                  border: 2px solid #faad14;
                  box-shadow: 0 4px 12px rgba(250, 173, 20, 0.15);
                "
              >
                <div style="color: #999; font-size: 16px; margin-bottom: 12px">
                  總體成功率
                </div>
                <div style="color: #faad14; font-size: 32px; font-weight: bold">
                  {{ rateDisplay || '0%' }}
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-card>

      <!-- 結果顯示區域 -->
      <div v-if="results.length > 0" style="margin-bottom: 24px">
        <a-card style="border-radius: 16px" :bordered="false">
          <a-row justify="center">
            <a-col span="24" style="text-align: center">
              <a-result
                :status="lastResult ? 'success' : 'error'"
                :sub-title="
                  lastResult
                    ? '卷軸閃爍了一下，神秘的力量傳到了道具身上。'
                    : '卷軸閃爍了一下，但道具沒有任何變化。'
                "
              ></a-result>
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
import { ReloadOutlined, DeleteOutlined } from '@ant-design/icons-vue'

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
