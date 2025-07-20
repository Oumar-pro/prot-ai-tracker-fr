import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProfile, calculateBMI } from "@/hooks/useProfile";

const WeightOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("90 Days");
  const { toast } = useToast();
  const { t } = useLanguage();
  const { data: profile } = useProfile();

  const periods = ["90 Days", "6 Months", "1 Year", "All time"];
  
  const currentWeight = profile?.weight || 0;
  const targetWeight = profile?.desired_weight || 0;
  const height = profile?.height || 0;
  const bmi = height && currentWeight ? calculateBMI(currentWeight, height) : 0;
  
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: t('underweight'), color: 'blue' };
    if (bmi < 25) return { category: t('healthy'), color: 'green' };
    if (bmi < 30) return { category: t('overweight'), color: 'yellow' };
    return { category: t('obese'), color: 'red' };
  };

  const handleUpdateWeight = () => {
    toast({
      title: "Mise à jour du poids",
      description: "Fonctionnalité de mise à jour du poids à venir !",
    });
  };

  const handleLogWeight = () => {
    toast({
      title: "Enregistrer le poids",
      description: "Fonctionnalité d'enregistrement du poids à venir !",
    });
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border mb-6">
      {/* Objectif de poids */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">{t('weight_goal')}</h2>
        <Button variant="outline" size="sm" onClick={handleUpdateWeight}>
          {t('update')}
        </Button>
      </div>
      
      <div className="text-3xl font-bold text-foreground mb-4">
        {targetWeight ? `${targetWeight} kg` : '-'}
      </div>

      {/* Poids actuel */}
      <div className="mb-4">
        <h3 className="text-base font-medium text-foreground mb-2">{t('current_weight')}</h3>
        <div className="bg-muted rounded-lg p-4 mb-2">
          <div className="text-3xl font-bold text-foreground mb-1">
            {currentWeight ? `${currentWeight} kg` : '-'}
          </div>
          <p className="text-sm text-muted-foreground">
            {t('try_weigh_weekly')}
          </p>
        </div>
        
        <Button 
          onClick={handleLogWeight}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {t('log_weight')}
        </Button>
      </div>

      {/* IMC */}
      {bmi > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-base font-medium text-foreground">{t('your_bmi')}</h3>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <span className="text-muted-foreground">{t('your_weight_is')}</span>
            <span className={`px-2 py-1 rounded text-sm font-medium ${
              getBMICategory(bmi).color === 'green' ? 'bg-green-100 text-green-800' :
              getBMICategory(bmi).color === 'blue' ? 'bg-blue-100 text-blue-800' :
              getBMICategory(bmi).color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {getBMICategory(bmi).category}
            </span>
          </div>
          
          <div className="text-2xl font-bold text-foreground mb-3">{bmi.toFixed(2)}</div>
        
        {/* Barre de progression IMC */}
        <div className="relative mb-3">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full"></div>
          <div className="absolute top-0 left-1/4 w-0.5 h-2 bg-black"></div>
        </div>
        
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>● {t('underweight')}</span>
            <span>● {t('healthy')}</span>
            <span>● {t('overweight')}</span>
            <span>● {t('obese')}</span>
          </div>
        </div>
      )}

      {/* Progression de l'objectif */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-medium text-foreground">{t('goal_progress')}</h3>
          <span className="text-sm text-muted-foreground">
            {currentWeight && targetWeight ? 
              `${Math.max(0, Math.round(((Math.abs(currentWeight - targetWeight) - Math.abs(currentWeight - targetWeight)) / Math.abs(currentWeight - targetWeight)) * 100))}% ${t('goal_reached')}` :
              `0.0% ${t('goal_reached')}`
            }
          </span>
        </div>
        
        {/* Sélecteur de période */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedPeriod === period
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
        
        {/* Graphique de progression */}
        <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-sm">{t('progress_chart')}</div>
            <div className="text-xs">{t('no_data_available')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightOverview;