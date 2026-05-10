import React from 'react';
import { useChatList } from '../hooks/useChatList';
import { IRoom } from '../types/Chat';
import '../assets/css/components/ChatList.css';
import ChatListHeader from './ChatListHeader';
import { Search, Bot, FileText, User } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

interface ChatListProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  onSelectRoom: (room: IRoom) => void;
  selectedRoomId: string | null;
  rooms: IRoom[];
  loading: boolean;
}

const ChatList: React.FC<ChatListProps> = ({ toggleSidebar, onSelectRoom, selectedRoomId, rooms, loading }) => {
  const { user } = useAuth();

  const getRoomName = (room: IRoom) => {
    if (room.name) return room.name;
    const otherParticipant = room.participants?.find(p => p.user_id !== user?.id);
    return otherParticipant?.user?.username || 'Personal Chat';
  };

  return (
    <div className="chat-list">
      <ChatListHeader title="Messanger!" onToggleSidebar={toggleSidebar} />

      <div className="search-container">
        <div className="search-bar">
          <span className="search-icon"><Search size={16} /></span>
          <input type="text" placeholder="Ask Meta AI or Search" />
        </div>
      </div>

      <div className="filter-chips">
        <button className="chip active">All</button>
        <button className="chip">Group</button>
        <button className="chip">Project</button>
        <button className="chip">Document</button>
      </div>

      <div className="list-container">
        {loading ? (
          <div className="loading">Loading chats...</div>
        ) : rooms.length === 0 ? (
          <div className="no-chats">No chats yet</div>
        ) : (
          rooms.map((room) => (
            <div
              key={room.id}
              className={`chat-item ${selectedRoomId === room.id ? 'active' : ''}`}
              onClick={() => onSelectRoom(room)}
            >
              <div className="item-icon direct">
                <User size={22} />
              </div>
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">{getRoomName(room)}</span>
                  <span className="item-time">
                    {room.lastMessage ? new Date(room.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>
                <div className="item-subtitle">
                  {room.lastMessage?.content || 'No messages yet'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
