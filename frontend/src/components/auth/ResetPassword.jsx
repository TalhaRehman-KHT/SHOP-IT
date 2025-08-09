import React, { useState, useEffect } from 'react';
import { useResetPasswordMutation } from '../../redux/api/userApi';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { token } = useParams();
    const navigate = useNavigate();

    const [resetPassword, { isLoading, error, isSuccess }] = useResetPasswordMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }

        if (isSuccess) {
            toast.success('Password has been reset');
            navigate('/login');
        }
    }, [error, isSuccess, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        resetPassword({ token, password, confirmPassword });
    };

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow rounded bg-body p-4" onSubmit={submitHandler}>
                    <h2 className="mb-4">Set New Password</h2>

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

                    <div className="mb-3">
                        <label htmlFor="confirm_password_field" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 py-2"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Setting...' : 'Set Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}
