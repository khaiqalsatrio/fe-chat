import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const useProfile = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState('Hey there! I am using Messenger!'); // Default bio
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setBio(user.bio || 'Hey there! I am using Messenger!');
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('bio', bio);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/users/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      // We should ideally update the AuthContext user here if the backend returns the updated user.
      // Assuming the backend returns the updated user or we just reload the page/refetch user.
      // For now, we will just show success.
      
      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        setSuccess('');
        window.location.reload(); // Quick way to sync context, alternatively use checkAuth() from useAuth
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    bio,
    setBio,
    loading,
    error,
    success,
    handleUpdateProfile,
    user,
    avatarFile,
    setAvatarFile,
    avatarPreview,
    setAvatarPreview
  };
};
