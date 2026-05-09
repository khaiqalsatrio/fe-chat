import { io, Socket } from 'socket.io-client';
import { Message } from '../types/Chat';

// Sesuaikan URL jika backend menggunakan prefix /api untuk websocket juga
const BASE_URL = (import.meta.env.VITE_SOCKET_URL as string) || 'http://localhost:4000';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (this.socket?.connected) return this.socket;

    const token = localStorage.getItem('token');
    if (!token) return null;

    console.log('Attempting to connect to socket at:', BASE_URL);

    this.socket = io(BASE_URL, {
      auth: { token },
      transports: ['websocket', 'polling'], // Tambahkan polling sebagai fallback
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket Connected! ID:', this.socket?.id);
    });

    this.socket.on('connect_error', (err) => {
      console.error('❌ Socket Connection Error:', err.message);
    });

    this.socket.on('disconnect', (reason) => {
      console.warn('⚠️ Socket Disconnected:', reason);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinRoom(roomId: string) {
    if (!this.socket) this.connect();
    
    // Tunggu sampai connected baru emit
    if (this.socket?.connected) {
      console.log('🚀 Joining room now:', roomId);
      this.socket.emit('join_room', { roomId });
    } else {
      this.socket?.once('connect', () => {
        console.log('🚀 Joining room after late connect:', roomId);
        this.socket?.emit('join_room', { roomId });
      });
    }
  }

  leaveRoom(roomId: string) {
    if (this.socket?.connected) {
      console.log('Leave room:', roomId);
      this.socket.emit('leave_room', { roomId });
    }
  }

  sendMessage(roomId: string, content: string, type: string = 'TEXT') {
    if (!this.socket?.connected) this.connect();
    this.socket?.emit('send_message', { roomId, content, type });
  }

  onReceiveMessage(callback: (message: Message) => void) {
    if (!this.socket) this.connect();
    
    this.socket?.off('receive_message'); // Bersihkan listener lama
    this.socket?.on('receive_message', (data: any) => {
      console.log('📨 New message received via socket:', data);
      callback(new Message(data));
    });
  }

  offReceiveMessage() {
    this.socket?.off('receive_message');
  }

  // Helper untuk debugging
  isConnected() {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();
