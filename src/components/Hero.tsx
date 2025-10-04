import { Button } from "@/components/ui/button";
import { Sparkles, Target, TrendingUp } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background animate-gradient" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Goal Achievement</span>
          </div>
          
          {/* Main heading */}
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-tight">
            Turn Your Dreams Into{" "}
            <span className="text-gradient">Daily Actions</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform abstract aspirations into structured, actionable roadmaps. 
            Let AI break down your goals into achievable milestones.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-glow hover:shadow-glow-lg transition-all"
              onClick={onGetStarted}
            >
              <Target className="w-5 h-5 mr-2" />
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 hover-lift"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              See Examples
            </Button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            {[
              { icon: Target, title: "Smart Planning", desc: "AI generates personalized roadmaps" },
              { icon: TrendingUp, title: "Track Progress", desc: "Visualize your journey with metrics" },
              { icon: Sparkles, title: "Stay Motivated", desc: "Gamification & community support" }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="card-glass p-6 rounded-2xl hover-lift"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
