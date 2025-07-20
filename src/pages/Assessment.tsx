import { useState } from "react";
import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, Clock, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const questions = [
  {
    id: 1,
    category: "Programming Languages",
    question: "Which programming language are you most comfortable with?",
    options: [
      { value: "javascript", label: "JavaScript", points: 3 },
      { value: "python", label: "Python", points: 4 },
      { value: "java", label: "Java", points: 3 },
      { value: "csharp", label: "C#", points: 3 },
      { value: "none", label: "I'm new to programming", points: 0 }
    ]
  },
  {
    id: 2,
    category: "Web Development",
    question: "How familiar are you with HTML and CSS?",
    options: [
      { value: "expert", label: "Expert - I can build complex layouts", points: 4 },
      { value: "intermediate", label: "Intermediate - I know the basics well", points: 3 },
      { value: "beginner", label: "Beginner - I've done some tutorials", points: 2 },
      { value: "none", label: "I haven't learned HTML/CSS yet", points: 0 }
    ]
  },
  {
    id: 3,
    category: "Frameworks",
    question: "Which frontend framework/library have you used?",
    options: [
      { value: "react", label: "React", points: 4 },
      { value: "vue", label: "Vue.js", points: 4 },
      { value: "angular", label: "Angular", points: 4 },
      { value: "vanilla", label: "Only vanilla JavaScript", points: 2 },
      { value: "none", label: "None", points: 0 }
    ]
  },
  {
    id: 4,
    category: "Database Management",
    question: "What's your experience with databases?",
    options: [
      { value: "advanced", label: "Advanced - Complex queries and optimization", points: 4 },
      { value: "intermediate", label: "Intermediate - Basic CRUD operations", points: 3 },
      { value: "beginner", label: "Beginner - Simple SELECT queries", points: 2 },
      { value: "none", label: "No database experience", points: 0 }
    ]
  },
  {
    id: 5,
    category: "Cloud & DevOps",
    question: "How familiar are you with cloud platforms and DevOps?",
    options: [
      { value: "expert", label: "Expert - I deploy and manage applications", points: 4 },
      { value: "intermediate", label: "Intermediate - I've used cloud services", points: 3 },
      { value: "beginner", label: "Beginner - I know the concepts", points: 1 },
      { value: "none", label: "No experience", points: 0 }
    ]
  }
];

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const categoryScores: Record<string, { total: number, max: number }> = {};
    
    questions.forEach(q => {
      const answer = answers[q.id];
      const option = q.options.find(opt => opt.value === answer);
      const points = option?.points || 0;
      
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = { total: 0, max: 4 };
      }
      categoryScores[q.category].total = Math.max(categoryScores[q.category].total, points);
    });

    return Object.entries(categoryScores).map(([category, scores]) => ({
      category,
      percentage: Math.round((scores.total / scores.max) * 100),
      level: scores.total >= 3 ? 'Advanced' : scores.total >= 2 ? 'Intermediate' : scores.total >= 1 ? 'Beginner' : 'Not Started'
    }));
  };

  const getRecommendations = (results: ReturnType<typeof calculateResults>) => {
    const recommendations = [];
    
    results.forEach(result => {
      if (result.percentage < 50) {
        switch (result.category) {
          case 'Programming Languages':
            recommendations.push({
              title: 'Learn JavaScript Fundamentals',
              description: 'Start with the most popular programming language for web development',
              priority: 'high',
              duration: '4-6 weeks'
            });
            break;
          case 'Web Development':
            recommendations.push({
              title: 'HTML & CSS Bootcamp',
              description: 'Master the building blocks of web development',
              priority: 'high',
              duration: '3-4 weeks'
            });
            break;
          case 'Frameworks':
            recommendations.push({
              title: 'React Beginner Course',
              description: 'Learn the most popular frontend framework',
              priority: 'medium',
              duration: '6-8 weeks'
            });
            break;
          case 'Database Management':
            recommendations.push({
              title: 'SQL Fundamentals',
              description: 'Learn to work with databases effectively',
              priority: 'medium',
              duration: '4-5 weeks'
            });
            break;
          case 'Cloud & DevOps':
            recommendations.push({
              title: 'AWS Cloud Fundamentals',
              description: 'Get started with cloud computing',
              priority: 'low',
              duration: '6-8 weeks'
            });
            break;
        }
      }
    });

    return recommendations;
  };

  if (showResults) {
    const results = calculateResults();
    const recommendations = getRecommendations(results);

    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        
        <main className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Your Skill Assessment Results</h1>
              <p className="text-xl text-muted-foreground">
                Here's your personalized learning roadmap based on your current skills
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Skill Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {results.map((result, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{result.category}</span>
                        <Badge variant={
                          result.level === 'Advanced' ? 'default' :
                          result.level === 'Intermediate' ? 'secondary' :
                          result.level === 'Beginner' ? 'outline' : 'destructive'
                        }>
                          {result.level}
                        </Badge>
                      </div>
                      <Progress value={result.percentage} className="h-2" />
                      <p className="text-sm text-muted-foreground">{result.percentage}% proficiency</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Recommended Learning Path
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.length > 0 ? (
                    recommendations.map((rec, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{rec.title}</h4>
                          <Badge variant={
                            rec.priority === 'high' ? 'destructive' :
                            rec.priority === 'medium' ? 'default' : 'secondary'
                          }>
                            {rec.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {rec.duration}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Great job!</h3>
                      <p className="text-muted-foreground">
                        You're doing well across all areas. Consider exploring advanced topics or specializing in a specific area.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8 space-y-4">
              <Button size="lg" asChild>
                <Link to="/recommendations">View Detailed Recommendations</Link>
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retake Assessment
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Skill Assessment</h1>
              <Badge variant="outline">
                {currentQuestion + 1} of {questions.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">{question.category}</Badge>
              <CardTitle className="text-xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[question.id] || ""}
                onValueChange={(value) => handleAnswer(question.id, value)}
                className="space-y-4"
              >
                {question.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={!answers[question.id]}
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Assessment' : 'Next Question'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}