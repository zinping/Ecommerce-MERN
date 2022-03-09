import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    addItemsToCart, removeItemsFromCart
} from "../../../../redux/actions/cartAction";

function CartItemCard({ item }) {

    const dispatch = useDispatch();

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    return (
        <div className="item-container">
            <div className="cart-item-card">

                <div className="item-img">
                    <img src={item.image} alt="img" />
                </div>

                <div className="details">

                    <Link className="name"
                        to={`/products/${item.product}`}>
                        {item.name}
                    </Link>

                    <div className="price">
                        {`₹${item.price * item.quantity}`}
                    </div>

                </div>

            </div>

            <div className="actions">

                <div className="qty-input">
                    <button
                        onClick={() =>
                            decreaseQuantity(item.product, item.quantity)
                        }
                    >
                        -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                        onClick={() =>
                            increaseQuantity(
                                item.product,
                                item.quantity,
                                item.stock
                            )
                        }>
                        +
                    </button>
                </div>

                <button className="cart-item-remove-btn"
                    onClick={() => deleteCartItems(item.product)}>
                    Remove
                </button>

            </div>

        </div>
    )
}

export default CartItemCard;
