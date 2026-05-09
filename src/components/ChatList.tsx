import React from 'react';
import { chatListData } from '../data/dummyData';
import './ChatList.css';
import ChatListHeader from './ChatListHeader';
import { Search, Bot, FileText } from 'lucide-react';

interface ChatListProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const ChatList: React.FC<ChatListProps> = ({ toggleSidebar }) => {
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
        <button className="chip">Direct</button>
        <button className="chip">Project</button>
        <button className="chip">Document</button>
      </div>

      <div className="list-container">
        {chatListData.map((item) => (
          <div key={item.id} className={`chat-item ${item.isPinned ? 'pinned' : ''}`}>
            <div className={`item-icon ${item.iconType}`}>
              {item.iconType === 'copilot' ? <Bot size={22} /> : <FileText size={22} />}
            </div>
            <div className="item-content">
              <div className="item-header">
                <span className="item-title">{item.title}</span>
                <span className="item-time">{item.timestamp}</span>
              </div>
              <div className="item-subtitle">
                {item.subtitle}
                {item.status && <span className={`status-tag ${item.statusType}`}>{item.status}</span>}
              </div>
              {item.progress !== undefined && (
                <div className="item-footer">
                   <div className="progress-info">
                      {item.episodesTotal} episode(s) in progress — {item.progress}% overall
                   </div>
                   {item.badgeCount && <span className="item-badge">{item.badgeCount}</span>}
                </div>
              )}
              {item.episodesCompleted !== undefined && item.episodesCompleted === item.episodesTotal && (
                 <div className="item-footer">
                    <div className="completed-info">
                       ✅ All {item.episodesTotal} episodes completed
                    </div>
                 </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
