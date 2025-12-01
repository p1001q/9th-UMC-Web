import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { Link } from "react-router-dom";
import { useSidebar } from "../hooks/useSidebar";
import Sidebar from "../components/Sidebar";
import SidebarButton from "../components/SidebarButton";
//import { axiosInstance } from "../api/axios"; > 왜 지피티는 인스턴스를 임포트 할까
import axios from "axios";

type LpItem = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: { id: number; name: string }[];
  likes: { id: number; userId: number; lpId: number }[];
};

/* 더미 데이터 잠시 보관
const dummy = [
  "사과", "바나나", "오렌지", "포도", "딸기",
  "키위", "수박", "참외", "파인애플", "레몬",
  "라임", "복숭아", "자두", "멜론", "코코넛",
  "아보카도", "블루베리", "라즈베리", "크랜베리",
];
*/

export default function TestDebouncePage() {
  const [query, setQuery] = useState("");
  // 추가
  const [results, setResults] = useState<LpItem[]>([]);
  //const [loading, setLoading] = useState(false);

  // ⭐ 사이드바 커스텀 훅
  const { isOpen, toggle, close } = useSidebar();

  // 🔥 공백일 때 query = null -> 디바운스 중단
  const debouncedQuery = useDebounce(
    query.trim() === "" ? null : query,
    500
  );

  /*
  // 🔥 공백(null)일 때는 배열 비우기
  const filtered =
    debouncedQuery === null
      ? []
      : dummy.filter((item) =>
          item.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        */
  
        //공백 시 배열 비우기
        useEffect(() => {
          //로딩값을 트루로 바꾸고 겟요청으로 api 호출
          const fetchData = async () => {
            if (debouncedQuery === null) {
              setResults([]);
              return;
            }
            try {
              const { data } = await axios.get("http://localhost:8000/v1/lps", {
                params: {
                  cursor: 0,
                  limit: 10,
                  search: debouncedQuery,
                  order: "asc",
                },
              });
            //첫 번째 data는 axios 응답, 
            //두 번째 data는 API 응답 
            //세번째 data는 실제 LP 리스트?
            console.log("API 응답 데이터1:", data);
            console.log("API 응답 데이터2:", data.data);
            console.log("API 응답 데이터3:", data.data.data);
              setResults(data.data.data); // LP 리스트
            } catch (err) {
              console.error("API 오류:", err);
            }
          };
  fetchData();
}, [debouncedQuery]);



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
          {results.map((lp) => (
            <div key={lp.id} className="p-2 border rounded">
              <p className="font-bold">{lp.title}</p>
              <p className="text-sm">{lp.content}</p>
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
