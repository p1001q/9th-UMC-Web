import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-gray-50">
      {/* 제목 */}
      <h1 className="text-2xl font-bold mb-10">홈페이지</h1>

      {/* 버튼 그룹 */}
      <div className="flex flex-col gap-4 w-[200px]">
        <button
          onClick={() => navigate("/signup")}
          className="bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-md font-medium transition-colors"
        >
          회원가입
        </button>

        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-medium transition-colors"
        >
          로그인
        </button>

        <button
          onClick={() => navigate("/my")}
          className="bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-md font-medium transition-colors"
        >
          마이페이지
        </button>
      </div>
    </div>
  );
};

export default HomePage;
