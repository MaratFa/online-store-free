import { api } from '../../../services/apiWithFallback';
import { Product } from '../../../types/product';

export const productsApi = {
  getAll: () => api.get<Product[]>('/products'),
  getById: (id: number) => api.get<Product>(`/products/${id}`),
  getByCategory: (category: string) => api.get<Product[]>(`/products?category=${category}`),
  search: (query: string) => api.get<Product[]>(`/products?search=${query}`),
};