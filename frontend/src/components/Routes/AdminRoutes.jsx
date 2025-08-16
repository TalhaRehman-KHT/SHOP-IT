import React from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoute from '../auth/ProtectedRoute'
import Dashboard from '../Dashboard/Dashboard.jsx'
import ListProducts from '../Dashboard/ListProducts.jsx'
import NewProduct from '../Dashboard/NewProduct.jsx'
import UpdateProduct from '../Dashboard/UpdateProduct.jsx'
import UploadImages from '../Dashboard/UploadImages.jsx'

export default function AdminRoutes() {


    return (
        <>

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute admin={true}>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/products"
                element={
                    <ProtectedRoute admin={true}>
                        <ListProducts />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/product/new"
                element={
                    <ProtectedRoute admin={true}>
                        <NewProduct />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/product/:id"
                element={
                    <ProtectedRoute admin={true}>
                        <UpdateProduct />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/product/:id/upload_images"
                element={
                    <ProtectedRoute admin={true}>
                        <UploadImages />
                    </ProtectedRoute>
                }
            />
        </>
    )
}
