import React, { useEffect } from "react";
import { useGetAdminProductsQuery } from "../../redux/api/productApi.js";
import Loader from "../layout/Loader.jsx";
import toast from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout.jsx";

export default function ListProducts() {
    const { data, isLoading, error } = useGetAdminProductsQuery();
    const navigate = useNavigate();

    // Handle errors
    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || "Something went wrong");
        }
    }, [error]);

    const handleUploadImage = (productId) => {
        navigate(`/admin/product/${productId}/upload_images`);
    };

    const setProducts = () => {
        const productsTable = {
            columns: [
                { label: "ID", field: "id", sort: "asc" },
                { label: "Name", field: "name", sort: "asc" },
                { label: "Price", field: "price", sort: "asc" },
                { label: "Stock", field: "stock", sort: "asc" },
                { label: "Actions", field: "actions" },
            ],
            rows: [],
        };

        data?.products?.forEach((product) => {
            productsTable.rows.push({
                id: product?._id,
                name: product?.name,
                price: `$${product?.price}`,
                stock: product?.stock,
                actions: (
                    <>
                        {/* Edit Button */}
                        <Link
                            to={`/admin/product/${product?._id}`}
                            className="btn btn-primary btn-sm me-2"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>

                        {/* Upload Images Button */}
                        <button
                            onClick={() => handleUploadImage(product._id)}
                            className="btn btn-warning btn-sm me-2"
                        >
                            <i className="fa fa-image"></i>
                        </button>

                        {/* Delete Button */}
                        <button className="btn btn-danger btn-sm">
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            });
        });

        return productsTable;
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <h1 className="mt-5">{data?.products?.length || 0} Products</h1>
            <AdminLayout>
                <MDBDataTable
                    data={setProducts()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            </AdminLayout>
        </div>
    );
}
