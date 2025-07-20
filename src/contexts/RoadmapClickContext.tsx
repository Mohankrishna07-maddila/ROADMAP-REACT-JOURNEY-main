import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface RoadmapClickContextType {
  clickCounts: Record<string, number>;
  incrementClick: (roadmapPath: string) => boolean; // Returns true if counted, false if not authenticated or already counted
  getClickCount: (roadmapPath: string) => number;
  isAuthenticated: boolean;
  hasUserClicked: (roadmapPath: string) => boolean; // Check if current user has already clicked this roadmap
}

const RoadmapClickContext = createContext<RoadmapClickContextType | undefined>(undefined);

export const useRoadmapClicks = () => {
  const context = useContext(RoadmapClickContext);
  if (context === undefined) {
    throw new Error('useRoadmapClicks must be used within a RoadmapClickProvider');
  }
  return context;
};

interface RoadmapClickProviderProps {
  children: ReactNode;
}

export const RoadmapClickProvider: React.FC<RoadmapClickProviderProps> = ({ children }) => {
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
  const [userClicks, setUserClicks] = useState<Record<string, string[]>>({}); // roadmapPath -> array of user IDs
  const { isAuthenticated, user } = useAuth();

  // Load click counts and user clicks from localStorage on mount
  useEffect(() => {
    const savedCounts = localStorage.getItem('roadmapClickCounts');
    const savedUserClicks = localStorage.getItem('roadmapUserClicks');
    
    if (savedCounts) {
      try {
        setClickCounts(JSON.parse(savedCounts));
      } catch (error) {
        console.error('Error parsing saved click counts:', error);
      }
    }
    
    if (savedUserClicks) {
      try {
        setUserClicks(JSON.parse(savedUserClicks));
      } catch (error) {
        console.error('Error parsing saved user clicks:', error);
      }
    }
  }, []);

  // Save click counts and user clicks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('roadmapClickCounts', JSON.stringify(clickCounts));
  }, [clickCounts]);

  useEffect(() => {
    localStorage.setItem('roadmapUserClicks', JSON.stringify(userClicks));
  }, [userClicks]);

  const incrementClick = (roadmapPath: string): boolean => {
    // Only count clicks from authenticated users
    if (!isAuthenticated || !user?.id) {
      return false; // Click not counted because user is not authenticated
    }

    // Check if this user has already clicked this roadmap
    const usersWhoClicked = userClicks[roadmapPath] || [];
    if (usersWhoClicked.includes(user.id)) {
      return false; // User has already been counted for this roadmap
    }

    // Add user to the list of users who clicked this roadmap
    setUserClicks(prev => ({
      ...prev,
      [roadmapPath]: [...usersWhoClicked, user.id]
    }));

    // Increment the click count
    setClickCounts(prev => ({
      ...prev,
      [roadmapPath]: (prev[roadmapPath] || 0) + 1
    }));
    
    return true; // Click counted successfully
  };

  const getClickCount = (roadmapPath: string): number => {
    return clickCounts[roadmapPath] || 0;
  };

  const hasUserClicked = (roadmapPath: string): boolean => {
    if (!isAuthenticated || !user?.id) {
      return false;
    }
    const usersWhoClicked = userClicks[roadmapPath] || [];
    return usersWhoClicked.includes(user.id);
  };

  const value: RoadmapClickContextType = {
    clickCounts,
    incrementClick,
    getClickCount,
    isAuthenticated,
    hasUserClicked
  };

  return (
    <RoadmapClickContext.Provider value={value}>
      {children}
    </RoadmapClickContext.Provider>
  );
}; 