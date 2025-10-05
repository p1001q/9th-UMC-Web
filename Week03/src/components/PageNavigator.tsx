type PageNavigatorProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const PageNavigator = ({ page, setPage }: PageNavigatorProps) => {
  return (
    <div className="flex items-center justify-center gap-6 mt-5 bg-black py-4">
      {/* 이전 버튼 */}
      <button
        className="bg-red-400 text-white px-6 py-3 rounded-lg 
                   shadow-md hover:bg-red-600 transition-all duration-200
                   disabled:bg-gray-500 disabled:text-gray-200 disabled:cursor-not-allowed"
        disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}
      >
        {`<`}
      </button>

      {/* 현재 페이지 표시 */}
      <span className="text-white text-lg font-semibold">{page} 페이지</span>

      {/* 다음 버튼 */}
      <button
        className="bg-red-400 text-white px-6 py-3 rounded-lg 
                   shadow-md hover:bg-red-600 transition-all duration-200
                   disabled:bg-gray-500 disabled:text-gray-200 disabled:cursor-not-allowed"
        onClick={() => setPage((prev) => prev + 1)}
      >
        {`>`}
      </button>
    </div>
  );
};
