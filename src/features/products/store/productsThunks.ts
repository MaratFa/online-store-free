import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../services/apiWithFallback';
import { Product, ProductFilter } from '../../../types/product';
import { PaginatedResponse } from '../../../types/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ filter, page }: { filter: ProductFilter; page: number }) => {
    const params = new URLSearchParams();
    
    if (filter.category) params.set('category', filter.category);
    if (filter.minPrice) params.set('minPrice', filter.minPrice.toString());
    if (filter.maxPrice) params.set('maxPrice', filter.maxPrice.toString());
    if (filter.rating) params.set('rating', filter.rating.toString());
    if (filter.inStock) params.set('inStock', 'true');
    if (filter.featured) params.set('featured', 'true');
    if (filter.search) params.set('search', filter.search);
    
    params.set('page', page.toString());
    
    const response = await api.get<PaginatedResponse<Product>>(`/products?${params.toString()}`);
    return {
      products: response.data.data,
      totalPages: response.data.totalPages,
      currentPage: page,
    };
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  }
);

export const addToCart = createAsyncThunk(
  'products/addToCart',
  async ({ productId, quantity }: { productId: number; quantity: number }) => {
    const response = await api.post('/cart/items', { productId, quantity });
    return response.data;
  }
);