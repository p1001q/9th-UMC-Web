import useGetLpList from "../hooks/queries/useGetLpList.ts";

const HomePage = () => {
  const { data, isPending, isError, } = useGetLpList({});

  console.log("📦 LP 목록 데이터:", data?.data?.data);
  console.log("🟢 로딩 상태:", isPending ? "로딩 중" : "로딩 완료");
  console.log("🔴 에러 발생 여부:", isError ? "에러 있음" : "정상 작동");
  console.log ("📦 LP ID:",data?.data.data.map((lp)=>lp.id));
  return <div> {data?.data.data.map((lp) => <h1 key={lp.id}>{lp.title}</h1>)}</div>
};

export default HomePage;
