"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  fullName: string;
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
    
    console.log('Loading from localStorage:');
    console.log('Stored token:', storedToken);
    console.log('Stored user:', storedUser);
    
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('Parsed user from localStorage:', parsedUser);
        setToken(storedToken);
        setUser(parsedUser);
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
        // Debug logging
        console.log('Login API response:', response.data);
        
        // Extract tokens from the new structure
        const { tokens, user: loginUserData, username } = response.data;
        
        if (!tokens || !tokens.AccessToken) {
          throw new Error('No access token received from login');
        }
        
        const authToken = tokens.AccessToken;
        
        // Fetch user profile data using the get-user endpoint
        let userProfileData = loginUserData;
        
        try {
          console.log('Fetching user profile data...');
          const userResponse = await axios.get(`${API_BASE}/auth/get-user`, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          
          if (userResponse.status === 200 && userResponse.data) {
            console.log('User profile data:', userResponse.data);
            userProfileData = userResponse.data;
          }
        } catch (getUserError: any) {
          console.warn('Failed to fetch user profile data:', getUserError.response?.data || getUserError.message);
          // If get-user fails, create a basic user object with available data
          userProfileData = {
            id: username || 'unknown',
            email: email,
            fullName: email.split('@')[0] // Use email prefix as fallback
          };
        }
        
        // Ensure user data has required fields
        const finalUserData = {
          id: userProfileData.id || username || 'unknown',
          email: userProfileData.email || email,
          fullName: userProfileData.fullName || userProfileData.name || email.split('@')[0]
        };
        
        console.log('Final user data to store:', finalUserData);
        
        // Store in localStorage
        localStorage.setItem('auth_token', authToken);
        localStorage.setItem('auth_user', JSON.stringify(finalUserData));
        
        // Update state
        setToken(authToken);
        setUser(finalUserData);
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
        // Debug logging
        console.log('Email verification API response:', response.data);
        
        // Extract tokens from the new structure
        const { tokens, user: loginUserData, username } = response.data;
        
        if (!tokens || !tokens.AccessToken) {
          throw new Error('No access token received from email verification');
        }
        
        const authToken = tokens.AccessToken;
        
        // Fetch user profile data using the get-user endpoint
        let userProfileData = loginUserData;
        
        try {
          console.log('Fetching user profile data after email verification...');
          const userResponse = await axios.get(`${API_BASE}/auth/get-user`, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          
          if (userResponse.status === 200 && userResponse.data) {
            console.log('User profile data:', userResponse.data);
            userProfileData = userResponse.data;
          }
        } catch (getUserError: any) {
          console.warn('Failed to fetch user profile data:', getUserError.response?.data || getUserError.message);
          // If get-user fails, create a basic user object with available data
          userProfileData = {
            id: username || 'unknown',
            email: 'verified@user.com', // We don't have email in this context
            fullName: username || 'Verified User'
          };
        }
        
        // Ensure user data has required fields
        const finalUserData = {
          id: userProfileData.id || username || 'unknown',
          email: userProfileData.email || 'verified@user.com',
          fullName: userProfileData.fullName || userProfileData.name || username || 'Verified User'
        };
        
        console.log('Final user data to store after verification:', finalUserData);
        
        // Store in localStorage
        localStorage.setItem('auth_token', authToken);
        localStorage.setItem('auth_user', JSON.stringify(finalUserData));
        
        // Update state
        setToken(authToken);
        setUser(finalUserData);
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
