import React, { useEffect, useState } from "react";
import CheckOutSteps from "./CheckOutSteps.jsx";
import { useSelector } from "react-redux";
import { calculatorOrderCost } from "../../helpers/helper.js";
import { useCreateNewOrderMutation, useStripeCheckoutSessionMutation } from "../../redux/api/orderApi.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PaymentMethod() {
    const [method, setMethod] = useState("");
    const [showModal, setShowModal] = useState(false); // ✅ Modal state

    const navigate = useNavigate();

    const [createNewOrder, { isLoading, error, isSuccess }] = useCreateNewOrderMutation();
    const [stripeCheckoutSession, { data: checkoutData, error: checkourError }] = useStripeCheckoutSessionMutation();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const { itemPrice, shippingPrice, taxPrice, totalPrice } = calculatorOrderCost(cartItems);

    useEffect(() => {
        if (checkoutData) {
            window.location.href = checkoutData.url
            // navigate(checkoutData.url);
        }
        if (checkourError) {
            toast.error(checkourError?.data?.message)
        }
    }, [checkoutData, checkourError])

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || "Something went wrong");
        }
        if (isSuccess) {
            toast.success("Order placed successfully!");
            navigate("/");
        }
    }, [error, isSuccess, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!method) {
            setShowModal(true); // ✅ Show Bootstrap modal instead of alert
            return;
        }

        if (method === "COD") {
            const orderData = {
                shippingInfo,
                orderItems: cartItems,
                itemPrice,
                shippingAmount: shippingPrice,
                taxAmount: taxPrice,
                totalAmount: totalPrice,
                paymentInfo: { status: "NOT PAID" },
                paymentMethod: "COD",
            };
            createNewOrder(orderData);
        }

        if (method === "CARD") {
            console.log("Creating Card Order...");
            // Later: Stripe/PayPal logic
            const orderData = {
                shippingInfo,
                orderItems: cartItems,
                itemPrice,
                shippingAmount: shippingPrice,
                taxAmount: taxPrice,
                totalAmount: totalPrice,

            };
            stripeCheckoutSession(orderData)
        }
    };

    return (
        <>
            <CheckOutSteps payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={submitHandler}
                    >
                        <h2 className="mb-4">Select Payment Method</h2>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="payment_mode"
                                id="codradio"
                                value="COD"
                                onChange={(e) => setMethod(e.target.value)}
                                checked={method === "COD"}
                            />
                            <label className="form-check-label" htmlFor="codradio">
                                Cash on Delivery
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="payment_mode"
                                id="cardradio"
                                value="CARD"
                                onChange={(e) => setMethod(e.target.value)}
                                checked={method === "CARD"}
                            />
                            <label className="form-check-label" htmlFor="cardradio">
                                Card - VISA, MasterCard
                            </label>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn py-2 w-100 mt-3"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "CONTINUE"}
                        </button>
                    </form>
                </div>
            </div>

            {/* ✅ Bootstrap Modal */}
            <div
                className={`modal fade ${showModal ? "show d-block" : ""}`}
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Payment Method Required</h5>
                            <button
                                type="button"
                                className="btn-close btn-danger"
                                onClick={() => setShowModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>Please select a payment method before continuing.</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
