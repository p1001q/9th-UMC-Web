import { useEffect, useRef, useState } from "react";


export function useThrottle<T>(value: T, interval: number) {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = Date.now();
    const elapsed = now - lastExecuted.current;

    // 기존 타이머 제거
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (elapsed >= interval) {
      // ❗ 동기 setState 금지 → 비동기로 예약만
      setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }, 0);
    } else {
      // interval 남은 시간만큼 지연 후 실행
      const remaining = interval - elapsed;

      timeoutRef.current = setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }, remaining);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, interval]);

  return throttledValue;
}
