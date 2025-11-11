import type { PaginationDto } from "../types/common.ts";
import type { ResponseLpListDto } from "../types/lp.ts";
import { axiosInstance } from "./axios.ts";

//⭐ LP 목록 조회 API (무한 스크롤 기반)
// PaginationDto에는 cursor, order, limit 등이 포함되어 있음
// order: 정렬 기준 (예: latest, popular 등)
// cursor: 다음 페이지 시작점
// limit: 한 번에 불러올 데이터 개수
export const getLpList = async (
  paginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto, // 여기 안에 order, cursor, limit 모두 포함되어야 함
  });

  //⭐ 무한 스크롤을 위한 nextCursor 포함
  // 백엔드 응답 형식 예시:
  // { items: [...], nextCursor: number | null }
  // nextCursor가 null이면 더 이상 데이터 없음
  return {
    ...data,
    nextCursor: data.nextCursor ?? null, // 다음 요청 시 사용할 커서
  };
};

//⭐ LP 상세 조회 API
// 특정 LP의 상세 정보를 불러옵니다.
export const getLpDetail = async (id: number) => {
  const { data } = await axiosInstance.get(`/v1/lps/${id}`);
  return data;
};