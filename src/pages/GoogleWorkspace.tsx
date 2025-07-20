import React from 'react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import GoogleWorkspaceIntegration from '@/components/GoogleWorkspaceIntegration';

const GoogleWorkspace = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <div className="container mx-auto px-4 py-8">
        <GoogleWorkspaceIntegration />
      </div>
      
      <Footer />
    </div>
  );
};

export default GoogleWorkspace; 