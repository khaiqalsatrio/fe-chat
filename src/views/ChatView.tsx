import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ChatList from '../components/ChatList';
import ChatArea from '../components/ChatArea';
import { IRoom } from '../types/Chat';
import { useSocket } from '../hooks/useSocket';
import '../assets/css/global/App.css';
import { useChatList } from '../hooks/useChatList';
import { useAuth } from '../context/AuthContext';
import { notificationService } from '../services/notificationService';
import { IMessage } from '../types/Chat';

const ChatView: React.FC = () => {
  const socket = useSocket(); // Initialize socket connection
  const { user } = useAuth();
  const { rooms, loading, refresh } = useChatList();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    // Listen for all messages globally for notifications
    const handleGlobalMessage = (message: IMessage) => {
      const currentUserId = user?.id || (user as any)?.user_id;
      const isMe = currentUserId && message.senderId && String(message.senderId) === String(currentUserId);
      
      // Only notify if:
      // 1. It's not my own message
      // 2. The room is not currently open OR the window is not focused
      console.log('📬 Message received globally:', { 
        from: message.sender?.username, 
        isMe, 
        permission: Notification.permission 
      });

      // Show notification for EVERY message that isn't from me
      if (!isMe) {
        notificationService.notify(message);
      }
      
      // Refresh list to show last message/badge
      refresh();
    };

    socket.onReceiveMessage(handleGlobalMessage);

    return () => {
      socket.offReceiveMessage(handleGlobalMessage);
    };
  }, [socket, user, selectedRoom, refresh]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`App ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
      <Sidebar isOpen={isSidebarOpen} />
      <ChatList
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        onSelectRoom={setSelectedRoom}
        selectedRoomId={selectedRoom?.id || null}
        rooms={rooms}
        loading={loading}
      />
      <ChatArea
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        room={selectedRoom}
        onSelectRoom={setSelectedRoom}
        onRefresh={refresh}
      />
    </div>
  );
};

export default ChatView;
