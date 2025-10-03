import api from './api';
import { Product } from './store';
import { Address } from './auth';

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: string;
  total_price: string;
}

export interface Order {
  id: number;
  order_number: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  shipping_address: Address;
  total_amount: string;
  shipping_cost: string;
  tax_amount: string;
  final_total: string;
  notes: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface CreateOrderData {
  shipping_address_id: number;
  payment_method: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery';
  notes?: string;
}

export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders/');
    return response.data;
  },

  getOrder: async (id: number): Promise<Order> => {
    const response = await api.get(`/orders/${id}/`);
    return response.data;
  },

  createOrder: async (data: CreateOrderData): Promise<{ message: string; order: Order }> => {
    const response = await api.post('/orders/create/', data);
    return response.data;
  },

  cancelOrder: async (id: number): Promise<{ message: string; order: Order }> => {
    const response = await api.put(`/orders/${id}/cancel/`);
    return response.data;
  },

  getOrderHistory: async (): Promise<Order[]> => {
    const response = await api.get('/orders/history/');
    return response.data;
  },
};
