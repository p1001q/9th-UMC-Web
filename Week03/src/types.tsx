// src/types.ts
import type { ReactNode } from 'react';

export type LinkProps = {
  to: string;           // 이동할 경로
  children: ReactNode;  // 링크 안에 들어갈 요소(텍스트나 태그)
};
