import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const apiClient = axios.create({
    baseURL: "/api/v1",
    timeout: 10000,
    withCredentials: true
})
let isRefreshing = false
let refreshPromise: Promise<void> | null = null

const refreshAccessToken = async() => {
    await axios.post("/api/v1/auth/refresh", {}, {withCredentials: true})
}
apiClient.interceptors.response.use(
    (response) => {
        return response
    },
    async(error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean
        };
        if(
            error.response?.status !== 401 ||
            originalRequest?._retry ||
            originalRequest?.url?.includes("/refresh")
        ) {
            return Promise.reject(error)
        }
        originalRequest._retry = true;

        try {
            if (!isRefreshing) {
                isRefreshing = true;

                refreshPromise = refreshAccessToken().finally(() => {
                    isRefreshing = false;
                    refreshPromise = null;
                });
            }

            await refreshPromise;

            return apiClient(originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
)