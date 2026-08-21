export interface Product {
    id: number,
    title: string,
    description: string | null,
    image_url: string | null,
    price: number,
    in_stock: boolean,
    stock_quantity: number,
    created_at: string
}

export interface ProductsResponse {
  message: string
  products: Product[]
}

export interface CreateProductPayload {
    title: string;
    description: string | null;
    image_url: string | null;
    price: number;
    in_stock: boolean;
    stock_quantity: number;
}

export interface UpdateProductPayload {
    title: string;
    description: string | null;
    image_url: string | null;
    price: number;
    in_stock: boolean;
    stock_quantity: number;
}

export interface UpdatedProductResponse {
    message: string;
    product: Product
}

export interface DeleteProductResponse {
    message: string;
    product_id: number
}

export interface ProductImageResponse {
    message: string
    image_url: string
}