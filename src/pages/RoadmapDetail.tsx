import { useParams, Link } from "react-router-dom";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Clock, Star, Users, Play } from "lucide-react";
import { useState, useEffect } from "react";

const roadmapData = {
  frontend: {
    title: "Frontend Development",
    description: "Master modern frontend technologies and build beautiful, responsive web applications",
    difficulty: "Beginner",
    duration: "6-8 months",
    learners: "45,231",
    skills: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS"],
    steps: [
      { id: 1, title: "HTML & CSS Fundamentals", completed: true, duration: "2 weeks" },
      { id: 2, title: "JavaScript Basics", completed: true, duration: "3 weeks" },
      { id: 3, title: "DOM Manipulation", completed: false, duration: "2 weeks" },
      { id: 4, title: "React Fundamentals", completed: false, duration: "4 weeks" },
      { id: 5, title: "State Management", completed: false, duration: "3 weeks" },
      { id: 6, title: "Advanced React Patterns", completed: false, duration: "4 weeks" },
      { id: 7, title: "TypeScript Integration", completed: false, duration: "3 weeks" },
      { id: 8, title: "Testing & Deployment", completed: false, duration: "2 weeks" }
    ]
  },
  backend: {
    title: "Backend Development",
    description: "Build robust server-side applications with modern backend technologies",
    difficulty: "Intermediate",
    duration: "8-10 months",
    learners: "32,156",
    skills: ["Node.js", "Express", "Database Design", "APIs", "Authentication"],
    steps: [
      { id: 1, title: "Server Fundamentals", completed: false, duration: "2 weeks" },
      { id: 2, title: "Node.js & Express", completed: false, duration: "4 weeks" },
      { id: 3, title: "Database Design", completed: false, duration: "3 weeks" },
      { id: 4, title: "RESTful APIs", completed: false, duration: "3 weeks" },
      { id: 5, title: "Authentication & Security", completed: false, duration: "4 weeks" },
      { id: 6, title: "Testing & Documentation", completed: false, duration: "3 weeks" },
      { id: 7, title: "DevOps & Deployment", completed: false, duration: "4 weeks" },
      { id: 8, title: "Microservices Architecture", completed: false, duration: "5 weeks" }
    ]
  },
  "data-science": {
    title: "Data Science",
    description: "Learn to extract insights from data using Python, machine learning, and statistics",
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
                    {roadmap.learners} learners
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
                  <Button className="w-full" size="lg">
                    Start Learning
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