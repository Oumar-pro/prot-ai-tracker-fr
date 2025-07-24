import Navigation from "@/components/Navigation";
import WeightOverview from "@/components/WeightOverview"; // Composant existant pour le poids
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTodayMacros } from "@/hooks/useFoodAnalyses"; // Utilisé pour les calories

// Import des icônes de Lucide-React. Si vous n'avez pas Lucide-React installé,
// ces imports devront être supprimés ou remplacés par des emojis si c'est votre choix.
// Cependant, les designs fournis utilisent clairement des icônes vectorielles.
import { Flame, Info } from "lucide-react"; 

const Analytics = () => {
  const { t } = useLanguage();
  const { data: todayMacros } = useTodayMacros(); // Accès aux macros du jour

  // État pour la période sélectionnée pour la nutrition (comme dans votre code original)
  const [selectedNutritionPeriod, setSelectedNutritionPeriod] = useState(t("this_week"));
  
  // Périodes pour la section Nutrition (comme dans votre code original)
  const nutritionPeriods = [t("this_week"), t("last_week"), t("weeks_ago_2"), t("weeks_ago_3")];

  // --- Données pour l'IMC et la Progression de l'objectif (Placeholders statiques) ---
  // Puisque useUserStore et useProfile ne sont pas garantis de fonctionner sans erreur,
  // nous utiliserons des valeurs statiques pour ces sections visuelles.
  const staticBMI = 22.5; // Exemple de valeur d'IMC statique
  const getStaticWeightCategory = (bmiValue) => {
    if (bmiValue < 18.5) return { label: t('underweight'), color: 'text-blue-500' };
    if (bmiValue >= 18.5 && bmiValue < 24.9) return { label: t('healthy'), color: 'text-green-500' };
    if (bmiValue >= 25 && bmiValue < 29.9) return { label: t('overweight'), color: 'text-yellow-500' };
    return { label: t('obese'), color: 'text-red-500' };
  };
  const staticBmiCategory = getStaticWeightCategory(staticBMI);

  // Périodes pour "Goal Progress" (statiques pour cette section visuelle)
  const staticGoalProgressPeriods = [
    { id: '90days', label: t('90_days') },
    { id: '6months', label: t('6_months') },
    { id: '1year', label: t('1_year') },
    { id: 'alltime', label: t('all_time') },
  ];
  const [selectedStaticGoalPeriod, setSelectedStaticGoalPeriod] = useState('90days');
  // --- FIN Données statiques ---


  // Calcul des calories totales et moyennes à partir de useTodayMacros
  const totalCalories = todayMacros?.calories || 0;
  // Ceci est une moyenne simple sur 7 jours. Pour une moyenne réelle sur la période sélectionnée,
  // il faudrait un hook différent ou une fonction qui agrège les données historiques.
  const dailyAverageCalories = (totalCalories / 7).toFixed(1);

  // Données de progression (exemple pour le graphique hebdomadaire de nutrition)
  // Ces valeurs sont statiques et simulent une progression pour le rendu visuel.
  // Dans une application réelle, elles proviendraient de vos données de calories journalières.
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
  const graphHeightScale = 120; // Hauteur max en px pour le graphique (h-32 ou h-40 dans le CSS)


  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <header className="px-4 py-4 bg-card border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">{t("overview")}</h1>
      </header>

      <div className="px-4 py-6 space-y-6"> {/* Ajout de space-y-6 pour l'espacement entre les sections */}
        {/* Vue d'ensemble du poids - Votre composant WeightOverview existant */}
        {/* Il est supposé que WeightOverview gère son propre style et ses données */}
        <WeightOverview />

        {/* Graphique de progression du poids (Placeholder comme sur le design) */}
        {/* Si WeightOverview inclut déjà un graphique, cette section peut être supprimée. */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h3 className="text-lg font-semibold mb-4">{t('weight_progress_chart')}</h3>
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
            {t('no_graph_data')}
          </div>
          <div className="flex items-center justify-end text-xs text-muted-foreground mt-2">
            {t('this_week_vs_previous')}
          </div>
        </div>

        {/* Section Your BMI (Utilise des données statiques pour éviter les erreurs d'import) */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t('your_bmi')}</h2>
            {/* Si Lucide-React n'est pas installé, retirez l'icône <Info /> */}
            <Info className="w-5 h-5 text-muted-foreground" /> 
          </div>
          <p className="text-muted-foreground text-sm mb-2">
            {t('your_weight_is')}{' '}
            <span className={`font-semibold ${staticBmiCategory.color}`}>
              {staticBmiCategory.label}
            </span>
          </p>
          <p className="text-4xl font-bold mb-4">{staticBMI.toFixed(2)}</p>
          
          {/* BMI Progress Bar */}
          <div className="w-full h-3 rounded-full overflow-hidden flex mb-3">
              {/* Ces pourcentages sont arbitraires pour simuler la barre */}
              <div className="h-full bg-blue-500" style={{ width: '25%' }}></div> {/* Insuffisance pondérale */}
              <div className="h-full bg-green-500" style={{ width: '25%' }}></div> {/* Sain */}
              <div className="h-full bg-yellow-500" style={{ width: '25%' }}></div> {/* Surpoids */}
              <div className="h-full bg-red-500" style={{ width: '25%' }}></div> {/* Obèse */}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> {t('underweight')}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> {t('healthy')}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> {t('overweight')}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> {t('obese')}</span>
          </div>
        </div>

        {/* Section Goal Progress (Utilise des données statiques pour éviter les erreurs d'import) */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
          <h3 className="text-lg font-semibold mb-4">{t('goal_progress')}</h3>
          <div className="flex items-center justify-between text-foreground text-xl font-bold mb-4">
            <p>N/A</p> {/* Placeholder for "Name" */}
            <p>0.84</p> {/* Placeholder for value from design */}
          </div>
           <div className="flex items-center justify-between text-foreground text-xl font-bold mb-4">
            <p>N/A</p> {/* Placeholder for "Visitee" */}
            <p>0.7%</p> {/* Placeholder for value from design */}
          </div>
          
          {/* Barre de progression générique statique */}
          <div className="w-full h-3 rounded-full overflow-hidden flex bg-muted mb-6">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/70" // Exemple de dégradé avec votre couleur primaire
              style={{ width: `75%` }} // Progression arbitraire pour le visuel
            ></div>
          </div>

          {/* Sélecteur de période pour "Goal Progress" */}
          <div className="flex gap-2 overflow-x-auto justify-between">
            {staticGoalProgressPeriods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedStaticGoalPeriod(period.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  selectedStaticGoalPeriod === period.id 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Nutrition Section (optimisée selon le design, en utilisant useTodayMacros) */}
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

          {/* Stats de Nutrition */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <div className="flex items-center text-4xl font-bold text-foreground">
                {/* Si Lucide-React n'est pas installé, remplacez par un emoji ou retirez l'icône */}
                <Flame className="w-8 h-8 mr-2 text-primary" /> 
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
  
