import { User } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    isInitialized: boolean,
    error: string | null
}

const initalState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isInitialized: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initalState,
    // reducers are the functions which allows us to update the current state based on the actions
    reducers: {
        startAuthCheck(state) {
            state.isLoading = true
            state.error = null
        },
        // state: state is our current AuthState, action: later we will dispatch the action from component
        setUser(state, action) {
            state.user = action.payload
            state.isAuthenticated = true
            state.isInitialized = true
            state.isLoading = false
            state.error = null
        },
        clearUser(state) {
            state.user = null
            state.isAuthenticated = false
            state.isInitialized = true
            state.isLoading = false
        }
    }
})

export const { startAuthCheck ,setUser, clearUser } = authSlice.actions
export default authSlice.reducer