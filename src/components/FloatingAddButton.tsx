import { Plus } from "lucide-react";
import { useState } from "react";
import CameraScanner, { FoodAnalysisResult } from "./CameraScanner";
import { useToast } from "@/hooks/use-toast";

const FloatingAddButton = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAddFood = () => {
    setIsCameraOpen(true);
  };

  const handleAnalysisStarted = () => {
    setIsAnalyzing(true);
    // Émettre un événement personnalisé pour notifier la page Home
    window.dispatchEvent(new CustomEvent('analysisStarted'));
    toast({
      title: "Analyse démarrée !",
      description: "Redirection vers l'accueil pour suivre la progression",
    });
  };

  const handleFoodAnalyzed = (result: FoodAnalysisResult) => {
    setIsAnalyzing(false);
    // Émettre un événement personnalisé pour notifier la page Home
    window.dispatchEvent(new CustomEvent('analysisCompleted'));
    toast({
      title: "Aliment ajouté !",
      description: `${result.name} a été ajouté à votre journal alimentaire`,
    });
    setIsCameraOpen(false);
  };

  return (
    <>
      <button
        onClick={handleAddFood}
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full shadow-glow hover:shadow-elevated transition-all duration-300 hover:scale-110 flex items-center justify-center z-40 border-2 border-primary/20 backdrop-blur-sm animate-float"
        style={{ boxShadow: '0 0 30px hsl(var(--primary) / 0.4), 0 8px 25px hsl(0 0% 0% / 0.3)' }}
      >
        <Plus className="w-7 h-7" />
      </button>
      
      <CameraScanner 
        isOpen={isCameraOpen} 
        onClose={() => setIsCameraOpen(false)} 
        onFoodAnalyzed={handleFoodAnalyzed}
        onAnalysisStarted={handleAnalysisStarted}
      />
    </>
  );
};

export default FloatingAddButton;