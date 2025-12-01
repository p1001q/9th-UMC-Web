import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "../hooks/useCustomRedux"; //"react-redux" 아님
import { calculateTotals } from "../slices/cartSlice";

const Navbar = () => {
    const {amount, cartItems} = useSelector((state) => state.cart);
    const dispatch = useDispatch(); 
    //증가 감소 할 때마다 토탈계산함수가 실행되도록 해야함
    useEffect(() => {
        dispatch(calculateTotals());
    }, [dispatch, cartItems]);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 onClick={ () => {
        window.location.href = "/";
      }}
      className="text-2xl font-semibold cursor-pointer">Ohthani Ahn</h1>

      <div className="flex items-center">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl font-medium ml-2">{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;
