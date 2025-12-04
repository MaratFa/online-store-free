import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderAPI } from '../../services/apiWithFallback';

// Async thunks for order operations
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const getOrderById = createAsyncThunk(
  'orders/getOrderById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await orderAPI.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to fetch order');
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: any, { rejectWithValue }) => {
    try {
      const response = await orderAPI.create(orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to create order');
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await orderAPI.update(id, { status: 'cancelled' });
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to cancel order');
    }
  }
);
