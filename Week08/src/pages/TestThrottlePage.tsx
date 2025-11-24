import { useEffect, useState } from "react";
import { useThrottle } from "../hooks/useThrottle";

// 🔥 렌더 밖에 선언해야 함
function InfoBox({
  scrollY,
  throttledScrollY,
}: {
  scrollY: number;
  throttledScrollY: number;
}) {
  return (
    <div className="p-4 bg-white/70 rounded shadow border w-[300px] text-center">
      <p className="font-semibold">📌 scrollY: {scrollY}px</p>
      <p className="font-semibold text-blue-600">
        🔥 throttled: {throttledScrollY}px
      </p>
    </div>
  );
}

export default function TestThrottlePage() {
  const [scrollY, setScrollY] = useState(0);

  // 3초마다 한 번만 반응
  const throttledScrollY = useThrottle(scrollY, 3000);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // 이벤트는 계속 발생
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log("🔥 Throttled ScrollY:", throttledScrollY);
  }, [throttledScrollY]);

  return (
    <div className="p-10 space-y-10">
      <h1 className="text-2xl font-bold">Throttle 테스트</h1>
      <p>스크롤하면 콘솔은 3초마다 한 번만 로그가 찍힙니다.</p>

      {/* 최상단 정보 박스 */}
      <div className="p-5 bg-blue-100 rounded border">
        <p className="text-lg font-semibold">📌 현재 scrollY: {scrollY}px</p>
        <p className="text-lg font-semibold text-blue-600">
          🔥 Throttled scrollY: {throttledScrollY}px
        </p>
      </div>

      {/* 스크롤 구간 */}
      <div className="h-[5000px] space-y-20">
        <div className="h-[600px] bg-red-200 flex flex-col items-center justify-center text-2xl font-bold">
          영역 1
          <InfoBox scrollY={scrollY} throttledScrollY={throttledScrollY} />
        </div>

        <div className="h-[600px] bg-yellow-200 flex flex-col items-center justify-center text-2xl font-bold">
          영역 2
          <InfoBox scrollY={scrollY} throttledScrollY={throttledScrollY} />
        </div>

        <div className="h-[600px] bg-green-200 flex flex-col items-center justify-center text-2xl font-bold">
          영역 3
          <InfoBox scrollY={scrollY} throttledScrollY={throttledScrollY} />
        </div>

        <div className="h-[600px] bg-blue-200 flex flex-col items-center justify-center text-2xl font-bold">
          영역 4
          <InfoBox scrollY={scrollY} throttledScrollY={throttledScrollY} />
        </div>

        <div className="h-[600px] bg-purple-200 text-white flex flex-col items-center justify-center text-2xl font-bold">
          영역 5
          <InfoBox scrollY={scrollY} throttledScrollY={throttledScrollY} />
        </div>
      </div>
    </div>
  );
}
