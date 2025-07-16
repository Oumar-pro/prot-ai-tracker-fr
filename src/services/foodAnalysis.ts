// src/services/foodAnalysis.ts
export interface FoodAnalysisResult {
  name: string;
  ingredients: string[];
  nutritionalInfo: {
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    fiber: number;
    sugar: number;
  };
  portion: {
    size: string;
    weight: number;
  };
  healthScore: number;
  recommendations: string[];
  allergies: string[];
  confidence: number;
}

export const analyzeFoodImage = async (imageBase64: string): Promise<FoodAnalysisResult> => {
  // !!! IMPORTANT : Assurez-vous que 'YOUR_SUPABASE_EDGE_FUNCTION_URL' est remplacé par l'URL réelle de votre fonction Edge Supabase.
  // Par exemple : 'https://abcdefghijk.supabase.co/functions/v1/analyze-food'
  const response = await fetch('YOUR_SUPABASE_EDGE_FUNCTION_URL', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Ajoutez l'en-tête d'autorisation si votre fonction Edge nécessite une clé d'API ou un token JWT :
      // 'Authorization': `Bearer votre_clé_supabase_anon_si_nécessaire`,
    },
    body: JSON.stringify({ imageBase64 }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(`Analyse error: ${response.status} - ${errorData.message || response.statusText}`);
  }

  return response.json();
};
