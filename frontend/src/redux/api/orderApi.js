import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/api/v1",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createNewOrder: builder.mutation({
            query: (body) => ({
                url: "/order/new",
                method: "POST",
                body,

            }),
        }),
        // 
        myOrders: builder.query({
            query: () => "/me/orders",
        }),
        // 
        ordersDetails: builder.query({
            query: (id) => `/order/${id}`,
        }),
        // 
        stripeCheckoutSession: builder.mutation({
            query: (body) => ({
                url: "/payment/checkout_session",
                method: "POST",
                body,

            }),
        }),
    }),
});

export const { useCreateNewOrderMutation, useStripeCheckoutSessionMutation, useMyOrdersQuery, useOrdersDetailsQuery } = orderApi;
