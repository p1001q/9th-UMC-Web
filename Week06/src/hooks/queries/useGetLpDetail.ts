import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";

export function useGetLpDetail(lpid: number) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpid], // ⭐ 미션 핵심: lpid 포함!
    queryFn: () => getLpDetail(lpid),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
}
