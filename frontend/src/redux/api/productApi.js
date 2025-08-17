import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/api/v1",
        credentials: "include",
    }),
    tagTypes: ["Product", "AdminProducts"],

    endpoints: (builder) => ({
        // 🛒 Get all products (with filters/pagination)
        getProducts: builder.query({
            query: ({ page, keyword, min, max, category = [], ratings = [] }) => {
                const params = {};

                if (page) params.page = page;
                if (keyword) params.keyword = keyword;
                if (min) params["price[gte]"] = min;
                if (max) params["price[lte]"] = max;

                category.forEach((cat, index) => {
                    params[`category[${index}]`] = cat;
                });
                ratings.forEach((rate, index) => {
                    params[`ratings[${index}]`] = rate;
                });

                return {
                    url: "/products",
                    params,
                };
            },
        }),

        // 📄 Get single product details
        getProductDetails: builder.query({
            query: (id) => `/products/${id}`,
        }),

        // ✍️ Submit review
        submitReview: builder.mutation({
            query: (body) => ({
                url: `/reviews`,
                method: "PUT",
                body,
            }),
        }),

        // ✅ FIXED: Create new product (correct spelling + correct endpoint)
        createProduct: builder.mutation({
            query: (body) => ({
                url: `/admin/product`, // <-- must match backend route
                method: "POST",
                body,
            }),
            invalidatesTags: ["AdminProducts"],
        }),
        // 
        // productApi.js

        updateProduct: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/product/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["AdminProducts", "Product"],
        }),
        // 

        // redux/api/productApi.js
        uploadProductImages: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/product/${id}/upload_images`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Product"],
        }),


        // ⭐ Check if user can review
        canUserReview: builder.query({
            query: (productId) => `/can_review/?productId=${productId}`,
        }),

        // 👨‍💼 Get all admin products
        getAdminProducts: builder.query({
            query: () => `/admin/products`,
            providesTags: ["AdminProducts"],
        }),
    }),
});

// ✅ Updated export names (note `useCreateProductMutation` now exists)
export const {
    useGetProductsQuery,
    useUploadProductImagesMutation,
    useCreateProductMutation,
    useGetAdminProductsQuery,
    useGetProductDetailsQuery,
    useSubmitReviewMutation,
    useCanUserReviewQuery,
    useUpdateProductMutation
} = productApi;
