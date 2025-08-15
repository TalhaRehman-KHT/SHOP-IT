import React, { useState } from "react";
import { useCanUserReviewQuery, useSubmitReviewMutation } from "../../redux/api/productApi.js";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";

export default function NewReview({ productId }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const [submitReview, { isLoading }] = useSubmitReviewMutation();
    const { data } = useCanUserReviewQuery(productId);

    const canReview = data?.canUserReview;

    const handleSubmit = async () => {
        if (!rating || !comment.trim()) {
            toast.error("Please add a rating and a comment");
            return;
        }

        try {
            await submitReview({ rating, comment, productId }).unwrap();
            toast.success("Review submitted successfully!");
            setRating(0);
            setComment("");
        } catch (err) {
            toast.error(err?.data?.message || "Failed to submit review");
        }
    };

    return (
        <div>
            {canReview && (
                <button
                    id="review_btn"
                    type="button"
                    className="btn btn-primary mt-4"
                    data-bs-toggle="modal"
                    data-bs-target="#ratingModal"
                >
                    Submit Your Review
                </button>
            )}

            <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Submit Review</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>

                        <div className="modal-body">
                            <ReactStars
                                count={5}
                                value={rating}
                                size={24}
                                isHalf={true}
                                edit={true}
                                activeColor="#ffd700"
                                onChange={(newValue) => setRating(newValue)}
                            />

                            <textarea
                                className="form-control mt-4"
                                placeholder="Enter your comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>

                            <button
                                id="new_review_btn"
                                className="btn btn-primary w-100 my-4 px-4"
                                data-bs-dismiss="modal"
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
