import { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { BMIDisplay } from "@/components/nutrition/bmi-display";
import { WeightTracker } from "@/components/nutrition/weight-tracker";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTodayMacros } from "@/hooks/useFoodAnalyses";
import { useProfile, calculateDailyCalories } from "@/hooks/useProfile";
import { Apple, Flame, Zap, Wheat, Droplets, Target, Info } from "lucide-react"; // Ajout de Info pour l'IMC

export function Analytics() {
  const [selectedGoalPeriod, setSelectedGoalPeriod] = useState('90days');
  const [selectedNutritionPeriod, setSelectedNutritionPeriod] = useState('thisWeek'); 

  const { profile: userProfile, getCurrentBMI, addWeightEntry, setProfile } = useUserStore();
  const { t } = useLanguage();

  const { data: todayMacros } = useTodayMacros();
  const { data: appProfile } = useProfile();

  const bmi = getCurrentBMI();

  const goalPeriods = [
    { id: '90days', label: t('90_days') },
    { id: '6months', label: t('6_months') },
    { id: '1year', label: t('1_year') },
    { id: 'alltime', label: t('all_time') },
  ];

  const nutritionPeriods = [
    { id: 'thisWeek', label: t('this_week') },
    { id: 'lastWeek', label: t('last_week') },
    { id: '2weeksAgo', label: t('2_weeks_ago') },
    { id: '3weeksAgo', label: t('3_weeks_ago') }, // Ajouté si nécessaire
  ];

  const handleUpdateTarget = () => {
    const newTarget = prompt(t('new_target_weight_prompt'), userProfile.targetWeight?.toString() || '');
    if (newTarget && !isNaN(Number(newTarget))) {
      setProfile({ targetWeight: Number(newTarget) });
      toast({
        title: t('target_updated'),
        description: t('target_updated_desc', { newTarget: newTarget }),
      });
    } else if (newTarget !== null) {
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
    } else if (newWeight !== null) {
      toast({
        title: t('input_error'),
        description: t('please_enter_valid_number'),
        variant: "destructive"
      });
    }
  };

  // Calcul de la progression de l'objectif de poids
  const progressPercentage = (() => {
    if (!userProfile || userProfile.currentWeight === undefined || userProfile.targetWeight === undefined) {
        return 0; 
    }

    const startWeight = userProfile.initialWeight || userProfile.currentWeight; 
    const current = userProfile.currentWeight;
    const target = userProfile.targetWeight;

    if (startWeight === target || current === target) return 100; 

    if (startWeight > target) { 
        if (current >= startWeight) return 0; 
        if (current <= target) return 100; 
        return Math.round(((startWeight - current) / (startWeight - target)) * 100);
    } else { 
        if (current <= startWeight) return 0; 
        if (current >= target) return 100; 
        return Math.round(((current - startWeight) / (target - startWeight)) * 100);
    }
  })();

  // Objectifs macro journaliers (provenant de useProfile)
  const dailyGoals = appProfile ? {
    calories: calculateDailyCalories(appProfile),
    proteins: Math.round((calculateDailyCalories(appProfile) * 0.25) / 4), 
    carbs: Math.round((calculateDailyCalories(appProfile) * 0.45) / 4), 
    fats: Math.round((calculateDailyCalories(appProfile) * 0.30) / 9), 
  } : {
    calories: 2100,
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

  // Déterminer la catégorie de poids pour l'IMC
  const getWeightCategory = (bmiValue) => {
    if (bmiValue < 18.5) return { label: t('underweight'), color: 'text-blue-500' }; // Assuming blue for underweight
    if (bmiValue >= 18.5 && bmiValue < 24.9) return { label: t('healthy'), color: 'text-green-500' }; // Assuming green for healthy
    if (bmiValue >= 25 && bmiValue < 29.9) return { label: t('overweight'), color: 'text-yellow-500' }; // Assuming yellow for overweight
    return { label: t('obese'), color: 'text-red-500' }; // Assuming red for obese
  };

  const bmiCategory = getWeightCategory(bmi);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">{t('overview')}</h1>

        {/* Weight Goal & Current Weight Section */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t('weight_goal')}</h2>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-4 py-1 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleUpdateTarget}
            >
              {t('update')}
            </Button>
          </div>
          <p className="text-4xl font-bold mb-6">{userProfile.targetWeight || 'N/A'} kg</p>

          <h2 className="text-lg font-semibold mb-2">{t('current_weight')}</h2>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-bold">{userProfile.currentWeight || 'N/A'} kg</p>
            {/* Log weight button as a large block button below */}
          </div>
          <p className="text-sm text-muted-foreground mt-2 mb-4">
            {t('update_weight_tip')}
          </p>
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base rounded-lg"
            onClick={handleRecordWeight}
          >
            {t('log_weight')}
          </Button>
        </div>

        {/* Progress Chart Placeholder (Weight) */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h3 className="text-lg font-semibold mb-4">{t('weight_progress_chart')}</h3>
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
            {/* Ici irait un composant de graphique réel, par exemple un LineChart de Recharts */}
            {t('no_graph_data')}
          </div>
           <div className="flex items-center justify-end text-xs text-muted-foreground mt-2">
            {t('this_week_vs_previous')} {/* Nouveau texte pour le design */}
          </div>
        </div>

        {/* Your BMI Section */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t('your_bmi')}</h2>
            <Info className="w-5 h-5 text-muted-foreground" /> {/* Icône Info */}
          </div>
          <p className="text-muted-foreground text-sm mb-2">
            {t('your_weight_is')}{' '}
            <span className={`font-semibold ${bmiCategory.color}`}>
              {bmiCategory.label}
            </span>
          </p>
          <p className="text-4xl font-bold mb-4">{bmi.toFixed(2)}</p>
          
          {/* BMI Progress Bar */}
          <div className="w-full h-3 rounded-full overflow-hidden flex mb-3">
              <div className="h-full bg-blue-500" style={{ width: '25%' }}></div> {/* Underweight, adjust percentage based on your BMI scale */}
              <div className="h-full bg-green-500" style={{ width: '25%' }}></div> {/* Healthy */}
              <div className="h-full bg-yellow-500" style={{ width: '25%' }}></div> {/* Overweight */}
              <div className="h-full bg-red-500" style={{ width: '25%' }}></div> {/* Obese */}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> {t('underweight')}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> {t('healthy')}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> {t('overweight')}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> {t('obese')}</span>
          </div>
        </div>

        {/* Goal Progress (general goal, like calorie/macro progress or overall health goal) */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h3 className="text-lg font-semibold mb-4">{t('goal_progress')}</h3>
          <div className="flex items-center justify-between text-foreground text-xl font-bold mb-4">
            <p>N/A</p> {/* Placeholder for Name */}
            <p>N/A</p> {/* Placeholder for actual progress value like 0.84 */}
          </div>
           <div className="flex items-center justify-between text-foreground text-xl font-bold mb-4">
            <p>N/A</p> {/* Placeholder for Visitee */}
            <p>N/A</p> {/* Placeholder for actual progress value like 0.7% */}
          </div>
          
          {/* A generic progress bar for this section */}
          <div className="w-full h-3 rounded-full overflow-hidden flex bg-muted mb-6">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500" 
              style={{ width: `${Math.min(progressPercentage, 100)}%` }} // Use weight progress for this example
            ></div>
          </div>

          {/* Period Selection for Goal Progress */}
          <div className="flex gap-2 overflow-x-auto justify-between"> {/* Adjusted for flex-shrink-0 for buttons */}
            {goalPeriods.map((period) => (
              <Button
                key={period.id}
                variant={selectedGoalPeriod === period.id ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedGoalPeriod(period.id)}
                className={`flex-shrink-0 ${
                  selectedGoalPeriod === period.id 
                    ? 'bg-orange-primary hover:bg-orange-primary/90 text-white' 
                    : ''
                }`}
              >
                {period.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Nutrition Summary Section */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">{t('nutrition')}</h3>
          
          {/* Period Tabs for Nutrition */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {nutritionPeriods.map((period) => (
                <Button
                  key={period.id}
                  variant={selectedNutritionPeriod === period.id ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedNutritionPeriod(period.id)}
                  className={`flex-shrink-0 ${selectedNutritionPeriod === period.id ? "bg-orange-primary hover:bg-orange-primary/90 text-white" : ""}`}
                >
                  {period.label}
                </Button>
              ))}
          </div>

          {/* Nutrition Stats (Total Calories & Daily Avg) */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-1">{totalCaloriesConsumed}</div>
              <div className="text-sm text-muted-foreground">{t('total_calories')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-1">
                {(totalCaloriesConsumed / 7).toFixed(1)} 
              </div>
              <div className="text-sm text-muted-foreground">{t('daily_average')}</div>
            </div>
          </div>

          {/* Macro Distribution */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-protein/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-protein" />
              </div>
              <div className="text-lg font-bold text-foreground">{totalProteinsConsumed}g</div>
              <div className="text-sm text-muted-foreground">{t('proteins')}</div>
              <div className="text-xs text-muted-foreground">{proteinsRemaining}g {t('remaining')}</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-carbs/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Wheat className="w-6 h-6 text-carbs" />
              </div>
              <div className="text-lg font-bold text-foreground">{totalCarbsConsumed}g</div>
              <div className="text-sm text-muted-foreground">{t('carbs')}</div>
              <div className="text-xs text-muted-foreground">{carbsRemaining}g {t('remaining')}</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-fats/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Droplets className="w-6 h-6 text-fats" />
              </div>
              <div className="text-lg font-bold text-foreground">{totalFatsConsumed}g</div>
              <div className="text-sm text-muted-foreground">{t('fats')}</div>
              <div className="text-xs text-muted-foreground">{fatsRemaining}g {t('remaining')}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating Add Button and Navigation Bar will be rendered by their respective components/layout */}
      {/* <FloatingAddButton /> // Not included here as it's likely part of a layout or root component */}
      {/* <Navigation /> // Not included here as it's likely part of a layout or root component */}
    </div>
  );
                                }
        
