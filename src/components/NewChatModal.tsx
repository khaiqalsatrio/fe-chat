import React, { useState, useEffect } from 'react';
import { X, Search, UserPlus, MessageCircle, Loader2 } from 'lucide-react';
import { userService } from '../services/userService';
import { IUser } from '../types/User';
import '../assets/css/components/NewChatModal.css';

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (user: IUser) => void;
}

const NewChatModal: React.FC<NewChatModalProps> = ({ isOpen, onClose, onSelectUser }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(searchQuery);
    }, 300); // Debounce search

    return () => clearTimeout(timer);
  }, [searchQuery, isOpen]);

  const fetchUsers = async (query: string = '') => {
    setLoading(true);
    try {
      const data = query.trim() 
        ? await userService.searchUsers(query)
        : await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  // Remove client-side filtering since we now use API
  const filteredUsers = users;

  if (!isOpen) return null;

  return (
    <div className="new-chat-overlay" onClick={onClose}>
      <div className="new-chat-content" onClick={(e) => e.stopPropagation()}>
        <div className="new-chat-header">
          <div className="header-title">
            <div className="icon-badge">
              <UserPlus size={20} />
            </div>
            <div>
              <h2>New Conversation</h2>
              <p>Start a new chat with your team members</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div className="user-list-container">
          {loading ? (
            <div className="loading-state">
              <Loader2 size={32} className="spinner" />
              <p>Finding team members...</p>
            </div>
          ) : filteredUsers.length > 0 ? (
            <div className="user-list">
              {filteredUsers.map(user => (
                <div key={user.id} className="user-item" onClick={() => onSelectUser(user)}>
                  <div className="user-avatar-wrapper">
                    <img src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} alt={user.username} />
                    <div className="online-indicator"></div>
                  </div>
                  <div className="user-info">
                    <h4>{user.username}</h4>
                    <p>{user.email}</p>
                  </div>
                  <button className="start-chat-btn">
                    <MessageCircle size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={48} opacity={0.2} />
              <p>No users found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
        
        <div className="new-chat-footer">
          <button className="btn-cancel-new" onClick={onClose}>Cancel</button>
          <button className="btn-create-group">Create Group Chat</button>
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
