import React, { useEffect, useState } from 'react';
import { useGetProductsDetailsQuery } from '../../redux/api/productApi.js';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ReactStars from 'react-rating-stars-component';
import { useDispatch } from 'react-redux';
import { setCartItem } from '../../redux/featurs/cartSlice.js';

export default function ProductDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const { data, error, isLoading } = useGetProductsDetailsQuery(params?.id);
    const product = data?.product;

    const [quantity, setQuantity] = useState(1);
    const [activeImg, setActiveImg] = useState('/images/default_product.png');

    const setItem = () => {
        const cartItem = {
            product: product?._id,
            name: product?.name,
            price: product?.price,
            image: product?.images?.[0]?.url || "/images/default_product.png",
            stock: product?.stock,
            quantity
        };
        dispatch(setCartItem(cartItem));
        toast.success("Added to cart");
    };

    useEffect(() => {
        if (product?.images?.[0]?.url) {
            setActiveImg(product.images[0].url);
        }
    }, [product]);

    useEffect(() => {
        if (product) {
            toast.success("Product details loaded successfully!");
        }
        if (error) {
            toast.error("Failed to load product details.");
        }
    }, [product, error]);

    const increaseQty = () => {
        if (quantity >= product.stock) return;
        setQuantity(prev => prev + 1);
    };

    const decreaseQty = () => {
        if (quantity <= 1) return;
        setQuantity(prev => prev - 1);
    };

    return (
        <div className="row d-flex justify-content-around">
            {/* Product Image Section */}
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <div className="p-3">
                    <img
                        src={activeImg}
                        onError={(e) => e.target.src = "/images/default_product.png"}
                        alt={product?.name || 'Product Image'}
                        width="340"
                        height="390"
                    />
                </div>

                <div className="row justify-content-start mt-5">
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
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Details Section */}
            <div className="col-12 col-lg-5 mt-5">
                <h3>{product?.name}</h3>
                <p id="product_id">Product #{product?._id}</p>

                <hr />

                {/* Star Rating */}
                <div className="d-flex align-items-center">
                    <ReactStars
                        count={5}
                        value={product?.ratings || 0}
                        size={24}
                        isHalf={true}
                        edit={false}
                        activeColor="#ffd700"
                    />
                    <span id="no-of-reviews" className="pt-1 ps-2">
                        ({product?.numOfReviews || 0} Reviews)
                    </span>
                </div>

                <hr />

                <p id="product_price">${product?.price}</p>

                {/* Quantity Controls */}
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                    <input
                        type="number"
                        className="form-control count d-inline"
                        value={quantity}
                        readOnly
                    />
                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                </div>

                <button
                    type="button"
                    id="cart_btn"
                    className="btn btn-primary d-inline ms-4"
                    onClick={setItem}
                    disabled={product?.stock <= 0}
                >
                    Add to Cart
                </button>

                <hr />

                <p>
                    Status:{" "}
                    <span
                        id="stock_status"
                        className={product?.stock > 0 ? "greenColor" : "redColor"}
                    >
                        {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                </p>

                <hr />
                <h4 className="mt-2">Description:</h4>
                <p>{product?.description}</p>

                <hr />
                <p id="product_seller" className="mb-3">
                    Sold by: <strong>{product?.seller}</strong>
                </p>

                <div className="alert alert-danger my-5" type="alert">
                    Login to post your review.
                </div>
            </div>
        </div>
    );
}
