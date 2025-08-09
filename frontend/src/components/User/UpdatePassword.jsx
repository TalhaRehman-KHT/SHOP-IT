import React, { useEffect, useState } from 'react';
import UserLayout from '../layout/UserLayout';
import { useUpdatePasswordMutation } from '../../redux/api/userApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function UpdatePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate();
    const [updatePassword, { isLoading, error, isSuccess }] = useUpdatePasswordMutation();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || 'Password Incorrect');
        }

        if (isSuccess) {
            toast.success('Password updated successfully');
            navigate('/me/profile');
        }
    }, [error, isSuccess, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        //    updatePassword({ oldPassword, newPassword });
        updatePassword({ oldPassword, password: newPassword });

    };

    return (
        <UserLayout>
            <div className="row wrapper">
                <div className="col-10 col-lg-8">
                    <form className="shadow rounded bg-body p-4" onSubmit={submitHandler}>
                        <h2 className="mb-4">Update Password</h2>

                        <div className="mb-3">
                            <label htmlFor="old_password_field" className="form-label">
                                Old Password
                            </label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="new_password_field" className="form-label">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </UserLayout>
    );
}
