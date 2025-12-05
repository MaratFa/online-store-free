
import { createAsyncThunk } from '@reduxjs/toolkit';
import { cartApi } from '../services/cartApi';
import { Cart } from '../../../types/cart';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartApi.get();
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch cart';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ cartItemId, quantity }: { cartItemId: number; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await cartApi.updateItem(cartItemId, { cartItemId, quantity });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update cart item';
      return rejectWithValue(errorMessage);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (cartItemId: number, { rejectWithValue }) => {
    try {
      await cartApi.removeItem(cartItemId);
      return cartItemId;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to remove cart item';
      return rejectWithValue(errorMessage);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await cartApi.clear();
      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to clear cart';
      return rejectWithValue(errorMessage);
    }
  }
);
