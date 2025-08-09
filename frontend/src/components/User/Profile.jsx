import React from 'react';
import UserLayout from '../layout/UserLayout';
import { useSelector } from 'react-redux';

export default function Profile() {
    const { user } = useSelector((state) => state.auth);

    return (
        <UserLayout>
            <div className="row justify-content-around mt-5 user-info">
                <div className="col-12 col-md-3">
                    <figure className="avatar avatar-profile">
                        <img
                            className="rounded-circle img-fluid"
                            src={user?.avatar?.url || '/images/default_avatar.jpg'}
                            alt={user?.name}
                        />
                    </figure>
                </div>

                <div className="col-12 col-md-5">
                    <h4>Full Name</h4>
                    <p>{user?.name || 'N/A'}</p>

                    <h4>Email Address</h4>
                    <p>{user?.email || 'N/A'}</p>

                    <h4>Joined On</h4>
                    <p>{user?.createdAt?.substring(0, 10) || 'N/A'}</p>
                </div>
            </div>
        </UserLayout>
    );
}
