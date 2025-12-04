
import { createAsyncThunk } from '@reduxjs/toolkit';
import { productAPI } from '../../services/apiWithFallback';

// Async thunks for product-related operations
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await productAPI.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to fetch product');
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await productAPI.getByCategory(category);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to fetch products by category');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await productAPI.search(query);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to search products');
    }
  }
);
