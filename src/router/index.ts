import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

// 路由組件
const Home = () => import('@/views/Home.vue')

// 簡化的路由配置 - 只顯示主頁
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Artale 卷軸模擬器',
      description: 'Artale 卷軸強化模擬器',
    },
  },
  // 所有其他路徑重定向到主頁
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

// 創建路由實例
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  // 路由滾動行為
  scrollBehavior() {
    return { top: 0 }
  },
})

// 路由守衛 - 設置頁面標題
router.beforeEach((to, _from, next) => {
  const title = to.meta?.title as string
  document.title = title || 'Artale 卷軸模擬器'
  next()
})

export default router
