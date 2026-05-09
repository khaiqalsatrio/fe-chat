import React from 'react';
import { 
  MessageSquare, 
  BarChart3, 
  LayoutGrid, 
  FileText, 
  Layout, 
  History, 
  Library, 
  Bell, 
  Settings 
} from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-top">
        <div className="sidebar-item active">
          <span className="sidebar-icon"><MessageSquare size={20} /></span>
          <span className="sidebar-label">Chats</span>
        </div>
        <div className="sidebar-item">
          <span className="sidebar-icon"><BarChart3 size={20} /></span>
          <span className="sidebar-label">Analytics</span>
        </div>
        <div className="sidebar-item">
          <span className="sidebar-icon"><LayoutGrid size={20} /></span>
          <span className="sidebar-label">Apps</span>
        </div>
        <div className="sidebar-item">
          <span className="sidebar-icon"><FileText size={20} /></span>
          <span className="sidebar-label">Documents</span>
        </div>
        <div className="sidebar-item">
          <span className="sidebar-icon"><Layout size={20} /></span>
          <span className="sidebar-label">Workspace</span>
        </div>
      </div>
      
      <div className="sidebar-middle">
        <div className="sidebar-item">
          <span className="sidebar-icon"><History size={20} /></span>
          <span className="sidebar-label">History</span>
        </div>
        <div className="sidebar-item">
          <span className="sidebar-icon"><Library size={20} /></span>
          <span className="sidebar-label">Library</span>
        </div>
        <div className="sidebar-item pink">
          <span className="sidebar-icon"><FileText size={20} /></span>
          <span className="sidebar-label">Saved</span>
        </div>
        <div className="sidebar-item badge-container">
          <span className="sidebar-icon"><Bell size={20} /></span>
          <span className="sidebar-label">Notifications</span>
          <span className="sidebar-badge">8</span>
        </div>
      </div>
      
      <div className="sidebar-bottom">
        <div className="sidebar-item">
          <span className="sidebar-icon"><Settings size={20} /></span>
          <span className="sidebar-label">Settings</span>
        </div>
        <div className="sidebar-avatar-container">
          <div className="sidebar-avatar">DA</div>
          <span className="sidebar-label">Daffa Adli</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
