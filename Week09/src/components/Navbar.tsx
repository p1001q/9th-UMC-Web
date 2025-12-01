import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";

// 기존 Redux 훅 (Zustand로 대체되었으므로 주석 처리)
// import { useDispatch, useSelector } from "../hooks/useCustomRedux";
// import { calculateTotals } from "../slices/cartSlice";

// Zustand 훅
import { useCartInfo, useCartActions } from "../hooks/useCartStore";

const Navbar = () => {
  /* 기존 Redux 방식
  const { amount, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  */

  // Zustand 방식
  const { amount, cartItems } = useCartInfo();           // Zustand 전역 상태
  const { calculateTotals } = useCartActions();          // Zustand 액션

  /* 기존 Redux 방식
  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);
  */

  // Zustand 방식
  useEffect(() => {
    calculateTotals();           // cartItems 변할 때마다 합계 계산
  }, [cartItems, calculateTotals]);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1
        onClick={() => (window.location.href = "/")}
        className="text-3xl font-semibold cursor-pointer"
      >
        Ohthani Ahn
      </h1>

      <div className="flex items-center space-x-2">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;
