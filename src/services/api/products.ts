
import { api } from '../apiWithFallback';
import { Product, ProductFilter } from '../../types/product';
import { PaginatedResponse } from '../../types/api';

export const productsApi = {
  getAll: (filter?: ProductFilter) => 
    api.get<PaginatedResponse<Product>>('/products', { params: filter }),

  getById: (id: number) => 
    api.get<Product>(`/products/${id}`),

  getFeatured: () => 
    api.get<Product[]>('/products/featured'),

  getByCategory: (category: string) => 
    api.get<Product[]>(`/products/category/${category}`),

  search: (query: string) => 
    api.get<Product[]>('/products/search', { params: { q: query } }),

  getRelated: (id: number) => 
    api.get<Product[]>(`/products/${id}/related`),
};
