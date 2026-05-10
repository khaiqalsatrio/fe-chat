import React, { useState, useRef } from 'react';
import { featureCards } from '../data/dummyData';
import FeatureCard from './FeatureCard';
import ChatAreaHeader from './ChatAreaHeader';
import { Wand2, Paperclip, Mic, SendHorizonal, Bot, Lock, Check, CheckCheck, FileText, Image as ImageIcon, X } from 'lucide-react';
import { IRoom } from '../types/Chat';
import { useChatArea } from '../hooks/useChatArea';
import { useAuth } from '../context/AuthContext';
import { chatService } from '../services/chatService';
import { IUser } from '../types/User';
import NewChatModal from './NewChatModal';
import '../assets/css/components/ChatArea.css';

interface ChatAreaProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  room: IRoom | null;
  onSelectRoom: (room: IRoom) => void;
  onRefresh: () => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ isDarkMode, onToggleDarkMode, room, onSelectRoom, onRefresh }) => {
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const roomId = room?.id || null;
  const { user } = useAuth();
  const {
    messages,
    inputValue,
    setInputValue,
    loading,
    messagesEndRef,
    handleSendMessage,
    handleSendFile,
    handleKeyPress
  } = useChatArea(roomId);

  const getRoomName = () => {
    if (!room) return '';
    if (room.name) return room.name;
    const otherParticipant = room.participants?.find(p => p.user_id !== user?.id);
    return otherParticipant?.user?.username || 'Personal Chat';
  };

  const getRoomSubtitle = () => {
    if (!room) return '';
    if (room.type === 'GROUP') return `${room.participants?.length || 0} participants`;
    return 'Direct Chat';
  };

  const formatMessageDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  const handleSelectUser = async (targetUser: IUser) => {
    try {
      const newRoom = await chatService.createDirectChat(targetUser.id);
      onSelectRoom(newRoom);
      onRefresh();
      setIsNewChatModalOpen(false);
    } catch (error) {
      console.error('Failed to create chat', error);
    }
  };

  const onFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setFilePreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendAction = () => {
    if (selectedFile) {
      handleSendFile(selectedFile);
      clearFile();
    } else {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-area">
      <ChatAreaHeader
        title={getRoomName()}
        subtitle={getRoomSubtitle()}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
      />

      <div className="chat-content">
        {!roomId ? (
          <div className="welcome-card">
            <div className="welcome-header">
              <span className="ai-badge">AI Helpdesk</span>
              <span className="timestamp">Just now</span>
            </div>
            <div className="welcome-body">
              <h3>Welcome to Messanger</h3>
              <p className="hint">Select a chat to start messaging or use AI features:</p>

              <div className="feature-grid">
                {featureCards.map(card => (
                  <FeatureCard 
                    key={card.id} 
                    data={card} 
                    onClick={card.id === 'chat' ? () => setIsNewChatModalOpen(true) : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="loading-container">Loading messages...</div>
        ) : (
          <div className="messages-list">
            <div className="encryption-notice">
              <Lock size={12} />
              <span>
                Pesan dan panggilan terenkripsi secara end-to-end. Tidak seorang pun di luar chat ini, termasuk Messanger, yang dapat membaca atau mendengarkannya. <strong>Pelajari selengkapnya</strong>
              </span>
            </div>
            {messages.map((msg) => {
              const currentUserId = user?.id || (user as any)?.user_id;
              const isMe = currentUserId && msg.senderId && String(msg.senderId) === String(currentUserId);

              return (
                <div key={msg.id} className={`message-row ${isMe ? 'sent' : 'received'}`}>
                  {/* Avatar di kiri untuk pesan masuk */}
                  {!isMe && (
                    <div className="message-avatar">
                      <img src={`https://ui-avatars.com/api/?name=${msg.sender?.username || 'User'}&background=random`} alt="avatar" />
                    </div>
                  )}

                  <div className="message-bubble-container">
                    <div className="message-bubble">
                      {msg.type === 'IMAGE' ? (
                        <div className="message-image">
                          <img src={msg.content} alt="sent-file" onClick={() => window.open(msg.content)} />
                        </div>
                      ) : msg.type === 'FILE' ? (
                        <div className="message-file-attachment">
                          <FileText size={20} />
                          <span>File Attachment</span>
                        </div>
                      ) : (
                        <div className="message-text">{msg.content}</div>
                      )}
                      
                      <div className="message-footer">
                        <span className="message-time">{formatMessageDate(msg.createdAt)}</span>
                        {isMe && <CheckCheck size={14} className="message-status" />}
                      </div>
                    </div>
                  </div>

                  {/* Avatar di kanan untuk pesan kita */}
                  {isMe && (
                    <div className="message-avatar">
                      <img src={`https://ui-avatars.com/api/?name=${user?.username || 'Me'}&background=4f46e5&color=fff`} alt="avatar" />
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="input-container">
        {selectedFile && (
          <div className="file-preview-bar">
            {filePreview ? (
              <div className="img-preview">
                <img src={filePreview} alt="preview" />
              </div>
            ) : (
              <div className="doc-preview">
                <FileText size={20} />
                <span>{selectedFile.name}</span>
              </div>
            )}
            <button className="remove-file" onClick={clearFile}><X size={16} /></button>
          </div>
        )}

        <div className="input-wrapper">
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileChange}
          />
          <button className="input-action"><Wand2 size={18} /></button>
          <button className="input-action" onClick={onFileSelectClick}><Paperclip size={18} /></button>
          <button className="input-action"><Mic size={18} /></button>
          <input
            type="text"
            placeholder={roomId ? "Type freely... no judgment here" : "Select a room first"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendAction()}
            disabled={!roomId}
          />
          <button
            className="send-btn"
            onClick={handleSendAction}
            disabled={!roomId || (!inputValue.trim() && !selectedFile)}
          >
            <SendHorizonal size={18} />
          </button>
        </div>
        <p className="input-hint">You can be messy, emotional, or unclear. AI will help you make sense of it.</p>
      </div>

      <NewChatModal 
        isOpen={isNewChatModalOpen} 
        onClose={() => setIsNewChatModalOpen(false)}
        onSelectUser={handleSelectUser}
      />
    </div>
  );
};

export default ChatArea;
