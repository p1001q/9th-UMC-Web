import { useInfiniteQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common.ts";
import { getLpList } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";

//⭐ LP 목록 조회 훅 (무한 스크롤 기반)
// 기존 useQuery → useInfiniteQuery로 전환
// 정렬(order)에 따라 쿼리키를 분리해 캐시를 독립적으로 관리함
// 커서(cursor) 기반으로 다음 페이지 데이터를 요청하도록 구현
function useGetLpList({ search, order, limit }: PaginationDto) {
  return useInfiniteQuery({
    //⭐ `/v1/lps` 목록 요청을 
    // `useQuery({ queryKey: ['lps', sort], queryFn })`
    // 로 전환하셨나요? 정렬 변경 시 자동 리패치되도록 
    // `sort`를 `queryKey`에 포함해주세요.
    //제대로 된건지 하나도 모르겠음, sort를 어떻게 추가하라는건지 모르겠음
    //변수명만 다른거지 제대로 구현한 건가? 애매
    queryKey: [QUERY_KEY.lps, order] as const, // ✅ 쿼리 키 (정렬별 캐싱 분리)
    //누구는 LPS, LP 이렇게 다르게 표현할 수도 있음, 그래서 key.ts?
    //캐싱하기 위한 쿼리 키 설정이 매우매우 중요하다
    //외부에서 받아올거면 콜백 함수로 작성해야한다 (전에 크롱님이 설명해줬었는디)
    //키가 추가돼도 관리하기 편하기 위해 작성

    // ✅ 무한 스크롤에서는 queryFn이 pageParam을 받는다.
    // pageParam은 getNextPageParam에서 반환된 커서 값이 자동으로 전달된다.
    queryFn: async ({ pageParam }: { pageParam?: number }) =>
      getLpList({
        cursor: pageParam ?? 0, // null 또는 undefined일 때 0으로 대체
        search,
        order,
        limit,
      }),

    //⭐ getNextPageParam
    // 마지막 페이지의 nextCursor와 hasNext를 이용해 다음 요청 여부 판단
    // nextCursor가 null이거나 hasNext=false면 fetchNextPage() 호출 불가
  getNextPageParam: (lastPage) =>
  lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,

    //⭐ initialPageParam
    // useInfiniteQuery v5에서는 반드시 초기값을 명시해야 함.
    // 이 값이 없으면 "이 호출과 일치하는 오버로드가 없습니다" 오류 발생.
    initialPageParam: 0,

    //⭐ 데이터가 신선하다고 간주되는 시간.
    // 이 시간 동안 캐시된 데이터를 그대로 사용합니다. 
    // 컴포넌트가 마운트 되거나 창에 포커스 들어오는 경우도 재요청 X
    // 5분 동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄인다.
    staleTime: 1000 * 60 * 5, // 5분

    //⭐ 비활성 쿼리 데이터가 캐시에 남아있는 시간.
    // staleTime이 지나도, 일정 시간 동안 메모리에 남아 있다가 이후 제거됩니다.
    // 예) 10분 동안 사용되지 않으면 해당 캐시 데이터가 삭제되어, 다시 요청 시 새 데이터를 받아오게 합니다.
    gcTime: 1000 * 60 * 10, // 10분

    // 조건에 따라 쿼리 실행 여부 제어
    // enabled: Boolean(search),
    // refetchInterval: 100 * 60,

    // retry: 쿼리 요청이 실패했을 때 자동으로 재시도할 횟수를 지정합니다.
    // 기본값은 3회 정도로, 네트워크 오류 등 일시적인 문제를 보완할 수 있습니다

    //initialData: { data: 쿼리 실행 전 미리 제공할 초기 데이터 설정
    //컴포넌트가 렌더링 될 때, 빈 데이터 구조를 미리 제공해서 로딩 전에도 안전하게 UI를 구성할 수 있게 해주는 애다
    //initialData: { data: initial.pListData,

    //파라미터가 변결될 때 이전 데이터를 유지하여 UI 깜빡임을 줄여줍니다
    //페이지네이션 시 페이지 전환 사이에 이전 데이터를 보여주어 사용자 경험을 향상시킨다
    //keepPreviousData: true, //useInfiniteQuery에서는 필요 없음 (자동으로 처리됨)

    //select: (data) => data.pages.flatMap(page => page.data.data)
    //응답 데이터에서 실제 필요한 부분만 선택하여 반환합니다.
    //이러면 이제 페이지에서 data?.pages.map으로 접근 가능
  });
}

export default useGetLpList;
