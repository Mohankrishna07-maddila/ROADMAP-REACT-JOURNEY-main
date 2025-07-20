import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Target, Trophy, Clock, TrendingUp, Calendar, Rocket, Star, CheckCircle, ArrowRight, Plus, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useRoadmapClicks } from "@/contexts/RoadmapClickContext";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { db } from "@/lib/supabase";

interface UserProgress {
  roadmapProgress: any[];
  skills: any[];
  assessmentResults: any[];
  totalLearningHours: number;
  currentStreak: number;
  completedRoadmaps: number;
  masteredSkills: number;
}

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { incrementClick, hasUserClicked } = useRoadmapClicks();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserProgress();
    }
  }, [isAuthenticated, user]);

  const loadUserProgress = async () => {
    try {
      setIsLoading(true);
      
      // Get user's roadmap progress (placeholder - will be implemented when roadmap system is connected)
      const roadmapProgress: any[] = [];

      // Get user's skills (placeholder - will be implemented when skills system is connected)
      const skills: any[] = [];

      // Calculate real metrics
      const completedRoadmaps = roadmapProgress.filter((rp: any) => rp.progress === 100).length;
      const masteredSkills = skills.filter((skill: any) => skill.level === 'expert').length;
      const totalLearningHours = roadmapProgress.reduce((total: number, rp: any) => {
        const daysSinceStart = Math.max(1, Math.floor((Date.now() - new Date(rp.started_at).getTime()) / (1000 * 60 * 60 * 24)));
        return total + (daysSinceStart * 2); // Assume 2 hours per day average
      }, 0);

      // Calculate current streak (simplified - in real app, track daily activity)
      const currentStreak = Math.min(7, Math.floor(Math.random() * 10) + 1); // Placeholder

      setUserProgress({
        roadmapProgress,
        skills,
        assessmentResults: [], // Will be implemented when assessment system is connected
        totalLearningHours,
        currentStreak,
        completedRoadmaps,
        masteredSkills
      });
    } catch (error) {
      console.error('Error loading user progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartLearning = (roadmapPath: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to start learning and be counted as a member.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    const wasCounted = incrementClick(roadmapPath);
    if (wasCounted) {
      toast({
        title: "Welcome to the journey!",
        description: "You've been added to the learners count. Let's start learning!",
      });
    } else if (hasUserClicked(roadmapPath)) {
      toast({
        title: "Already joined!",
        description: "You're already part of this learning community. Let's continue your journey!",
      });
    }
    navigate(`/roadmap/${roadmapPath}`);
  };

  // Check if user is new (no progress data)
  const isNewUser = !userProgress || userProgress.roadmapProgress.length === 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your dashboard...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogIn className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Sign in Required</h2>
                <p className="text-muted-foreground mb-6">
                  Please sign in to view your dashboard and start your learning journey.
                </p>
                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link to="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/signup">
                      Create Account
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.first_name}! 👋
            </h1>
            <p className="text-muted-foreground">
              {isNewUser 
                ? "Ready to start your learning journey? Let's get you set up!"
                : "Continue your learning journey and track your progress."
              }
            </p>
          </div>

          {isNewUser ? (
            // New User Onboarding
            <div className="space-y-8">
              {/* Welcome Card */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <Rocket className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Welcome to Your Learning Journey! 🚀</h2>
                      <p className="text-muted-foreground max-w-2xl mx-auto">
                        You're about to embark on an exciting learning adventure. Let's get you started with personalized recommendations and your first learning path.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Start Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Explore Roadmaps</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Browse through different career paths and find the one that matches your goals
                        </p>
                        <Button className="w-full" asChild>
                          <Link to="/explore">
                            Start Exploring
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                        <Target className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Take Skill Assessment</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Assess your current skills to get personalized learning recommendations
                        </p>
                        <Button className="w-full" asChild>
                          <Link to="/assessment">
                            Start Assessment
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Popular Starting Points */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Popular Starting Points
                  </CardTitle>
                  <CardDescription>
                    These roadmaps are perfect for beginners
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Frontend Development</h4>
                        <Badge variant="secondary">Beginner</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Learn HTML, CSS, JavaScript, and React to build modern web applications
                      </p>
                      <Button 
                        size="sm" 
                        onClick={() => handleStartLearning("frontend")}
                        variant={hasUserClicked("frontend") ? "outline" : "default"}
                      >
                        {hasUserClicked("frontend") ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Continue Learning
                          </>
                        ) : (
                          "Start Learning"
                        )}
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Backend Development</h4>
                        <Badge variant="secondary">Beginner</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Master server-side development with Node.js, databases, and APIs
                      </p>
                      <Button 
                        size="sm" 
                        onClick={() => handleStartLearning("backend")}
                        variant={hasUserClicked("backend") ? "outline" : "default"}
                      >
                        {hasUserClicked("backend") ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Continue Learning
                          </>
                        ) : (
                          "Start Learning"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Existing User Dashboard
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Roadmaps Completed</p>
                        <p className="text-2xl font-bold">{userProgress.completedRoadmaps}</p>
                      </div>
                      <Trophy className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Skills Mastered</p>
                        <p className="text-2xl font-bold">{userProgress.masteredSkills}</p>
                      </div>
                      <Target className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Learning Hours</p>
                        <p className="text-2xl font-bold">{userProgress.totalLearningHours}</p>
                      </div>
                      <Clock className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                        <p className="text-2xl font-bold">{userProgress.currentStreak} days</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Current Learning */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Current Learning
                      </CardTitle>
                      <CardDescription>
                        Your active learning paths and progress
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {userProgress.roadmapProgress.length > 0 ? (
                        userProgress.roadmapProgress.map((roadmap: any, index: number) => (
                          <div key={roadmap.id} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold">{roadmap.roadmap_name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {roadmap.current_step || 'Getting started...'}
                                </p>
                              </div>
                              <Badge variant={roadmap.progress === 100 ? "default" : "secondary"}>
                                {roadmap.progress === 100 ? "Completed" : "In Progress"}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{roadmap.progress}%</span>
                              </div>
                              <Progress value={roadmap.progress} className="h-2" />
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" asChild>
                                <Link to={`/roadmap/${roadmap.roadmap_id}`}>
                                  {roadmap.progress === 100 ? "Review" : "Continue"}
                                </Link>
                              </Button>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="font-semibold mb-2">No Active Learning</h3>
                          <p className="text-muted-foreground mb-4">
                            Start your first learning path to see your progress here
                          </p>
                          <Button asChild>
                            <Link to="/explore">
                              <Plus className="mr-2 h-4 w-4" />
                              Start Learning
                            </Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Recent Activity
                      </CardTitle>
                      <CardDescription>
                        Your latest learning activities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {userProgress.roadmapProgress.length > 0 ? (
                        <div className="space-y-4">
                          {userProgress.roadmapProgress.slice(0, 3).map((roadmap: any, index: number) => (
                            <div key={roadmap.id} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  {roadmap.progress > 0 ? `Updated progress in ${roadmap.roadmap_name}` : `Started ${roadmap.roadmap_name}`}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(roadmap.last_updated).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">
                            Your learning activity will appear here once you start your journey
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions & Recommendations */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start" asChild>
                        <Link to="/explore">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Explore Roadmaps
                        </Link>
                      </Button>
                      <Button className="w-full justify-start" variant="outline" asChild>
                        <Link to="/assessment">
                          <Target className="mr-2 h-4 w-4" />
                          Take Skill Assessment
                        </Link>
                      </Button>
                      <Button className="w-full justify-start" variant="outline" asChild>
                        <Link to="/recommendations">
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Get Recommendations
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Skills Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills Overview</CardTitle>
                      <CardDescription>
                        Your current skill levels
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {userProgress.skills.length > 0 ? (
                        <div className="space-y-3">
                          {userProgress.skills.slice(0, 5).map((skill: any, index: number) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm">{skill.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {skill.level}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <Target className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Take an assessment to see your skills
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Recommended for You */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended for You</CardTitle>
                      <CardDescription>
                        Based on your progress
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Full Stack Development</h4>
                        <p className="text-sm text-muted-foreground">
                          Master both frontend and backend development
                        </p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => handleStartLearning("full-stack")}
                        >
                          {hasUserClicked("full-stack") ? (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Continue Learning
                            </>
                          ) : (
                            "Learn More"
                          )}
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">DevOps Engineering</h4>
                        <p className="text-sm text-muted-foreground">
                          Learn deployment, CI/CD, and infrastructure
                        </p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => handleStartLearning("devops")}
                        >
                          {hasUserClicked("devops") ? (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Continue Learning
                            </>
                          ) : (
                            "Learn More"
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard; 