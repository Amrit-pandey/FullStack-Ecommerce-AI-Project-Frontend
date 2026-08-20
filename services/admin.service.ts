import { apiClient } from "@/lib/api/axios"
import { UserActionResponse, UserResponsePayload } from "@/types/user"
import { CreateProductPayload, ProductImageResponse, ProductsResponse } from "@/types/products"

const url = {
    getUsers: "/admin/users",
    deactivateUser: "/admin/user/deactivate",
    activateUser: "/admin/user/activate",
    getAdminProducts: "/admin/products",
    addProduct: "/admin/add_product",
    uploadProductImage: "/upload/product-image"
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

export const getAdminProducts = async(search?: string): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>(url.getAdminProducts, {
        params: {
            ...(search ? { search }: {})
        }
    })
    return response.data
}

export const addProduct = async(payload: CreateProductPayload) => {
    const response = await apiClient.post(url.addProduct, payload)
    return response.data
}

export const productImage = async(file: File | null): Promise<ProductImageResponse | null> => {
    if(!file) return null;
    const formData = new FormData()
    formData.append("file", file)
    const response = await apiClient.post<ProductImageResponse>(url.uploadProductImage, formData)
    return response.data
}

// TODO: 
// 1. add product
// 2. update product
// 3. delete product