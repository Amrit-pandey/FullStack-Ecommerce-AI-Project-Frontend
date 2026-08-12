import { createSlice } from "@reduxjs/toolkit";

interface User {
    id: number,
    full_name: string,
    email: string,
    role: string,
    image_url: string,
    is_active: boolean,
    created_at: string
}

interface AuthState {
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null
}

const initalState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initalState,
    // reducers are the functions which allows us to update the current state based on the actions
    reducers: {
        // state: state is our current AuthState, action: later we will dispatch the action from component
        setUser(state, action) {
            state.user = action.payload
            state.isAuthenticated = true
        }
    }
})

export const { setUser } = authSlice.actions
export default authSlice.reducer