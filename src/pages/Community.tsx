import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Users, 
  TrendingUp, 
  Star, 
  Share2, 
  ExternalLink, 
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  Globe,
  Calendar,
  MapPin,
  Clock,
  Heart,
  ThumbsUp,
  MessageSquare,
  UserPlus,
  Award,
  Target,
  BookOpen,
  Code,
  Palette,
  Database,
  Shield,
  Zap,
  Eye
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const communityStats = {
  totalMembers: "15,432",
  activeToday: "2,847",
  totalDiscussions: "8,923",
  totalResources: "1,234"
};

const whatsappChannels = [
  {
    name: "Community Discussions",
    description: "Main community discussion channel for all tech topics and questions",
    members: "12,345",
    link: "https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS",
    category: "General",
    isActive: true,
    isMainDiscussion: true
  },
  {
    name: "General Discussion",
    description: "General tech discussions, questions, and community chat",
    members: "8,456",
    link: "https://chat.whatsapp.com/IhAHsGMnUurLHTdtzTD24M?mode=r_t",
    category: "General",
    isActive: true
  },
  {
    name: "Frontend Developers",
    description: "React, Vue, Angular, and frontend technologies discussion",
    members: "3,234",
    link: "https://chat.whatsapp.com/CFDNO7pCPzfKIrTFas0lmo?mode=r_t",
    category: "Development",
    isActive: true
  },
  {
    name: "Backend & DevOps",
    description: "Server-side development, databases, and DevOps practices",
    members: "2,156",
    link: "https://chat.whatsapp.com/D6XmH9QY7fG4VB4A3IKO28?mode=r_t",
    category: "Development",
    isActive: true
  },
  {
    name: "Data Science & ML",
    description: "Machine learning, data analysis, and AI discussions",
    members: "1,789",
    link: "https://chat.whatsapp.com/Cu8VyFsiC4SBI0e9YVdN7c?mode=r_t",
    category: "Data",
    isActive: true
  },
  {
    name: "UI/UX Designers",
    description: "Design principles, tools, and user experience discussions",
    members: "1,567",
    link: "https://chat.whatsapp.com/IOmJkcCuFNr5UGbe8dMagg?mode=r_t",
    category: "Design",
    isActive: true
  },
  {
    name: "Job Opportunities",
    description: "Job postings, career advice, and networking",
    members: "4,123",
    link: "https://chat.whatsapp.com/IUg0MLczSLV9q9CZPcUZ6P?mode=r_t",
    category: "Career",
    isActive: true
  }
];

const recentDiscussions = [
  {
    id: 1,
    title: "Best practices for React performance optimization",
    author: "Sarah Chen",
    replies: 23,
    views: 456,
    category: "Frontend",
    timeAgo: "2 hours ago",
    isHot: true
  },
  {
    id: 2,
    title: "How to get started with Docker and Kubernetes",
    author: "Mike Johnson",
    replies: 15,
    views: 234,
    category: "DevOps",
    timeAgo: "4 hours ago",
    isHot: false
  },
  {
    id: 3,
    title: "Python vs JavaScript for data analysis",
    author: "Alex Rodriguez",
    replies: 31,
    views: 678,
    category: "Data Science",
    timeAgo: "6 hours ago",
    isHot: true
  },
  {
    id: 4,
    title: "Figma tips for better UI design workflow",
    author: "Emma Wilson",
    replies: 12,
    views: 189,
    category: "Design",
    timeAgo: "8 hours ago",
    isHot: false
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "React Advanced Patterns Workshop",
    date: "2024-02-15",
    time: "14:00 UTC",
    type: "Workshop",
    attendees: 156,
    isOnline: true
  },
  {
    id: 2,
    title: "Career in Tech: Panel Discussion",
    date: "2024-02-20",
    time: "16:00 UTC",
    type: "Panel",
    attendees: 89,
    isOnline: true
  },
  {
    id: 3,
    title: "Local Meetup: London Tech Community",
    date: "2024-02-25",
    time: "18:00 GMT",
    type: "Meetup",
    attendees: 45,
    isOnline: false,
    location: "London, UK"
  }
];

const communityGuidelines = [
  "Be respectful and inclusive to all members",
  "Share knowledge and help others learn",
  "No spam or self-promotion without permission",
  "Keep discussions relevant to tech and learning",
  "Report inappropriate behavior to moderators",
  "Use appropriate channels for different topics"
];

