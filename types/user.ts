export interface User {
    id: number,
    full_name: string,
    email: string,
    role: string,
    image_url: string,
    is_active: boolean,
    created_at: string,
    onboarding_status: boolean
}