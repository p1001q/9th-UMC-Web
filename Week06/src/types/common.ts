import { PAGINATION_ORDER } from "../enums/common.ts";

export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

//⭐ 커서 기반 공통 응답 타입
// 모든 API 응답이 공통적으로 포함하는 필드(status, statusCode, message 등)를 정의하고,
// 커서 기반 페이지네이션(nextCursor, hasNext)을 포함하도록 설계합니다.

export type CursorBasedResponse<T> = {
  // 요청 성공 여부 (true/false)
  status: boolean;
  // HTTP 상태 코드 (예: 200, 400, 500 등)
  statusCode: number;
  // 서버에서 전달하는 메시지 (예: "요청 성공", "잘못된 요청" 등)
  message: string;
  // 실제 데이터 payload
  data: T;
  //⭐ 다음 페이지 요청 시 사용할 커서
  // null 혹은 undefined일 경우 더 이상 불러올 데이터가 없음을 의미합니다.
  nextCursor: number | null;
  //⭐ 다음 페이지 존재 여부
  // true면 hasNextPage = true로 처리되어 fetchNextPage() 가능
  hasNext: boolean;
};


export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PAGINATION_ORDER;
}


export { PAGINATION_ORDER };

