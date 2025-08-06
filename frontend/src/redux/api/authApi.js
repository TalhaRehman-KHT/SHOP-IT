import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";
import { setUser, setIsAuthenticated } from "../featurs/userSlice"; // Import your actions

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/api/v1",
        credentials: "include", // Include cookies for sessions
    }),
    endpoints: (builder) => ({
        // Login mutation
        login: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));
                } catch (error) {
                    console.error("Login error:", error);
                }
            },
        }),

        // Register mutation
        register: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));
                } catch (error) {
                    console.error("Register error:", error);
                }
            },
        }),

        // Logout mutation
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "GET",
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // Clear user from state
                    dispatch(setUser(null));
                    dispatch(setIsAuthenticated(false));
                } catch (error) {
                    console.error("Logout error:", error);
                }
            },
        }),
    }),
});

// Export hooks
export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
} = authApi;
