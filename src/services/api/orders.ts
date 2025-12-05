
import { api } from '../apiWithFallback';
import { Order, CreateOrderRequest } from '../../types/order';
import { PaginatedResponse } from '../../types/api';

export const ordersApi = {
  getAll: (page: number = 1) => 
    api.get<PaginatedResponse<Order>>('/orders', { params: { page } }),

  getById: (id: number) => 
    api.get<Order>(`/orders/${id}`),

  create: (orderData: CreateOrderRequest) => 
    api.post<Order>('/orders', orderData),

  cancel: (id: number) => 
    api.patch<Order>(`/orders/${id}`, { status: 'cancelled' }),

  track: (id: number) => 
    api.get(`/orders/${id}/track`),
};
