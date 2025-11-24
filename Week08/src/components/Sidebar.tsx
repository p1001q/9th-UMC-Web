import type { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  close: () => void;
  children?: ReactNode;
}

export default function Sidebar({ isOpen, close, children }: Props) {
  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 opacity-70 z-[9998]"
          onClick={close}
        />
      )}

      {/* 사이드바 */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-200 shadow-xl z-[9999]
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* 상단 헤더 */}
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Sidebar</h2>
          <button onClick={close} className="text-2xl leading-none">
            &times;
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="p-5 space-y-3">
          {children}

          {/* 🔥 테스트 박스 */}
          <div className="p-4 bg-red-500 rounded-xl text-blue-200 text-2xl font-extrabold shadow-2xl">
            TAILWIND TEST BOX
          </div>

          {/* 🔥 더 확실한 테스트 */}
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
            Tailwind Button Test
          </button>
        </div>
      </div>
    </>
  );
}
