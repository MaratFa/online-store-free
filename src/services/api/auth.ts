
import { api } from '../apiWithFallback';
import { LoginRequest, RegisterRequest, AuthResponse } from '../../types/user';

export const authApi = {
  login: (credentials: LoginRequest) => 
    api.post<AuthResponse>('/auth/login', credentials),

  register: (userData: RegisterRequest) => 
    api.post<AuthResponse>('/auth/register', userData),

  logout: () => 
    api.post('/auth/logout'),

  refreshToken: () => 
    api.post('/auth/refresh'),

  verifyToken: (token: string) => 
    api.post('/auth/verify', { token }),
};
