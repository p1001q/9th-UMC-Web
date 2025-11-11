import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedLayout = () => {
  const { accessToken }: { accessToken: string | null } = useAuth();
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to={"/login"} state={{location}} replace />; //공식문서 보면 리플레이스 옵션 줘서 뒤로가기 시 로그인 페이지로 안가게 함
  }

  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
//아니 ㅠㅠ 홈레이아웃 프로텍티드레이아웃 못 합치겠어요

export default ProtectedLayout;
