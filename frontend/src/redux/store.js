import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/auth";
import { basketResucer } from "./slices/basket";
import { orderResucer } from "./slices/order";


const store = configureStore({
    reducer: {
        auth: usersReducer,
        basket: basketResucer,
        order: orderResucer
    }
});

export default store;