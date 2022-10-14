/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_FB_TRACKING: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
