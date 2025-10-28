/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV: boolean
  readonly PROD: boolean
  readonly MODE: string
  readonly BASE_URL: string
  // Add more env variables if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
