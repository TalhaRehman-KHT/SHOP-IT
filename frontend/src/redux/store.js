// store.js
import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi.js";
import { authApi } from "./api/authApi.js";
import { userApi } from "./api/userApi.js";
import userReducer from "./featurs/userSlice.js";
<<<<<<< HEAD
import cartReducer from "./featurs/cartSlice.js";
import { orderApi } from "./api/orderApi.js";

=======
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12

export const store = configureStore({
    reducer: {
        auth: userReducer,
<<<<<<< HEAD
        cart: cartReducer,
        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,

=======
        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(authApi.middleware)
<<<<<<< HEAD
            .concat(userApi.middleware)
            .concat(orderApi.middleware),
=======
            .concat(userApi.middleware),
>>>>>>> 4354a0232f468d175a7f82fdd94a9b462744fe12
});
