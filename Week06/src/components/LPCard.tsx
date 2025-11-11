import { useNavigate } from "react-router-dom";

interface LPCardProps {
  id: number;
  title: string;
  thumbnail: string; // ✅ 이미지 필드 추가
  createdAt: Date;
  likes: number;
}

const LPCard = ({ id, title, thumbnail, createdAt, likes }: LPCardProps) => {
  const navigate = useNavigate();
  // 날짜를 사람이 읽을 수 있게 변환
  const formattedDate = new Date(createdAt).toLocaleDateString("ko-KR");

  const handleClick = () => {
    navigate(`/lp/${id}`); // 클릭 시 /lp/해당ID 로 이동
  };

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer overflow-hidden rounded-md shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      {/* ✅ 배경 이미지 */}
      <img
        src={thumbnail || "/default-thumbnail.png"} // 이미지 없을 경우 대체 이미지
        alt={title}
        className="w-full h-64 object-cover"
      />

      {/* ✅ hover 시 오버레이로 정보 표시 */}
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-center items-center text-white opacity-0 hover:opacity-100">
        <h2 className="font-bold text-lg text-center">{title}</h2>
        <p className="text-sm text-gray-200">업로드일: {formattedDate}</p>
        <p className="text-sm text-gray-200 mt-1">좋아요: {likes}</p>
      </div>
    </div>
  );
};

export default LPCard;
