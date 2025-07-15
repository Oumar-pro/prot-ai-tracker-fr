import { Plus } from "lucide-react";
import { useState } from "react";
import CameraScanner from "./CameraScanner";

const FloatingAddButton = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleAddFood = () => {
    setIsCameraOpen(true);
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
      />
    </>
  );
};

export default FloatingAddButton;