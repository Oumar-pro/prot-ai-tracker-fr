import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FoodAnalysis {
  id: string;
  name: string;
  ingredients: string[];
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  fiber: number;
  sugar: number;
  portion_size: string;
  portion_weight: number;
  health_score: number;
  recommendations: string[];
  allergies: string[];
  confidence: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export const useFoodAnalyses = () => {
  return useQuery({
    queryKey: ['food-analyses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('food_analyses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as FoodAnalysis[];
    },
  });
};

export const useTodayMacros = () => {
  return useQuery({
    queryKey: ['today-macros'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('food_analyses')
        .select('calories, proteins, carbs, fats')
        .gte('created_at', `${today}T00:00:00.000Z`)
        .lt('created_at', `${today}T23:59:59.999Z`);

      if (error) {
        throw error;
      }

      // Calculer les totaux
      const totals = data.reduce(
        (acc, item) => ({
          calories: acc.calories + (item.calories || 0),
          proteins: acc.proteins + (item.proteins || 0),
          carbs: acc.carbs + (item.carbs || 0),
          fats: acc.fats + (item.fats || 0),
        }),
        { calories: 0, proteins: 0, carbs: 0, fats: 0 }
      );

      return totals;
    },
  });
};