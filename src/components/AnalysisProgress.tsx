import { useState, useEffect } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalysisProgressProps {
  isAnalyzing: boolean;
  onComplete: () => void;
}

const AnalysisProgress = ({ isAnalyzing, onComplete }: AnalysisProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  const steps = [
    { progress: 20, message: "Analyse de l'image..." },
    { progress: 40, message: "Identification des aliments..." },
    { progress: 60, message: "Calcul des macronutriments..." },
    { progress: 80, message: "Génération du rapport..." },
    { progress: 100, message: "Analyse terminée !" }
  ];

  useEffect(() => {
    if (!isAnalyzing) {
      setProgress(0);
      setCurrentStep("");
      return;
    }

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setProgress(steps[stepIndex].progress);
        setCurrentStep(steps[stepIndex].message);
        stepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 2000); // Chaque étape dure 2 secondes

    return () => clearInterval(interval);
  }, [isAnalyzing, onComplete]);

  if (!isAnalyzing) return null;

  return (
    <div className="glass-card rounded-3xl p-6 shadow-elevated relative overflow-hidden mb-6">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
      
      <div className="relative">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">Analyzing food...</h3>
            <p className="text-sm text-muted-foreground">{currentStep}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary">{progress}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-3 bg-secondary" />
          <p className="text-xs text-muted-foreground text-center">
            We'll notify you when your analysis is complete
          </p>
        </div>

        {/* Recently logged indicator */}
        <div className="mt-4 p-3 bg-muted/30 rounded-xl">
          <p className="text-xs text-muted-foreground font-medium mb-2">Recently logged</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg"></div>
            </div>
            <div className="flex-1">
              <div className="h-3 bg-muted rounded-full mb-1 animate-pulse"></div>
              <div className="h-2 bg-muted/50 rounded-full w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisProgress;