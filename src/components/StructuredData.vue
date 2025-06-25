<script setup lang="ts">
// 動態獲取當前日期
const currentDate = new Date().toISOString().split('T')[0]

// 定義結構化資料
const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Artale 卷軸模擬器',
  description: 'Artale 卷軸模擬器 - 墊捲是種信仰',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'TWD',
  },
  datePublished: '2023-01-01',
  dateModified: currentDate,
  author: {
    '@type': 'Organization',
    name: 'Rod Chang',
  },
}

// 使用 defineExpose 顯式地暴露 schemaData，這樣 TypeScript 就知道它被使用了
defineExpose({ schemaData })
</script>

<template>
  <!-- 使用 script 標籤注入結構化資料 -->
  <script type="application/ld+json">
    {{ JSON.stringify(schemaData) }}
  </script>
</template>
