import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import getUsersReducer from "./slices/getUsersSlice"
import productsReducer from "./slices/productsSlice"


export const store = configureStore({
    reducer: {
        auth: authReducer,
        getUsers: getUsersReducer,
        products: productsReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;