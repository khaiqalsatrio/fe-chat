import React from 'react';
import { Menu, SquarePen, MoreVertical } from 'lucide-react';

interface ChatListHeaderProps {
  title: string;
  onToggleSidebar?: () => void;
}

const ChatListHeader: React.FC<ChatListHeaderProps> = ({ title, onToggleSidebar }) => {
  return (
    <div className="chat-list-header">
      <div className="brand">
        <button className="toggle-sidebar-btn" onClick={onToggleSidebar}>
          <Menu size={20} />
        </button>
        <div className="logo">
          <img src="https://img.icons8.com/color/48/000000/chat.png" alt="logo" width="24" />
        </div>
        <h2 className="font-outfit">{title}</h2>
      </div>
      <div className="header-actions">
        <button className="action-btn"><SquarePen size={18} /></button>
        <button className="action-btn"><MoreVertical size={18} /></button>
      </div>
    </div>
  );
};

export default ChatListHeader;
