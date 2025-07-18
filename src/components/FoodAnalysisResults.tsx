import React, { useState } from "react";
import { ArrowLeft, Flame, Zap, Wheat, Droplets, Heart, MoreHorizontal, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FoodAnalysisResult } from "./CameraScanner";

interface FoodAnalysisResultsProps {
  result: FoodAnalysisResult;
  onClose: () => void;
  onAddToDaily: (result: FoodAnalysisResult) => void;
}

const FoodAnalysisResults: React.FC<FoodAnalysisResultsProps> = ({ result, onClose, onAddToDaily }) => {
  const [portionCount, setPortionCount] = useState(1);

  const adjustedNutrition = {
    calories: Math.round(result.nutritionalInfo.calories * portionCount),
    proteins: Math.round(result.nutritionalInfo.proteins * portionCount),
    carbs: Math.round(result.nutritionalInfo.carbs * portionCount),
    fats: Math.round(result.nutritionalInfo.fats * portionCount),
  };

  const handleAddToDaily = () => {
    const adjustedResult = {
      ...result,
      nutritionalInfo: {
        ...result.nutritionalInfo,
        calories: adjustedNutrition.calories,
        proteins: adjustedNutrition.proteins,
        carbs: adjustedNutrition.carbs,
        fats: adjustedNutrition.fats,
      }
    };
    onAddToDaily(adjustedResult);
  };

  const healthScoreColor = result.healthScore >= 7 ? "bg-green-500" : result.healthScore >= 5 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12 bg-background border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="w-10 h-10 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <h1 className="text-lg font-semibold text-foreground">Nutrition</h1>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full"
        >
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Food Image */}
        <div className="relative h-80 bg-gradient-to-br from-amber-400 to-orange-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <div className="w-32 h-32 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                <Wheat className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Meal Title and Portion Counter */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-medium mb-1">Breakfast</p>
              <h2 className="text-2xl font-bold text-foreground">{result.name}</h2>
            </div>
            
            {/* Portion Counter */}
            <div className="flex items-center gap-4 bg-muted rounded-full px-4 py-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPortionCount(Math.max(1, portionCount - 1))}
                className="w-8 h-8 rounded-full"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-lg font-semibold min-w-[2rem] text-center">{portionCount}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPortionCount(portionCount + 1)}
                className="w-8 h-8 rounded-full"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Nutrition Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Calories</p>
                <p className="text-xl font-bold text-foreground">{adjustedNutrition.calories}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Wheat className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Carbs</p>
                <p className="text-xl font-bold text-foreground">{adjustedNutrition.carbs}g</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Protein</p>
                <p className="text-xl font-bold text-foreground">{adjustedNutrition.proteins}g</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fats</p>
                <p className="text-xl font-bold text-foreground">{adjustedNutrition.fats}g</p>
              </div>
            </div>
          </div>

          {/* Health Score */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-600" />
                </div>
                <span className="text-lg font-semibold text-foreground">Health score</span>
              </div>
              <span className="text-2xl font-bold text-foreground">{result.healthScore}/10</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${healthScoreColor} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${result.healthScore * 10}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1 h-12 rounded-full"
            onClick={onClose}
          >
            <span className="mr-2">✦</span> Fix Results
          </Button>
          <Button 
            className="flex-1 h-12 rounded-full bg-foreground text-background hover:bg-foreground/90"
            onClick={handleAddToDaily}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodAnalysisResults;