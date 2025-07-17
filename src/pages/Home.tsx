import { Apple, Flame, Zap, Wheat, Droplets, Target, User, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import WeekCalendar from "@/components/WeekCalendar";
import FloatingAddButton from "@/components/FloatingAddButton";
import AnalysisProgress from "@/components/AnalysisProgress";
import { useTodayMacros } from "@/hooks/useFoodAnalyses";
// Si Progress n'est plus utilisé nulle part ailleurs dans Home.jsx, vous pouvez commenter ou supprimer l'importation.
// import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

// IMPORTEZ VOTRE CLIENT SUPABASE ICI
import { supabase } from '@/lib/supabaseClient'; // Assurez-vous que ce chemin est correct !

const Home = () => {
  const { data: macros } = useTodayMacros();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // État pour stocker les repas récents et l'état de chargement
  const [recentMeals, setRecentMeals] = useState([]);
  const [loadingMeals, setLoadingMeals] = useState(true);
  const [errorMeals, setErrorMeals] = useState(null);

  // Objectifs journaliers
  const dailyGoals = {
    calories: 2100,
    proteins: 120,
    carbs: 250,
    fats: 70
  };
  
  // Calculs des progressions
  const caloriesProgress = Math.min((macros?.calories || 0) / dailyGoals.calories * 100, 100);
  const proteinsProgress = Math.min((macros?.proteins || 0) / dailyGoals.proteins * 100, 100);
  const carbsProgress = Math.min((macros?.carbs || 0) / dailyGoals.carbs * 100, 100);
  const fatsProgress = Math.min((macros?.fats || 0) / dailyGoals.fats * 100, 100);
  
  // Fonction pour charger les repas récents depuis Supabase
  const fetchRecentMeals = async () => {
    setLoadingMeals(true);
    setErrorMeals(null);
    try {
      // --- VOTRE LOGIQUE SUPABASE RÉELLE ---
      const { data, error } = await supabase
        .from('your_meals_table') // <<<< TRÈS IMPORTANT : REMPLACEZ PAR LE NOM DE VOTRE TABLE DE REPAS !
        .select('id, name, calories, proteins, carbs, fats, created_at, image_url') // <<<< AJUSTEZ CES COLONNES !
        .order('created_at', { ascending: false }) 
        .limit(5); 

      if (error) {
        throw error;
      }
      
      const formattedMeals = data.map(meal => ({
          id: meal.id,
          name: meal.name,
          time: new Date(meal.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          calories: meal.calories,
          proteins: meal.proteins,
          carbs: meal.carbs,
          fats: meal.fats,
          imageUrl: meal.image_url 
      }));

      setRecentMeals(formattedMeals || []);

    } catch (error) {
      console.error("Erreur lors du chargement des repas récents:", error);
      setErrorMeals("Échec du chargement des repas.");
      setRecentMeals([]); 
    } finally {
      setLoadingMeals(false);
    }
  };

  // Écouter les événements d'analyse et charger les repas au montage
  useEffect(() => {
    const handleAnalysisStart = () => setIsAnalyzing(true);
    const handleAnalysisComplete = () => {
      setIsAnalyzing(false);
      fetchRecentMeals(); 
    };
    
    window.addEventListener('analysisStarted', handleAnalysisStart);
    window.addEventListener('analysisCompleted', handleAnalysisComplete);
    
    fetchRecentMeals();

    return () => {
      window.removeEventListener('analysisStarted', handleAnalysisStart);
      window.removeEventListener('analysisCompleted', handleAnalysisComplete);
    };
  }, []); 

  // Calcul de la progression quotidienne moyenne
  const averageDailyProgress = Math.round((caloriesProgress + proteinsProgress + carbsProgress + fatsProgress) / 4);

  return (
    // Revert du fond à bg-background (sombre) et suppression du gradient blanc
    <div className="min-h-screen bg-background pb-20 relative overflow-hidden">
      {/* L'arrière-plan avec gradient animé qui était blanc est supprimé ou redevient "bg-background" */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 animate-float" />
      
      <header className="relative z-10 glass-card mx-4 mt-4 rounded-2xl p-6 shadow-elevated">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-xl backdrop-blur-sm">
              <Apple className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Prot AI
              </h1>
            </div>
          </div>
        </div> 
        
        {/* Calendrier intégré */}
        <WeekCalendar />
      </header>

      <div className="px-4 py-6 relative z-10">
        <AnalysisProgress 
          isAnalyzing={isAnalyzing} 
          onComplete={() => setIsAnalyzing(false)} 
        />

        {/* Section Calories principales */}
        <div className="mb-8">
          <div className="glass-card rounded-3xl p-8 shadow-elevated relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-5xl font-bold text-foreground mb-2">
                    {Math.max(dailyGoals.calories - (macros?.calories || 0), 0)}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-1">Calories restantes</p>
                  <p className="text-sm text-muted-foreground">
                    Objectif : {dailyGoals.calories} Kcal
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-2 shadow-glow">
                    <Flame className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{macros?.calories || 0}</p>
                    <p className="text-xs text-muted-foreground">consommées</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progression</span>
                  <span className="text-primary font-medium">{Math.round(caloriesProgress)}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full progress-calories rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${caloriesProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Macronutriments */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-4 shadow-card hover:shadow-elevated transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-protein/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Protéines</p>
                <p className="text-lg font-bold text-foreground">{Math.round(macros?.proteins || 0)}g</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full progress-protein rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${proteinsProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{Math.max(dailyGoals.proteins - Math.round(macros?.proteins || 0), 0)}g restantes</p>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-4 shadow-card hover:shadow-elevated transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-carbs/20 flex items-center justify-center">
                <Wheat className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Glucides</p>
                <p className="text-lg font-bold text-foreground">{Math.round(macros?.carbs || 0)}g</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full progress-carbs rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${carbsProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{Math.max(dailyGoals.carbs - Math.round(macros?.carbs || 0), 0)}g restantes</p>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-4 shadow-card hover:shadow-elevated transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-fats/20 flex items-center justify-center">
                <Droplets className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Lipides</p>
                <p className="text-lg font-bold text-foreground">{Math.round(macros?.fats || 0)}g</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full progress-fats rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${fatsProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{Math.max(dailyGoals.fats - Math.round(macros?.fats || 0), 0)}g restantes</p>
            </div>
          </div>
        </div>

        {/* --- SECTION "REPAS RÉCENTS" DYNAMIQUE ET MESSAGE "AUCUN REPAS" UNIFIÉ --- */}
        <div className="mb-8"> 
            <h2 className="text-xl font-bold text-foreground mb-4">Repas récents</h2>
            {loadingMeals ? (
                <p className="text-muted-foreground text-center">Chargement des repas...</p>
            ) : errorMeals ? (
                <p className="text-destructive text-center">{errorMeals}</p>
            ) : recentMeals.length > 0 ? (
                <div className="space-y-4">
                    {recentMeals.map((meal) => (
                        <div key={meal.id} className="glass-card rounded-2xl p-4 shadow-card hover:shadow-elevated transition-all duration-300 flex items-center gap-4">
                            <img 
                                src={meal.imageUrl || "https://via.placeholder.com/80"} 
                                alt={meal.name} 
                                className="w-16 h-16 rounded-lg object-cover" 
                            />
                            <div className="flex-1">
                                <p className="font-bold text-foreground">{meal.name}</p>
                                <p className="text-sm text-muted-foreground">{meal.time} - {meal.calories} Kcal</p>
                                <p className="text-xs text-muted-foreground">
                                    Protéines: {meal.proteins}g, Glucides: {meal.carbs}g, Lipides: {meal.fats}g
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Ceci est la carte "Aucun repas récent" / "Vous n'avez ajouté aucun aliment"
                <div className="glass-card rounded-3xl p-8 shadow-elevated relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                  
                  <div className="relative text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <Target className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Vous n'avez ajouté aucun aliment</h3>
                      <p className="text-muted-foreground">
                        Commencez à suivre vos repas d'aujourd'hui en prenant des photos rapides
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-6">
                        Appuyez sur le + pour analyser.
                      </p>
                    </div>
                  </div>
                </div>
            )}
        </div>
        {/* --- FIN DE LA SECTION UNIFIÉE --- */}
      </div>

      <FloatingAddButton />
      <Navigation />
    </div>
  );
};

export default Home;
                                     
