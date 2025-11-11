import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import type { ResponseMyInfoDto } from "../types/auth.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
//import Navbar from "../components/Navbar.tsx";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth()
  
  const [data, setData] = useState<ResponseMyInfoDto>([] as unknown as ResponseMyInfoDto);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
      setData(response);
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  }

  //강사님은 data.data?.name 정도만 쓰심 뭔차이지, 무튼 이걸로 오류가 왜 해결되더라
  console.log(data?.data?.name);
  return (
    <div>
      <h1> 111 </h1>
      <h1> 222 </h1>
      <h1> 333 </h1>
      <h1>{data?.data?.name}님의 Mypage</h1>
      <img src={data?.data?.avatar as string || "이미지가 깨졌습니다."} alt="구글 로고" />
       <h1>이메일: {data?.data?.email}</h1>
      
        <button 
        className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90" 
        onClick={handleLogout}
        >
          로그아웃
          </button>
       </div>
      )
};

export default MyPage;
