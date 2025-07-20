import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ExternalLink, 
  ArrowLeft,
  BookOpen,
  Video,
  Globe,
  Star,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

const allEvents = [
  // Upcoming Events
  {
    id: 1,
    title: "React Advanced Patterns Workshop",
    date: "2025-01-15",
    time: "14:00 UTC",
    type: "Workshop",
    attendees: 156,
    isOnline: true,
    description: "Deep dive into advanced React patterns including custom hooks, context optimization, and performance techniques.",
    speaker: "Sarah Chen",
    duration: "3 hours",
    difficulty: "Advanced",
    category: "Frontend",
    link: "https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS",
    tags: ["React", "JavaScript", "Performance"]
  },
  {
    id: 2,
    title: "Career in Tech: Panel Discussion",
    date: "2025-01-20",
    time: "16:00 UTC",
    type: "Panel",
    attendees: 89,
    isOnline: true,
    description: "Join industry experts for an insightful discussion about career paths, job hunting, and professional growth in tech.",
    speakers: ["Mike Johnson", "Emma Wilson", "Alex Rodriguez"],
    duration: "1.5 hours",
    difficulty: "All Levels",
    category: "Career",
    link: "https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS",
    tags: ["Career", "Networking", "Professional Development"]
  },
  {
    id: 3,
    title: "Local Meetup: London Tech Community",
    date: "2025-01-25",
    time: "18:00 GMT",
    type: "Meetup",
    attendees: 45,
    isOnline: false,
    location: "London, UK",
    description: "In-person networking event for London-based developers. Food and drinks provided.",
    organizer: "London Tech Community",
    duration: "3 hours",
    difficulty: "All Levels",
    category: "Networking",
    link: "https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS",
    tags: ["Networking", "London", "In-Person"]
  },
  {
    id: 4,
    title: "Machine Learning Fundamentals",
    date: "2025-02-01",
    time: "15:00 UTC",
    type: "Workshop",
    attendees: 203,
    isOnline: true,
    description: "Introduction to machine learning concepts, algorithms, and practical applications using Python.",
    speaker: "Dr. Maria Garcia",
    duration: "4 hours",
    difficulty: "Beginner",
    category: "Data Science",
    link: "https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS",
    tags: ["Machine Learning", "Python", "AI"]
  },
  {
    id: 5,
    title: "UI/UX Design Principles",
    date: "2025-02-05",
    time: "13:00 UTC",
    type: "Workshop",
    attendees: 78,
    isOnline: true,
    description: "Learn essential design principles, user research methods, and prototyping techniques.",
    speaker: "Lisa Thompson",
    duration: "2.5 hours",
    difficulty: "Beginner",
    category: "Design",
    link: "https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS",
    tags: ["UI/UX", "Design", "Figma"]
  },
  {
    id: 6,
    title: "DevOps Best Practices",
    date: "2025-02-10",
    time: "17:00 UTC",
    type: "Workshop",
    attendees: 134,
    isOnline: true,
    description: "Explore CI/CD pipelines, containerization, and infrastructure as code with hands-on examples.",
    speaker: "David Kim",
    duration: "3.5 hours",
    difficulty: "Intermediate",
    category: "DevOps",
    link: "https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS",
    tags: ["DevOps", "Docker", "CI/CD"]
  },
  // Past Events
  {
    id: 7,
    title: "JavaScript Fundamentals Workshop",
    date: "2024-12-15",
    time: "14:00 UTC",
    type: "Workshop",
    attendees: 245,
    isOnline: true,
    description: "Comprehensive introduction to JavaScript fundamentals, ES6+ features, and modern development practices.",
    speaker: "Alex Johnson",
    duration: "4 hours",
    difficulty: "Beginner",
    category: "Frontend",
    link: "https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS",
    tags: ["JavaScript", "ES6", "Fundamentals"],
    isPast: true
  },
  {
    id: 8,
    title: "Python for Data Science",
    date: "2024-12-20",
    time: "15:00 UTC",
    type: "Workshop",
    attendees: 189,
    isOnline: true,
    description: "Learn Python programming for data analysis, visualization, and machine learning applications.",
    speaker: "Dr. Emily Chen",
    duration: "3.5 hours",
    difficulty: "Intermediate",
    category: "Data Science",
    link: "https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS",
    tags: ["Python", "Data Science", "Pandas"],
    isPast: true
  },
  {
    id: 9,
    title: "Web Development Bootcamp",
    date: "2024-12-25",
    time: "10:00 UTC",
    type: "Workshop",
    attendees: 312,
    isOnline: true,
    description: "Complete web development bootcamp covering HTML, CSS, JavaScript, and modern frameworks.",
    speaker: "Mark Wilson",
    duration: "6 hours",
    difficulty: "Beginner",
    category: "Full Stack",
    link: "https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS",
    tags: ["Web Development", "HTML", "CSS", "JavaScript"],
    isPast: true
  },
  {
    id: 10,
    title: "Mobile App Development with React Native",
    date: "2024-12-30",
    time: "16:00 UTC",
    type: "Workshop",
    attendees: 167,
    isOnline: true,
    description: "Build cross-platform mobile applications using React Native and modern mobile development practices.",
    speaker: "Sarah Kim",
    duration: "4 hours",
    difficulty: "Intermediate",
    category: "Mobile",
    link: "https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS",
    tags: ["React Native", "Mobile", "Cross-platform"],
    isPast: true
  },
  {
    id: 11,
    title: "Cloud Computing Fundamentals",
    date: "2025-01-05",
    time: "13:00 UTC",
    type: "Workshop",
    attendees: 198,
    isOnline: true,
    description: "Introduction to cloud computing concepts, AWS services, and deployment strategies.",
    speaker: "David Rodriguez",
    duration: "3 hours",
    difficulty: "Beginner",
    category: "Cloud",
    link: "https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS",
    tags: ["Cloud Computing", "AWS", "Deployment"],
    isPast: true
  },
  {
    id: 12,
    title: "Cybersecurity Best Practices",
    date: "2025-01-10",
    time: "17:00 UTC",
    type: "Panel",
    attendees: 145,
    isOnline: true,
    description: "Expert panel discussion on cybersecurity threats, prevention strategies, and industry best practices.",
    speakers: ["Dr. Lisa Park", "Mike Thompson", "Alex Chen"],
    duration: "2 hours",
    difficulty: "All Levels",
    category: "Security",
    link: "https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS",
    tags: ["Cybersecurity", "Security", "Best Practices"],
    isPast: true
  }
];

