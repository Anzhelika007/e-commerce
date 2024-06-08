/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly CTP_PROJECT_KEY: string;
  readonly CTP_AUTH_URL: string;
  readonly CTP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
