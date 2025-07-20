import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Code, Users, Target, Clock, Star, ExternalLink, Play, Download, BookMarked, LogIn, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRoadmapClicks } from "@/contexts/RoadmapClickContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const courses = [
  {
    title: "Complete React Developer Course",
    provider: "Tech Academy",
    duration: "12 weeks",
    level: "Beginner to Advanced",
    rating: 4.8,
    students: "89,432",
    price: "Free",
    skills: ["React", "JavaScript", "HTML/CSS", "Redux"],
    description: "Master React from basics to advanced concepts with hands-on projects.",
    priority: "high",
    courseUrl: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
    previewUrl: "https://www.youtube.com/watch?v=dGcsHMXbSOA"
  },
  {
    title: "Full-Stack Web Development Bootcamp",
    provider: "Code Institute",
    duration: "16 weeks",
    level: "Intermediate",
    rating: 4.9,
    students: "45,231",
    price: "$199",
    skills: ["Node.js", "Express", "MongoDB", "React"],
    description: "Become a full-stack developer with this comprehensive bootcamp.",
    priority: "high",
    courseUrl: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
    previewUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE"
  },
  {
    title: "Python for Data Science",
    provider: "Data Academy",
    duration: "10 weeks",
    level: "Beginner",
    rating: 4.7,
    students: "67,890",
    price: "$99",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib"],
    description: "Learn Python programming specifically for data science applications.",
    priority: "medium",
    courseUrl: "https://www.coursera.org/learn/python-data-science",
    previewUrl: "https://www.youtube.com/watch?v=ua-CiDNNj30"
  },
  {
    title: "AWS Cloud Practitioner",
    provider: "AWS Training",
    duration: "8 weeks",
    level: "Beginner",
    rating: 4.6,
    students: "123,456",
    price: "$149",
    skills: ["AWS", "Cloud Computing", "EC2", "S3"],
    description: "Get certified in AWS and learn cloud computing fundamentals.",
    priority: "low",
    courseUrl: "https://aws.amazon.com/training/",
    previewUrl: "https://www.youtube.com/watch?v=SOTamWNgDKc"
  }
];

const projects = [
  {
    title: "E-commerce Website with React",
    difficulty: "Intermediate",
    duration: "4-6 weeks",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    description: "Build a complete e-commerce platform with user authentication, payment processing, and admin dashboard.",
    features: ["User Authentication", "Shopping Cart", "Payment Integration", "Order Management"],
    priority: "high",
    tutorialUrl: "https://www.youtube.com/watch?v=4UZrsTqkcW4",
    githubUrl: "https://github.com/example/ecommerce-react"
  },
  {
    title: "Task Management App",
    difficulty: "Beginner",
    duration: "2-3 weeks",
    technologies: ["React", "Local Storage", "CSS Grid"],
    description: "Create a productive task management application with drag-and-drop functionality.",
    features: ["Drag & Drop", "Local Storage", "Task Categories", "Progress Tracking"],
    priority: "high",
    tutorialUrl: "https://www.youtube.com/watch?v=Wm6CUkswsNw",
    githubUrl: "https://github.com/example/task-manager"
  },
  {
    title: "Weather Dashboard",
    difficulty: "Beginner",
    duration: "1-2 weeks",
    technologies: ["JavaScript", "Weather API", "Chart.js"],
    description: "Build a beautiful weather dashboard that displays current weather and forecasts.",
    features: ["API Integration", "Data Visualization", "Responsive Design", "Location Services"],
    priority: "medium",
    tutorialUrl: "https://www.youtube.com/watch?v=GXrDEA3SIOQ",
    githubUrl: "https://github.com/example/weather-dashboard"
  },
  {
    title: "Social Media Analytics Tool",
    difficulty: "Advanced",
    duration: "8-10 weeks",
    technologies: ["Python", "Flask", "PostgreSQL", "D3.js"],
    description: "Develop a comprehensive analytics tool for social media performance tracking.",
    features: ["Data Processing", "Real-time Analytics", "Custom Dashboards", "API Integration"],
    priority: "low",
    tutorialUrl: "https://www.youtube.com/watch?v=3QiPPX-KeSc",
    githubUrl: "https://github.com/example/social-analytics"
  }
];

const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    provider: "Amazon Web Services",
    duration: "2-3 months prep",
    level: "Foundational",
    cost: "$100",
    validity: "3 years",
    description: "Foundational certification for AWS cloud services and basic architecture principles.",
    benefits: ["Industry Recognition", "Salary Increase", "Career Advancement"],
    priority: "medium",
    studyUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    examUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner/"
  },
  {
    title: "Google Analytics Certified",
    provider: "Google",
    duration: "1-2 weeks prep",
    level: "Beginner",
    cost: "Free",
    validity: "1 year",
    description: "Demonstrate proficiency in Google Analytics and web analytics fundamentals.",
    benefits: ["Digital Marketing Skills", "Data Analysis", "Free Certification"],
    priority: "low",
    studyUrl: "https://analytics.google.com/analytics/academy/",
    examUrl: "https://analytics.google.com/analytics/academy/"
  },
  {
    title: "Certified Kubernetes Administrator",
    provider: "CNCF",
    duration: "3-4 months prep",
    level: "Advanced",
    cost: "$375",
    validity: "3 years",
    description: "Hands-on certification for Kubernetes administration and container orchestration.",
    benefits: ["High Demand Skill", "DevOps Career Path", "Premium Salary"],
    priority: "low",
    studyUrl: "https://www.cncf.io/certification/cka/",
    examUrl: "https://www.cncf.io/certification/cka/"
  }
];

