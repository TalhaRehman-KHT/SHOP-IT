<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useGetProductDetailsQuery } from "../../redux/api/productApi.js"; // ✅ correct hook
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../../redux/featurs/cartSlice.js";
import NewReview from "../Reviews/NewReview.jsx";
import ListReviews from "../Reviews/ListReviews.jsx";

export default function ProductDetails() {
    const params = useParams();
    const dispatch = useDispatch();

    const { data, error, isLoading } = useGetProductDetailsQuery(params?.id); // ✅ fixed
    const product = data?.product;

    const { isAuthenticated } = useSelector((state) => state.auth);

    const [quantity, setQuantity] = useState(1);
    const [activeImg, setActiveImg] = useState("/images/default_product.png");

    const setItem = () => {
        if (!product) return;
        dispatch(setCartItem({
            product: product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[0]?.url || "/images/default_product.png",
            stock: product.stock,
            quantity,
        }));
        toast.success("Added to cart");
    };
=======
import React, { useEffect, useState } from 'react';
import { useGetProductsDetailsQuery } from '../../redux/api/productApi.js';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ReactStars from 'react-rating-stars-component';

export default function ProductDetails() {
    const params = useParams();
    const { data, error, isLoading } = useGetProductsDetailsQuery(params?.id);
    const product = data?.product;

    const [activeImg, setActiveImg] = useState('/images/default_product.png');
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12

    useEffect(() => {
        if (product?.images?.[0]?.url) {
            setActiveImg(product.images[0].url);
        }
    }, [product]);

    useEffect(() => {
<<<<<<< HEAD
        if (error) {
            toast.error("Failed to load product details.");
        }
    }, [error]);

    const increaseQty = () => {
        if (quantity >= (product?.stock || 0)) return;
        setQuantity((prev) => prev + 1);
    };

    const decreaseQty = () => {
        if (quantity <= 1) return;
        setQuantity((prev) => prev - 1);
    };

    if (isLoading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;
=======
        if (product) {
            toast.success("Product details loaded successfully!");
        }
        if (error) {
            toast.error("Failed to load product details.");
        }
    }, [product, error]);
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12

    return (
        <div className="row d-flex justify-content-around">
            {/* Product Image Section */}
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <div className="p-3">
                    <img
<<<<<<< HEAD
                        src={activeImg}
                        onError={(e) => (e.target.src = "/images/default_product.png")}
                        alt={product.name}
=======
                        className="d-block w-100"
                        src={activeImg}
                        alt={product?.name || 'Product Image'}
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
                        width="340"
                        height="390"
                    />
                </div>

                <div className="row justify-content-start mt-5">
<<<<<<< HEAD
                    {product.images?.map((img, index) => (
                        <div className="col-2 ms-4 mt-2" key={img.url || index}>
                            <img
                                className={`d-block border rounded p-2 cursor-pointer ${img.url === activeImg ? "border-warning" : ""}`}
                                height="100"
                                width="100"
                                src={img.url || "/images/default_product.png"}
                                alt={`${product.name} - ${index + 1}`}
                                onClick={() => setActiveImg(img.url || "/images/default_product.png")}
                            />
=======
                    {product?.images?.map((img, index) => (
                        <div className="col-2 ms-4 mt-2" key={index}>
                            <img
                                className={`d-block border rounded p-2 cursor-pointer ${img?.url === activeImg ? 'border-warning' : ''}`}
                                height="100"
                                width="100"
                                src={img?.url || "/images/default_product.png"}
                                alt={`${product?.name} - ${index + 1}`}
                                onClick={() => setActiveImg(img.url)}
                            />

>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Details Section */}
            <div className="col-12 col-lg-5 mt-5">
<<<<<<< HEAD
                <h3>{product.name}</h3>
                <p id="product_id">Product #{product._id}</p>
=======
                <h3>{product?.name}</h3>
                <p id="product_id">Product #{product?._id}</p>
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12

                <hr />

                {/* Star Rating */}
                <div className="d-flex align-items-center">
                    <ReactStars
                        count={5}
<<<<<<< HEAD
                        value={product.ratings || 0}
=======
                        value={product?.ratings || 0}
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
                        size={24}
                        isHalf={true}
                        edit={false}
                        activeColor="#ffd700"
                    />
                    <span id="no-of-reviews" className="pt-1 ps-2">
<<<<<<< HEAD
                        ({product.numOfReviews || 0} Reviews)
=======
                        ({product?.numOfReviews || 0} Reviews)
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
                    </span>
                </div>

                <hr />

<<<<<<< HEAD
                <p id="product_price">${product.price}</p>

                {/* Quantity Controls */}
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decreaseQty}>
                        -
                    </span>
                    <input
                        type="number"
                        className="form-control count d-inline"
                        value={quantity}
                        readOnly
                    />
                    <span className="btn btn-primary plus" onClick={increaseQty}>
                        +
                    </span>
=======
                <p id="product_price">${product?.price}</p>

                {/* Quantity Controls */}
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus">-</span>
                    <input
                        type="number"
                        className="form-control count d-inline"
                        value="1"
                        readOnly
                    />
                    <span className="btn btn-primary plus">+</span>
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
                </div>

                <button
                    type="button"
                    id="cart_btn"
                    className="btn btn-primary d-inline ms-4"
<<<<<<< HEAD
                    onClick={setItem}
                    disabled={product.stock <= 0}
=======
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
                >
                    Add to Cart
                </button>

                <hr />

                <p>
                    Status:{" "}
                    <span
                        id="stock_status"
<<<<<<< HEAD
                        className={product.stock > 0 ? "greenColor" : "redColor"}
                    >
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
=======
                        className={product?.stock > 0 ? "greenColor" : "redColor"}
                    >
                        {product?.stock > 0 ? "In Stock" : "Out of Stock"}
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
                    </span>
                </p>

                <hr />
                <h4 className="mt-2">Description:</h4>
<<<<<<< HEAD
                <p>{product.description}</p>

                <hr />
                <p id="product_seller" className="mb-3">
                    Sold by: <strong>{product.seller}</strong>
                </p>

                {isAuthenticated ? (
                    <NewReview productId={product._id} />
                ) : (
                    <div className="alert alert-danger my-5" role="alert">
                        Login to post your review.
                    </div>
                )}
            </div>

            {/* Reviews Section */}
            <div className="col-12 mt-5">
                {product.reviews?.length > 0 && (
                    <ListReviews reviews={product.reviews} />
                )}
=======
                <p>{product?.description}</p>

                <hr />
                <p id="product_seller" className="mb-3">
                    Sold by: <strong>{product?.seller}</strong>
                </p>

                <div className="alert alert-danger my-5" type="alert">
                    Login to post your review.
                </div>
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
            </div>
        </div>
    );
}
