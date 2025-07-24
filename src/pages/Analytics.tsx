import { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { BMIDisplay } from "@/components/nutrition/bmi-display";
import { WeightTracker } from "@/components/nutrition/weight-tracker";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext"; // Import du hook de langue
import { useTodayMacros } from "@/hooks/useFoodAnalyses"; // Import des macros
import { useProfile, calculateDailyCalories } from "@/hooks/useProfile"; // Import du profil et calcul des calories
import { Zap, Wheat, Droplets } from "lucide-react"; // Import des icônes Lucide

export function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('90days');
  const [selectedNutritionPeriod, setSelectedNutritionPeriod] = useState('thisWeek'); // Nouvelle variable pour la période de nutrition

  const { profile: userProfile, getCurrentBMI, addWeightEntry, setProfile } = useUserStore(); // Renommé pour éviter le conflit
  const { t } = useLanguage(); // Initialisation de la fonction de traduction

  const { data: todayMacros } = useTodayMacros(); // Macros du jour (pour le résumé nutritionnel)
  const { data: appProfile } = useProfile(); // Profil de l'application (pour les objectifs)

  // Calcul du BMI
  const bmi = getCurrentBMI();

  const periods = [
    { id: '90days', label: t('90_days') },
    { id: '6months', label: t('6_months') },
    { id: '1year', label: t('1_year') },
    { id: 'alltime', label: t('all_time') },
  ];

  const nutritionPeriods = [
    { id: 'thisWeek', label: t('this_week') },
    { id: 'lastWeek', label: t('last_week') },
    { id: '2weeksAgo', label: t('2_weeks_ago') },
  ];

  const handleUpdateTarget = () => {
    const newTarget = prompt(t('new_target_weight_prompt'), userProfile.targetWeight?.toString() || '');
    if (newTarget && !isNaN(Number(newTarget))) {
      setProfile({ targetWeight: Number(newTarget) });
      toast({
        title: t('target_updated'),
        description: t('target_updated_desc', { newTarget: newTarget }),
      });
    } else if (newTarget !== null) { // If user didn't cancel but entered invalid input
      toast({
        title: t('input_error'),
        description: t('please_enter_valid_number'),
        variant: "destructive"
      });
    }
  };

  const handleRecordWeight = () => {
    const newWeight = prompt(t('current_weight_prompt'), userProfile.currentWeight?.toString() || '');
    if (newWeight && !isNaN(Number(newWeight))) {
      const today = new Date().toISOString().split('T')[0];
      setProfile({ currentWeight: Number(newWeight) });
      addWeightEntry({ date: today, weight: Number(newWeight) });
      toast({
        title: t('weight_recorded'),
        description: t('weight_recorded_desc', { newWeight: newWeight }),
      });
    } else if (newWeight !== null) { // If user didn't cancel but entered invalid input
      toast({
        title: t('input_error'),
        description: t('please_enter_valid_number'),
        variant: "destructive"
      });
    }
  };

  // Calcul de la progression de l'objectif de poids
  // Correction pour éviter NaN et gérer les cas où les poids sont identiques ou manquants
  const progressPercentage = (() => {
    if (!userProfile || userProfile.currentWeight === undefined || userProfile.targetWeight === undefined) {
        return 0; // Ou une autre valeur par défaut si les données ne sont pas prêtes
    }

    const startWeight = userProfile.initialWeight || userProfile.currentWeight; // Utiliser un poids initial si disponible
    const current = userProfile.currentWeight;
    const target = userProfile.targetWeight;

    if (startWeight === target) return 100; // Si l'objectif est le poids de départ, 100%
    if (current === target) return 100; // Si le poids actuel est l'objectif, 100%

    // Calcul si l'objectif est de perdre ou prendre du poids
    if (startWeight > target) { // Objectif de perte de poids
        if (current >= startWeight) return 0; // Pas de progrès si le poids a augmenté ou stagne au-dessus du départ
        if (current <= target) return 100; // Si l'objectif est atteint ou dépassé (dans le bon sens)
        return Math.round(((startWeight - current) / (startWeight - target)) * 100);
    } else { // Objectif de prise de poids
        if (current <= startWeight) return 0; // Pas de progrès si le poids a diminué ou stagne en dessous du départ
        if (current >= target) return 100; // Si l'objectif est atteint ou dépassé (dans le bon sens)
        return Math.round(((current - startWeight) / (target - startWeight)) * 100);
    }
  })();


  // Calcul des objectifs macro journaliers à partir du profil de l'application
  const dailyGoals = appProfile ? {
    calories: calculateDailyCalories(appProfile),
    proteins: Math.round((calculateDailyCalories(appProfile) * 0.25) / 4), // 25% of calories from protein
    carbs: Math.round((calculateDailyCalories(appProfile) * 0.45) / 4), // 45% of calories from carbs
    fats: Math.round((calculateDailyCalories(appProfile) * 0.30) / 9), // 30% of calories from fats
  } : {
    calories: 2100, // Valeurs par défaut si le profil n'est pas chargé
    proteins: 120,
    carbs: 250,
    fats: 70
  };

  // Valeurs réelles des macros consommées pour le résumé nutritionnel
  const totalCaloriesConsumed = todayMacros?.calories || 0;
  const totalProteinsConsumed = todayMacros?.proteins || 0;
  const totalCarbsConsumed = todayMacros?.carbs || 0;
  const totalFatsConsumed = todayMacros?.fats || 0;

  // Calcul des macros restantes pour la section Nutrition Summary
  const proteinsRemaining = Math.max(dailyGoals.proteins - totalProteinsConsumed, 0);
  const carbsRemaining = Math.max(dailyGoals.carbs - totalCarbsConsumed, 0);
  const fatsRemaining = Math.max(dailyGoals.fats - totalFatsConsumed, 0);


  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">{t('overview')}</h1>

        {/* Weight Tracker */}
        <WeightTracker
          currentWeight={userProfile.currentWeight}
          targetWeight={userProfile.targetWeight}
          onUpdateTarget={handleUpdateTarget}
          onRecordWeight={handleRecordWeight}
        />

        {/* BMI Section */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <BMIDisplay bmi={bmi} />

          {/* Progress Section */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {t('goal_progress')}
              </h3>
              <span className="text-sm text-muted-foreground">
                {progressPercentage}% {t('goal_achieved')}
              </span>
            </div>

            {/* Period Selection */}
            <div className="flex gap-2 overflow-x-auto">
              {periods.map((period) => (
                <Button
                  key={period.id}
                  variant={selectedPeriod === period.id ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`flex-shrink-0 ${
                    selectedPeriod === period.id 
                      ? 'bg-orange-primary hover:bg-orange-primary/90 text-white' 
                      : ''
                  }`}
                >
                  {period.label}
                </Button>
              ))}
            </div>

            {/* Progress Chart Placeholder */}
            <div className="h-48 bg-muted rounded-lg flex items-center justify-center"> {/* bg-gray-background -> bg-muted */}
              <div className="text-center">
                <h4 className="font-medium text-muted-foreground mb-1">
                  {t('progress_chart')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('no_data_available')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Summary */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">{t('nutrition')}</h3>
          
          {/* Period Tabs */}
          <div className="flex gap-2 mb-6">
            {nutritionPeriods.map((period) => (
                <Button
                  key={period.id}
                  variant={selectedNutritionPeriod === period.id ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedNutritionPeriod(period.id)}
                  className={selectedNutritionPeriod === period.id ? "bg-orange-primary hover:bg-orange-primary/90 text-white" : ""}
                >
                  {period.label}
                </Button>
              ))}
          </div>

          {/* Nutrition Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">{totalCaloriesConsumed}</div>
              <div className="text-sm text-muted-foreground">{t('total_calories')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">
                {/* Exemple de calcul de moyenne quotidienne - à adapter selon votre logique de données réelle */}
                {(totalCaloriesConsumed / 7).toFixed(1)} 
              </div>
              <div className="text-sm text-muted-foreground">{t('daily_average')}</div>
            </div>
          </div>

          {/* Macro Distribution */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-protein/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-protein" /> {/* Icône Lucide */}
              </div>
              <div className="text-lg font-bold text-foreground">{totalProteinsConsumed}g</div>
              <div className="text-sm text-muted-foreground">{t('proteins')}</div>
              <div className="text-xs text-muted-foreground">{proteinsRemaining}g {t('remaining')}</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-carbs/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Wheat className="w-6 h-6 text-carbs" /> {/* Icône Lucide */}
              </div>
              <div className="text-lg font-bold text-foreground">{totalCarbsConsumed}g</div>
              <div className="text-sm text-muted-foreground">{t('carbs')}</div>
              <div className="text-xs text-muted-foreground">{carbsRemaining}g {t('remaining')}</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-fats/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Droplets className="w-6 h-6 text-fats" /> {/* Icône Lucide */}
              </div>
              <div className="text-lg font-bold text-foreground">{totalFatsConsumed}g</div>
              <div className="text-sm text-muted-foreground">{t('fats')}</div>
              <div className="text-xs text-muted-foreground">{fatsRemaining}g {t('remaining')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                            }
      
