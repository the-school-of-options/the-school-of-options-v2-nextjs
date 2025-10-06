"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<any>;
  verifyEmail: (token: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = "https://api.theschoolofoptions.com/api/v1";

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  // Set up axios interceptor for auth headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200 && response.data) {
        const { token: authToken, user: userData } = response.data;
        
        // Store in localStorage
        localStorage.setItem('auth_token', authToken);
        localStorage.setItem('auth_user', JSON.stringify(userData));
        
        // Update state
        setToken(authToken);
        setUser(userData);
      } else {
        throw new Error(response.data?.error || 'Login failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Login failed';
      throw new Error(errorMessage);
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await axios.post(`${API_BASE}/auth/signup`, userData);
      
      if (response.status !== 200) {
        throw new Error(response.data?.error || 'Registration failed');
      }
      
      return response.data; // Return userId or other registration data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Registration failed';
      throw new Error(errorMessage);
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      const response = await axios.post(`${API_BASE}/auth/verify-email`, {
        token,
      });

      if (response.status === 200 && response.data) {
        const { token: authToken, user: userData } = response.data;
        
        // Store in localStorage
        localStorage.setItem('auth_token', authToken);
        localStorage.setItem('auth_user', JSON.stringify(userData));
        
        // Update state
        setToken(authToken);
        setUser(userData);
      } else {
        throw new Error(response.data?.error || 'Email verification failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Email verification failed';
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    
    // Clear state
    setToken(null);
    setUser(null);
    
    // Clear axios headers
    delete axios.defaults.headers.common['Authorization'];
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await axios.post(`${API_BASE}/auth/forgot-password`, {
        email,
      });

      if (response.status !== 200) {
        throw new Error(response.data?.error || 'Failed to send reset email');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to send reset email';
      throw new Error(errorMessage);
    }
  };

  const resetPassword = async (resetToken: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE}/auth/reset-password`, {
        token: resetToken,
        password,
      });

      if (response.status !== 200) {
        throw new Error(response.data?.error || 'Failed to reset password');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to reset password';
      throw new Error(errorMessage);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    verifyEmail,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
