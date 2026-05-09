import React from 'react';
import { featureCards } from '../data/dummyData';
import FeatureCard from './FeatureCard';
import ChatAreaHeader from './ChatAreaHeader';
import { Wand2, Paperclip, Mic, SendHorizonal } from 'lucide-react';
import './ChatArea.css';

interface ChatAreaProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <div className="chat-area">
      <ChatAreaHeader
        title="# Messanger Copilot"
        subtitle="Project Channel"
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
      />

      <div className="chat-content">
        <div className="welcome-card">
          <div className="welcome-header">
            <span className="ai-badge">AI Helpdesk</span>
            <span className="timestamp">Just now</span>
          </div>
          <div className="welcome-body">
            <h3>Welcome to Messanger</h3>
            <p className="hint">Here's what you can do:</p>

            <div className="feature-grid">
              {featureCards.map(card => (
                <FeatureCard key={card.id} data={card} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="input-container">
        <div className="input-wrapper">
          <button className="input-action"><Wand2 size={18} /></button>
          <button className="input-action"><Paperclip size={18} /></button>
          <button className="input-action"><Mic size={18} /></button>
          <input type="text" placeholder="Type freely... no judgment here" />
          <button className="send-btn"><SendHorizonal size={18} /></button>
        </div>
        <p className="input-hint">You can be messy, emotional, or unclear. AI will help you make sense of it.</p>
      </div>
    </div>
  );
};

export default ChatArea;
