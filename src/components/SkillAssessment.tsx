import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const skillAreas = [
  { name: "Programming Languages", progress: 75, skills: ["JavaScript", "Python", "TypeScript"] },
  { name: "Web Development", progress: 60, skills: ["React", "HTML/CSS", "Node.js"] },
  { name: "Database Management", progress: 40, skills: ["SQL", "MongoDB"] },
  { name: "Cloud & DevOps", progress: 30, skills: ["AWS", "Docker"] },
];

const recommendations = [
  {
    title: "Complete React Advanced Patterns",
    type: "Course",
    duration: "4 weeks",
    priority: "high"
  },
  {
    title: "Build a Full-Stack E-commerce Project", 
    type: "Project",
    duration: "6 weeks",
    priority: "medium"
  },
  {
    title: "Learn AWS Cloud Fundamentals",
    type: "Certification",
    duration: "8 weeks", 
    priority: "low"
  }
];

export function SkillAssessment() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Track Your Progress
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Monitor your skill development and get personalized recommendations for your career growth
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Skill Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Skill Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {skillAreas.map((area, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{area.name}</h4>
                    <span className="text-sm text-muted-foreground">{area.progress}%</span>
                  </div>
                  <Progress value={area.progress} className="h-2" />
                  <div className="flex flex-wrap gap-1">
                    {area.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
              
              <Button className="w-full mt-6" asChild>
                <Link to="/assessment">
                  Take Full Assessment
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{rec.title}</h4>
                    <Badge 
                      variant={rec.priority === 'high' ? 'destructive' : rec.priority === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      {rec.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {rec.duration}
                    </span>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/recommendations">
                  View All Recommendations
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}