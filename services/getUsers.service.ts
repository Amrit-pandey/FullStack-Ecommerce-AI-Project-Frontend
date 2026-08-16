import { apiClient } from "@/lib/api/axios"
import { User } from "@/types/user"
interface GetUsersResponse {
    users: User[]
}

export const getUsers = async(): Promise<GetUsersResponse> => {
    const response = await apiClient.get<GetUsersResponse>("/admin/users")
    return response.data
}