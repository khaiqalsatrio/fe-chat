import { apiClient } from './apiClient';
import { IMessage, IRoom, Message, Room } from '../types/Chat';

export const chatService = {
  async getRooms(): Promise<IRoom[]> {
    const rooms = await apiClient.get<any[]>('/chats');
    return rooms.map(room => new Room(room));
  },

  async createDirectChat(targetUserId: string): Promise<IRoom> {
    const room = await apiClient.post<any>('/chats/direct', { targetUserId });
    return new Room(room);
  },

  async getMessages(roomId: string, limit?: number, offset?: number): Promise<IMessage[]> {
    let path = `/chats/${roomId}/messages`;
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());
    if (params.toString()) path += `?${params.toString()}`;
    
    const messages = await apiClient.get<any[]>(path);
    return messages.map(msg => new Message(msg));
  },

  async sendMessage(roomId: string, content: string, type: string = 'TEXT'): Promise<IMessage> {
    const message = await apiClient.post<any>(`/chats/${roomId}/messages`, { content, type });
    return new Message(message);
  }
};
