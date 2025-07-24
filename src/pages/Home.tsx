import { Apple, Flame, Zap, Wheat, Droplets, Target, User, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import FloatingAddButton from "@/components/FloatingAddButton";
import AnalysisProgress from "@/components/AnalysisProgress";
import { useTodayMacros } from "@/hooks/useFoodAnalyses";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth, useProfile, calculateDailyCalories } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data: macros } = useTodayMacros();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const { data: profile } = useProfile();
  const navigate = useNavigate();
  
  // Redirect to onboarding if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/onboarding');
    }
  }, [user, loading, navigate]);
  
  // État pour stocker les repas récents et l'état de chargement
  const [recentMeals, setRecentMeals] = useState([]);
  const [loadingMeals, setLoadingMeals] = useState(true);
  const [errorMeals, setErrorMeals] = useState(null);

  // Objectifs journaliers basés sur le profil utilisateur
  const dailyGoals = profile ? {
    calories: calculateDailyCalories(profile),
    proteins: Math.round((calculateDailyCalories(profile) * 0.25) / 4), // 25% of calories from protein
    carbs: Math.round((calculateDailyCalories(profile) * 0.45) / 4), // 45% of calories from carbs
    fats: Math.round((calculateDailyCalories(profile) * 0.30) / 9), // 30% of calories from fats
  } : {
    calories: 2100,
    proteins: 120,
    carbs: 250,
    fats: 70
  };
  
  // Calculs des progressions
  const caloriesConsumed = macros?.calories || 0;
  const caloriesLeft = Math.max(dailyGoals.calories - caloriesConsumed, 0);

  const proteinsConsumed = macros?.proteins || 0;
  const carbsConsumed = macros?.carbs || 0;
  const fatsConsumed = macros?.fats || 0;

  const proteinsLeft = Math.max(dailyGoals.proteins - proteinsConsumed, 0);
  const carbsLeft = Math.max(dailyGoals.carbs - carbsConsumed, 0);
  const fatsLeft = Math.max(dailyGoals.fats - fatsConsumed, 0);

  const proteinsOver = Math.max(proteinsConsumed - dailyGoals.proteins, 0);

  const caloriesProgress = Math.min((caloriesConsumed / dailyGoals.calories) * 100, 100);
  const proteinsProgress = Math.min((proteinsConsumed / dailyGoals.proteins) * 100, 100);
  const carbsProgress = Math.min((carbsConsumed / dailyGoals.carbs) * 100, 100);
  const fatsProgress = Math.min((fatsConsumed / dailyGoals.fats) * 100, 100);
  
  // Fonction pour charger les repas récents depuis Supabase
  const fetchRecentMeals = async () => {
    setLoadingMeals(true);
    setErrorMeals(null);
    try {
      const { data, error } = await supabase
        .from('food_analyses')
        .select('id, name, calories, proteins, carbs, fats, created_at, image_url')
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

  // Calcul de la progression quotidienne moyenne (pas utilisé visuellement mais gardé)
  // const averageDailyProgress = Math.round((caloriesProgress + proteinsProgress + carbsProgress + fatsProgress) / 4);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20 relative overflow-hidden">
      {/* L'arrière-plan avec gradient animé qui était blanc est supprimé ou redevient "bg-background" */}
      {/* Nous utilisons une couleur de fond fixe pour correspondre au design */}
      
      <header className="relative z-10 mx-4 mt-4 rounded-2xl pt-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Apple className="w-7 h-7 text-[#7FFF00]" /> {/* Vert pomme */}
            <h1 className="text-2xl font-bold text-gray-900">Cal AI</h1>
          </div>
          <div className="flex items-center gap-1 bg-gray-200 rounded-full px-3 py-1">
            <Flame className="w-5 h-5 text-[#FF6347]" /> {/* Orange/Rouge feu */}
            <span className="text-sm font-semibold text-gray-900">15</span>
          </div>
        </div> 
        
        {/* Sélecteur Today / Yesterday */}
        <div className="flex text-lg font-semibold mb-6">
          <button className="mr-6 border-b-2 border-[#7FFF00] pb-1 text-[#7FFF00]">Today</button>
          <button className="text-gray-500">Yesterday</button>
        </div>
      </header>

      <div className="px-4 py-6 relative z-10">

        {/* Section Calories principales */}
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-md relative overflow-hidden">
          <div className="absolute top-4 right-4 w-24 h-24 flex items-center justify-center">
            {/* Cercle de progression des calories */}
            <div className="relative w-20 h-20">
                <svg className="w-full h-full transform -rotate-90">
                    <circle 
                        className="text-gray-200" 
                        strokeWidth="8" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="32" 
                        cx="40" 
                        cy="40"
                    />
                    <circle 
                        className="text-[#FF6347]" 
                        strokeWidth="8" 
                        strokeDasharray={2 * Math.PI * 32}
                        strokeDashoffset={2 * Math.PI * 32 - (caloriesProgress / 100) * (2 * Math.PI * 32)}
                        strokeLinecap="round" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="32" 
                        cx="40" 
                        cy="40"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Flame className="w-8 h-8 text-[#FF6347]" />
                </div>
            </div>
          </div>
          
          <div classNameNames="relative">
            <div className="flex flex-col items-start mb-6">
              <h2 className="text-5xl font-bold text-gray-900 mb-2">
                {caloriesLeft}
              </h2>
               <p className="text-lg text-gray-500">Calories left</p>
            </div>
          </div>
        </div>

        {/* Macronutriments */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* Protéines */}
          <div className="bg-white rounded-2xl p-4 shadow-md flex flex-col items-center">
            <div className="w-16 h-16 relative mb-2">
                <svg className="w-full h-full transform -rotate-90">
                    <circle 
                        className="text-gray-200" 
                        strokeWidth="6" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="28" 
                        cx="32" 
                        cy="32"
                    />
                    <circle 
                        className="text-[#FF6347]" /* Orange/Rouge pour protéine comme dans l'image */
                        strokeWidth="6" 
                        strokeDasharray={2 * Math.PI * 28}
                        strokeDashoffset={2 * Math.PI * 28 - (proteinsProgress / 100) * (2 * Math.PI * 28)}
                        strokeLinecap="round" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="28" 
                        cx="32" 
                        cy="32"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#FF6347]" /> {/* Orange/Rouge */}
                </div>
            </div>
            <p className="text-lg font-bold text-gray-900 mb-1">
                {proteinsOver > 0 ? `${proteinsOver}g` : `${proteinsLeft}g`}
            </p>
            <p className="text-sm text-gray-500">
                {proteinsOver > 0 ? "Protein over" : "Protein left"}
            </p>
          </div>
          
          {/* Glucides */}
          <div className="bg-white rounded-2xl p-4 shadow-md flex flex-col items-center">
            <div className="w-16 h-16 relative mb-2">
                <svg className="w-full h-full transform -rotate-90">
                    <circle 
                        className="text-gray-200" 
                        strokeWidth="6" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="28" 
                        cx="32" 
                        cy="32"
                    />
                    <circle 
                        className="text-[#FFA500]" /* Orange pour les glucides */
                        strokeWidth="6" 
                        strokeDasharray={2 * Math.PI * 28}
                        strokeDashoffset={2 * Math.PI * 28 - (carbsProgress / 100) * (2 * Math.PI * 28)}
                        strokeLinecap="round" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="28" 
                        cx="32" 
                        cy="32"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Wheat className="w-5 h-5 text-[#FFA500]" /> {/* Orange */}
                </div>
            </div>
            <p className="text-lg font-bold text-gray-900 mb-1">{carbsLeft}g</p>
            <p className="text-sm text-gray-500">Carbs left</p>
          </div>
          
          {/* Lipides */}
          <div className="bg-white rounded-2xl p-4 shadow-md flex flex-col items-center">
            <div className="w-16 h-16 relative mb-2">
                <svg className="w-full h-full transform -rotate-90">
                    <circle 
                        className="text-gray-200" 
                        strokeWidth="6" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="28" 
                        cx="32" 
                        cy="32"
                    />
                    <circle 
                        className="text-[#1E90FF]" /* Bleu pour les lipides */
                        strokeWidth="6" 
                        strokeDasharray={2 * Math.PI * 28}
                        strokeDashoffset={2 * Math.PI * 28 - (fatsProgress / 100) * (2 * Math.PI * 28)}
                        strokeLinecap="round" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="28" 
                        cx="32" 
                        cy="32"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-[#1E90FF]" /> {/* Bleu */}
                </div>
            </div>
            <p className="text-lg font-bold text-gray-900 mb-1">{fatsLeft}g</p>
            <p className="text-sm text-gray-500">Fats left</p>
          </div>
        </div>

        {/* Section "Recently uploaded" */}
        <div className="mb-8"> 
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recently uploaded</h2>
            
            {isAnalyzing && (
              <AnalysisProgress 
                isAnalyzing={isAnalyzing} 
                onComplete={() => setIsAnalyzing(false)} 
              />
            )}
            
            {loadingMeals ? (
                <p className="text-gray-500 text-center">Chargement des repas...</p>
            ) : errorMeals ? (
                <p className="text-red-500 text-center">{errorMeals}</p>
            ) : recentMeals.length > 0 ? (
                <div className="space-y-4">
                    {recentMeals.map((meal) => (
                        <div key={meal.id} className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-4">
                            <img 
                                src={meal.imageUrl || "https://via.placeholder.com/80"} 
                                alt={meal.name} 
                                className="w-16 h-16 rounded-lg object-cover" 
                            />
                            <div className="flex-1 flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-gray-900">{meal.name}</p>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <Flame className="w-4 h-4 mr-1 text-[#FF6347]" /> {/* Couleur flamme */}
                                        <span>{meal.calories} kcal</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                                        <div className="flex items-center">
                                            <Zap className="w-3 h-3 mr-1 text-[#FF6347]" />
                                            <span>{meal.proteins}g</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Wheat className="w-3 h-3 mr-1 text-[#FFA500]" />
                                            <span>{meal.carbs}g</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Droplets className="w-3 h-3 mr-1 text-[#1E90FF]" />
                                            <span>{meal.fats}g</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">{meal.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                !isAnalyzing && (
                  <div className="bg-white rounded-2xl p-8 shadow-md text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                      <Target className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No meals added yet!</h3>
                    <p className="text-gray-500 mb-6">Start tracking your food intake.</p>
                    <p className="text-sm text-gray-500">Tap the plus button below to analyze your first meal.</p>
                  </div>
                )
            )}
        </div>
      </div>

      <FloatingAddButton />
      <Navigation />
    </div>
  );
};

export default Home;
                             
