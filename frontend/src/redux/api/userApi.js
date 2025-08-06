import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, setIsAuthenticated } from "../featurs/userSlice";

// Define the API
export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/api/v1",
        credentials: "include", // Enable cookie sharing
    }),
    endpoints: (builder) => ({
        // GET /me
        getMe: builder.query({
            query: () => ({
                url: "/me",
                method: "GET",
            }),
            transformResponse: (result) => result.user,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                    dispatch(setIsAuthenticated(true));
                } catch (error) {
                    console.error("User fetch failed:", error);
                }
            },
        }),
    }),
});

// Hook
export const { useGetMeQuery } = userApi;
