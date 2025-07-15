import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FloatingAddButton = () => {
  const { toast } = useToast();

  const handleAddFood = () => {
    toast({
      title: "Ajouter un aliment",
      description: "Fonctionnalité d'ajout d'aliments à venir !",
    });
  };

  return (
    <button
      onClick={handleAddFood}
      className="fixed bottom-20 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center z-40"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
};

export default FloatingAddButton;