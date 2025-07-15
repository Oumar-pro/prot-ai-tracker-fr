import { Plus } from "lucide-react";
import { useState } from "react";
import CameraScanner from "./CameraScanner";
import { FoodAnalysisResult } from "@/services/foodAnalysis";
import { useToast } from "@/hooks/use-toast";

const FloatingAddButton = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const { toast } = useToast();

  const handleAddFood = () => {
    setIsCameraOpen(true);
  };

  const handleFoodAnalyzed = (result: FoodAnalysisResult) => {
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
        className="fixed bottom-20 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center z-40"
      >
        <Plus className="w-6 h-6" />
      </button>
      
      <CameraScanner 
        isOpen={isCameraOpen} 
        onClose={() => setIsCameraOpen(false)} 
        onFoodAnalyzed={handleFoodAnalyzed}
      />
    </>
  );
};

export default FloatingAddButton;