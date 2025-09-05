import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";


export default function ProductItem({ product }) {
  // console.log("Product data:", product);


  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          // src={product?.image?.[0] || "/images/default_product.png"}
          src={
            product?.images?.[0]?.url ||   // case: [{ url: "..." }]
            product?.images?.[0] ||        // case: ["..."]
            product?.image?.[0]?.url ||    // case: { image: [{ url: "..." }] }
            product?.image?.[0] ||         // case: { image: ["..."] }
            "/images/default_product.png"
          }
          alt={product?.name}
        />
        <div className="card-body ps-3 d-flex justify-content-center flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product?._id}`}>{product?.name}</Link>
          </h5>

          <div className="ratings mt-auto d-flex align-items-center">
            <ReactStars
              count={5}
              //value={product?.ratings || 0} // Show average rating 
              value={product?.ratings && product?.ratings > 0 ? product?.ratings : 2}
              size={10}
              isHalf={true}
              edit={false} // Disable editing
              activeColor="#ffd700"
            />
            <span id="no_of_reviews" className="pt-1 ps-2 text-muted">
              ({product?.numOfReviews || 0})
            </span>
          </div>
          {/* <div className="flex items-center gap-2">
            <ReactStars
              count={5}
              value={product?.rating}
              isHalf={true}
              edit={false}
              size={24}
              activeColor="#fbbf24" // yellow-400
            />
            <span className="text-sm text-gray-500">({product?.numOfReviews} reviews)</span>
          </div> */}
          {/*  */}


          <p className="card-text mt-2">${product?.price}</p>

          <Link to={`/product/${product?._id}`} id="view_btn" className="btn btn-block btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
