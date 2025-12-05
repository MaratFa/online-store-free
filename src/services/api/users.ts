
import { api } from '../apiWithFallback';
import { User, UserAddress } from '../../types/user';

export const usersApi = {
  getProfile: () => 
    api.get<User>('/users/profile'),

  updateProfile: (userData: Partial<User>) => 
    api.put<User>('/users/profile', userData),

  changePassword: (passwords: { currentPassword: string; newPassword: string }) => 
    api.put('/users/password', passwords),

  getAddresses: () => 
    api.get<UserAddress[]>('/users/addresses'),

  addAddress: (address: Omit<UserAddress, 'id' | 'userId'>) => 
    api.post<UserAddress>('/users/addresses', address),

  updateAddress: (addressId: number, address: Partial<UserAddress>) => 
    api.put<UserAddress>(`/users/addresses/${addressId}`, address),

  deleteAddress: (addressId: number) => 
    api.delete(`/users/addresses/${addressId}`),

  setDefaultAddress: (addressId: number) => 
    api.patch<UserAddress>(`/users/addresses/${addressId}`, { isDefault: true }),
};
