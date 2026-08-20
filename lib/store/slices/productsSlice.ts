import { Product, ProductsResponse } from "@/types/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
    products: Product[],
    isLoading: boolean,
    error: string | null
}
const initialState: ProductState = {
    products: [],
    isLoading: false,
    error: null
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        fetchProducts(state) {
            state.isLoading = true;
            state.error = null;
        },
        setProducts(state, action: PayloadAction<ProductsResponse>) {
            state.products = action.payload.products;
            state.isLoading = false;
            state.error = null;
        },
        setErrors(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const { setErrors, setProducts, fetchProducts } = productsSlice.actions
export default productsSlice.reducer