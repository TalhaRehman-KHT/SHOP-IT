import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { calculatorOrderCost } from '../../helpers/helper';
import CheckOutSteps from './CheckOutSteps';

export default function ConfirmOrder() {
    const navigate = useNavigate();
    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    //const { itemPrice, shippingPrice, taxPrice, totalPrice } = calculatorOrderCost(cartItems);
    const { itemPrice, shippingPrice, taxPrice, totalPrice } = calculatorOrderCost(cartItems);


    const proceedToPayment = () => {
        navigate('/payment_method');
    };


    return (
        <>
            <CheckOutSteps ConfirmOrder />
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">
                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b> {user?.name}</p>
                    <p><b>Phone:</b> {shippingInfo?.phone}</p>
                    <p className="mb-4">
                        <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.zipCode}, {shippingInfo?.country}
                    </p>

                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>
                    {cartItems.map((item) => (
                        <React.Fragment key={item.product}>
                            <hr />
                            <div className="cart-item my-1">
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            height="45"
                                            width="65"
                                        />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </div>

                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>
                                            {item.qty} x ${item.price} = <b>${(item.qty * item.price).toFixed(2)}</b>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal: <span className="order-summary-values">${itemPrice.toFixed(2)}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingPrice.toFixed(2)}</span></p>
                        <p>Tax: <span className="order-summary-values">${taxPrice.toFixed(2)}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${totalPrice.toFixed(2)}</span></p>

                        <hr />
                        <button
                            id="checkout_btn"
                            className="btn btn-primary w-100"
                            onClick={proceedToPayment}
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
