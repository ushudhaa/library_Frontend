import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      console.log('Login response:', response.data); // Debug log
      
      // Handle the backend response structure: { success: true, data: { user, token } }
      const { data } = response.data;
      
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }
      if (data?.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
      
      return data; // Return { user, token }
    } catch (error) {
      console.error('Login error:', error.response?.data); // Debug log
      throw error;
    }
  };

  const register = async (payload) => {
    try {
      const response = await api.post('/auth/register', payload);
      console.log('Register response:', response.data); // Debug log
      
      // Handle the backend response structure
      const { data } = response.data;
      
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }
      if (data?.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
      
      return data;
    } catch (error) {
      console.error('Register error:', error.response?.data); // Debug log
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const isLibrarian = () => {
    return user?.role === 'librarian';
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLibrarian,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
