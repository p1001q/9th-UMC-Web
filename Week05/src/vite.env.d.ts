/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_API_URL: string;
  // 추가 환경변수는 여기에 타입 선언...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
