// import { useDispatch } from "../hooks/useCustomRedux";
// import { openModal } from "../slices/modalSlice";
// import { useSelector } from "../hooks/useCustomRedux";
// ↑ 기존 Redux 방식

import { useCartInfo } from "../hooks/useCartStore";  
import { useModalStore } from "../hooks/useCartStore";  
// ↑ Zustand 버전 (모달은 useModalStore 에서 가져와야 함)

const PriceBox = () => {
  /* 기존 Redux 코드
  const { total } = useSelector((state) => state.cart); // Redux
  const dispatch = useDispatch();                       // Redux
  */

  const { total } = useCartInfo();     // Zustand 장바구니 정보
  const { openModal } = useModalStore(); // Zustand 모달 열기

  return (
    <div className="p-12 flex justify-between">
      <button
        onClick={() => openModal()} // 기존: dispatch(openModal())
        className="border p-4 rounded-md cursor-pointer"
      >
        장바구니 초기화
      </button>

      <div>총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
