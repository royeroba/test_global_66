/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_POKEAPI_BASE_URL: string
}

type ImportMeta = {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<
    Record<string, never>,
    Record<string, never>,
    Record<string, never>
  >
  export default component
}
