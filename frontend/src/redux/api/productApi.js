import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/api/v1",
        credentials: "include",
    }),
    endpoints: (builder) => ({
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

        getProductDetails: builder.query({
            query: (id) => `/products/${id}`,
        }),

        submitReview: builder.mutation({
            query: (body) => ({
                url: `/reviews`,
                method: "PUT",
                body,
            }),
        }),

        canUserReview: builder.query({
            query: (productId) => `/can_review/?productId=${productId}`,
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useSubmitReviewMutation,
    useCanUserReviewQuery
} = productApi;
