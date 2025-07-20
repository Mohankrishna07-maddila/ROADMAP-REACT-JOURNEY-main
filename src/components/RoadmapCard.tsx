import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, ArrowRight, LogIn, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRoadmapClicks } from "@/contexts/RoadmapClickContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { logUserActivity } from "@/services/activityLogger";

interface RoadmapCardProps {
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  duration: string;
  learners: number;
  skills: string[];
  icon: React.ReactNode;
  path: string;
}

export function RoadmapCard({ 
  title, 
  description, 
  difficulty, 
  duration, 
  learners, 
  skills, 
  icon,
  path
}: RoadmapCardProps) {
  const navigate = useNavigate();
  const { incrementClick, getClickCount, isAuthenticated, hasUserClicked } = useRoadmapClicks();
  const { isAuthenticated: authIsAuthenticated, user } = useAuth();
  const { toast } = useToast();
  
  const handleStartLearning = async () => {
    if (!authIsAuthenticated) {
      // Show sign-in prompt for unauthenticated users
      toast({
        title: "Sign in required",
        description: "Please sign in to start learning and be counted as a member.",
        variant: "destructive",
      });
      // You can redirect to login page or open signup popup here
      navigate('/login');
      return;
    }

    // Log activity
    try {
      await logUserActivity({
        user_id: user?.id,
        type: "join_roadmap",
        title: userHasClicked ? "Continued Roadmap" : "Started Roadmap",
        description: `You ${userHasClicked ? "continued" : "started"} the ${title} roadmap.`,
        metadata: { roadmap: title, path },
      });
    } catch (e) { /* ignore logging errors for now */ }

    const wasCounted = incrementClick(path);
    if (wasCounted) {
      toast({
        title: "Welcome to the journey!",
        description: "You've been added to the learners count. Let's start learning!",
      });
    } else if (hasUserClicked(path)) {
      toast({
        title: "Already joined!",
        description: "You're already part of this learning community. Let's continue your journey!",
      });
    }
    navigate(`/roadmap/${path}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clickCount = getClickCount(path);
  const userHasClicked = hasUserClicked(path);
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <Badge 
                variant={
                  difficulty === "beginner" ? "default" :
                  difficulty === "intermediate" ? "secondary" :
                  difficulty === "advanced" ? "destructive" : "outline"
                }
                className="text-xs mt-1"
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{clickCount.toLocaleString()} learners</span>
            {!authIsAuthenticated && (
              <Badge variant="outline" className="text-xs ml-1">
                Sign in to join
              </Badge>
            )}
            {authIsAuthenticated && userHasClicked && (
              <Badge variant="default" className="text-xs ml-1 bg-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Joined
              </Badge>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Key Skills:</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <Button 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground" 
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
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Start Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}