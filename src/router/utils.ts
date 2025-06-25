import { type Router } from 'vue-router'
import { RouteNames, RoutePaths } from './types'

/**
 * 路由導航工具函數
 */
export class RouterUtils {
  private router: Router

  constructor(router: Router) {
    this.router = router
  }

  /**
   * 導航到首頁
   */
  toHome() {
    return this.router.push({ name: RouteNames.HOME })
  }

  /**
   * 導航到卷軸模擬器
   */
  toScrollSimulator() {
    return this.router.push({ name: RouteNames.SCROLL_SIMULATOR })
  }

  /**
   * 導航到關於頁面
   */
  toAbout() {
    return this.router.push({ name: RouteNames.ABOUT })
  }

  /**
   * 返回上一頁
   */
  goBack() {
    return this.router.back()
  }

  /**
   * 檢查當前是否在指定路由
   */
  isCurrentRoute(routeName: string): boolean {
    return this.router.currentRoute.value.name === routeName
  }

  /**
   * 獲取路由標題
   */
  getRouteTitle(routeName?: string): string {
    const route = routeName
      ? this.router.getRoutes().find((r) => r.name === routeName)
      : this.router.currentRoute.value

    return (route?.meta?.title as string) || 'Artale 卷軸模擬器'
  }
}

/**
 * 路由常數導出
 */
export { RouteNames, RoutePaths }

/**
 * 獲取所有路由信息（用於導航菜單）
 */
export function getNavigationRoutes() {
  return [
    {
      name: RouteNames.HOME,
      path: RoutePaths.HOME,
      title: '首頁',
      icon: 'HomeOutlined',
    },
    {
      name: RouteNames.SCROLL_SIMULATOR,
      path: RoutePaths.SCROLL_SIMULATOR,
      title: '卷軸模擬器',
      icon: 'ExperimentOutlined',
    },
    {
      name: RouteNames.ABOUT,
      path: RoutePaths.ABOUT,
      title: '關於',
      icon: 'InfoCircleOutlined',
    },
  ]
}
