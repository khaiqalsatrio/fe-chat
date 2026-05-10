import { useState, useEffect, useRef, useMemo } from 'react';
import { chatService } from '../services/chatService';
import { IMessage } from '../types/Chat';
import { useSocket } from './useSocket';

export const useChatArea = (roomId: string | null) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const socket = useSocket(roomId || undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [sortedMessages]);

  useEffect(() => {
    if (roomId) {
      const fetchMessages = async () => {
        setLoading(true);
        try {
          const data = await chatService.getMessages(roomId);
          setMessages(data);
        } catch (error) {
          console.error('Failed to fetch messages', error);
        } finally {
          setLoading(false);
        }
      };

      fetchMessages();

      socket.onReceiveMessage((message: IMessage) => {
        if (message.roomId === roomId) {
          setMessages(prev => {
            if (prev.find(m => m.id === message.id)) return prev;
            return [...prev, message];
          });
        }
      });

      return () => {
        socket.offReceiveMessage();
      };
    } else {
      setMessages([]);
    }
  }, [roomId, socket]);

  const handleSendMessage = async () => {
    if (!roomId || !inputValue.trim()) return;

    const content = inputValue;
    setInputValue('');

    try {
      socket.sendMessage(roomId, content);
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return {
    messages: sortedMessages,
    inputValue,
    setInputValue,
    loading,
    messagesEndRef,
    handleSendMessage,
    handleKeyPress
  };
};
