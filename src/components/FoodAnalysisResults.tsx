import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { X, Apple, Flame, Zap, Wheat, Droplets, Heart, AlertTriangle, CheckCircle } from "lucide-react";
import { FoodAnalysisResult } from "@/services/foodAnalysis";

interface FoodAnalysisResultsProps {
  result: FoodAnalysisResult;
  onClose: () => void;
  onAddToDaily: (result: FoodAnalysisResult) => void;
}

const FoodAnalysisResults: React.FC<FoodAnalysisResultsProps> = ({ result, onClose, onAddToDaily }) => {
  const getHealthScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-orange-500";
    return "text-red-500";
  };

  const getHealthScoreText = (score: number) => {
    if (score >= 8) return "Excellent";
    if (score >= 6) return "Bon";
    if (score >= 4) return "Moyen";
    return "À améliorer";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-md bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Apple className="w-5 h-5 text-primary" />
              Analyse du plat
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Nom du plat */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">{result.name}</h3>
            <Badge variant="secondary" className="mb-2">
              Confiance: {result.confidence}%
            </Badge>
          </div>

          {/* Score santé */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Score santé</span>
              <span className={`text-lg font-bold ${getHealthScoreColor(result.healthScore)}`}>
                {result.healthScore}/10
              </span>
            </div>
            <Progress value={result.healthScore * 10} className="h-2" />
            <p className={`text-sm mt-1 ${getHealthScoreColor(result.healthScore)}`}>
              {getHealthScoreText(result.healthScore)}
            </p>
          </div>

          {/* Informations nutritionnelles */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-calories/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-calories" />
                <span className="text-sm font-medium">Calories</span>
              </div>
              <span className="text-lg font-bold">{result.nutritionalInfo.calories}</span>
            </div>

            <div className="bg-protein/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-protein" />
                <span className="text-sm font-medium">Protéines</span>
              </div>
              <span className="text-lg font-bold">{result.nutritionalInfo.proteins}g</span>
            </div>

            <div className="bg-carbs/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Wheat className="w-4 h-4 text-carbs" />
                <span className="text-sm font-medium">Glucides</span>
              </div>
              <span className="text-lg font-bold">{result.nutritionalInfo.carbs}g</span>
            </div>

            <div className="bg-fats/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-4 h-4 text-fats" />
                <span className="text-sm font-medium">Lipides</span>
              </div>
              <span className="text-lg font-bold">{result.nutritionalInfo.fats}g</span>
            </div>
          </div>

          {/* Portion */}
          <div className="bg-muted rounded-lg p-3">
            <h4 className="font-medium mb-2">Portion</h4>
            <p className="text-sm text-muted-foreground">
              Taille: {result.portion.size} (~{result.portion.weight}g)
            </p>
          </div>

          {/* Ingrédients */}
          <div>
            <h4 className="font-medium mb-2">Ingrédients identifiés</h4>
            <div className="flex flex-wrap gap-1">
              {result.ingredients.map((ingredient, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>

          {/* Allergènes */}
          {result.allergies.length > 0 && (
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2 text-orange-600">
                <AlertTriangle className="w-4 h-4" />
                Allergènes potentiels
              </h4>
              <div className="flex flex-wrap gap-1">
                {result.allergies.map((allergy, index) => (
                  <Badge key={index} variant="destructive" className="text-xs">
                    {allergy}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Recommandations */}
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              Recommandations
            </h4>
            <ul className="space-y-1">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Fermer
            </Button>
            <Button onClick={() => onAddToDaily(result)} className="flex-1">
              Ajouter au journal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodAnalysisResults;