<script setup lang="ts">
import { useRoute } from 'vue-router'
import MetaInfo from '@/components/MetaInfo.vue'

const route = useRoute()
</script>

<template>
  <!-- 引入 MetaInfo 組件以動態管理 SEO 資訊 -->
  <MetaInfo />

  <RouterView />
</template>
