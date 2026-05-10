import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { socketService } from '../services/socketService';

export const useLogout = () => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      socketService.disconnect();
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
      setLoading(false);
    }
  };

  return { handleLogout, loading };
};
