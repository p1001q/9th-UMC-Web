import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { Link } from "react-router-dom";
import { useSidebar } from "../hooks/useSidebar";
import Sidebar from "../components/Sidebar";
import SidebarButton from "../components/SidebarButton";

const dummy = [
  "사과", "바나나", "오렌지", "포도", "딸기",
  "키위", "수박", "참외", "파인애플", "레몬",
  "라임", "복숭아", "자두", "멜론", "코코넛",
  "아보카도", "블루베리", "라즈베리", "크랜베리",
];

export default function TestDebouncePage() {
  const [query, setQuery] = useState("");

  // ⭐ 사이드바 커스텀 훅
  const { isOpen, toggle, close } = useSidebar();

  // 🔥 공백일 때 query = null -> 디바운스 중단
  const debouncedQuery = useDebounce(
    query.trim() === "" ? null : query,
    500
  );

  // 🔥 공백(null)일 때는 배열 비우기
  const filtered =
    debouncedQuery === null
      ? []
      : dummy.filter((item) =>
          item.toLowerCase().includes(debouncedQuery.toLowerCase())
        );

  // 입력 즉시 로그
  console.log("🟡 입력 즉시 실행:", query);

  // 디바운스 후 출력
  useEffect(() => {
    if (debouncedQuery === null) return;
    console.log("🟢 디바운스된 값:", debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div>
      {/* ⭐ 사이드바 버튼 */}
      <div className="p-5">
        <SidebarButton toggle={toggle} />
      </div>

      {/* ⭐ 실제 사이드바 */}
      <Sidebar isOpen={isOpen} close={close}>
        <p>사이드바 내용 예시</p>
        <p>여기에 메뉴 넣어도 됨</p>
      </Sidebar>

      <div className="p-10">
        <h1 className="text-xl font-bold mb-4">Debounce 테스트</h1>

        {/* 🟦 스로틀 페이지로 이동 */}
        <Link
          to="/test-throttle"
          className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          👉 Throttle 테스트 페이지로 이동
        </Link>

        {/* 입력 */}
        <input
          className="border p-2 w-full"
          placeholder="검색어 입력"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* 결과 */}
        <div className="mt-5 space-y-2">
          {filtered.map((item) => (
            <div key={item} className="p-2 border rounded">
              {item}
            </div>
          ))}
        </div>

      {/* 스크롤 구간 */}
      <div className="h-[5000px] space-y-20">
        <div className="h-[600px] bg-red-200 flex flex-col items-center justify-center text-2xl font-bold">
          영역 1
        </div>

        <div className="h-[600px] bg-yellow-200 flex flex-col items-center justify-center text-2xl font-bold">
          영역 2
        </div>

        <div className="h-[600px] bg-green-200 flex flex-col items-center justify-center text-2xl font-bold">
          영역 3
        </div>

        <div className="h-[600px] bg-blue-200 flex flex-col items-center justify-center text-2xl font-bold">
          영역 4
        </div>

        <div className="h-[600px] bg-purple-200 flex flex-col items-center justify-center text-2xl font-bold">
          영역 5  
        </div>

        <div className="h-[600px] bg-purple-200 flex flex-col items-center justify-center text-2xl font-bold">
          영역 6
          </div>
         

        <div className="h-[600px] bg-purple-200 flex flex-col items-center justify-center text-2xl font-bold">
          영역 7
        </div>

        <div className="h-[600px] bg-purple-200 flex flex-col items-center justify-center text-2xl font-bold">
          영역 8
        </div>

      </div>
    </div>
    </div>
  );
}
