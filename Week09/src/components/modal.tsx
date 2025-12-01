// import { closeModal } from "../slices/modalSlice";      // 기존 Redux 방식
// import { clearCart } from "../slices/cartSlice";         // 기존 Redux 방식
// import { useSelector, useDispatch } from "../hooks/useCustomRedux"; // Redux 방식

// 🟢 Zustand 방식
import { useCartActions, useModalStore } from "../hooks/useCartStore";

const Modal = () => {
  /* 기존 Redux 방식
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);
  */

  // Zustand 방식 (전역 모달 상태 + 장바구니 액션)
  const { isOpen, closeModal } = useModalStore();
  const { clearCart } = useCartActions();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-xl font-semibold mb-4">장바구니를 비우시겠습니까?</h2>

        <div className="flex gap-4 justify-end">

          {/* 아니요 버튼 */}
          <button
            onClick={() => {
              closeModal();            // Zustand 방식
              // 기존: dispatch(closeModal())
            }}
            className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
          >
            아니요
          </button>

          {/* 네 버튼 */}
          <button
            onClick={() => {
              clearCart();             // Zustand 장바구니 삭제
              closeModal();            // Zustand 모달 닫기
              /* 기존 Redux 방식:
                 dispatch(clearCart());
                 dispatch(closeModal());
              */
            }}
            className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
          >
            네
          </button>

        </div>
      </div>
    </div>
  );
};

export default Modal;
