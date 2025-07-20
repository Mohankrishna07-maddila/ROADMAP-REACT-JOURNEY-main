import { RoadmapCard } from "./RoadmapCard";
import { Code, Database, Globe, Smartphone, Brain, Shield, PenTool, TrendingUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const roadmaps = [
  {
    title: "Frontend Development",
    path: "frontend",
    description: "Master modern web development with React, TypeScript, and cutting-edge tools. Build responsive, interactive applications.",
    difficulty: "beginner" as const,
    duration: "6-8 months",
    learners: 0,
    skills: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Tailwind"],
    icon: <Code className="h-6 w-6 text-primary" />
  },
  {
    title: "Backend Development",
    path: "backend",
    description: "Learn server-side programming, databases, APIs, and cloud deployment. Build scalable backend systems.",
    difficulty: "intermediate" as const,
    duration: "8-10 months",
    learners: 0,
    skills: ["Node.js", "Python", "PostgreSQL", "Docker", "AWS"],
    icon: <Database className="h-6 w-6 text-primary" />
  },
  {
    title: "Full Stack Development",
    path: "full-stack",
    description: "Combine frontend and backend skills to build complete web applications from scratch to deployment.",
    difficulty: "advanced" as const,
    duration: "10-12 months",
    learners: 0,
    skills: ["React", "Node.js", "MongoDB", "GraphQL", "DevOps"],
    icon: <Globe className="h-6 w-6 text-primary" />
  },
  {
    title: "Mobile Development",
    path: "mobile",
    description: "Create native and cross-platform mobile apps for iOS and Android using modern frameworks.",
    difficulty: "intermediate" as const,
    duration: "7-9 months",
    learners: 0,
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
    icon: <Smartphone className="h-6 w-6 text-primary" />
  },
  {
    title: "Data Science & AI",
    path: "data-science",
    description: "Dive into machine learning, data analysis, and artificial intelligence to solve complex problems.",
    difficulty: "advanced" as const,
    duration: "12-15 months",
    learners: 0,
    skills: ["Python", "TensorFlow", "Pandas", "SQL", "Statistics"],
    icon: <Brain className="h-6 w-6 text-primary" />
  },
  {
    title: "Cybersecurity",
    path: "cybersecurity",
    description: "Protect digital assets and learn ethical hacking, network security, and risk management.",
    difficulty: "expert" as const,
    duration: "10-14 months",
    learners: 0,
    skills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Compliance"],
    icon: <Shield className="h-6 w-6 text-primary" />
  },
  {
    title: "UI/UX Design",
    path: "uiux",
    description: "Design beautiful and user-friendly interfaces with modern design principles and tools.",
    difficulty: "beginner" as const,
    duration: "4-6 months",
    learners: 0,
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
    icon: <PenTool className="h-6 w-6 text-primary" />
  },
  {
    title: "Digital Marketing",
    path: "digital-marketing",
    description: "Master online marketing strategies, SEO, social media, and analytics to grow businesses.",
    difficulty: "beginner" as const,
    duration: "3-5 months",
    learners: 0,
    skills: ["SEO", "Social Media", "Google Analytics", "Content Marketing", "PPC"],
    icon: <TrendingUp className="h-6 w-6 text-primary" />
  }
];

export function RoadmapGrid() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Back to Home Button */}
        <div className="mb-4">
          <Button asChild variant="ghost" size="sm" className="inline-flex items-center gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Career Path
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore curated learning roadmaps designed by industry experts to guide your professional growth
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {roadmaps.map((roadmap, index) => (
            <RoadmapCard key={index} {...roadmap} path={roadmap.path} />
          ))}
        </div>
      </div>
    </section>
  );
}