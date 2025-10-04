import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DreamInputProps {
  onRoadmapGenerated: (roadmap: any) => void;
}

const CATEGORIES = [
  { id: "startup", label: "Startup/Business", emoji: "🚀" },
  { id: "academic", label: "Academic", emoji: "📚" },
  { id: "personal", label: "Personal Growth", emoji: "🌱" },
  { id: "fitness", label: "Health & Fitness", emoji: "💪" },
  { id: "creative", label: "Creative", emoji: "🎨" },
  { id: "other", label: "Other", emoji: "✨" },
];

export const DreamInput = ({ onRoadmapGenerated }: DreamInputProps) => {
  const [dream, setDream] = useState("");
  const [category, setCategory] = useState("other");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const charCount = dream.length;
  const isValid = charCount >= 50 && charCount <= 500;

  const handleGenerate = async () => {
    if (!isValid) {
      toast({
        title: "Invalid input",
        description: "Please enter between 50 and 500 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-roadmap', {
        body: { dream, category }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      toast({
        title: "Roadmap generated!",
        description: "Your personalized action plan is ready.",
      });

      onRoadmapGenerated(data.roadmap);
    } catch (error: any) {
      console.error('Error generating roadmap:', error);
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container max-w-3xl mx-auto">
        <Card className="p-8 card-glass animate-scale-in">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
                <Lightbulb className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Dream Builder</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl">
                Describe Your Dream
              </h2>
              <p className="text-muted-foreground">
                Be as specific as possible. The more details you provide, the better your roadmap.
              </p>
            </div>

            {/* Category Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Select Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <Badge
                    key={cat.id}
                    variant={category === cat.id ? "default" : "outline"}
                    className="cursor-pointer hover-lift px-4 py-2"
                    onClick={() => setCategory(cat.id)}
                  >
                    <span className="mr-1">{cat.emoji}</span>
                    {cat.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Dream Input */}
            <div className="space-y-2">
              <Textarea
                placeholder="Example: I want to build a successful SaaS startup that helps people manage their time better. I have basic coding skills but need to learn more about business and marketing..."
                value={dream}
                onChange={(e) => setDream(e.target.value)}
                className="min-h-[200px] text-base resize-none"
                disabled={isLoading}
              />
              <div className="flex justify-between text-sm">
                <span className={charCount < 50 ? "text-muted-foreground" : "text-success"}>
                  Minimum 50 characters
                </span>
                <span className={charCount > 500 ? "text-destructive" : "text-muted-foreground"}>
                  {charCount}/500
                </span>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              size="lg"
              className="w-full text-lg shadow-glow"
              onClick={handleGenerate}
              disabled={!isValid || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Your Roadmap...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate AI Roadmap
                </>
              )}
            </Button>

            {isLoading && (
              <div className="text-center text-sm text-muted-foreground animate-pulse">
                <p className="italic">"The journey of a thousand miles begins with one step." - Lao Tzu</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};
