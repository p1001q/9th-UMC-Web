import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import type { ResponseMyInfoDto } from "../types/auth.ts";

const Navbar = () => {
  const { accessToken } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto>(
    [] as unknown as ResponseMyInfoDto
  );
  console.log("Navbar accessToken:", accessToken);
  console.log("Navbar user:", data.data?.name);

    useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const res = await getMyInfo();
          setData(res);
        } catch (err) {
          console.error("유저 정보 불러오기 실패:", err);
        }
      };
      fetchData();
    }
  }, [accessToken]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between p-4">
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          SpinningSpinning Dolimpan
        </Link>
        <div className="space-x-6">
            {!accessToken && (
            <>
            <Link
            to="/login"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
            로그인
            </Link>
            
            <Link
            to="/signup"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
            회원가입
            </Link>
            </>
            )}
            
            {accessToken && (
            <>
              {/* ✅ 이름 기반 환영 문구 */}
              <span className="text-gray-700 dark:text-gray-300">
                {data?.data?.name
                  ? `${data.data.name}님 반갑습니다.`
                  : "반갑습니다."}
              </span>
              <Link
                to="/my"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                마이페이지
              </Link>
            </>
        )}

        <Link
            to={"/search"}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
            찾기
        </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
