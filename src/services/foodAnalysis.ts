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

export class FoodAnalysisService {
  private apiKey: string;
  private baseUrl = 'https://openrouter.ai/api/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private getOptimizedPrompt(): string {
    return `Tu es un expert en nutrition et analyse alimentaire. Analyse cette image de plat et fournis une réponse JSON strictement structurée selon ce format :

{
  "name": "nom du plat principal identifié",
  "ingredients": ["ingrédient1", "ingrédient2", "ingrédient3"],
  "nutritionalInfo": {
    "calories": 450,
    "proteins": 25,
    "carbs": 35,
    "fats": 18,
    "fiber": 5,
    "sugar": 8
  },
  "portion": {
    "size": "moyenne",
    "weight": 250
  },
  "healthScore": 7,
  "recommendations": ["conseil1", "conseil2"],
  "allergies": ["allergie1", "allergie2"],
  "confidence": 85
}

Instructions spécifiques :
1. Identifie le plat principal et ses ingrédients visibles
2. Estime les valeurs nutritionnelles pour cette portion précise
3. Donne un score santé de 1-10 (10 = très sain)
4. Fournis 2-3 recommandations nutritionnelles personnalisées
5. Liste les allergènes potentiels
6. Indique ton niveau de confiance (0-100%)
7. Réponds UNIQUEMENT en JSON valide, sans texte supplémentaire

Si l'image n'est pas claire ou ne contient pas de nourriture, retourne :
{"error": "Image non analysable ou ne contient pas de nourriture identifiable"}`;
  }

  async analyzeImage(imageBase64: string): Promise<FoodAnalysisResult> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: this.getOptimizedPrompt()
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/jpeg;base64,${imageBase64}`
                  }
                }
              ]
            }
          ],
          max_tokens: 1000,
          temperature: 0.1,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('Réponse vide de l\'API');
      }

      // Nettoyer la réponse pour extraire le JSON
      const cleanedContent = content.replace(/```json|```/g, '').trim();
      const analysisResult = JSON.parse(cleanedContent);

      if (analysisResult.error) {
        throw new Error(analysisResult.error);
      }

      return analysisResult as FoodAnalysisResult;
    } catch (error) {
      console.error('Erreur lors de l\'analyse:', error);
      throw error;
    }
  }
}

export const getFoodAnalysisService = (): FoodAnalysisService | null => {
  const apiKey = localStorage.getItem('openrouter_api_key');
  return apiKey ? new FoodAnalysisService(apiKey) : null;
};