import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authAPI, userAPI, isAuthenticated } from '../services/supabaseApi';
import { Profile } from '@/lib/supabase';

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (userData: { firstName: string; lastName: string; email: string; password: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message?: string }>;
  resetPassword: (newPassword: string) => Promise<{ success: boolean; message?: string }>;
  updateProfile: (profileData: Partial<Profile>) => Promise<{ success: boolean; message?: string }>;
  refreshUser: () => Promise<void>;
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
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        if (authenticated) {
          const response = await authAPI.getCurrentUser();
          if (response.success && response.user) {
            setUser(response.user);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authAPI.login({ email, password });
      
      if (response.success && response.user) {
        setUser(response.user);
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.message || 'Login failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: { firstName: string; lastName: string; email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await authAPI.signup(userData);
      
      if (response.success && response.user) {
        setUser(response.user);
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Signup failed' };
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        message: error.message || 'Signup failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await authAPI.forgotPassword(email);
      return { 
        success: response.success, 
        message: response.message || 'Password reset email sent' 
      };
    } catch (error: any) {
      console.error('Forgot password error:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to send reset email' 
      };
    }
  };

  const resetPassword = async (newPassword: string) => {
    try {
      setLoading(true);
      const response = await authAPI.resetPassword(newPassword);
      
      if (response.success) {
        // Refresh user data after password reset
        const userResponse = await authAPI.getCurrentUser();
        if (userResponse.success && userResponse.user) {
          setUser(userResponse.user);
        }
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Password reset failed' };
      }
    } catch (error: any) {
      console.error('Reset password error:', error);
      return { 
        success: false, 
        message: error.message || 'Password reset failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<Profile>) => {
    try {
      if (!user) {
        return { success: false, message: 'No user logged in' };
      }

      const response = await userAPI.updateProfile(user.id, profileData);
      
      if (response.success && response.user) {
        setUser(response.user);
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message || 'Profile update failed' };
      }
    } catch (error: any) {
      console.error('Update profile error:', error);
      return { 
        success: false, 
        message: error.message || 'Profile update failed' 
      };
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      if (response.success && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Refresh user error:', error);
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 