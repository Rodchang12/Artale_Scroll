import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import ScrollSimulator from '@/views/ScrollSimulator.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/scroll-simulator',
    name: 'ScrollSimulator',
    component: ScrollSimulator,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
