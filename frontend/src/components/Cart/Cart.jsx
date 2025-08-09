import React from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setCartItem, removeCartItem } from '../../redux/featurs/cartSlice.js'

export default function Cart() {
    const { cartItems } = useSelector((state) => state.cart)
    const dispatch = useDispatch();

    const increaseQty = (itemm, quantity) => {
        const newQty = quantity + 1
        if (newQty >= itemm.stock) return
        setItem(itemm, newQty)
    };

    const decreaseQty = (itemm, quantity) => {
        const newQty = quantity - 1
        if (newQty <= 0) return
        setItem(itemm, newQty)
    };

    const setItem = (item, newQty) => {
        const cartItem = {
            product: item?.product,
            name: item?.name,
            price: item?.price,
            image: item?.images?.[0]?.url || "/images/default_product.png",
            stock: item?.stock,
            quantity: newQty
        };
        dispatch(setCartItem(cartItem));
        toast.success("Added to cart");
    };

    const removeCartItemHandler = (id) => {
        dispatch(removeCartItem(id))
    }

    return (
        <>
            <MetaData title="Your Cart" />

            {cartItems?.length === 0 ? (
                <h2 className="mt-5">Your Cart is empty :</h2>
            ) : (
                <>
                    <h2 className="mt-5">
                        Your Cart : <b>{cartItems.length} items</b>
                    </h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {cartItems.map((item) => (
                                <React.Fragment key={item.product}>
                                    <hr />
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    height="90"
                                                    width="115"
                                                />
                                            </div>
                                            <div className="col-5 col-lg-3">
                                                <Link to={`/products/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </div>
                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${item.price}</p>
                                            </div>
                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span
                                                        className="btn btn-danger minus"
                                                        onClick={() => decreaseQty(item, item.quantity)}
                                                    > - </span>
                                                    <input
                                                        type="number"
                                                        className="form-control count d-inline"
                                                        value={item.quantity}
                                                        readOnly
                                                    />
                                                    <span
                                                        className="btn btn-primary plus"
                                                        onClick={() => increaseQty(item, item.quantity)}
                                                    > + </span>
                                                </div>
                                            </div>
                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i
                                                    id="delete_cart_item"
                                                    className="fa fa-trash btn btn-danger"
                                                    onClick={() => removeCartItemHandler(item?.product)}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>
                                    Subtotal:{' '}
                                    <span className="order-summary-values">
                                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)} (Units)
                                    </span>
                                </p>
                                <p>
                                    Est. total:{' '}
                                    <span className="order-summary-values">
                                        ${cartItems
                                            .reduce((acc, item) => acc + item.price * item.quantity, 0)
                                            .toFixed(2)}
                                    </span>
                                </p>
                                <hr />
                                <button
                                    id="checkout_btn"
                                    className="btn btn-primary w-100"
                                >
                                    Check out
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
