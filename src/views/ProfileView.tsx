import React, { useState, useEffect } from 'react';
import { Camera, User, Mail, Info, ArrowLeft, Check, AlertCircle, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import Sidebar from '../components/Sidebar';
import '../assets/css/views/Profile.css';
import '../assets/css/global/App.css';

const ProfileView: React.FC = () => {
  const navigate = useNavigate();
  const { 
    username, setUsername, 
    email, setEmail, 
    bio, setBio, 
    loading, error, success, 
    handleUpdateProfile,
    user,
    avatarPreview,
    setAvatarPreview,
    setAvatarFile
  } = useProfile();

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={`App ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="profile-container">
        <div className="profile-card">
          <div 
            className="profile-header-banner"
            style={
              (avatarPreview || user?.avatarUrl) ? {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${avatarPreview || `http://localhost:4000${user?.avatarUrl}`})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : undefined
            }
          >
            <button 
              className="btn-back-profile" 
              onClick={() => navigate('/chat')}
              title="Back to Chat"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

          <div className="profile-content">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-large" style={{ backgroundImage: avatarPreview ? `url(${avatarPreview})` : (user?.avatarUrl ? `url(http://localhost:4000${user.avatarUrl})` : 'none'), backgroundSize: 'cover', backgroundPosition: 'center', color: (avatarPreview || user?.avatarUrl) ? 'transparent' : 'inherit' }}>
                {!(avatarPreview || user?.avatarUrl) && (user?.username?.substring(0, 2).toUpperCase() || '??')}
                <div className="profile-avatar-edit" title="Change Avatar" onClick={handleAvatarClick}>
                  <Camera size={16} />
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                />
              </div>
            </div>

            <div className="profile-info-header">
              <h1 className="profile-name">{user?.username || 'User Profile'}</h1>
              <p className="profile-username">@{user?.username?.toLowerCase() || 'username'}</p>
              
              <div className={`profile-status-badge ${user?.status === 'ONLINE' ? 'status-online' : 'status-offline'}`}>
                <span className="status-dot"></span>
                {user?.status || 'OFFLINE'}
              </div>
            </div>

            {success && (
              <div className="profile-alert profile-alert-success">
                <Check size={20} />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="profile-alert profile-alert-error">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile}>
              <div className="profile-grid">
                <h3 className="profile-section-title">Personal Information</h3>
                
                <div className="profile-field">
                  <label className="profile-label">
                    <User size={16} />
                    Username
                  </label>
                  <input 
                    type="text" 
                    className="profile-input" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                  />
                </div>

                <div className="profile-field">
                  <label className="profile-label">
                    <Mail size={16} />
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    className="profile-input" 
                    value={email}
                    disabled
                    placeholder="email@example.com"
                  />
                </div>

                <div className="profile-field full-width">
                  <label className="profile-label">
                    <Info size={16} />
                    Bio
                  </label>
                  <textarea 
                    className="profile-input profile-textarea" 
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <div className="profile-actions">
                <button type="button" className="btn-profile-cancel" onClick={() => navigate('/chat')}>
                  Cancel
                </button>
                <button type="submit" className="btn-profile-save" disabled={loading}>
                  {loading ? (
                    'Saving...'
                  ) : (
                    <>
                      <Save size={18} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
