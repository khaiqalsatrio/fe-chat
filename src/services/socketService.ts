import { io, Socket } from 'socket.io-client';
import { Message } from '../types/Chat';

// Sesuaikan URL jika backend menggunakan prefix /api untuk websocket juga
const BASE_URL = (import.meta.env.VITE_SOCKET_URL as string) || 'http://localhost:4000';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (this.socket) {
      if (this.socket.connected) return this.socket;
      // Jika sudah ada instance tapi belum connected, biarkan dia mencoba connect sendiri
      // (socket.io otomatis melakukan reconnection/initial connection)
      return this.socket;
    }

    const token = localStorage.getItem('token');
    if (!token) return null;

    console.log('Attempting to connect to socket at:', BASE_URL);

    this.socket = io(BASE_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
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

  private messageCallbacks: ((message: Message) => void)[] = [];

  onReceiveMessage(callback: (message: Message) => void) {
    if (!this.socket) this.connect();
    
    this.messageCallbacks.push(callback);
    
    // Set up the socket listener only once
    if (this.messageCallbacks.length === 1) {
      this.socket?.on('receive_message', (data: any) => {
        const message = new Message(data);
        console.log('📨 New message received via socket:', message);
        this.messageCallbacks.forEach(cb => cb(message));
      });
    }
  }

  offReceiveMessage(callback?: (message: Message) => void) {
    if (callback) {
      this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
      if (this.messageCallbacks.length === 0) {
        this.socket?.off('receive_message');
      }
    } else {
      this.messageCallbacks = [];
      this.socket?.off('receive_message');
    }
  }

  // Helper untuk debugging
  isConnected() {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();
