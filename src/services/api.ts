const API_BASE_URL = 'http://localhost:5000/api';

// Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  currentRole?: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  interests: string[];
  skills: Skill[];
  roadmapProgress: RoadmapProgress[];
  assessmentResults: AssessmentResult[];
  isEmailVerified: boolean;
  lastLogin: string;
  createdAt: string;
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  progress: number;
}

export interface RoadmapProgress {
  roadmapId: string;
  roadmapName: string;
  completedSteps: string[];
  currentStep: string;
  progress: number;
  startedAt: string;
  lastUpdated: string;
}

export interface AssessmentResult {
  assessmentId: string;
  assessmentName: string;
  score: number;
  maxScore: number;
  completedAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Helper function to set auth token
const setAuthToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// Helper function to remove auth token
const removeAuthToken = (): void => {
  localStorage.removeItem('token');
};

// Helper function to make API requests
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // Handle 401 errors (unauthorized)
      if (response.status === 401) {
        removeAuthToken();
        window.location.href = '/login';
      }
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  // Sign up
  signup: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.success && response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  // Login
  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.success && response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  // Logout
  logout: async (): Promise<ApiResponse> => {
    try {
      await apiRequest<ApiResponse>('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      removeAuthToken();
    }
    
    return { success: true, message: 'Logged out successfully' };
  },

  // Get current user
  getCurrentUser: async (): Promise<{ success: boolean; user: User }> => {
    return apiRequest<{ success: boolean; user: User }>('/auth/me');
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Reset password
  resetPassword: async (
    resetToken: string,
    password: string
  ): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>(`/auth/reset-password/${resetToken}`, {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
    
    if (response.success && response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },
};

// User API
export const userAPI = {
  // Get user profile
  getProfile: async (): Promise<{ success: boolean; user: User }> => {
    return apiRequest<{ success: boolean; user: User }>('/user/profile');
  },

  // Update user profile
  updateProfile: async (profileData: Partial<User>): Promise<{
    success: boolean;
    message: string;
    user: User;
  }> => {
    return apiRequest<{
      success: boolean;
      message: string;
      user: User;
    }>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Update skills
  updateSkills: async (skills: Skill[]): Promise<{
    success: boolean;
    message: string;
    skills: Skill[];
  }> => {
    return apiRequest<{
      success: boolean;
      message: string;
      skills: Skill[];
    }>('/user/skills', {
      method: 'POST',
      body: JSON.stringify({ skills }),
    });
  },

  // Update roadmap progress
  updateRoadmapProgress: async (progressData: {
    roadmapId: string;
    roadmapName: string;
    completedSteps?: string[];
    currentStep?: string;
    progress?: number;
  }): Promise<{
    success: boolean;
    message: string;
    roadmapProgress: RoadmapProgress[];
  }> => {
    return apiRequest<{
      success: boolean;
      message: string;
      roadmapProgress: RoadmapProgress[];
    }>('/user/roadmap-progress', {
      method: 'POST',
      body: JSON.stringify(progressData),
    });
  },

  // Save assessment result
  saveAssessmentResult: async (result: {
    assessmentId: string;
    assessmentName: string;
    score: number;
    maxScore: number;
  }): Promise<{
    success: boolean;
    message: string;
    assessmentResults: AssessmentResult[];
  }> => {
    return apiRequest<{
      success: boolean;
      message: string;
      assessmentResults: AssessmentResult[];
    }>('/user/assessment-result', {
      method: 'POST',
      body: JSON.stringify(result),
    });
  },

  // Get specific roadmap progress
  getRoadmapProgress: async (roadmapId: string): Promise<{
    success: boolean;
    roadmapProgress: RoadmapProgress;
  }> => {
    return apiRequest<{
      success: boolean;
      roadmapProgress: RoadmapProgress;
    }>(`/user/roadmap-progress/${roadmapId}`);
  },
};

// Utility functions
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const getToken = (): string | null => {
  return getAuthToken();
};

export const clearAuth = (): void => {
  removeAuthToken();
};

// Health check
export const healthCheck = async (): Promise<{
  status: string;
  message: string;
  timestamp: string;
}> => {
  return apiRequest<{
    status: string;
    message: string;
    timestamp: string;
  }>('/health');
}; 