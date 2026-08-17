export interface User {
    id: number,
    full_name: string | null,
    email: string,
    role: "admin" | "user",
    image_url: string | null,
    is_active: boolean,
    created_at: string,
    onboarding_status: boolean
}

export interface UserResponsePayload {
    users: User[],
    page: number,
    limit: number,
    total_count: number
}