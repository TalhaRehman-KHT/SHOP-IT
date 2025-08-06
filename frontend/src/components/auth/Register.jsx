import React, { useEffect, useState } from 'react';
import { useRegisterMutation, useLoginMutation } from '../../redux/api/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = user;

    const [register, { isLoading: registerLoading, error: registerError, data: registerData }] = useRegisterMutation();
    const [login, { isLoading: loginLoading, error: loginError }] = useLoginMutation();

    useEffect(() => {
        if (registerError) {
            toast.error(registerError?.data?.message || "Registration failed");
        }

        if (loginError) {
            toast.error(loginError?.data?.message || "Login failed after registration");
        }

        // If registration succeeded, auto-login
        if (registerData) {
            toast.success("Registration successful");
            login({ email, password }).unwrap().then(() => {
                navigate('/');
            }).catch(() => {
                // Error handled by loginError useEffect
            });
        }
    }, [registerError, loginError, registerData, email, password, login, navigate]);

    const onChange = (e) => {
        setUser((prevUser) => ({
            ...prevUser,
            [e.target.name]: e.target.value
        }));
    };

    const submithandler = (e) => {
        e.preventDefault();
        register({ name, email, password });
    };

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form
                    className="shadow rounded bg-body"
                    onSubmit={submithandler}
                    encType="multipart/form-data"
                >
                    <h2 className="mb-4">Register</h2>

                    <div className="mb-3">
                        <label htmlFor="name_field" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name_field"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email_field" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password_field" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <button
                        id="register_button"
                        type="submit"
                        className="btn w-100 py-2"
                        disabled={registerLoading || loginLoading}
                    >
                        {(registerLoading || loginLoading) ? "Processing..." : "REGISTER"}
                    </button>
                </form>
            </div>
        </div>
    );
}
