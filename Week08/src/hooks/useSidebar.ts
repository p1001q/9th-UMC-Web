import { useCallback, useEffect, useState } from "react";

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [close]);

  // 배경 스크롤 방지
    useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";  // ← 확실하게 원복
    }
    }, [isOpen]);

    useEffect(() => {
        return () => {
            document.body.style.overflow = "auto";
        };    
    }, []);


  return { isOpen, open, close, toggle };
}
