import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedLayout = () => {
  const { accessToken }: { accessToken: string | null } = useAuth();
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to={"/login"} state={{location}} replace />; //공식문서 보면 리플레이스 옵션 줘서 뒤로가기 시 로그인 페이지로 안가게 함
  }

  return <Outlet />;
};
//아니 ㅠㅠ 홈레이아웃 프로텍티드레이아웃 못 합치겠어요

export default ProtectedLayout;
