import { useEffect } from 'react';
import { socketService } from '../services/socketService';
import { useAuth } from '../context/AuthContext';

export const useSocket = (roomId?: string) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Pastikan terkoneksi
      socketService.connect();
      
      if (roomId) {
        socketService.joinRoom(roomId);
        
        return () => {
          socketService.leaveRoom(roomId);
        };
      }
    }
  }, [user, roomId]);

  // Kita tidak disconnect global di sini agar koneksi tetap persisten
  // Disconnect bisa dilakukan saat user logout di Sidebar.tsx

  return socketService;
};
