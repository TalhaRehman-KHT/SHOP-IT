import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function CheckOutSteps() {
    const location = useLocation();

    // Determine which step is active based on the current URL path
    const currentPath = location.pathname;

    const isShippingActive = currentPath.includes('/shipping') || currentPath.includes('/confirm_order') || currentPath.includes('/payment_method');
    const isOrderActive = currentPath.includes('/confirm_order') || currentPath.includes('/payment_method');
    const isPaymentActive = currentPath.includes('/payment_method');

    return (
        <div className="checkout-progress d-flex justify-content-center mt-5 row">

            {/* Shipping Step */}
            {isShippingActive ? (
                <Link to="/shipping" className="mt-2 mt-md-0 col-12 col-md-3 col-lg-2">
                    <div className="triangle2-active"></div>
                    <div className="step active-step">Shipping</div>
                    <div className="triangle-active"></div>
                </Link>
            ) : (
                <div className="mt-2 mt-md-0 col-12 col-md-3 col-lg-2">
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Shipping</div>
                    <div className="triangle-incomplete"></div>
                </div>
            )}

            {/* Confirm Order Step */}
            {isOrderActive ? (
                <Link to="/confirm_order" className="mt-2 mt-md-0 col-12 col-md-4 col-lg-3">
                    <div className="triangle2-active"></div>
                    <div className="step active-step">Confirm Order</div>
                    <div className="triangle-active"></div>
                </Link>
            ) : (
                <div className="mt-2 mt-md-0 col-12 col-md-4 col-lg-3">
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Confirm Order</div>
                    <div className="triangle-incomplete"></div>
                </div>
            )}

            {/* Payment Step */}
            {isPaymentActive ? (
                <Link to="/payment_method" className="mt-2 mt-md-0 col-12 col-md-3 col-lg-2">
                    <div className="triangle2-active"></div>
                    <div className="step active-step">Payment</div>
                    <div className="triangle-active"></div>
                </Link>
            ) : (
                <div className="mt-2 mt-md-0 col-12 col-md-3 col-lg-2">
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Payment</div>
                    <div className="triangle-incomplete"></div>
                </div>
            )}
        </div>
    );
}
