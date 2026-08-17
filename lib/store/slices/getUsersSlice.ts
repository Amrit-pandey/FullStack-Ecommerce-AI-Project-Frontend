import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserResponsePayload } from "@/types/user";

interface UserState {
    users: User[],
    page: number;
    limit: number;
    total_count: number;
    isLoading: boolean,
    error: string | null
}

const initialState: UserState = {
    users: [],
    page: 1,
    limit: 10,
    total_count: 0,
    isLoading: false,
    error: null
}

export const getUsersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        fetchUsers(state) {
            state.isLoading = true;
            state.error = null;
        },
        setUsers(state, action: PayloadAction<UserResponsePayload>) {
            state.users = action.payload.users;
            state.page = action.payload.page;
            state.limit = action.payload.limit;
            state.total_count = action.payload.total_count;
            state.isLoading = false;
            state.error = null;
        },
        setErrors(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        toggleUserStatus(state, action: PayloadAction<{userId: number, isActive: boolean}>) {
            const userIndex = state.users.findIndex((u) => u.id === action.payload.userId)
            if(userIndex !== -1) {
                state.users[userIndex].is_active = action.payload.isActive
            }
        }
        
    }
})

export const { fetchUsers, setUsers, setErrors, toggleUserStatus } = getUsersSlice.actions
export default getUsersSlice.reducer