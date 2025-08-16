import React from "react";
import Home from "../Home.jsx";
import ProductDetails from "../products/ProductDetails.jsx";
import Login from "../auth/Login.jsx";
import Register from "../auth/Register.jsx";
import Profile from "../User/Profile.jsx";
import UpdateUserProfile from "../User/UpdateUserProfile.jsx";
import UploadAvatar from "../User/UploadAvatar.jsx";
import UpdatePassword from "../User/UpdatePassword.jsx";
import ForgotPassword from "../auth/ForgotPassword.jsx";
import ResetPassword from "../auth/ResetPassword.jsx";
import Cart from "../Cart/Cart.jsx";
import Shipping from "../Cart/Shipping.jsx";
import ConfirmOrder from "../Cart/ConfirmOrder.jsx";
import PaymentMethod from "../Cart/PaymentMethod.jsx";
import MyOrder from "../order/MyOrder.jsx";
import OrderDetails from "../order/OrderDetails.jsx";
import Invoice from "../invoice/invoice.jsx";
import ProtectedRoute from "../auth/ProtectedRoute.jsx";
import { Route } from "react-router-dom";

export default function UserRoutes() {
    return (
        <>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/me/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/me/update_profile"
                element={
                    <ProtectedRoute>
                        <UpdateUserProfile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/me/upload_avatar"
                element={
                    <ProtectedRoute>
                        <UploadAvatar />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/password/update"
                element={
                    <ProtectedRoute>
                        <UpdatePassword />
                    </ProtectedRoute>
                }
            />

            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />

            <Route path="/cart" element={<Cart />} />

            <Route
                path="/shipping"
                element={
                    <ProtectedRoute>
                        <Shipping />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/confirm_order"
                element={
                    <ProtectedRoute>
                        <ConfirmOrder />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/payment_method"
                element={
                    <ProtectedRoute>
                        <PaymentMethod />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/me/orders"
                element={
                    <ProtectedRoute>
                        <MyOrder />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/me/orders/:id"
                element={
                    <ProtectedRoute>
                        <OrderDetails />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/invoice/order/:id"
                element={
                    <ProtectedRoute>
                        <Invoice />
                    </ProtectedRoute>
                }
            />
        </>
    );
}
