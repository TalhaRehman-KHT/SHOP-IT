import React from "react";

export default function ListReviews({ reviews = [] }) {
    if (!reviews.length) {
        return (
            <div className="reviews w-75">
                <h3>Other's Reviews:</h3>
                <hr />
                <p>No reviews yet.</p>
            </div>
        );
    }

    return (
        <div className="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr />
            {reviews.map((review, index) => (
                <div className="review-card my-3" key={index}>
                    <div className="row">
                        <div className="col-1">
                            <img
                                src={review.avatar || "/images/default_avatar.jpg"}
                                alt={review.name || "User"}
                                width="50"
                                height="50"
                                className="rounded-circle"
                            />
                        </div>
                        <div className="col-11">
                            <div className="star-ratings">
                                {[...Array(5)].map((_, i) => (
                                    <i
                                        key={i}
                                        className={`fa fa-star ${i < review.rating ? "star-active" : "star-inactive"
                                            }`}
                                    ></i>
                                ))}
                            </div>
                            <p className="review_user">by {review.name || "Anonymous"}</p>
                            <p className="review_comment">{review.comment || "No comment"}</p>
                        </div>
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    );
}
