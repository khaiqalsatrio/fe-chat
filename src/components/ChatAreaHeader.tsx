import React from 'react';
import { Maximize2, Moon, Sun } from 'lucide-react';

interface ChatAreaHeaderProps {
  title: string;
  subtitle: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const ChatAreaHeader: React.FC<ChatAreaHeaderProps> = ({ 
  title, 
  subtitle, 
  isDarkMode, 
  onToggleDarkMode 
}) => {
  return (
    <div className="chat-header">
      <div className="chat-info">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="header-actions">
        <button className="action-btn" onClick={onToggleDarkMode} title="Toggle Dark Mode">
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="action-btn"><Maximize2 size={18} /></button>
      </div>
    </div>
  );
};

export default ChatAreaHeader;
