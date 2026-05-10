import { apiClient } from './apiClient';
import { IUser } from '../types/User';

export const userService = {
  async getAllUsers(): Promise<IUser[]> {
    return await apiClient.get<IUser[]>('/users');
  },

  async searchUsers(query: string): Promise<IUser[]> {
    return await apiClient.get<IUser[]>(`/users/search?q=${query}`);
  }
};
