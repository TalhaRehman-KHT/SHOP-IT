import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout.jsx";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
    useUpdateProductMutation,
    useGetProductDetailsQuery
} from "../../redux/api/productApi.js";

export const PRODUCT_CATEGORIES = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Sports",
    "Outdoor",
    "Home"
];

export default function UpdateProduct() {
    const navigate = useNavigate();
    const params = useParams();

    const { data, isLoading: detailsLoading } = useGetProductDetailsQuery(params?.id);
    const [updateProduct, { isLoading, error, isSuccess }] = useUpdateProductMutation();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        seller: "",
    });

    const { name, description, price, category, stock, seller } = product;

    useEffect(() => {
        if (data?.product) {
            setProduct({
                name: data.product.name,
                description: data.product.description,
                price: data.product.price,
                category: data.product.category,
                stock: data.product.stock,
                seller: data.product.seller,
            });
        }

        if (error) {
            toast.error(error?.data?.message || "Failed to update product");
        }

        if (isSuccess) {
            toast.success("Product Updated Successfully");
            navigate("/admin/products");
        }
    }, [data, error, isSuccess, navigate]);

    const onChange = (e) => {
        setProduct((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        updateProduct({ id: params.id, body: product }); // ✅ correct update call
    };

    if (detailsLoading) return <p>Loading product details...</p>;

    return (
        <AdminLayout>
            <div className="row wrapper">
                <div className="col-10 col-lg-10 mt-5 mt-lg-0">
                    <form className="shadow rounded bg-body" onSubmit={submitHandler}>
                        <h2 className="mb-4">Update Product</h2>

                        <div className="mb-3">
                            <label htmlFor="name_field" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description_field" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description_field"
                                rows="8"
                                name="description"
                                value={description}
                                onChange={onChange}
                            ></textarea>
                        </div>

                        <div className="row">
                            <div className="mb-3 col">
                                <label htmlFor="price_field" className="form-label">Price</label>
                                <input
                                    type="number"
                                    id="price_field"
                                    className="form-control"
                                    name="price"
                                    value={price}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="mb-3 col">
                                <label htmlFor="stock_field" className="form-label">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    name="stock"
                                    value={stock}
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col">
                                <label htmlFor="category_field" className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    id="category_field"
                                    name="category"
                                    value={category}
                                    onChange={onChange}
                                >
                                    <option value="">-- Select Category --</option>
                                    {PRODUCT_CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3 col">
                                <label htmlFor="seller_field" className="form-label">Seller Name</label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    name="seller"
                                    value={seller}
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn w-100 py-2 btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? "Updating..." : "Update Product"}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
