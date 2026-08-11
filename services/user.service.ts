import { apiClient } from "@/lib/api/axios"

const url = {
    currentUser: "/v1/user/me"
}

export const getCurrentUser = async() => {
    const response = await apiClient.get(url.currentUser)
    console.log(response.data)
    return response.data
}