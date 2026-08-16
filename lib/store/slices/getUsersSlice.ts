import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";

interface UserState {
    users: User[],
    isLoading: boolean,
    error: string | null
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: null
}

export const getUsersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload
            state.isLoading = false
            state.error = null
        }
    }
})

export const { setUsers } = getUsersSlice.actions
export default getUsersSlice.reducer