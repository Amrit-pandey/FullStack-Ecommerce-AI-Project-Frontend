import { apiClient } from "@/lib/api/axios"
import { User } from "@/lib/store/slices/authSlice"

export const getUsers = async() => {
    const response = await apiClient.get<User[]>("/admin/users")
    return response.data
}