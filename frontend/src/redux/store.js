// store.js
import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi.js";
import { authApi } from "./api/authApi.js";
import { userApi } from "./api/userApi.js";
import userReducer from "./featurs/userSlice.js";
import cartReducer from "./featurs/cartSlice.js";


export const store = configureStore({
    reducer: {
        auth: userReducer,
        cart: cartReducer,
        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(authApi.middleware)
            .concat(userApi.middleware),
});
