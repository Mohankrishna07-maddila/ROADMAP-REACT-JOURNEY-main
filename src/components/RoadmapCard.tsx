import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const difficultyColors = {
  beginner: "bg-green-500 text-white",
  intermediate: "bg-yellow-500 text-white", 
  advanced: "bg-red-500 text-white",
  expert: "bg-purple-500 text-white"
};

const difficultyLabels = {
  beginner: "Beginner",
  intermediate: "Intermediate", 
  advanced: "Advanced",
  expert: "Expert"
};

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
  return (
    <Card className="roadmap-card group cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              {icon}
            </div>
            <div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {title}
              </CardTitle>
              <Badge className={`mt-2 ${difficultyColors[difficulty]}`}>
                {difficultyLabels[difficulty]}
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
            <span>{learners.toLocaleString()} learners</span>
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
        
        <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground" onClick={() => navigate(`/roadmap/${path}`)}>
          Start Learning
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}