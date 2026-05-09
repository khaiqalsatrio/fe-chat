import { apiClient } from './apiClient';
import { IMessage, IRoom } from '../types/Chat';

export const chatService = {
  async getRooms(): Promise<IRoom[]> {
    return await apiClient.get<IRoom[]>('/chat/rooms');
  },

  async getMessages(roomId: string): Promise<IMessage[]> {
    return await apiClient.get<IMessage[]>(`/chat/rooms/${roomId}/messages`);
  },

  async sendMessage(roomId: string, content: string, type: string): Promise<IMessage> {
    return await apiClient.post<IMessage>(`/chat/rooms/${roomId}/messages`, { content, type });
  }
};
