import { apiClient } from "@/lib/api/axios"

const url = {
    currentUser: "/user/me"
}

export const getCurrentUser = async() => {
    const response = await apiClient.get(url.currentUser)
    return response.data
}