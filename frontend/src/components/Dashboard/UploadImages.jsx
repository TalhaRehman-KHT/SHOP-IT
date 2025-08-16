import React, { useEffect, useState, useRef } from "react";
import AdminLayout from "../layout/AdminLayout.jsx";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
    useGetProductDetailsQuery,
    useUploadProductImagesMutation,
} from "../../redux/api/productApi.js";

export default function UploadImages() {
    const params = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);

    const { data, error } = useGetProductDetailsQuery(params?.id);
    const [uploadImages, { isLoading }] = useUploadProductImagesMutation();

    useEffect(() => {
        if (data?.product) {
            setUploadedImages(data?.product?.images || []);
        }
        if (error) {
            toast.error(error?.data?.message || "Failed to load product details");
        }
    }, [data, error]);

    // Handle new image selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((old) => [...old, file]);
                    setImagesPreview((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    // Handle upload submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (images.length === 0) {
            toast.error("Please select images to upload");
            return;
        }

        try {
            const formData = new FormData();
            images.forEach((img) => formData.append("images", img)); // ✅ field name matches multer

            await uploadImages({ id: params?.id, body: formData }).unwrap();

            toast.success("Images uploaded successfully");
            navigate("/admin/products");
        } catch (err) {
            toast.error(err?.data?.message || "Image upload failed");
        }
    };


    return (
        <AdminLayout>
            <div className="row wrapper">
                <div className="col-10 col-lg-8 mt-5 mt-lg-0">
                    <form
                        className="shadow rounded bg-body p-4"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="mb-4">Upload Product Images</h2>

                        <div className="mb-3">
                            <label htmlFor="customFile" className="form-label">
                                Choose Images
                            </label>

                            <input
                                ref={fileInputRef}
                                type="file"
                                name="product_images"
                                className="form-control"
                                id="customFile"
                                multiple
                                onChange={handleImageChange}
                            />
                        </div>

                        {/* New Images Preview */}
                        {imagesPreview.length > 0 && (
                            <div className="new-images my-4">
                                <p className="text-warning">New Images:</p>
                                <div className="row mt-4">
                                    {imagesPreview.map((img, i) => (
                                        <div className="col-md-3 mt-2" key={i}>
                                            <div className="card">
                                                <img
                                                    src={img}
                                                    alt="New Upload"
                                                    className="card-img-top p-2"
                                                    style={{ width: "100%", height: "80px" }}
                                                />
                                                <button
                                                    style={{
                                                        backgroundColor: "#dc3545",
                                                        borderColor: "#dc3545",
                                                    }}
                                                    type="button"
                                                    className="btn btn-block btn-danger cross-button mt-1 py-0"
                                                    onClick={() => {
                                                        setImagesPreview(imagesPreview.filter((_, idx) => idx !== i));
                                                        setImages(images.filter((_, idx) => idx !== i));
                                                    }}
                                                >
                                                    <i className="fa fa-times"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Uploaded Images */}
                        {uploadedImages.length > 0 && (
                            <div className="uploaded-images my-4">
                                <p className="text-success">Product Uploaded Images:</p>
                                <div className="row mt-1">
                                    {uploadedImages.map((img, i) => (
                                        <div className="col-md-3 mt-2" key={i}>
                                            <div className="card">
                                                <img
                                                    src={img?.url || img}
                                                    alt="Uploaded"
                                                    className="card-img-top p-2"
                                                    style={{ width: "100%", height: "80px" }}
                                                />
                                                <button
                                                    style={{
                                                        backgroundColor: "#dc3545",
                                                        borderColor: "#dc3545",
                                                    }}
                                                    className="btn btn-block btn-danger cross-button mt-1 py-0"
                                                    disabled
                                                    type="button"
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-primary w-100 py-2"
                            disabled={isLoading}
                        >
                            {isLoading ? "Uploading..." : "Upload"}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
