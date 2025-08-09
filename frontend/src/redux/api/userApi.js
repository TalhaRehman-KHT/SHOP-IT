import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, setIsAuthenticated } from "../featurs/userSlice";



export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/api/v1",
        credentials: "include", // to send cookies
    }),
    tagTypes: ["User"], // Declare tag for cache invalidation
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
            providesTags: ["User"],
        }),

        // PUT /me/update
        updateProfile: builder.mutation({
            query: (body) => ({
                url: "/me/update",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["User"],
        }),

        // PUT /me/upload_avatar
        uploadAvatar: builder.mutation({
            query: (body) => ({
                url: "/me/upload_avatar",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["User"],
        }),

        // PUT /me/update_password
        updatePassword: builder.mutation({
            query: (body) => ({
                url: "/password/update",
                method: "PUT",
                body,
            }),
            // invalidatesTags: ["User"],
        }),

        // PUT /forgotpassword
        forgotPassword: builder.mutation({
            query: (body) => ({
                url: "/password/forgot",
                method: "POST",
                body,
            }),
            // invalidatesTags: ["User"],
        }),

        resetPassword: builder.mutation({
            query: ({ token, ...body }) => ({
                url: `/password/reset/${token}`,  // <- fix here
                method: "PUT",
                body,
            }),
        }),

    }),
});

// Export hooks
export const { useGetMeQuery, useUpdateProfileMutation, useUploadAvatarMutation, useUpdatePasswordMutation, useForgotPasswordMutation, useResetPasswordMutation } = userApi;
