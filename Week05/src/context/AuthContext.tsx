import { createContext, useContext, useState, type PropsWithChildren } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { type RequestSigninDto } from "../types/auth";
import { postSignin, postLogout } from "../apis/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

// ESLint 규칙 비활성화
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  const login = async (signinData: RequestSigninDto) => {
    try {
        const { data } = await postSignin(signinData);
            
        if (data) {
            const newAccessToken: string = data.accessToken;
            const newRefreshToken: string = data.refreshToken;

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            setAccessTokenInStorage(newAccessToken);
            setRefreshTokenInStorage(newRefreshToken);
            alert("로그인에 성공했습니다.");
            window.location.href = "/my"; //마이페이지로 이동
        }
    } catch (error) {
        console.error("로그인 오류", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

const logout = async () => {
  try {
    await postLogout();
    removeAccessTokenFromStorage();
    removeRefreshTokenFromStorage();

    setAccessToken(null);
    setRefreshToken(null);

    alert("로그아웃 성공");
  } catch (error) {
    console.error("로그아웃 오류", error);
    alert("로그아웃 실패");
  }
};

    return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  ); 
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext를 찾을 수 없습니다.");
    }
    return context;
};