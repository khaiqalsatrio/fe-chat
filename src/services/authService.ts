import { apiClient } from './apiClient';
import { IUser } from '../types/User';

interface AuthResponse {
  user: IUser;
  token: string;
}

export const authService = {
  async login(username: string, password: string): Promise<IUser> {
    const response = await apiClient.post<AuthResponse>('/auth/login', { username, password });
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response.user;
  },

  async register(userData: any): Promise<IUser> {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData);
    return response.user;
  },

  async getCurrentUser(): Promise<IUser> {
    return await apiClient.get<IUser>('/auth/me');
  },

  logout(): void {
    localStorage.removeItem('token');
  }
};
