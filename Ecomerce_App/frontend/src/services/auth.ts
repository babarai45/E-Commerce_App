import api from './api';

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  date_of_birth?: string;
}

export interface Address {
  id: number;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export const authService = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login/', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register/', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout/');
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile/');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put('/auth/profile/', data);
    return response.data;
  },

  getAddresses: async (): Promise<Address[]> => {
    const response = await api.get('/auth/addresses/');
    return response.data;
  },

  createAddress: async (data: Omit<Address, 'id'>): Promise<Address> => {
    const response = await api.post('/auth/addresses/', data);
    return response.data;
  },

  updateAddress: async (id: number, data: Partial<Address>): Promise<Address> => {
    const response = await api.put(`/auth/addresses/${id}/`, data);
    return response.data;
  },

  deleteAddress: async (id: number): Promise<void> => {
    await api.delete(`/auth/addresses/${id}/`);
  },
};
