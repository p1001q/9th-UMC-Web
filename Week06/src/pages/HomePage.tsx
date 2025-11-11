import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList.ts";
import { PAGINATION_ORDER } from "../types/common.ts";
import LPCard from "../components/LPCard.tsx"; // 새로 만든 카드 컴포넌트 import

const HomePage = () => {
  // 최신순, 오래된순 상태 관리
   const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc); //아니 이넘 왜 쓰는거 > 오타 방지, 유지보수
  //const [order, setOrder] = useState("desc"); // 최신순(default)

  const toggleOrder = () => {
    setOrder((prev) => 
      prev === PAGINATION_ORDER.desc 
    ? PAGINATION_ORDER.asc 
    : PAGINATION_ORDER.desc
    );
  }
    const { data, isPending, isError, } = useGetLpList({
    cursor: 0,
    search: "",
    order,
    limit: 10,
  });

  if (isPending) { return <div className={"mt-20"}>로딩 중...</div>; }
  if (isError) { return <div className={"mt-20"}>에러가 발생했습니다.</div>;}

  console.log("📦 LP 목록 데이터:", data?.data?.data);
  console.log("🟢 로딩 상태:", isPending ? "로딩 중" : "로딩 완료");
  console.log("🔴 에러 발생 여부:", isError ? "에러 있음" : "정상 작동");
  console.log ("📦 LP ID:",data?.data.data.map((lp)=>lp.id));
  
  return (
    <div className="mt-10 px-6">
      {/* 🔁 정렬 토글 버튼 */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleOrder}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          {order === PAGINATION_ORDER.desc ? "최신순" : "오래된순"}
        </button>
      </div>

      {/* 🧱 LP 카드 목록 */}
      <div className="grid grid-cols-3 gap-4">
        {data?.data?.data?.map((lp) => (
          <LPCard
            key={lp.id}
            id={lp.id}
            title={lp.title}
            thumbnail={lp.thumbnail}      // ✅ thumbnail 추가
            createdAt={lp.createdAt}
            likes={lp.likes.length}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
