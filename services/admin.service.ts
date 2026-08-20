import { apiClient } from "@/lib/api/axios"
import { User, UserActionResponse, UserResponsePayload } from "@/types/user"

const url = {
    getUsers: "/admin/users",
    deactivateUser: "/admin/user/deactivate",
    activateUser: "/admin/user/activate"
}

export const getUsers = async(page: number, limit: number, search?: string ): Promise<UserResponsePayload> => {
    const response = await apiClient.get<UserResponsePayload>(url.getUsers, {
        params: {
            page,
            limit,
            ...(search ? { search } : {})
        }
    })
    return response.data
}

export const deactivateUser = async(id: number): Promise<UserActionResponse> => {
    const response = await apiClient.post<UserActionResponse>(url.deactivateUser, {id})
    return response.data
}

export const activateUser = async(id: number): Promise<UserActionResponse> => {
    const response = await apiClient.post<UserActionResponse>(url.activateUser, {id})
    return response.data
}