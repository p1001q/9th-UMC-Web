import { useCartActions, useCartInfo } from "../hooks/useCartStore";
// import { useSelector } from "../hooks/useCustomRedux";  // Redux → Zustand로 대체됨
import CartItem from "./CartItem";
// import React from "react";  // 필요 없음 (JSX 자동 import)

const CartList = () => {
  /* 기존 Redux 코드
  const { cartItems } = useSelector((state) => state.cart);
  */

  // Zustand 방식
  const { cartItems } = useCartInfo();       // Zustand 전역 상태
  const { clearCart } = useCartActions();    // 전체 삭제 버튼용 액션

  const handleAllClearButton = (): void => {
    clearCart();  // Zustand로 전체 삭제
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {cartItems.length === 0 && (
        <div className="my-10">
          <p className="text-2xl font-semibold">장바구니가 비어있습니다.</p>
        </div>
      )}

      <ul>
        {cartItems.map((item, index) => (
          <CartItem key={index} lp={item} />
        ))}
      </ul>

      <button
        onClick={handleAllClearButton}
        className="p-4 border rounded-md my-10"
      >
        전체 삭제
      </button>
    </div>
  );
};

export default CartList;
