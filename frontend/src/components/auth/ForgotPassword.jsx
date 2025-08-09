import React, { useEffect, useState } from 'react';
import { useForgotPasswordMutation } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const [forgot, { isLoading, error, isSuccess }] = useForgotPasswordMutation();
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Handle side effects
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }

        if (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }

        if (isSuccess) {
            toast.success('Password reset link sent to your email');
            setEmail('');
        }
    }, [error, isAuthenticated, isSuccess, navigate]);

    // Handle form submission
    const submitHandler = (e) => {
        e.preventDefault();
        forgot({ email });
    };

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow rounded bg-body p-4" onSubmit={submitHandler}>
                    <h2 className="mb-4">Forgot Password</h2>
                    <div className="mb-3">
                        <label htmlFor="email_field" className="form-label">Enter Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 py-2"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send Email'}
                    </button>
                </form>
            </div>
        </div>
    );
}
