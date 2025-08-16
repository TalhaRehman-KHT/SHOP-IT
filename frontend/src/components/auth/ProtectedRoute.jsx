import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ admin, children }) {
    const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

    // Optional: Show loader while checking auth state
    if (loading) return <div>Loading...</div>;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (admin && user?.role !== "admin") {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
}
