import { useState } from "react";
import { Hero } from "@/components/Hero";
import { DreamInput } from "@/components/DreamInput";
import { RoadmapDisplay } from "@/components/RoadmapDisplay";

const Index = () => {
  const [showDreamInput, setShowDreamInput] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);

  const handleGetStarted = () => {
    setShowDreamInput(true);
    // Smooth scroll to dream input
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }, 100);
  };

  const handleRoadmapGenerated = (generatedRoadmap: any) => {
    setRoadmap(generatedRoadmap);
    // Scroll to roadmap
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' });
    }, 100);
  };

  const handleRegenerate = () => {
    setRoadmap(null);
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} />
      
      {showDreamInput && (
        <DreamInput onRoadmapGenerated={handleRoadmapGenerated} />
      )}
      
      {roadmap && (
        <RoadmapDisplay roadmap={roadmap} onRegenerate={handleRegenerate} />
      )}
    </div>
  );
};

export default Index;
