import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const { accessToken }: { accessToken: string | null } = useAuth();

  if (!accessToken) {
    return <Navigate to="/login" replace />; //공식문서 보면 리플레이스 옵션 줘서 뒤로가기 시 로그인 페이지로 안가게 함
  }

  return <Outlet />;
};

export default ProtectedLayout;
