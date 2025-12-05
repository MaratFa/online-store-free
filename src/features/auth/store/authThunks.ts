
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import { tokenService } from '../services/tokenService';
import { LoginRequest, RegisterRequest } from '../../../types/user';
import { loginStart, loginSuccess, loginFailure } from './authSlice';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      const { user, token } = response.data;

      // Save token to localStorage
      tokenService.set(token);

      return { user, token };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);
      const { user, token } = response.data;

      // Save token to localStorage
      tokenService.set(token);

      return { user, token };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always remove token from localStorage
      tokenService.remove();
    }
  }
);
