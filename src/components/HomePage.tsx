// src/components/HomePage.tsx
import React from 'react';
import { useNutrition } from '../hooks/useNutrition'; // Import du hook de nutrition
import AnalysisNotification from './AnalysisNotification'; // Import du composant de notification

const HomePage: React.FC = () => {
  const { nutritionData, recentMeals, analysisState, startFoodAnalysis } = useNutrition();

  const handleAddFood = () => {
    // C'est ici que la logique pour la caméra ou la sélection d'image serait implémentée.
    // Pour cet exemple, nous utilisons une image Base64 mockée pour le test.
    // En production, vous passeriez la VRAIE image Base64 de la caméra ou de la galerie.
    const mockImageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

    // Lance l'analyse directement depuis le composant HomePage
    startFoodAnalysis(mockImageBase64);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800">Prot AI</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Calendrier */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            {/* Ici, j'ai simplifié le calendrier pour correspondre à votre image avec un "S 15" en bleu */}
            {/* Vous pouvez rendre ce calendrier dynamique plus tard */}
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
              <div 
                key={day} 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  day === 'S' && index === 5 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                <span className="text-sm">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calories */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {nutritionData.dailyGoals.calories - nutritionData.calories}
            </h2>
            <p className="text-gray-600">
              Calories restantes
            </p>
            <p className="text-sm text-gray-500">
              {nutritionData.calories} / {nutritionData.dailyGoals.calories} consommées
            </p>
          </div>
        </div>

        {/* Macronutriments */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-center">
              <div className="text-orange-500 text-sm mb-1">Protéines</div>
              <div className="text-xl font-bold">
                {nutritionData.dailyGoals.proteins - nutritionData.proteins}
              </div>
              <div className="text-xs text-gray-500">g restantes</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-center">
              <div className="text-yellow-500 text-sm mb-1">Glucides</div>
              <div className="text-xl font-bold">
                {nutritionData.dailyGoals.carbs - nutritionData.carbs}
              </div>
              <div className="text-xs text-gray-500">g restantes</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-center">
              <div className="text-blue-500 text-sm mb-1">Lipides</div>
              <div className="text-xl font-bold">
                {nutritionData.dailyGoals.fats - nutritionData.fats}
              </div>
              <div className="text-xs text-gray-500">g restantes</div>
            </div>
          </div>
        </div>

        {/* Repas récents */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Repas récents</h3>

          {recentMeals.length === 0 && !analysisState.isInProgress ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Vous n'avez ajouté aucun aliment</p>
              <p className="text-sm text-gray-400">
                Commencez à suivre vos repas d'aujourd'hui en prenant des photos rapides
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentMeals.map((meal) => (
                <div key={meal.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-800">{meal.name}</h4>
                    <p className="text-sm text-gray-500">
                      {meal.nutritionalInfo.calories} cal
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {new Date(meal.timestamp).toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bouton d'ajout */}
        <button
          onClick={handleAddFood}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <span className="text-2xl">+</span>
        </button>
      </div>

      {/* Composant de notification d'analyse */}
      {/* S'affiche si l'analyse est en cours ou si la progression est > 0 (pour montrer le 100%) */}
      {(analysisState.isInProgress || analysisState.progress > 0) && (
        <AnalysisNotification 
          progress={analysisState.progress} 
          errorMessage={analysisState.error}
          foodName={analysisState.lastAnalyzedFood?.name}
        />
      )}
    </div>
  );
};

export default HomePage;
