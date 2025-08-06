import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../../redux/api/authApi.js';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate(); // Correct hook to programmatically navigate
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [login, { isLoading, error }] = useLoginMutation();
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Handle errors and redirect if authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }

        if (error) {
            toast.error(error?.data?.message || 'Login failed');
        }
    }, [error, isAuthenticated, navigate]);

    // Handle form submission
    const submithandler = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow rounded bg-body" onSubmit={submithandler}>
                    <h2 className="mb-4">Login</h2>

                    {/* Email Field */}
                    <div className="mb-3">
                        <label htmlFor="email_field" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                        <label htmlFor="password_field" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Forgot Password Link */}
                    <div className="mb-3 text-end">
                        <Link to="/password/forgot">Forgot Password?</Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        id="login_button"
                        type="submit"
                        className="btn w-100 py-2"
                        disabled={isLoading}
                    >
                        {isLoading ? "Authenticating..." : "LOGIN"}
                    </button>

                    {/* Register Link */}
                    <div className="my-3 text-end">
                        <Link to="/register">New User?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
