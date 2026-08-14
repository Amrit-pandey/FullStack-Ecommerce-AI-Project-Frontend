import { apiClient } from "@/lib/api/axios";

const url = {
    requestOtp: "/auth/request_otp",
    verifyOtp: "/auth/verify_otp",
    logout: "/auth/logout"
}
export const requestOtp = async(email:string) => {
    const response = await apiClient.post(url.requestOtp, {email})
    return response.data
}

export const verifyOtp = async(email:string, otp:string) => {
    const response = await apiClient.post(url.verifyOtp, {email, otp})
    return response.data
}

export const logout = async() => {
    const response = await apiClient.post(url.logout)
    return response.data
}

