// src/hooks/useNutrition.ts
import { useState, useEffect } from 'react';
import { analyzeFoodImage, FoodAnalysisResult } from '../services/foodAnalysis';

export interface NutritionData {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  dailyGoals: {
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
  };
}

export interface RecentMeal {
  id: string;
  name: string;
  nutritionalInfo: {
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
  };
  timestamp: string;
}

export interface AnalysisState {
  isInProgress: boolean;
  progress: number;
  error: string | null;
  lastAnalyzedFood: FoodAnalysisResult | null;
}

const LOCAL_STORAGE_RECENT_MEALS_KEY = 'prot_ai_recent_meals'; // Clé pour localStorage
const LOCAL_STORAGE_NUTRITION_DATA_KEY = 'prot_ai_nutrition_data'; // Clé pour nutritionData

export const useNutrition = () => {
  // Charger les données nutritionnelles depuis localStorage au démarrage
  const [nutritionData, setNutritionData] = useState<NutritionData>(() => {
    if (typeof window !== 'undefined') { // Vérifie que nous sommes côté client
      const savedNutritionData = localStorage.getItem(LOCAL_STORAGE_NUTRITION_DATA_KEY);
      if (savedNutritionData) {
        return JSON.parse(savedNutritionData);
      }
    }
    return {
      calories: 0,
      proteins: 0,
      carbs: 0,
      fats: 0,
      dailyGoals: {
        calories: 2100,
        proteins: 120,
        carbs: 250,
        fats: 70,
      }
    };
  });

  // Charger les repas récents depuis localStorage au démarrage
  const [recentMeals, setRecentMeals] = useState<RecentMeal[]>(() => {
    if (typeof window !== 'undefined') { // Vérifie que nous sommes côté client
      const savedMeals = localStorage.getItem(LOCAL_STORAGE_RECENT_MEALS_KEY);
      if (savedMeals) {
        return JSON.parse(savedMeals);
      }
    }
    return [];
  });

  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    isInProgress: false,
    progress: 0,
    error: null,
    lastAnalyzedFood: null,
  });

  // Effet pour sauvegarder les données nutritionnelles lorsque nutritionData change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_NUTRITION_DATA_KEY, JSON.stringify(nutritionData));
    }
  }, [nutritionData]);

  // Effet pour sauvegarder les repas récents lorsque recentMeals change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_RECENT_MEALS_KEY, JSON.stringify(recentMeals));
    }
  }, [recentMeals]);

  const updateNutrition = (foodData: FoodAnalysisResult) => {
    setNutritionData(prev => ({
      ...prev,
      calories: prev.calories + foodData.nutritionalInfo.calories,
      proteins: prev.proteins + foodData.nutritionalInfo.proteins,
      carbs: prev.carbs + foodData.nutritionalInfo.carbs,
      fats: prev.fats + foodData.nutritionalInfo.fats,
    }));
  };

  const addToRecentMeals = (foodData: FoodAnalysisResult) => {
    const newMeal: RecentMeal = {
      id: Date.now().toString(), // Utilise un ID unique pour chaque repas
      name: foodData.name,
      nutritionalInfo: foodData.nutritionalInfo,
      timestamp: new Date().toISOString(),
    };

    // Ajoute le nouveau repas au début de la liste
    setRecentMeals(prev => [newMeal, ...prev.slice(0, 9)]); // Limite à 10 repas, par exemple
  };

  const startFoodAnalysis = async (imageBase64: string) => {
    setAnalysisState({
      isInProgress: true,
      progress: 0,
      error: null,
      lastAnalyzedFood: null,
    });

    let progressInterval: NodeJS.Timeout | null = null;

    try {
      progressInterval = setInterval(() => {
        setAnalysisState(prev => {
          const newProgress = Math.min(90, prev.progress + Math.random() * 5);
          return { ...prev, progress: newProgress };
        });
      }, 300);

      const result = await analyzeFoodImage(imageBase64);

      // Ces deux appels déclenchent les useEffects ci-dessus pour la sauvegarde
      updateNutrition(result);
      addToRecentMeals(result);

      if (progressInterval) clearInterval(progressInterval);
      setAnalysisState({
        isInProgress: false,
        progress: 100,
        error: null,
        lastAnalyzedFood: result,
      });

      setTimeout(() => {
        setAnalysisState(prev => ({
          ...prev,
          progress: 0,
          lastAnalyzedFood: null,
        }));
      }, 2000);

    } catch (error: any) {
      console.error('Erreur d\'analyse dans useNutrition:', error);
      if (progressInterval) clearInterval(progressInterval);
      setAnalysisState({
        isInProgress: false,
        progress: 0,
        error: error.message || 'Analyse échouée',
        lastAnalyzedFood: null,
      });
    }
  };

  return {
    nutritionData,
    recentMeals,
    analysisState,
    startFoodAnalysis,
    updateNutrition,
    addToRecentMeals,
  };
};
      