const eventCategories = ["All", "Workshop", "Panel", "Meetup"];
const difficultyLevels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function Events() {
  const { toast } = useToast();
  const [favoriteEvents, setFavoriteEvents] = useState<number[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarFilter, setCalendarFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const getEventIcon = (type: string) => {
    switch (type) {
      case "Workshop": return <BookOpen className="h-4 w-4" />;
      case "Panel": return <Users className="h-4 w-4" />;
      case "Meetup": return <MapPin className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'Advanced': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleJoinEvent = (link: string, eventTitle: string) => {
    // Show immediate feedback
    toast({
      title: "Joining Event",
      description: `Redirecting you to join "${eventTitle}" via our community`,
    });
    
    // Open WhatsApp link immediately
    const whatsappLink = 'https://chat.whatsapp.com/H8EqGu9is7OEhfJPZDxQfS';
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
  };

  const handleToggleFavorite = (eventId: number, eventTitle: string) => {
    setFavoriteEvents(prev => {
      const isFavorite = prev.includes(eventId);
      if (isFavorite) {
        // Remove from favorites
        toast({
          title: "Removed from Favorites",
          description: `"${eventTitle}" removed from your important events`,
        });
        return prev.filter(id => id !== eventId);
      } else {
        // Add to favorites
        toast({
          title: "Added to Favorites",
          description: `"${eventTitle}" marked as important`,
        });
        return [...prev, eventId];
      }
    });
  };

  const isEventFavorite = (eventId: number) => {
    return favoriteEvents.includes(eventId);
  };

  const handleViewRecording = (event: any) => {
    // YouTube video links for different topics
    const videoLinks = {
      "JavaScript Fundamentals Workshop": "https://www.youtube.com/watch?v=W6NZfCO5SIk",
      "Python for Data Science": "https://www.youtube.com/watch?v=WGJJIrtnfpk",
      "Web Development Bootcamp": "https://www.youtube.com/watch?v=916GWv2Qs08",
      "Mobile App Development with React Native": "https://www.youtube.com/watch?v=0-S5a0eXPoc",
      "Cloud Computing Fundamentals": "https://www.youtube.com/watch?v=3hLmDS179YE",
      "Cybersecurity Best Practices": "https://www.youtube.com/watch?v=U_P23SqJaDc"
    };

    const videoUrl = videoLinks[event.title as keyof typeof videoLinks] || "https://www.youtube.com/results?search_query=" + encodeURIComponent(event.title);
    
    toast({
      title: "Opening Recording",
      description: `Opening YouTube video for "${event.title}"`,
    });

    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return allEvents.filter(event => event.date === dateString);
  };

  const getEventsForMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatDateForCalendar = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/community" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Community
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Community Events</h1>
          <p className="text-xl text-muted-foreground">
            Join our upcoming workshops, panels, and meetups to learn, network, and grow together
          </p>
          

        </div>

        {/* Event Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{allEvents.length}</div>
            <div className="text-sm text-muted-foreground">Total Events</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {allEvents.filter(e => e.isOnline).length}
            </div>
            <div className="text-sm text-muted-foreground">Online Events</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {allEvents.filter(e => !e.isOnline).length}
            </div>
            <div className="text-sm text-muted-foreground">In-Person Events</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {allEvents.reduce((sum, event) => sum + event.attendees, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Attendees</div>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="favorites">Favorites ({favoriteEvents.length})</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {allEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {getEventIcon(event.type)}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {event.isOnline && (
                          <Badge variant="secondary" className="text-xs">
                            <Globe className="mr-1 h-3 w-3" />
                            Online
                          </Badge>
                        )}
                        <Badge className={getDifficultyColor(event.difficulty)}>
                          {event.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees} attending</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.duration}</span>
                        </div>
                      </div>

                      {!event.isOnline && event.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1">
                        {event.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 hover:bg-primary/90 transition-colors"
                          onClick={() => handleJoinEvent(event.link, event.title)}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Join Event
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                        <Button 
                          variant={isEventFavorite(event.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleToggleFavorite(event.id, event.title)}
                          className={isEventFavorite(event.id) ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""}
                        >
                          <Star className={`h-4 w-4 ${isEventFavorite(event.id) ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            {favoriteEvents.length === 0 ? (
              <div className="text-center py-12">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Favorite Events</h3>
                <p className="text-muted-foreground mb-4">
                  Click the star icon on any event to mark it as important
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    const upcomingTab = document.querySelector('[data-value="upcoming"]') as HTMLElement;
                    if (upcomingTab) upcomingTab.click();
                  }}
                >
                  Browse Upcoming Events
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {allEvents
                  .filter(event => favoriteEvents.includes(event.id))
                  .map((event) => (
                    <Card key={event.id} className="hover:shadow-lg transition-all duration-300 border-yellow-200 bg-yellow-50/30">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              {getEventIcon(event.type)}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {event.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            {event.isOnline && (
                              <Badge variant="secondary" className="text-xs">
                                <Globe className="mr-1 h-3 w-3" />
                                Online
                              </Badge>
                            )}
                            <Badge className={getDifficultyColor(event.difficulty)}>
                              {event.difficulty}
                            </Badge>
                            <Badge variant="default" className="bg-yellow-500 text-white text-xs">
                              <Star className="mr-1 h-3 w-3 fill-current" />
                              Important
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {event.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{event.attendees} attending</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{event.duration}</span>
                            </div>
                          </div>

                          {!event.isOnline && event.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-1">
                            {event.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              className="flex-1 hover:bg-primary/90 transition-colors"
                              onClick={() => handleJoinEvent(event.link, event.title)}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              Join Event
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                            <Button 
                              variant="default"
                              size="sm"
                              onClick={() => handleToggleFavorite(event.id, event.title)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white"
                            >
                              <Star className="h-4 w-4 fill-current" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {allEvents
                .filter(event => event.isPast)
                .map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-all duration-300 opacity-75">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {getEventIcon(event.type)}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                          <Badge variant="secondary" className="text-xs bg-gray-500 text-white">
                            Past Event
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {event.isOnline && (
                            <Badge variant="secondary" className="text-xs">
                              <Globe className="mr-1 h-3 w-3" />
                              Online
                            </Badge>
                          )}
                          <Badge className={getDifficultyColor(event.difficulty)}>
                            {event.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{event.attendees} attended</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{event.duration}</span>
                          </div>
                        </div>

                        {!event.isOnline && event.location && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1">
                          {event.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleViewRecording(event)}
                          >
                            <Video className="mr-2 h-4 w-4" />
                            View Recording
                          </Button>
                          <Button 
                            variant={isEventFavorite(event.id) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleToggleFavorite(event.id, event.title)}
                            className={isEventFavorite(event.id) ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""}
                          >
                            <Star className={`h-4 w-4 ${isEventFavorite(event.id) ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="space-y-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Calendar View</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-100 border-l-2 border-blue-500 rounded"></div>
                      <span>{getEventsForMonth(currentDate).filter(e => !e.isPast).length} Upcoming</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-200 border-l-2 border-gray-500 rounded"></div>
                      <span>{getEventsForMonth(currentDate).filter(e => e.isPast).length} Past</span>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <select 
                        value={calendarFilter}
                        onChange={(e) => setCalendarFilter(e.target.value as 'all' | 'upcoming' | 'past')}
                        className="text-xs border rounded px-2 py-1 bg-white"
                      >
                        <option value="all">Show All</option>
                        <option value="upcoming">Upcoming Only</option>
                        <option value="past">Past Only</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                  >
                    ← Previous
                  </Button>
                  <span className="text-lg font-medium min-w-[200px] text-center">
                    {formatDateForCalendar(currentDate)}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigateMonth('next')}
                  >
                    Next →
                  </Button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="bg-white border rounded-lg overflow-hidden">
                {/* Calendar Header */}
                <div className="grid grid-cols-7 bg-gray-50 border-b">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-3 text-center text-sm font-medium text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7">
                  {(() => {
                    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
                    const monthEvents = getEventsForMonth(currentDate);
                    
                    // Create array of all days to display
                    const days = [];
                    
                    // Add empty cells for days before the first day of the month
                    for (let i = 0; i < startingDayOfWeek; i++) {
                      days.push(<div key={`empty-${i}`} className="p-3 min-h-[100px] bg-gray-50"></div>);
                    }
                    
                    // Add days of the month
                    for (let day = 1; day <= daysInMonth; day++) {
                      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                      let dayEvents = getEventsForDate(date);
                      
                      // Apply filter
                      if (calendarFilter === 'upcoming') {
                        dayEvents = dayEvents.filter(event => !event.isPast);
                      } else if (calendarFilter === 'past') {
                        dayEvents = dayEvents.filter(event => event.isPast);
                      }
                      
                      const isToday = date.toDateString() === new Date().toDateString();
                      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                      
                      days.push(
                        <div 
                          key={day}
                          className={`p-2 min-h-[120px] border-r border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                            isToday ? 'bg-blue-50 border-blue-200' : ''
                          } ${isSelected ? 'bg-yellow-50 border-yellow-200' : ''}`}
                          onClick={() => setSelectedDate(date)}
                        >
                          <div className={`text-sm font-medium mb-1 ${
                            isToday ? 'text-blue-600' : 'text-gray-900'
                          }`}>
                            {day}
                          </div>
                          
                          {/* Event indicators */}
                          <div className="space-y-1">
                            {dayEvents.length > 0 && (
                              <div className="text-xs font-medium text-gray-500 mb-1">
                                {dayEvents.length} event{dayEvents.length > 1 ? 's' : ''}
                              </div>
                            )}
                            {dayEvents.slice(0, 3).map((event, index) => (
                              <div 
                                key={event.id}
                                className={`text-xs p-1.5 rounded truncate cursor-pointer hover:opacity-80 transition-opacity font-medium ${
                                  event.isPast 
                                    ? 'bg-gray-200 text-gray-700 border-l-3 border-gray-500 shadow-sm' 
                                    : 'bg-blue-100 text-blue-800 border-l-3 border-blue-500 shadow-sm'
                                }`}
                                title={`${event.title} (${event.isPast ? 'Past Event' : 'Upcoming Event'})`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedDate(date);
                                }}
                              >
                                <div className="flex items-center gap-1">
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    event.isPast ? 'bg-gray-500' : 'bg-blue-500'
                                  }`}></div>
                                  {event.title}
                                </div>
                              </div>
                            ))}
                            {dayEvents.length > 3 && (
                              <div className="text-xs text-gray-500 font-medium">
                                +{dayEvents.length - 3} more events
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                    
                    return days;
                  })()}
                </div>
              </div>

              {/* Selected Date Events */}
              {selectedDate && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Events for {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const events = getEventsForDate(selectedDate);
                      if (events.length === 0) {
                        return (
                          <p className="text-muted-foreground text-center py-4">
                            No events scheduled for this date
                          </p>
                        );
                      }
                      
                      return (
                        <div className="space-y-4">
                          {events.map(event => (
                            <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  {getEventIcon(event.type)}
                                </div>
                                <div>
                                  <h4 className="font-medium">{event.title}</h4>
                                  <p className="text-sm text-muted-foreground">{event.time}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {event.type}
                                </Badge>
                                {event.isPast && (
                                  <Badge variant="secondary" className="text-xs bg-gray-500 text-white">
                                    Past
                                  </Badge>
                                )}
                                <Button 
                                  size="sm"
                                  onClick={() => event.isPast ? handleViewRecording(event) : handleJoinEvent(event.link, event.title)}
                                >
                                  {event.isPast ? 'View Recording' : 'Join Event'}
                                </Button>
                                <Button 
                                  variant={isEventFavorite(event.id) ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleToggleFavorite(event.id, event.title)}
                                  className={isEventFavorite(event.id) ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""}
                                >
                                  <Star className={`h-4 w-4 ${isEventFavorite(event.id) ? "fill-current" : ""}`} />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}

              {/* Calendar Legend */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Calendar Legend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-100 border-l-2 border-blue-400 rounded"></div>
                      <span>Upcoming Events</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-200 border-l-2 border-gray-400 rounded"></div>
                      <span>Past Events</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-50 border border-blue-200 rounded"></div>
                      <span>Today</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-50 border border-yellow-200 rounded"></div>
                      <span>Selected Date</span>
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