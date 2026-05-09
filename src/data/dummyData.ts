export interface ChatListItem {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  iconType: 'copilot' | 'document' | 'project';
  status?: string;
  statusType?: 'drafting' | 'review' | 'formatting' | 'approved';
  progress?: number;
  episodesTotal?: number;
  episodesCompleted?: number;
  isPinned?: boolean;
  badgeCount?: number;
}

export const chatListData: ChatListItem[] = [
  {
    id: '1',
    title: 'ChatAja Copilot',
    subtitle: 'Welcome to your Document Intelligence Works',
    timestamp: 'Just now',
    iconType: 'copilot',
    isPinned: true,
  },
  {
    id: '2',
    title: 'Memo Standardisasi Pengadaan',
    subtitle: 'Document · Staff SBD',
    timestamp: '2 jam lalu',
    iconType: 'document',
    status: 'drafting',
    statusType: 'drafting',
    progress: 60,
    episodesTotal: 1,
    badgeCount: 1,
  },
  {
    id: '3',
    title: 'Justifikasi Kebutuhan Server Baru',
    subtitle: 'Document · Manager Infrastructure',
    timestamp: '5 jam lalu',
    iconType: 'document',
    status: 'review',
    statusType: 'review',
    episodesTotal: 5,
    episodesCompleted: 5,
  },
  {
    id: '4',
    title: 'PKS Telkom x Starlink Indonesia',
    subtitle: 'Document · Senior Legal Counsel',
    timestamp: '1 hari lalu',
    iconType: 'document',
    status: 'drafting',
    statusType: 'drafting',
    progress: 40,
    episodesTotal: 1,
    badgeCount: 1,
  },
  {
    id: '5',
    title: 'Kebijakan Remote Work Policy 2',
    subtitle: 'Document · VP Human Capital',
    timestamp: '3 hari lalu',
    iconType: 'document',
    status: 'formatting',
    statusType: 'formatting',
    progress: 85,
    episodesTotal: 1,
    badgeCount: 1,
  },
  {
    id: '6',
    title: 'NDE Permohonan Anggaran',
    subtitle: 'Document · VP Strategic Business',
    timestamp: '1 minggu lalu',
    iconType: 'document',
    status: 'approved',
    statusType: 'approved',
    episodesTotal: 4,
    episodesCompleted: 4,
  },
];

export interface FeatureCardData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

export const featureCards: FeatureCardData[] = [
  {
    id: 'chat',
    title: 'Chat Room',
    description: 'Messaging hub untuk private chat, group project, case management, dan direct message dengan tim.',
    icon: '💬',
    color: '#22c55e',
    bgColor: '#f0fdf4',
  },
  {
    id: 'document',
    title: 'Document Room',
    description: 'Buat dan kelola dokumen (memo, kontrak, NDE) dengan AI-assisted wizard dan collaborative editor.',
    icon: '📄',
    color: '#f59e0b',
    bgColor: '#fffbeb',
  },
  {
    id: 'project',
    title: 'Project Room',
    description: 'Kelola proyek dengan WBS view, Gantt chart, milestone tracking, dan AI reschedule.',
    icon: '📁',
    color: '#3b82f6',
    bgColor: '#eff6ff',
  },
  {
    id: 'performance',
    title: 'Performance Room',
    description: 'Executive dashboard untuk monitoring KPI, portfolio health, dan strategic insights real-time.',
    icon: '📈',
    color: '#ef4444',
    bgColor: '#fef2f2',
  },
  {
    id: 'timemachine',
    title: 'Time Machine',
    description: 'Chat room berbasis topik historis untuk analisis tren, lessons learned, dan diskusi strategis tim.',
    icon: '🕒',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
  },
  {
    id: 'library',
    title: 'Library Room',
    description: 'Akses knowledge base, template dokumen, referensi regulasi, dan resource library organisasi.',
    icon: '📚',
    color: '#06b6d4',
    bgColor: '#ecfeff',
  },
];
