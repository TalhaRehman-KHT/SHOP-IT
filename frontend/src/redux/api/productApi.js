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
                const params = new URLSearchParams();

                if (page) params.append("page", page);
                if (keyword) params.append("keyword", keyword);
                if (min) params.append("price[gte]", min);
                if (max) params.append("price[lte]", max);

                category.forEach((cat) => params.append("category", cat));
                ratings.forEach((r) => params.append("ratings", r));

                return {
                    url: `/products`,
                    params,
                };
            },
        }),
        getProductsDetails: builder.query({
            query: (id) => `/products/${id}`,
        }),
    }),
});

export const { useGetProductsQuery, useGetProductsDetailsQuery } = productApi;
