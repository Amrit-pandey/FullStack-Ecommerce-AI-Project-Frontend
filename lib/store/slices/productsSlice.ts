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
        setProductsLoading(state) {
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
        },
        clearProducts(state) {
            state.products = []
            state.isLoading = false
            state.error = null
        },
        removeProduct(state, action) {
            state.products = state.products.filter((item) => item.id !== action.payload)
        }
    }
})

export const { setErrors, setProducts, setProductsLoading, clearProducts, removeProduct } = productsSlice.actions
export default productsSlice.reducer