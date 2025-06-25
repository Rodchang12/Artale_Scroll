/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 聲明音效文件模塊
declare module '*.ogg' {
  const src: string
  export default src
}
