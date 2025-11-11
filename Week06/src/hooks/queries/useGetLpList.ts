import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common.ts";
import { getLpList } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps], // ✅ 쿼리 키 
    //누구는 LPS, LP 이렇게 다르게 표현할 수도 있음, 그래서 key.ts?
    //캐싱하기 위한 쿼리 키 설정이 매우매우 중요하다
    //외부에서 받아올거면 콜백 함수로 작성해야한다 (전에 크롱님이 설명해줬었는디)
    //키가 추가돼도 관리하기 편하기 위해 작성
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),
  });
}

export default useGetLpList;
