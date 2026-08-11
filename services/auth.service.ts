import { apiClient } from "@/lib/api/axios";

const url = {
    requestOtp: "/v1/auth/request_otp",
    verifyOtp: "/v1/auth/verify_otp",
}
export const requestOtp = async(email:string) => {
    const response = await apiClient.post(url.requestOtp, {email})
    console.log(response.data, "Otp response")
    return response.data
}

export const verifyOtp = async(email:string, otp:string) => {
    const response = await apiClient.post(url.verifyOtp, {email, otp})
    console.log(response, "verify otp response")
    return response.data
}

