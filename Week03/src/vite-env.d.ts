/// <reference types="vite/client" />
//아니 난 왜 이 파일이 기본 생성 안됐지? 내가 따로 만들어줬음
//무튼 토큰같은 거 환경변수 파일에다 넣어서 관리하고 깃허브에 푸시하면 안됨.
interface ImportMetaEnv {
  readonly VITE_TMDB_TOKEN: string;
  // 필요하면 더 추가
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
