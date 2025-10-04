import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Target, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Milestone {
  title: string;
  description: string;
  deadline: string;
  skills: string[];
  resources: string[];
  metrics: string;
  completed?: boolean;
}

interface Phase {
  phaseNumber: number;
  phaseName: string;
  description: string;
  duration: string;
  milestones: Milestone[];
}

interface Roadmap {
  goalTitle: string;
  estimatedDuration: string;
  phases: Phase[];
}

interface RoadmapDisplayProps {
  roadmap: Roadmap;
  onRegenerate: () => void;
}

export const RoadmapDisplay = ({ roadmap, onRegenerate }: RoadmapDisplayProps) => {
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([1]));
  const [completedMilestones, setCompletedMilestones] = useState<Set<string>>(new Set());

  const togglePhase = (phaseNumber: number) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseNumber)) {
      newExpanded.delete(phaseNumber);
    } else {
      newExpanded.add(phaseNumber);
    }
    setExpandedPhases(newExpanded);
  };

  const toggleMilestone = (phaseNumber: number, milestoneIndex: number) => {
    const key = `${phaseNumber}-${milestoneIndex}`;
    const newCompleted = new Set(completedMilestones);
    if (newCompleted.has(key)) {
      newCompleted.delete(key);
    } else {
      newCompleted.add(key);
    }
    setCompletedMilestones(newCompleted);
  };

  const totalMilestones = roadmap.phases.reduce((acc, phase) => acc + phase.milestones.length, 0);
  const completedCount = completedMilestones.size;
  const progressPercentage = (completedCount / totalMilestones) * 100;

  return (
    <section className="py-20 px-4">
      <div className="container max-w-5xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20">
            <Sparkles className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">Your Personalized Roadmap</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl">
            {roadmap.goalTitle}
          </h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Estimated Duration: {roadmap.estimatedDuration}</span>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="p-6 card-glass">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-heading text-lg">Overall Progress</h3>
                <p className="text-sm text-muted-foreground">
                  {completedCount} of {totalMilestones} milestones completed
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  {Math.round(progressPercentage)}%
                </div>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </Card>

        {/* Phases Timeline */}
        <div className="space-y-4">
          {roadmap.phases.map((phase, phaseIndex) => {
            const isExpanded = expandedPhases.has(phase.phaseNumber);
            const phaseMilestones = phase.milestones.length;
            const phaseCompleted = phase.milestones.filter((_, idx) => 
              completedMilestones.has(`${phase.phaseNumber}-${idx}`)
            ).length;
            const phaseProgress = (phaseCompleted / phaseMilestones) * 100;

            return (
              <Card 
                key={phase.phaseNumber}
                className="overflow-hidden card-glass hover-lift transition-all"
                style={{ animationDelay: `${phaseIndex * 0.1}s` }}
              >
                {/* Phase Header */}
                <button
                  onClick={() => togglePhase(phase.phaseNumber)}
                  className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant="outline" className="mb-2">
                            Phase {phase.phaseNumber}
                          </Badge>
                          <h3 className="font-heading text-xl">{phase.phaseName}</h3>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">{phase.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {phase.duration}
                        </span>
                        <span className="text-muted-foreground">
                          {phaseCompleted}/{phaseMilestones} milestones
                        </span>
                      </div>
                      <Progress value={phaseProgress} className="h-1" />
                    </div>
                  </div>
                </button>

                {/* Milestones */}
                {isExpanded && (
                  <div className="border-t border-border/50 bg-muted/20">
                    <div className="p-6 space-y-4">
                      {phase.milestones.map((milestone, mIdx) => {
                        const isCompleted = completedMilestones.has(`${phase.phaseNumber}-${mIdx}`);
                        
                        return (
                          <div
                            key={mIdx}
                            className={cn(
                              "p-4 rounded-lg border transition-all",
                              isCompleted 
                                ? "bg-success/5 border-success/20" 
                                : "bg-card border-border/50 hover:border-primary/30"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <Checkbox
                                checked={isCompleted}
                                onCheckedChange={() => toggleMilestone(phase.phaseNumber, mIdx)}
                                className="mt-1"
                              />
                              <div className="flex-1 space-y-3">
                                <div>
                                  <h4 className={cn(
                                    "font-medium",
                                    isCompleted && "line-through text-muted-foreground"
                                  )}>
                                    {milestone.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {milestone.description}
                                  </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  {milestone.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                      {milestone.skills.map((skill, sIdx) => (
                                        <Badge key={sIdx} variant="secondary" className="text-xs">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                <div className="text-xs text-muted-foreground">
                                  <span className="font-medium">Deadline:</span> {milestone.deadline}
                                </div>
                              </div>
                              {isCompleted && (
                                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg" onClick={onRegenerate}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Regenerate Roadmap
          </Button>
        </div>
      </div>
    </section>
  );
};
