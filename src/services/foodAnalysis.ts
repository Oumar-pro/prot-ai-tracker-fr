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
  const response = await fetch('https://mythpanxvzvspeynphay.supabase.co/functions/v1/analyze-food', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15dGhwYW54dnp2c3BleW5waGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MzcxNDgsImV4cCI6MjA2ODIxMzE0OH0.DxPrl7zbl5BfADaw1fXj0_b1ZiVzIMe2b23i4PPpg0Y`,
    },
    body: JSON.stringify({ imageBase64 }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(`Analyse error: ${response.status} - ${errorData.message || response.statusText}`);
  }

  return response.json();
};
