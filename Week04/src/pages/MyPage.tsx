import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import type { ResponseMyInfoDto } from "../types/auth.ts";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto>([] as unknown as ResponseMyInfoDto);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
      setData(response);
    };
    getData();
  }, []);

  console.log(data?.data?.name);
  return (
    <div>Mypage{data?.data?.name} {data?.data?.email}</div>
      )
};

export default MyPage;
