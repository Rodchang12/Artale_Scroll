<template>
  <div
    style="
      min-height: 100vh;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    "
  >
    <h1 style="color: #ffffff; font-size: 24px; margin-bottom: 20px">
      <img :src="mapleIcon" class="icon" />
      Artale 墊卷模擬器<img :src="mapleIcon" class="icon" />
    </h1>
    <div style="color: #faad14; font-size: 18px; margin-bottom: 16px">
      <select
        id="selectScroll"
        v-model="selectedScrollId"
        style="
          width: 200px;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
          text-align: center;
        "
        @change="handleScrollChange"
      >
        <option value="" disabled>-- 請選擇卷軸 --</option>
        <option v-for="scroll in scrolls" :key="scroll.id" :value="scroll.id">
          {{ scroll.name }}
        </option>
      </select>
    </div>
    <div style="color: #faad14; font-size: 18px; margin-bottom: 16px">
      <input
        id="itemNameInput"
        v-model="itemName"
        placeholder="請輸入道具名稱"
        @input="handleItemNameInput"
        style="
          width: 200px;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
          text-align: center;
        "
      />
    </div>

    <div style="color: #faad14; font-size: 18px; margin-bottom: 16px">
      卷軸：{{ scrollName || '' }} {{ successRate }}%
    </div>
    <!-- <div
      id="currentChanceDisplay"
      style="color: #faad14; font-size: 18px; margin-bottom: 16px"
    >
      選擇機率：
    </div> -->
    <div class="chance-buttons">
      <button
        class="chance-button"
        :class="{ selected: successRate === 10 }"
        @click="quickSelectRate(10)"
      >
        <img :src="scroll10Src" class="icon" />
      </button>
      <button
        class="chance-button"
        :class="{ selected: successRate === 60 }"
        @click="quickSelectRate(60)"
      >
        <img :src="scroll60Src" class="icon" />
      </button>
    </div>
    <button id="rollButton" @click="roll()">開墊！</button>
    <hr style="width: 30%; margin: 20px auto; border: 1px solid #ccc" />
    <div
      id="result"
      :style="{
        color: lastResult ? 'rgb(144, 238, 144)' : 'rgb(240, 161, 160)',
      }"
      v-if="results.length > 0"
    >
      {{
        lastResult
          ? // 道具替換成 ${itemName}
            `卷軸閃爍了一下，神秘的力量傳到了${resultItemName}身上。`
          : `卷軸閃爍了一下，但${resultItemName || '道具'}沒有任何變化。`
      }}
    </div>
    <div id="counter">
      連續成功：{{ consecutiveSuccess }} 次，連續失敗：{{ consecutiveFailure }}
      次
    </div>
    <div id="totals">
      累計成功：{{ totalSuccessCount }} 次，累計失敗：{{ totalFailureCount }} 次
    </div>
    <button id="resetButton" @click="resetStats()">重置</button>

    <!-- 音效元素 -->
    <audio ref="successSound" :src="successSoundSrc" preload="auto"></audio>
    <audio ref="failSound" :src="failSoundSrc" preload="auto"></audio>
    <audio
      ref="buttonHoverSound"
      :src="buttonHoverSoundSrc"
      preload="auto"
    ></audio>
    <audio
      ref="buttonClickSound"
      :src="buttonClickSoundSrc"
      preload="auto"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import scrollsData from '../assets/data/scrolls.json'

// 定義卷軸類型
interface Scroll {
  id: string
  name: string
  description: string
}

// 使用 Vite 的 new URL 語法導入圖片和音效檔案
const mapleIcon = new URL(
  '../assets/images/maplestory_icon.png',
  import.meta.url,
).href
const scroll10Src = new URL('../assets/images/scroll_10.png', import.meta.url)
  .href
const scroll60Src = new URL('../assets/images/scroll_60.png', import.meta.url)
  .href
const successSoundSrc = new URL(
  '../assets/sounds/ScrollSuccess.ogg',
  import.meta.url,
).href
const failSoundSrc = new URL(
  '../assets/sounds/ScrollFailed.ogg',
  import.meta.url,
).href
const buttonHoverSoundSrc = new URL(
  '../assets/sounds/ButtonHover.ogg',
  import.meta.url,
).href
const buttonClickSoundSrc = new URL(
  '../assets/sounds/ButtonClick.ogg',
  import.meta.url,
).href

