import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

const dummy = [
  "사과",
  "바나나",
  "오렌지",
  "포도",
  "딸기",
  "키위",
  "수박",
  "참외",
  "파인애플",
  "레몬",
  "라임",
  "복숭아",
  "자두",
  "멜론",
  "코코넛",
  "아보카도",
  "블루베리",
  "라즈베리",
  "크랜베리",
];

export default function TestDebouncePage() {
  const [query, setQuery] = useState("");

  // 🔥 공백일 때 query = null 로 넘김 → 디바운스 자체 중단됨
  const debouncedQuery = useDebounce(
    query.trim() === "" ? null : query,
    500
  );

  // 🔥 공백(null)일 때는 배열 비움
  const filtered =
    debouncedQuery === null
      ? []
      : dummy.filter((item) =>
          item.toLowerCase().includes(debouncedQuery.toLowerCase())
        );

  // 입력 즉시 로그(비교용)
  console.log("🟡 입력 즉시 실행:", query);

  // 🔥 디바운스 후 0.5초 뒤 딱 한 번만 실행
  useEffect(() => {
    if (debouncedQuery === null) return;
    console.log("🟢 디바운스된 값:", debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-4">Debounce 테스트</h1>

      <input
        className="border p-2 w-full"
        placeholder="검색어 입력"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="mt-5 space-y-2">
        {filtered.map((item) => (
          <div key={item} className="p-2 border rounded">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
