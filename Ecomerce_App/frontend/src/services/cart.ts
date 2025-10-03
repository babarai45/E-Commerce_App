import api from './api';
import { Product } from './store';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  total_price: string;
  added_at: string;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total_items: number;
  total_price: string;
  created_at: string;
  updated_at: string;
}

export interface AddToCartData {
  product_id: number;
  quantity: number;
}

export const cartService = {
  getCart: async (): Promise<Cart> => {
    const response = await api.get('/cart/');
    return response.data;
  },

  addToCart: async (data: AddToCartData): Promise<{ message: string; cart_item: CartItem }> => {
    const response = await api.post('/cart/add/', data);
    return response.data;
  },

  updateCartItem: async (itemId: number, quantity: number): Promise<{ message: string; cart_item: CartItem }> => {
    const response = await api.put(`/cart/items/${itemId}/update/`, { quantity });
    return response.data;
  },

  removeFromCart: async (itemId: number): Promise<{ message: string }> => {
    const response = await api.delete(`/cart/items/${itemId}/remove/`);
    return response.data;
  },

  clearCart: async (): Promise<{ message: string }> => {
    const response = await api.delete('/cart/clear/');
    return response.data;
  },
};
