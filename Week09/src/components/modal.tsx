import { closeModal } from "../slices/modalSlice";
import { clearCart } from "../slices/cartSlice";
import { useSelector, useDispatch } from "../hooks/useCustomRedux";

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-xl font-semibold mb-4">장바구니를 비우시겠습니까?</h2>

        <div className="flex gap-4 justify-end">
          <button
            onClick={() => dispatch(closeModal())}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            아니요
          </button>

          <button
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
