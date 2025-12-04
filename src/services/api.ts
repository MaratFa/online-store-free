
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      window.location.href = '/account';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  getByCategory: (category: string) => api.get(`/products?category=${category}`),
  search: (query: string) => api.get(`/products/search?q=${query}`),
};

export const authAPI = {
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  register: (userData: { name: string; email: string; password: string }) => 
    api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (productId: number, quantity: number) => 
    api.post('/cart', { productId, quantity }),
  updateCartItem: (itemId: string, quantity: number) => 
    api.put(`/cart/${itemId}`, { quantity }),
  removeFromCart: (itemId: string) => api.delete(`/cart/${itemId}`),
  clearCart: () => api.delete('/cart'),
};

export const orderAPI = {
  createOrder: (orderData: any) => api.post('/orders', orderData),
  getOrderHistory: () => api.get('/orders'),
  getOrderById: (id: string) => api.get(`/orders/${id}`),
};

export default api;
