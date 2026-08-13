import { apiClient } from "@/lib/api/axios"

const url = {
    currentUser: "/user/me",
    upload_image: "/uploads/profile-image",
    onboarding: "/user/onboarding"
}

export const getCurrentUser = async() => {
    const response = await apiClient.get(url.currentUser)
    return response.data
}

export const upload_image = async(file: File | null) => {
    if(!file) return null;
    const formData = new FormData()
    formData.append("file", file)
    const response = await apiClient.post(url.upload_image, formData)
    return response.data
}

export const onboarding = async(fullName: string) => {
    const response = await apiClient.post(url.onboarding, {full_name: fullName})
    return response.data
}