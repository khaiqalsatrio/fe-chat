import { apiClient } from './apiClient';
import { User, IUser } from '../types/User';

interface AuthResponse {
  user: IUser;
  access_token: string;
}

export const authService = {
  async login(email: string, password: string): Promise<IUser> {
    const response = await apiClient.post<any>('/auth/login', { email, password });
    if (response.access_token) {
      localStorage.setItem('token', response.access_token);
    }
    return new User(response.user);
  },

  async register(userData: any): Promise<IUser> {
    const response = await apiClient.post<any>('/auth/register', userData);
    return new User(response);
  },

  async getCurrentUser(): Promise<IUser> {
    const data = await apiClient.get<any>('/auth/me');
    return new User(data);
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
