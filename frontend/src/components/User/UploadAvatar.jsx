import React, { useEffect, useState } from 'react';
import UserLayout from '../layout/UserLayout';
import { useNavigate } from 'react-router-dom';
import { useUploadAvatarMutation } from '../../redux/api/userApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function UploadAvatar() {
    const { user } = useSelector((state) => state.auth);

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(
        user?.avatar?.url || '/images/default_avatar.png'
    );

    const navigate = useNavigate();
    const [uploadAvatar, { isLoading, error, isSuccess }] = useUploadAvatarMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || 'Update failed');
        }

        if (isSuccess) {
            toast.success('Avatar Uploaded');
            navigate('/me/profile');
        }
    }, [error, isSuccess, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        const userData = {
            avatar,
        };
        uploadAvatar(userData);
    };

    const onchange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <UserLayout>
            <div className="row wrapper">
                <div className="col-10 col-lg-8">
                    <form className="shadow rounded bg-body p-4" onSubmit={submitHandler}>
                        <h2 className="mb-4">Upload Avatar</h2>

                        <div className="mb-3">
                            <div className="d-flex align-items-center gap-5">
                                <div className="me-3">
                                    <figure className="avatar item-rtl">
                                        <img
                                            src={avatarPreview}
                                            className="rounded-circle"
                                            alt="avatar preview"
                                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                        />
                                    </figure>
                                </div>
                                <div className="form-group w-100">
                                    <label className="form-label" htmlFor="customFile">
                                        Choose Avatar
                                    </label>
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="form-control"
                                        id="customFile"
                                        accept="image/*"
                                        onChange={onchange}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Uploading...' : 'Upload'}
                        </button>
                    </form>
                </div>
            </div>
        </UserLayout>
    );
}
