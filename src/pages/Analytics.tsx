import Navigation from "@/components/Navigation";
import WeightOverview from "@/components/WeightOverview"; // Supposé gérer les sections "Weight Goal" et "Current Weight"
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTodayMacros } from "@/hooks/useFoodAnalyses";
import { useUserStore } from "@/store/userStore"; // Nécessaire pour l'IMC et les objectifs de poids
import { useProfile, calculateDailyCalories } from "@/hooks/useProfile"; // Pour les objectifs macro
import { Flame, Info, Zap, Wheat, Droplets } from "lucide-react"; // Icônes Lucide pour un design cohérent

const Analytics = () => {
  const { t } = useLanguage();
  const { data: todayMacros } = useTodayMacros(); // Macros du jour pour la section nutrition
  const { profile: userProfile, getCurrentBMI } = useUserStore(); // Pour l'IMC et les données de poids
  const { data: appProfile } = useProfile(); // Pour les objectifs macro

  // États pour les périodes sélectionnées
  const [selectedGoalProgressPeriod, setSelectedGoalProgressPeriod] = useState('90days');
  const [selectedNutritionPeriod, setSelectedNutritionPeriod] = useState(t("this_week"));
  
  // Périodes pour "Goal Progress" (comme sur l'image)
  const goalProgressPeriods = [
    { id: '90days', label: t('90_days') },
    { id: '6months', label: t('6_months') },
    { id: '1year', label: t('1_year') },
    { id: 'alltime', label: t('all_time') },
  ];

  // Périodes pour "Nutrition" (comme sur l'image)
  const nutritionPeriods = [t("this_week"), t("last_week"), t("weeks_ago_2"), t("weeks_ago_3")];

  // Calcul de l'IMC
  const bmi = getCurrentBMI();

  // Déterminer la catégorie de poids pour l'IMC
  const getWeightCategory = (bmiValue) => {
    if (bmiValue < 18.5) return { label: t('underweight'), color: 'text-blue-500' };
    if (bmiValue >= 18.5 && bmiValue < 24.9) return { label: t('healthy'), color: 'text-green-500' };
    if (bmiValue >= 25 && bmiValue < 29.9) return { label: t('overweight'), color: 'text-yellow-500' };
    return { label: t('obese'), color: 'text-red-500' };
  };
  const bmiCategory = getWeightCategory(bmi);

  // Objectifs macro journaliers (pour la section nutrition si besoin)
  const dailyGoals = appProfile ? {
    calories: calculateDailyCalories(appProfile),
    proteins: Math.round((calculateDailyCalories(appProfile) * 0.25) / 4), 
    carbs: Math.round((calculateDailyCalories(appProfile) * 0.45) / 4), 
    fats: Math.round((calculateDailyCalories(appProfile) * 0.30) / 9), 
  } : {
    calories: 2100, // Valeurs par défaut
    proteins: 120,
    carbs: 250,
    fats: 70
  };

  // Calcul des calories totales et moyennes
  const totalCalories = todayMacros?.calories || 0;
  // Ceci est une moyenne simple sur 7 jours. Pour une moyenne réelle sur la période sélectionnée,
  // il faudrait des données agrégées pour cette période.
  const dailyAverageCalories = (totalCalories / 7).toFixed(1);

  // Données de progression (exemple pour le graphique hebdomadaire de nutrition)
  // Dans une vraie application, ces valeurs seraient dynamiques et correspondraient aux calories de chaque jour.
  const weeklyNutritionData = [
    { day: "L", value: 1500 }, 
    { day: "M", value: 2100 },
    { day: "M", value: 1800 },
    { day: "J", value: 2500 },
    { day: "V", value: 1900 },
    { day: "S", value: 2300 },
    { day: "D", value: 1700 },
  ];
  // Trouver la valeur maximale pour normaliser la hauteur des barres du graphique
  const maxCalorieValue = Math.max(...weeklyNutritionData.map(d => d.value));
  const graphHeightScale = 120; // Hauteur max en px pour le graphique (h-32 dans le CSS)

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <header className="px-4 py-4 bg-card border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">{t("overview")}</h1>
      </header>

      <div className="px-4 py-6 space-y-6"> {/* Ajout de space-y-6 pour l'espacement */}
        {/* Vue d'ensemble du poids - C'est votre composant externe WeightOverview */}
        {/* Supposons que WeightOverview prend en charge le design des sections Weight Goal et Current Weight */}
        <WeightOverview />

        {/* Graphique de progression du poids (placeholder comme sur le design) */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h3 className="text-lg font-semibold mb-4">{t('weight_progress_chart')}</h3>
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
            {t('no_graph_data')}
          </div>
          <div className="flex items-center justify-end text-xs text-muted-foreground mt-2">
            {t('this_week_vs_previous')}
          </div>
        </div>

        {/* Section Your BMI */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t('your_bmi')}</h2>
            <Info className="w-5 h-5 text-muted-foreground" />
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
              <div className="h-full bg-blue-500" style={{ width: '25%' }}></div> {/* Underweight */}
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

        {/* Section Goal Progress (comme sur le design) */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h3 className="text-lg font-semibold mb-4">{t('goal_progress')}</h3>
          <div className="flex items-center justify-between text-foreground text-xl font-bold mb-4">
            <p>N/A</p> {/* Placeholder for "Name" */}
            <p>0.84</p> {/* Placeholder for value */}
          </div>
           <div className="flex items-center justify-between text-foreground text-xl font-bold mb-4">
            <p>N/A</p> {/* Placeholder for "Visitee" */}
            <p>0.7%</p> {/* Placeholder for value */}
          </div>
          
          {/* A generic progress bar for this section (adaptez la couleur/logique si vous avez une progression réelle) */}
          <div className="w-full h-3 rounded-full overflow-hidden flex bg-muted mb-6">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/70" // Exemple de dégradé
              style={{ width: `75%` }} // Exemple de progression arbitraire
            ></div>
          </div>

          {/* Period Selection for Goal Progress */}
          <div className="flex gap-2 overflow-x-auto justify-between">
            {goalProgressPeriods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedGoalProgressPeriod(period.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  selectedGoalProgressPeriod === period.id 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Nutrition Section (optimisée selon le design) */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h2 className="text-lg font-semibold text-foreground mb-4">{t("nutrition")}</h2>
          
          {/* Sélecteur de période */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {nutritionPeriods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedNutritionPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  selectedNutritionPeriod === period
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <div className="flex items-center text-4xl font-bold text-foreground">
                <Flame className="w-8 h-8 mr-2 text-primary" /> {/* Icône plus grande */}
                {totalCalories}
              </div>
              <div className="text-sm text-muted-foreground">{t("total_calories")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground">{dailyAverageCalories}</div>
              <div className="text-sm text-muted-foreground">{t("daily_average")}</div>
            </div>
          </div>

          {/* Graphique hebdomadaire (barres) */}
          <div className="h-40 bg-muted rounded-xl flex items-end justify-between p-4 shadow-inner">
            {weeklyNutritionData.map((data) => (
              <div key={data.day} className="flex flex-col items-center">
                <div 
                  className="w-8 bg-primary rounded-t-sm transition-all duration-300 ease-out" 
                  style={{ height: `${(data.value / maxCalorieValue) * graphHeightScale}px` }} 
                ></div>
                <span className="text-xs text-muted-foreground mt-2">{data.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end text-xs text-muted-foreground mt-4">
            {t('this_week_vs_previous')}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Analytics;
    
