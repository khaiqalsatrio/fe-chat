import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ChatList from '../components/ChatList';
import ChatArea from '../components/ChatArea';
import { IRoom } from '../types/Chat';
import { useSocket } from '../hooks/useSocket';
import '../assets/css/global/App.css';
import { useChatList } from '../hooks/useChatList';

const ChatView: React.FC = () => {
  useSocket(); // Initialize socket connection
  const { rooms, loading, refresh } = useChatList();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

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
