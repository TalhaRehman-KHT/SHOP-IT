import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SideMenu() {
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

    const location = useLocation();
    const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

    useEffect(() => {
        setActiveMenuItem(location.pathname); // Update on route change
    }, [location.pathname]);

    return (
        <div className="list-group mt-5 pl-4">
            {menuItem.map((item, index) => (
                <Link
                    key={index}
                    to={item.url}
                    className={`fw-bold list-group-item list-group-item-action ${activeMenuItem === item.url ? 'active' : ''
                        }`}
                    onClick={() => setActiveMenuItem(item.url)}
                    aria-current={activeMenuItem === item.url ? "true" : "false"}
                >
                    <i className={`${item.icon} fa-fw pe-2`}></i> {item.name}
                </Link>
            ))}
        </div>
    );
}