export default function Recommendations() {
  const [previewModal, setPreviewModal] = useState<string | null>(null);
  const { incrementClick, getClickCount, isAuthenticated, hasUserClicked } = useRoadmapClicks();
  const { isAuthenticated: authIsAuthenticated } = useAuth();
  const { toast } = useToast();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const handleCoursePreview = (previewUrl: string) => {
    window.open(previewUrl, '_blank');
  };

  const handleCourseEnroll = (courseTitle: string, courseUrl: string) => {
    if (!authIsAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to enroll and be counted as a learner.",
        variant: "destructive",
      });
      window.location.href = '/login';
      return;
    }
    const wasCounted = incrementClick(`course-${courseTitle}`);
    if (wasCounted) {
      toast({
        title: "Welcome to the course!",
        description: "You've been added to the learners count. Happy learning!",
      });
    } else if (hasUserClicked(`course-${courseTitle}`)) {
      toast({
        title: "Already joined!",
        description: "You're already counted as a learner for this course.",
      });
    }
    window.open(courseUrl, '_blank');
  };

  const handleProjectStart = (projectTitle: string) => {
    // Open a project starter template or documentation
    const starterUrls = {
      "E-commerce Website with React": "https://create-react-app.dev/",
      "Task Management App": "https://vitejs.dev/guide/",
      "Weather Dashboard": "https://developer.mozilla.org/en-US/docs/Web/API/Weather_API",
      "Social Media Analytics Tool": "https://flask.palletsprojects.com/en/2.3.x/quickstart/"
    };
    
    const url = starterUrls[projectTitle as keyof typeof starterUrls] || "https://github.com/";
    window.open(url, '_blank');
  };

  const handleProjectTutorial = (tutorialUrl: string) => {
    window.open(tutorialUrl, '_blank');
  };

  const handleCertificationStart = (studyUrl: string) => {
    window.open(studyUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Learning Recommendations</h1>
            <p className="text-xl text-muted-foreground">
              Curated courses, projects, and certifications to accelerate your career growth
            </p>
          </div>

          <Tabs defaultValue="courses" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="certifications" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Certifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course, index) => {
                  const courseKey = `course-${course.title}`;
                  const userHasClicked = hasUserClicked(courseKey);
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant={getPriorityColor(course.priority)}>
                            {course.priority} priority
                          </Badge>
                          <Badge variant="outline" className="bg-primary/5">
                            {course.price}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <p className="text-muted-foreground">{course.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              {course.rating}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {getClickCount(courseKey).toLocaleString()} learners
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
                            </span>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium mb-2">Skills you'll learn:</p>
                            <div className="flex flex-wrap gap-1">
                              {course.skills.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              className="flex-1" 
                              onClick={() => handleCourseEnroll(course.title, course.courseUrl)}
                              variant={userHasClicked ? "outline" : "default"}
                            >
                              {!authIsAuthenticated ? (
                                <>
                                  <LogIn className="mr-2 h-4 w-4" />
                                  Sign in to Enroll
                                </>
                              ) : userHasClicked ? (
                                <>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Continue Course
                                  <ExternalLink className="ml-2 h-4 w-4" />
                                </>
                              ) : (
                                <>
                                  Enroll Now
                                  <ExternalLink className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                            <Button variant="outline" onClick={() => handleCoursePreview(course.previewUrl)}>
                              <Play className="mr-2 h-4 w-4" />
                              Preview
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant={getPriorityColor(project.priority)}>
                          {project.priority} priority
                        </Badge>
                        <Badge variant="outline">
                          {project.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <p className="text-muted-foreground">{project.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {project.duration}
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-2">Technologies:</p>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Key Features:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {project.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1" onClick={() => handleProjectStart(project.title)}>
                            <Code className="mr-2 h-4 w-4" />
                            Start Building
                          </Button>
                          <Button variant="outline" onClick={() => handleProjectTutorial(project.tutorialUrl)}>
                            <Play className="mr-2 h-4 w-4" />
                            View Tutorial
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="certifications" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant={getPriorityColor(cert.priority)}>
                          {cert.priority} priority
                        </Badge>
                        <Badge variant="outline">{cert.level}</Badge>
                      </div>
                      <CardTitle className="text-lg">{cert.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{cert.provider}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm">{cert.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Cost:</span>
                            <p className="text-muted-foreground">{cert.cost}</p>
                          </div>
                          <div>
                            <span className="font-medium">Prep Time:</span>
                            <p className="text-muted-foreground">{cert.duration}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Benefits:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {cert.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button className="w-full" onClick={() => handleCertificationStart(cert.studyUrl)}>
                          <BookMarked className="mr-2 h-4 w-4" />
                          Start Preparation
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}