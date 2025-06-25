import type { RouteRecordRaw } from 'vue-router'

// 擴展路由 meta 型別
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    requiresAuth?: boolean
    icon?: string
  }
}

// 路由名稱常數
export const RouteNames = {
  HOME: 'Home',
  SCROLL_SIMULATOR: 'ScrollSimulator',
  ABOUT: 'About',
  NOT_FOUND: 'NotFound',
} as const

export type RouteNameType = (typeof RouteNames)[keyof typeof RouteNames]

// 路由路徑常數
export const RoutePaths = {
  HOME: '/',
  SCROLL_SIMULATOR: '/scroll-simulator',
  ABOUT: '/about',
} as const

export type RoutePathType = (typeof RoutePaths)[keyof typeof RoutePaths]

// 路由配置型別
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'name'> {
  name: RouteNameType
  meta?: {
    title?: string
    description?: string
    requiresAuth?: boolean
    icon?: string
  }
}
