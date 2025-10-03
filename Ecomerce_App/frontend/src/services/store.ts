import api from './api';

export interface Category {
  id: number;
  name: string;
  description: string;
  image?: string;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: Category;
  stock_quantity: number;
  image?: string;
  is_active: boolean;
  average_rating: number;
  is_in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ProductDetail extends Product {
  images: Array<{
    id: number;
    image: string;
    alt_text: string;
  }>;
  reviews: Review[];
}

export interface ProductFilters {
  category?: number;
  search?: string;
  ordering?: string;
  page?: number;
}

export interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

export const storeService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/store/categories/');
    return response.data;
  },

  getProducts: async (filters?: ProductFilters): Promise<ProductListResponse> => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.ordering) params.append('ordering', filters.ordering);
    if (filters?.page) params.append('page', filters.page.toString());

    const response = await api.get(`/store/products/?${params.toString()}`);
    return response.data;
  },

  getProduct: async (id: number): Promise<ProductDetail> => {
    const response = await api.get(`/store/products/${id}/`);
    return response.data;
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    const response = await api.get('/store/featured/');
    return response.data;
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await api.get(`/store/search/?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  getProductReviews: async (productId: number): Promise<Review[]> => {
    const response = await api.get(`/store/products/${productId}/reviews/`);
    return response.data;
  },

  createReview: async (productId: number, data: { rating: number; comment: string }): Promise<Review> => {
    const response = await api.post(`/store/products/${productId}/reviews/`, data);
    return response.data;
  },
};
