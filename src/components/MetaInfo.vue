<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

// 定義 props 接收路由元資訊
const props = defineProps<{
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}>()

const route = useRoute()

// 計算最終的頁面標題和描述
const pageTitle = computed(() => {
  return props.title || (route.meta.title as string) || 'Artale 墊捲模擬器'
})

const pageDescription = computed(() => {
  return (
    props.description ||
    (route.meta.description as string) ||
    'Artale 墊捲模擬器 衝捲 墊捲'
  )
})

const pageKeywords = computed(() => {
  return (
    props.keywords ||
    (route.meta.keywords as string) ||
    '卷軸, 強化, 模擬器, Artale, 楓之谷, 墊捲, 捲軸, 衝卷, 衝捲, 遊戲工具'
  )
})

const pageImage = computed(() => {
  return (
    props.image ||
    (route.meta.image as string) ||
    '/Artale_Scroll/assets/images/scroll_60.png'
  )
})

const pageUrl = computed(() => {
  const baseUrl = 'https://rodchang12.github.io'
  return props.url || `${baseUrl}${route.fullPath}`
})

// 監聽變化並更新 meta 標籤
watch(
  [pageTitle, pageDescription, pageKeywords, pageImage, pageUrl],
  () => {
    // 更新 title
    document.title = pageTitle.value

    // 更新 meta 標籤
    updateMetaTag('description', pageDescription.value)
    updateMetaTag('keywords', pageKeywords.value)

    // 更新 Open Graph 標籤
    updateMetaTag('og:title', pageTitle.value, 'property')
    updateMetaTag('og:description', pageDescription.value, 'property')
    updateMetaTag('og:image', pageImage.value, 'property')
    updateMetaTag('og:url', pageUrl.value, 'property')

    // 更新 canonical 連結
    updateCanonicalLink(pageUrl.value)
  },
  { immediate: true },
)

function updateMetaTag(name: string, content: string, nameAttr = 'name') {
  let metaTag = document.querySelector(`meta[${nameAttr}="${name}"]`)

  if (!metaTag) {
    metaTag = document.createElement('meta')
    metaTag.setAttribute(nameAttr, name)
    document.head.appendChild(metaTag)
  }

  metaTag.setAttribute('content', content)
}

function updateCanonicalLink(url: string) {
  let canonicalLink = document.querySelector('link[rel="canonical"]')

  if (!canonicalLink) {
    canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalLink)
  }

  canonicalLink.setAttribute('href', url)
}
</script>

<template></template>
