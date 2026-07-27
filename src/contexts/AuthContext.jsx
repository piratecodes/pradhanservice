import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchClient } from '@/api/fetchClient';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await fetchClient('/auth/me');
      if (res?.data?.admin) {
        setUser(res.data.admin);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    const handleSessionExpired = () => {
      setUser(null);
      toast.dismiss(); // Clear any "failed to load" developer toasts from components
      toast.error('Your session has expired. Please log in again.', { 
        duration: 5000,
        id: 'session-expired-toast' // Prevent duplicate toasts
      });
    };

    window.addEventListener('session-expired', handleSessionExpired);
    return () => {
      window.removeEventListener('session-expired', handleSessionExpired);
    };
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetchClient('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setUser(null);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-primary text-white text-xl font-bold">
        Loading Pradhan Services...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
