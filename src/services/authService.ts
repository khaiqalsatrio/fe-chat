import { apiClient } from './apiClient';
import { IUser } from '../types/User';

interface AuthResponse {
  user: IUser;
  access_token: string;
}

export const authService = {
  async login(email: string, password: string): Promise<IUser> {
    const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    if (response.access_token) {
      localStorage.setItem('token', response.access_token);
    }
    return response.user;
  },

  async register(userData: any): Promise<IUser> {
    const response = await apiClient.post<IUser>('/auth/register', userData);
    return response;
  },

  async getCurrentUser(): Promise<IUser> {
    return await apiClient.get<IUser>('/auth/me');
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout API failed', error);
    } finally {
      localStorage.removeItem('token');
    }
  }
};
