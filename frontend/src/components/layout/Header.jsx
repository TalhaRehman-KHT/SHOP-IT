import React from 'react';
import Search from './Search';
import { useGetMeQuery } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../redux/api/authApi';

export default function Header() {
    const navigate = useNavigate(); // Corrected from Navigate() to useNavigate()
    const { isLoading } = useGetMeQuery(); // Fetch user on mount
    const [logout] = useLogoutMutation(); // Hook to call logout mutation

    const { user } = useSelector((state) => state.auth); // Get user from Redux
    const { cartItems } = useSelector((state) => state.cart);

    // Logout handler
    const logouthandler = async () => {
        await logout(); // Trigger the logout API
        navigate("/login"); // Redirect to login page
    };

    return (
        <>
            <nav className="navbar row">
                {/* Logo */}
                <div className="col-12 col-md-3 ps-5">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="/images/shopit_logo.png" alt="ShopIT Logo" />
                        </Link>
                    </div>
                </div>

                {/* Search bar */}
                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Search />
                </div>

                {/* Cart and User Info */}
                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    {/* Cart */}
                    <Link to="/cart" style={{ textDecoration: 'none' }}>
                        <span id="cart" className="ms-3">Cart</span>
                        <span className="ms-1" id="cart_count">{cartItems.length}</span>
                    </Link>

                    {/* If user is logged in */}
                    {user ? (
                        <div className="ms-4 dropdown d-inline">
                            <button
                                className="btn dropdown-toggle text-white"
                                type="button"
                                id="dropDownMenuButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user?.avatar?.url || "/images/default_avatar.jpg"}
                                        alt={user?.name || "User Avatar"}
                                        className="rounded-circle"
                                        width="40"
                                        height="40"
                                    />
                                </figure>
                                <span>{user?.name}</span>
                            </button>

                            <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">
                                {/* Admin-only dashboard */}
                                {user.role === "admin" && (
                                    <Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link>
                                )}

                                {/* Common Links */}
                                <Link className="dropdown-item" to="/me/orders">Orders</Link>
                                <Link className="dropdown-item" to="/me/profile">Profile</Link>

                                {/* Logout */}
                                <button className="dropdown-item text-danger" onClick={logouthandler}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        // If user is not logged in and loading is complete
                        !isLoading && (
                            <Link to="/login" className="btn ms-4" id="login_btn">Login</Link>
                        )
                    )}
                </div>
            </nav>
        </>
    );
}
