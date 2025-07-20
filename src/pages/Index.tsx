import { NavigationHeader } from "@/components/NavigationHeader";
import { HeroSection } from "@/components/HeroSection";
import { RoadmapGrid } from "@/components/RoadmapGrid";
import { SkillAssessment } from "@/components/SkillAssessment";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <HeroSection />
      <RoadmapGrid />
      <SkillAssessment />
      <Footer />
    </div>
  );
};

export default Index;
