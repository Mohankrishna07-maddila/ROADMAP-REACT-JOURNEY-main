import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Star, Clock, Users, Play, CheckCircle, LogIn } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRoadmapClicks } from "@/contexts/RoadmapClickContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const roadmapData = {
  "data-science": {
    title: "Data Science & AI",
    description: "Master the fundamentals of data science, machine learning, and artificial intelligence. Learn to extract insights from data and build intelligent systems.",
    difficulty: "Advanced",
    duration: "10-12 months",
    learners: "28,943",
    skills: ["Python", "Statistics", "Machine Learning", "Data Visualization", "SQL"],
    steps: [
      { id: 1, title: "Python Programming", completed: false, duration: "4 weeks" },
      { id: 2, title: "Statistics & Probability", completed: false, duration: "5 weeks" },
      { id: 3, title: "Data Manipulation (Pandas)", completed: false, duration: "3 weeks" },
      { id: 4, title: "Data Visualization", completed: false, duration: "3 weeks" },
      { id: 5, title: "Machine Learning Basics", completed: false, duration: "6 weeks" },
      { id: 6, title: "Advanced ML Algorithms", completed: false, duration: "8 weeks" },
      { id: 7, title: "Deep Learning", completed: false, duration: "10 weeks" },
      { id: 8, title: "MLOps & Deployment", completed: false, duration: "6 weeks" }
    ]
  }
};

export default function RoadmapDetail() {
  const { path } = useParams();
  const [animatedSteps, setAnimatedSteps] = useState<number[]>([]);
  const { incrementClick, getClickCount, isAuthenticated, hasUserClicked } = useRoadmapClicks();
  const { isAuthenticated: authIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const roadmap = roadmapData[path as keyof typeof roadmapData];
  
  useEffect(() => {
    // Animate steps one by one
    roadmap?.steps.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedSteps(prev => [...prev, index]);
      }, index * 200);
    });
  }, [roadmap]);

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Roadmap not found</h1>
          <Link to="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const completedSteps = roadmap.steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / roadmap.steps.length) * 100;
  const clickCount = getClickCount(path || "");
  const userHasClicked = hasUserClicked(path || "");

  const handleStartLearning = () => {
    if (!authIsAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to start learning and be counted as a member.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (path) {
      const wasCounted = incrementClick(path);
      if (wasCounted) {
        toast({
          title: "Welcome to the journey!",
          description: "You've been added to the learners count. Let's start learning!",
        });
      } else if (userHasClicked) {
        toast({
          title: "Already joined!",
          description: "You're already part of this learning community. Let's continue your journey!",
        });
      }
    }
    // You can add additional logic here like redirecting to the first step
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Roadmaps
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Roadmap Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-4xl font-bold mb-4">{roadmap.title}</h1>
                <p className="text-xl text-muted-foreground mb-6">{roadmap.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {roadmap.difficulty}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {roadmap.duration}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {clickCount.toLocaleString()} learners
                    {!authIsAuthenticated && (
                      <span className="ml-1 text-xs">(Sign in to join)</span>
                    )}
                    {authIsAuthenticated && userHasClicked && (
                      <span className="ml-1 text-xs text-green-600">(You're joined!)</span>
                    )}
                  </Badge>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Skills you'll learn:</h3>
                  <div className="flex flex-wrap gap-2">
                    {roadmap.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>

                {!authIsAuthenticated && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Note:</strong> Sign in to start learning and be counted as a member of our community!
                    </p>
                  </div>
                )}

                {authIsAuthenticated && userHasClicked && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      <strong>Welcome back!</strong> You're already part of this learning community. Continue your journey!
                    </p>
                  </div>
                )}
              </div>

              {/* Animated Roadmap Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    Learning Path
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress: {completedSteps}/{roadmap.steps.length} completed</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roadmap.steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                          animatedSteps.includes(index) 
                            ? 'opacity-100 transform translate-x-0' 
                            : 'opacity-0 transform translate-x-4'
                        } ${
                          step.completed 
                            ? 'bg-primary/5 border-primary/20' 
                            : 'bg-muted/30 hover:bg-muted/50'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? 'bg-primary text-white' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <span className="text-sm font-medium">{step.id}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${step.completed ? 'text-primary' : ''}`}>
                            {step.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{step.duration}</p>
                        </div>
                        {!step.completed && (
                          <Button size="sm" variant="outline">
                            Start
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Get Started</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full" 
                    size="lg" 
                    onClick={handleStartLearning}
                    variant={userHasClicked ? "outline" : "default"}
                  >
                    {!authIsAuthenticated ? (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign in to Start
                      </>
                    ) : userHasClicked ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Continue Learning
                        <Play className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Start Learning
                        <Play className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download PDF Guide
                  </Button>
                  <Button variant="outline" className="w-full">
                    Join Community
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Basic computer skills
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Internet connection
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Dedication to learn
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}