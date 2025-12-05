
import { api } from '../../../services/apiWithFallback';
import { Cart, CartItem, AddToCartRequest, UpdateCartItemRequest } from '../../../types/cart';

export const cartApi = {
  get: () => 
    api.get<Cart>('/cart'),

  addItem: (request: AddToCartRequest) => 
    api.post<Cart>('/cart/items', request),

  updateItem: (cartItemId: number, request: UpdateCartItemRequest) => 
    api.put<Cart>(`/cart/items/${cartItemId}`, { quantity: request.quantity }),

  removeItem: (cartItemId: number) => 
    api.delete<Cart>(`/cart/items/${cartItemId}`),

  clear: () => 
    api.delete<Cart>('/cart'),

  applyCoupon: (couponCode: string) => 
    api.post<Cart>('/cart/coupon', { couponCode }),

  removeCoupon: () => 
    api.delete<Cart>('/cart/coupon'),
};
