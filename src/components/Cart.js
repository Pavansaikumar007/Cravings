import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../utils/cartSlice";
import { IMAGE_URL } from "../../utils/constants";


const Cart = () => {

    const cartItems = useSelector((store) => store.cart.items);
    console.log("ITEMS", cartItems)

    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart())
    }


    return (
        <div >
            <p>Cart</p>
            <div>
                <img src="" />
            </div>
            <div>

            </div>
            <div className="p-3 bg-black rounded-2xl text-white w-[70px] cursor-pointer "
            onClick={handleClearCart}
            >Clear</div>
        </div>
    )
}

export default Cart;