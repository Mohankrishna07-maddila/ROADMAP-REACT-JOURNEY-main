import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { RoadmapGrid } from "@/components/RoadmapGrid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Filter, Star, Clock, Users, TrendingUp, X, LogIn, ArrowRight, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRoadmapClicks } from "@/contexts/RoadmapClickContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const allRoadmaps = [
  {
    title: "Frontend Development",
    description: "Master modern frontend technologies and build beautiful, responsive web applications",
    difficulty: "Beginner",
    duration: "6-8 months",
    learners: "0",
    skills: ["HTML/CSS", "JavaScript", "React", "TypeScript"],
    category: "Development",
    trending: true,
    path: "frontend"
  },
  {
    title: "Backend Development", 
    description: "Build robust server-side applications with modern backend technologies",
    difficulty: "Intermediate",
    duration: "8-10 months",
    learners: "0",
    skills: ["Node.js", "Express", "Database Design", "APIs"],
    category: "Development",
    trending: true,
    path: "backend"
  },
  {
    title: "Data Science",
    description: "Learn to extract insights from data using Python, machine learning, and statistics",
    difficulty: "Advanced", 
    duration: "10-12 months",
    learners: "0",
    skills: ["Python", "Statistics", "Machine Learning", "Data Visualization"],
    category: "Data",
    trending: false,
    path: "data-science"
  },
  {
    title: "UI/UX Design",
    description: "Design beautiful and intuitive user experiences for web and mobile applications",
    difficulty: "Beginner",
    duration: "4-6 months", 
    learners: "0",
    skills: ["Figma", "Design Principles", "Prototyping", "User Research"],
    category: "Design",
    trending: true,
    path: "uiux"
  },
  {
    title: "Mobile Development",
    description: "Build native and cross-platform mobile applications for iOS and Android",
    difficulty: "Intermediate",
    duration: "8-10 months",
    learners: "0",
    skills: ["React Native", "Flutter", "iOS", "Android"],
    category: "Development", 
    trending: false,
    path: "mobile"
  },
  {
    title: "DevOps Engineering",
    description: "Master deployment, automation, and infrastructure management for modern applications",
    difficulty: "Advanced",
    duration: "10-12 months",
    learners: "0",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    category: "Operations",
    trending: true,
    path: "devops"
  },
  {
    title: "Cybersecurity",
    description: "Protect systems and data from digital threats with comprehensive security practices",
    difficulty: "Advanced",
    duration: "12-15 months",
    learners: "0",
    skills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Compliance"],
    category: "Security",
    trending: false,
    path: "cybersecurity"
  },
  {
    title: "Machine Learning Engineer",
    description: "Deploy and maintain ML models in production environments at scale",
    difficulty: "Advanced",
    duration: "12-14 months", 
    learners: "0",
    skills: ["MLOps", "TensorFlow", "Model Deployment", "Data Engineering"],
    category: "Data",
    trending: true,
    path: "ml-engineer"
  }
];

const categories = ["All", "Development", "Data", "Design", "Operations", "Security"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const { incrementClick, getClickCount, isAuthenticated, hasUserClicked } = useRoadmapClicks();
  const { isAuthenticated: authIsAuthenticated } = useAuth();
  const { toast } = useToast();

  const filteredRoadmaps = allRoadmaps.filter(roadmap => {
    const matchesSearch = roadmap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roadmap.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roadmap.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || roadmap.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || roadmap.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'Advanced': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
  };

  const hasActiveFilters = searchTerm || selectedCategory !== "All" || selectedDifficulty !== "All";

  const handleStartLearning = (roadmapPath: string) => {
    if (!authIsAuthenticated) {
      // Show sign-in prompt for unauthenticated users
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back to Home Button */}
        <div className="mb-4">
          <Button asChild variant="ghost" size="sm" className="inline-flex items-center gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Explore All Roadmaps</h1>
          <p className="text-xl text-muted-foreground">
            Discover comprehensive learning paths for every tech career
          </p>
          {!authIsAuthenticated && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Sign in to start learning and be counted as a member of our community!
              </p>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search roadmaps, skills, or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                    {[searchTerm, selectedCategory !== "All", selectedDifficulty !== "All"].filter(Boolean).length}
                  </Badge>
                )}
              </Button>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
              <div>
                <h3 className="font-medium mb-2">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Difficulty</h3>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map(difficulty => (
                    <Button
                      key={difficulty}
                      variant={selectedDifficulty === difficulty ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDifficulty(difficulty)}
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {filteredRoadmaps.length} roadmap{filteredRoadmaps.length !== 1 ? 's' : ''} found
            </p>
            {filteredRoadmaps.length > 0 && (
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Most popular first</span>
              </div>
            )}
          </div>
        </div>

        {/* Roadmaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoadmaps.map((roadmap, index) => {
            const userHasClicked = hasUserClicked(roadmap.path);
            
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-2">{roadmap.title}</CardTitle>
                      <Badge className={`${getDifficultyColor(roadmap.difficulty)} text-xs`}>
                        {roadmap.difficulty}
                      </Badge>
                    </div>
                    {roadmap.trending && (
                      <Badge variant="destructive" className="text-xs">
                        Trending
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {roadmap.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {getClickCount(roadmap.path).toLocaleString()}
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
                      <p className="text-sm font-medium mb-2">Key Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {roadmap.skills.slice(0, 3).map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {roadmap.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{roadmap.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleStartLearning(roadmap.path)}
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
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredRoadmaps.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No roadmaps found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button variant="outline" onClick={clearAllFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}