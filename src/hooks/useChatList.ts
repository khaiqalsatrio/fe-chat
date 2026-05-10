import { useState, useEffect, useCallback } from 'react';
import { chatService } from '../services/chatService';
import { IRoom } from '../types/Chat';

export const useChatList = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await chatService.getRooms();
      setRooms(data);
    } catch (error) {
      console.error('Failed to fetch rooms', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { rooms, loading, refresh };
};
