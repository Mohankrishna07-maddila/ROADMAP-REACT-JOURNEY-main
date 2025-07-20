import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="hero-section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800"></div>
      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your <span className="text-yellow-300">Career Journey</span> Starts Here
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Navigate your career path with personalized roadmaps, skill tracking, and expert guidance
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" onClick={() => navigate('/explore')}>
              Explore Roadmaps
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600" onClick={() => navigate('/assessment')}>
              Take Skill Assessment
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg">
              <Users className="h-12 w-12 mb-4 text-yellow-300" />
              <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
              <p className="text-sm opacity-80">Learn from experienced professionals and mentors</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg">
              <BookOpen className="h-12 w-12 mb-4 text-yellow-300" />
              <h3 className="text-lg font-semibold mb-2">Curated Resources</h3>
              <p className="text-sm opacity-80">Access handpicked learning materials and projects</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg">
              <Target className="h-12 w-12 mb-4 text-yellow-300" />
              <h3 className="text-lg font-semibold mb-2">Skill-Based Tracking</h3>
              <p className="text-sm opacity-80">Monitor progress and identify growth opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}