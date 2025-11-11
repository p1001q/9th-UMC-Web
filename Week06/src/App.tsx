import { RouterProvider, createBrowserRouter, type RouteObject } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import MyPage from "./pages/MyPage.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProtectedLayout from "./layouts/ProtectedLayout.tsx";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; //6주차
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; //6주차
import LpDetailPage from "./pages/LpDetailPage.tsx";
// 1. 라우터 생성
// 2. 페이지 연결
// 3. 최종 App 컴포넌트에 적용
// publicRoutes : 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
      { path: "lp/:lpid", element: <LpDetailPage /> }, // ✅ 추가!
      //v3/signin/accountchooser"
    ], 
  },
];

// protectedRoutes : 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/", // 마이페이지
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
    ],
      }
];

const router = createBrowserRouter(
  [...publicRoutes, ...protectedRoutes],
);
// 6주차 React Query 설정
// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 네트워크 요청 실패 시 재시도 횟수
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider> {/* 로그인 인증 context */}
        <RouterProvider router={router} /> {/* React Router */}
        </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />} {/*개발환경일때만 보여지게, PROD(배포)환경에선 안 보임*/}
    </QueryClientProvider>
  );
}

export default App;