export default function Community() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredChannels = selectedCategory === "All" 
    ? whatsappChannels 
    : whatsappChannels.filter(channel => channel.category === selectedCategory);

  const categories = ["All", "General", "Development", "Data", "Design", "Career"];

  const handleWhatsAppJoin = (link: string) => {
    window.open(link, '_blank');
  };

  const handleStartDiscussion = () => {
    const mainDiscussionChannel = whatsappChannels.find(channel => channel.isMainDiscussion);
    if (mainDiscussionChannel) {
      window.open(mainDiscussionChannel.link, '_blank');
    }
  };

  const handleViewAllEvents = () => {
    // Navigate to the dedicated events page
    navigate('/events');
  };

  const handleShareGuidelines = () => {
    const guidelinesText = `Community Guidelines for CareerPath:

${communityGuidelines.map((guideline, index) => `${index + 1}. ${guideline}`).join('\n')}

Join our community: ${window.location.origin}/community`;

    if (navigator.share) {
      // Use native sharing on mobile devices
      navigator.share({
        title: 'CareerPath Community Guidelines',
        text: guidelinesText,
        url: `${window.location.origin}/community`
      });
    } else {
      // Fallback for desktop - copy to clipboard
      navigator.clipboard.writeText(guidelinesText).then(() => {
        // You can add a toast notification here
        alert('Guidelines copied to clipboard!');
      }).catch(() => {
        // Fallback if clipboard API fails
        const textArea = document.createElement('textarea');
        textArea.value = guidelinesText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Guidelines copied to clipboard!');
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Development": return <Code className="h-4 w-4" />;
      case "Data": return <Database className="h-4 w-4" />;
      case "Design": return <Palette className="h-4 w-4" />;
      case "Career": return <Target className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "Workshop": return <BookOpen className="h-4 w-4" />;
      case "Panel": return <Users className="h-4 w-4" />;
      case "Meetup": return <MapPin className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back to Home Link */}
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Connect with fellow developers, designers, and tech enthusiasts. Share knowledge, 
            get help, and grow together in our vibrant WhatsApp community.
          </p>
          
          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{communityStats.totalMembers}</div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{communityStats.activeToday}</div>
              <div className="text-sm text-muted-foreground">Active Today</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{communityStats.totalDiscussions}</div>
              <div className="text-sm text-muted-foreground">Discussions</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{communityStats.totalResources}</div>
              <div className="text-sm text-muted-foreground">Resources</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="whatsapp" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="whatsapp">WhatsApp Channels</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>

          {/* WhatsApp Channels Tab */}
          <TabsContent value="whatsapp" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">WhatsApp Channels</h2>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-muted-foreground">Join our channels to connect with the community</span>
              </div>
            </div>

            {/* Main Discussion Channel Highlight */}
            <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <MessageCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800">Main Community Discussion</h3>
                      <p className="text-blue-600 text-sm">Join our primary discussion channel for all tech topics and community interactions</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="default" className="bg-blue-600 text-xs">12,345 members</Badge>
                        <Badge variant="outline" className="text-blue-600 text-xs">Most Active</Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleWhatsAppJoin("https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS")}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Join Main Discussion
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {getCategoryIcon(category)}
                  <span className="ml-2">{category}</span>
                </Button>
              ))}
            </div>

            {/* Channels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChannels.map((channel, index) => (
                <Card key={index} className={`hover:shadow-lg transition-all duration-300 ${channel.isMainDiscussion ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                                              <div className="flex items-center gap-2">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <MessageCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{channel.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {channel.category}
                              </Badge>
                              {channel.isMainDiscussion && (
                                <Badge variant="default" className="text-xs bg-blue-600">
                                  Main Discussion
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      {channel.isActive && (
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    <CardDescription className="mt-2">
                      {channel.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">
                        {channel.members} members
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        Active
                      </Badge>
                    </div>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleWhatsAppJoin(channel.link)}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Join Channel
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* How to Join Instructions */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Zap className="h-5 w-5" />
                  How to Join WhatsApp Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-700">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      1
                    </div>
                    <p>Click on any "Join Channel" button above</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      2
                    </div>
                    <p>You'll be redirected to WhatsApp with an invitation link</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      3
                    </div>
                    <p>Tap "Join Group" to become a member of the channel</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      4
                    </div>
                    <p>Start chatting and connecting with fellow community members!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Discussions</h2>
              <Button variant="outline" onClick={handleStartDiscussion}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Discussion
              </Button>
            </div>

            <div className="space-y-4">
              {/* Instead of showing mock discussions, show: */}
              "Join our WhatsApp community to see real discussions and participate in conversations!"
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Upcoming Events</h2>
              <Button variant="outline" onClick={handleViewAllEvents}>
                <Calendar className="mr-2 h-4 w-4" />
                View All Events
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {getEventIcon(event.type)}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      {event.isOnline && (
                        <Badge variant="secondary" className="text-xs">
                          Online
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      {!event.isOnline && event.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4"
                      onClick={() => {
                        // Open WhatsApp community for event registration
                        window.open('https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS', '_blank', 'noopener,noreferrer');
                      }}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Join Event
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Guidelines Tab */}
          <TabsContent value="guidelines" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Community Guidelines</h2>
              <Button variant="outline" onClick={handleShareGuidelines}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Guidelines
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Community Rules
                  </CardTitle>
                  <CardDescription>
                    Please follow these guidelines to maintain a positive community environment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {communityGuidelines.map((guideline, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sm">{guideline}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Community Benefits
                  </CardTitle>
                  <CardDescription>
                    What you can gain from being part of our community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Network with Peers</h4>
                        <p className="text-sm text-muted-foreground">Connect with developers and designers worldwide</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Learn Together</h4>
                        <p className="text-sm text-muted-foreground">Share knowledge and learn from community experts</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Target className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Career Growth</h4>
                        <p className="text-sm text-muted-foreground">Discover job opportunities and career advice</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <TrendingUp className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Stay Updated</h4>
                        <p className="text-sm text-muted-foreground">Get the latest tech news and industry trends</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
} 