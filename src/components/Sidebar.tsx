import React, { useState } from 'react';
import { 
  MessageSquare, 
  BarChart3, 
  LayoutGrid, 
  FileText, 
  Layout, 
  History, 
  Library, 
  Bell, 
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLogout } from '../hooks/useLogout';
import LogoutModal from './LogoutModal';
import '../assets/css/components/Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { handleLogout, loading: isLoggingOut } = useLogout();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <div className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-top">
        <div 
          className={`sidebar-item ${window.location.pathname === '/chat' || window.location.pathname === '/' ? 'active' : ''}`}
          onClick={() => navigate('/chat')}
          style={{ cursor: 'pointer' }}
        >
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
        <div 
          className={`sidebar-item ${window.location.pathname === '/profile' ? 'active' : ''}`}
          onClick={() => navigate('/profile')}
        >
          <span className="sidebar-icon"><User size={20} /></span>
          <span className="sidebar-label">Profile</span>
        </div>
        <div className="sidebar-item badge-container">
          <span className="sidebar-icon"><Bell size={20} /></span>
          <span className="sidebar-label">Notifications</span>
          <span className="sidebar-badge">8</span>
        </div>
      </div>
      
      <div className="sidebar-bottom">
        <div className="sidebar-item" onClick={() => setIsLogoutModalOpen(true)} style={{ cursor: 'pointer' }}>
          <span className="sidebar-icon"><LogOut size={20} /></span>
          <span className="sidebar-label">Logout</span>
        </div>
        <div className="sidebar-item">
          <span className="sidebar-icon"><Settings size={20} /></span>
          <span className="sidebar-label">Settings</span>
        </div>
        <div 
          className="sidebar-avatar-container" 
          onClick={() => navigate('/profile')}
          style={{ cursor: 'pointer' }}
        >
          <div 
            className="sidebar-avatar"
            style={user?.avatarUrl ? { 
              backgroundImage: `url(http://localhost:4000${user.avatarUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'transparent'
            } : undefined}
          >
            {!user?.avatarUrl && (user?.username?.substring(0, 2).toUpperCase() || '??')}
          </div>
          <span className="sidebar-label">{user?.username || 'Guest'}</span>
        </div>
      </div>

      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        isLoading={isLoggingOut}
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleLogout} 
      />
    </div>
  );
};

export default Sidebar;
