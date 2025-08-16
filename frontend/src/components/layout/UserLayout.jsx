import React from 'react';
import SideMenu from './SideMenu';

export default function UserLayout({ children }) {
    const menuItem = [
        {
            name: "Profile",
            url: "/me/profile",
            icon: "fas fa-user"
        },
        {
            name: "Update",
            url: "/me/update_profile",
            icon: "fas fa-shopping-basket"
        },
        {
            name: "Update Avatar",
            url: "/me/upload_avatar",
            icon: "fas fa-cog"
        },
        {
            name: "Update Password",
            url: "/password/update",
            icon: "fas fa-cog"
        },
    ];
    return (
        <div>
            <div className='mt-2 mb-4 py-4'>
                <h2 className='text-center fw-bolder'>User Settings</h2>
            </div>

            <div className='container'>
                <div className="row justify-content-around">
                    <div className='col-12 col-lg-3'>
                        <SideMenu menuItem={menuItem} />
                    </div>
                    <div className="col-12 col-lg-9 user-dashboard">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
