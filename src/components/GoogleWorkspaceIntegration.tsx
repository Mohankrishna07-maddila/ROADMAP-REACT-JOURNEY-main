import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Mail, 
  FileText, 
  Users, 
  Video, 
  MessageSquare, 
  Cloud,
  ExternalLink,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';

const GoogleWorkspaceIntegration = () => {
  const workspaceFeatures = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Google Calendar",
      description: "Sync events and meetings with your Google Calendar",
      features: ["Event scheduling", "Meeting reminders", "Calendar sharing", "Time zone support"],
      status: "Connected",
      color: "bg-blue-100 text-blue-700"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Gmail",
      description: "Send and receive emails through your Gmail account",
      features: ["Email notifications", "Event confirmations", "Newsletter delivery", "Support tickets"],
      status: "Connected",
      color: "bg-red-100 text-red-700"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Google Drive",
      description: "Access and share learning materials and resources",
      features: ["Course materials", "Study guides", "Project files", "Collaborative documents"],
      status: "Connected",
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Google Meet",
      description: "Join virtual events and study sessions",
      features: ["Live workshops", "Study groups", "Mentor sessions", "Group discussions"],
      status: "Connected",
      color: "bg-green-100 text-green-700"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Google Chat",
      description: "Communicate with mentors and fellow learners",
      features: ["Direct messaging", "Group chats", "File sharing", "Real-time collaboration"],
      status: "Connected",
      color: "bg-purple-100 text-purple-700"
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Google Cloud",
      description: "Access cloud-based development environments",
      features: ["Cloud IDEs", "Project hosting", "Database access", "API testing"],
      status: "Available",
      color: "bg-indigo-100 text-indigo-700"
    }
  ];

  const upcomingIntegrations = [
    {
      icon: <Video className="h-6 w-6" />,
      title: "YouTube Live",
      description: "Stream live coding sessions and workshops",
      status: "Coming Soon",
      color: "bg-gray-100 text-gray-600"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Google Forms",
      description: "Create surveys and assessments",
      status: "Coming Soon",
      color: "bg-gray-100 text-gray-600"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Google Workspace Integration</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Seamlessly integrate with Google Workspace to enhance your learning experience. 
          Access all your tools in one place and collaborate with ease.
        </p>
      </div>

      {/* Connected Services */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Connected Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaceFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {feature.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4"
                  onClick={() => window.open('https://workspace.google.com', '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in Workspace
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Coming Soon */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Coming Soon
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingIntegrations.map((integration, index) => (
            <Card key={index} className="opacity-75">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${integration.color}`}>
                    {integration.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {integration.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{integration.title}</CardTitle>
                <CardDescription>{integration.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Integration Benefits */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-xl">Why Google Workspace Integration?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Seamless Collaboration</h4>
              <p className="text-sm text-muted-foreground">
                Work together with mentors and peers using familiar Google tools
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Cloud className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Cloud-Based Access</h4>
              <p className="text-sm text-muted-foreground">
                Access your learning materials from anywhere, anytime
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Enhanced Productivity</h4>
              <p className="text-sm text-muted-foreground">
                Streamline your workflow with integrated tools and automation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started with Google Workspace</CardTitle>
          <CardDescription>
            Follow these steps to connect your Google Workspace account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold">Sign in with Google</h4>
                <p className="text-sm text-muted-foreground">
                  Use the "Continue with Google Workspace" button on the signup/login page
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold">Grant Permissions</h4>
                <p className="text-sm text-muted-foreground">
                  Allow access to your Google Calendar, Drive, and other services
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold">Start Learning</h4>
                <p className="text-sm text-muted-foreground">
                  Your Google Workspace tools are now integrated with your learning platform
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleWorkspaceIntegration; 