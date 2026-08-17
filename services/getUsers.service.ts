import { apiClient } from "@/lib/api/axios"
import { UserResponsePayload } from "@/types/user"

export const getUsers = async(page: number, limit: number, search?: string ): Promise<UserResponsePayload> => {
    const response = await apiClient.get<UserResponsePayload>("/admin/users", {
        params: {
            page,
            limit,
            ...(search ? { search } : {})
        }
    })
    return response.data
}