// 卷軸資料
const scrolls = ref<Scroll[]>(scrollsData.scrolls as Scroll[])
// 響應式狀態
const successRate = ref<number>(60) // 初始化為 60%
const selectedScrollId = ref<string>('') // 選擇的卷軸ID
const scrollName = ref<string>('') // 卷軸名稱
const itemName = ref<string>('') // 輸入的道具名稱
const resultItemName = ref<string>('') // 用於顯示結果的道具名稱
const totalSuccessCount = ref(0)
const totalFailureCount = ref(0)
const consecutiveSuccess = ref(0)
const consecutiveFailure = ref(0)
const results = ref<boolean[]>([])

// 音效元素引用
const successSound = ref<HTMLAudioElement | null>(null)
const failSound = ref<HTMLAudioElement | null>(null)
const buttonHoverSound = ref<HTMLAudioElement | null>(null)
const buttonClickSound = ref<HTMLAudioElement | null>(null)

const lastResult = computed(() => results.value[results.value.length - 1])

// 處理卷軸選擇變更
function handleScrollChange() {
  if (!selectedScrollId.value) return

  const selectedScroll = scrolls.value.find(
    (scroll) => scroll.id === selectedScrollId.value,
  )
  if (selectedScroll) {
    scrollName.value = selectedScroll.name

    // 播放按鈕聲音
    playSound('buttonClickSound')
  }
}

// 快速選擇成功率
function quickSelectRate(rate: number) {
  successRate.value = rate

  // 播放按鈕聲音
  playSound('buttonClickSound')
}

function handleItemNameInput() {
  itemName.value = itemName.value.trim()
}

// 模擬卷軸強化
function roll() {
  itemName.value = itemName.value.trim()

  resultItemName.value = itemName.value || '道具'

  playSound('buttonClickSound')

  const result = Math.random() * 100 < successRate.value
  results.value = [result]
  console.log(
    `強化結果: ${result ? '成功' : '失敗'}`,
    scrollName.value,
    resultItemName.value,
  )

  // refresh
  if (result) {
    totalSuccessCount.value += 1
    consecutiveSuccess.value += 1
    consecutiveFailure.value = 0
    playSound('successSound')
  } else {
    totalFailureCount.value += 1
    consecutiveFailure.value += 1
    consecutiveSuccess.value = 0
    playSound('failSound')
  }
}

function resetStats() {
  playSound('buttonClickSound')

  results.value = []
  totalSuccessCount.value = 0
  totalFailureCount.value = 0
  consecutiveSuccess.value = 0
  consecutiveFailure.value = 0
}

function playSound(id: string) {
  let soundElement = null

  switch (id) {
    case 'successSound':
      soundElement = successSound.value
      break
    case 'failSound':
      soundElement = failSound.value
      break
    case 'buttonHoverSound':
      soundElement = buttonHoverSound.value
      break
    case 'buttonClickSound':
      soundElement = buttonClickSound.value
      break
  }

  if (soundElement) {
    soundElement.currentTime = 0
    soundElement.play().catch((err) => console.error('音效播放失敗:', err))
  }
}

function setupHoverSound() {
  const buttons = document.querySelectorAll('button')
  buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
      playSound('buttonHoverSound')
    })
  })
}

onMounted(() => {
  setupHoverSound()

  successRate.value = 60
  scrollName.value = ''
  itemName.value = ''
  resultItemName.value = '道具'
})
</script>

<style scoped>
.chance-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.chance-button {
  width: 80px;
  height: 80px;
  background-color: #eeeeee;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.chance-button.selected {
  background-color: #ffd591;
  border: 2px solid #faad14;
}

.icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

#rollButton {
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 10px 30px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
}

#rollButton:hover {
  background-color: #e0e0e0;
}

#result {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

#counter,
#totals {
  font-size: 14px;
  margin: 8px 0;
  color: #ffffff;
}

#resetButton {
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 16px;
}

#resetButton:hover {
  background-color: #e0e0e0;
}
</style>
