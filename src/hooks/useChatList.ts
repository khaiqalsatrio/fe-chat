import { useState, useEffect } from 'react';
import { chatService } from '../services/chatService';
import { IRoom } from '../types/Chat';

export const useChatList = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await chatService.getRooms();
        setRooms(data);
      } catch (error) {
        console.error('Failed to fetch rooms', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return { rooms, loading };
};
