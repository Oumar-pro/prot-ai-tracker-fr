import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FoodAnalysisResult {
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting food analysis request');
    
    const { imageBase64 } = await req.json();
    
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'Image base64 is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
    
    if (!openRouterApiKey) {
      console.error('OPENROUTER_API_KEY not found');
      return new Response(
        JSON.stringify({ error: 'API configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analyzing image with OpenRouter API');

    const prompt = `Tu es un expert en nutrition et analyse alimentaire. Analyse cette image de plat et fournis une réponse JSON strictement structurée selon ce format :

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

    // Modèle mis à jour - l'ancien modèle n'existe plus
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://your-app-domain.com', // Ajout recommandé
        'X-Title': 'Food Analysis App', // Ajout recommandé
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o', // Modèle mis à jour
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                  detail: 'high' // Ajout pour une meilleure analyse
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
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, response.statusText, errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Empty response from API');
    }

    console.log('Received analysis result:', content);

    // Nettoyage plus robuste de la réponse JSON
    let cleanedContent = content.trim();
    
    // Supprimer les blocs de code markdown
    cleanedContent = cleanedContent.replace(/```json\s*|\s*```/g, '');
    
    // Supprimer tout texte avant le premier {
    const firstBrace = cleanedContent.indexOf('{');
    if (firstBrace > 0) {
      cleanedContent = cleanedContent.substring(firstBrace);
    }
    
    // Supprimer tout texte après le dernier }
    const lastBrace = cleanedContent.lastIndexOf('}');
    if (lastBrace > 0) {
      cleanedContent = cleanedContent.substring(0, lastBrace + 1);
    }

    let analysisResult: FoodAnalysisResult;
    
    try {
      analysisResult = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Content to parse:', cleanedContent);
      throw new Error('Invalid JSON response from AI');
    }

    if (analysisResult.error) {
      throw new Error(analysisResult.error);
    }

    // Validation des données
    if (!analysisResult.name || !analysisResult.ingredients || !analysisResult.nutritionalInfo) {
      throw new Error('Incomplete analysis result');
    }

    // Get user ID from auth header
    const authHeader = req.headers.get('authorization');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (authHeader && supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey, {
          global: {
            headers: { Authorization: authHeader },
          },
        });

        // Get user from auth header
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          console.error('Auth error:', authError);
        } else if (user) {
          console.log('Saving analysis to database for user:', user.id);
          
          // Save to database avec gestion d'erreur améliorée
          const { error: dbError } = await supabase
            .from('food_analyses')
            .insert({
              user_id: user.id,
              name: analysisResult.name,
              ingredients: analysisResult.ingredients,
              calories: analysisResult.nutritionalInfo.calories,
              proteins: analysisResult.nutritionalInfo.proteins,
              carbs: analysisResult.nutritionalInfo.carbs,
              fats: analysisResult.nutritionalInfo.fats,
              fiber: analysisResult.nutritionalInfo.fiber,
              sugar: analysisResult.nutritionalInfo.sugar,
              portion_size: analysisResult.portion.size,
              portion_weight: analysisResult.portion.weight,
              health_score: analysisResult.healthScore,
              recommendations: analysisResult.recommendations,
              allergies: analysisResult.allergies,
              confidence: analysisResult.confidence,
              created_at: new Date().toISOString(),
            });

          if (dbError) {
            console.error('Database error:', dbError);
          } else {
            console.log('Analysis saved successfully');
          }
        }
      } catch (dbError) {
        console.error('Database operation failed:', dbError);
        // Continue without failing the request
      }
    }

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-food function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Analysis failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
