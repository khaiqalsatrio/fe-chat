import React from 'react';
import { FeatureCardData } from '../data/dummyData';
import { MessageSquare, FileText, Folder, BarChart3, History, BookOpen } from 'lucide-react';
import './FeatureCard.css';

interface Props {
  data: FeatureCardData;
}

const iconMap: Record<string, React.ReactNode> = {
  '💬': <MessageSquare size={24} />,
  '📄': <FileText size={24} />,
  '📁': <Folder size={24} />,
  '📈': <BarChart3 size={24} />,
  '🕒': <History size={24} />,
  '📚': <BookOpen size={24} />,
};

const FeatureCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon" style={{ backgroundColor: data.bgColor, color: data.color }}>
        {iconMap[data.icon] || data.icon}
      </div>
      <div className="feature-content">
        <h3>{data.title}</h3>
        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
