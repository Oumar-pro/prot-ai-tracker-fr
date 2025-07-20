// src/components/onboarding/PlanSummary.tsx
import React from 'react';
import { OnboardingData } from '@/pages/Onboarding';
import { Button } from '@/components/ui/button'; // Assurez-vous d'importer le composant Button si vous l'utilisez

interface PlanSummaryProps {
  onNext: () => void;
  data: OnboardingData;
}

const PlanSummary: React.FC<PlanSummaryProps> = ({ onNext, data }) => {
  // Calculate BMR using Mifflin-St Jeor equation
  const calculateBMR = () => {
    // Vérifier si toutes les données nécessaires sont présentes pour éviter les erreurs
    if (!data.height || !data.weight || !data.birthDate || !data.gender) return 2000;
    
    // Assurez-vous que data.height et data.weight sont en KG et CM pour la formule.
    // Si data.heightUnit est 'imperial', vous devrez convertir ces valeurs d'abord.
    let weightKg = data.weight; // Supposons que data.weight est déjà en kg ou sera converti
    let heightCm = data.height; // Supposons que data.height est déjà en cm ou sera converti

    // Exemple de conversion si les données d'entrée sont en Imperial et que la formule attend Metric
    if (data.heightUnit === 'imperial') {
        weightKg = data.weight * 0.453592; // lbs to kg
        heightCm = data.height * 2.54;   // inches to cm (vous devrez vous assurer que data.height est en inches si c'est 'imperial')
    }

    const age = new Date().getFullYear() - data.birthDate.year;
    let bmr = 0;
    
    if (data.gender === 'male') {
      bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
    }
    
    // Apply activity factor
    const activityFactors = {
      '0-2': 1.2, // Correspond à 'Workouts now and then'
      '3-5': 1.375, // Correspond à 'A few workouts per week'
      '6-7': 1.55, // Correspond à 'Dedicated athlete' - j'ai adapté à 6+ pour le code original
      // Ajustez ces facteurs si vos options d'exercice ont changé
    };
    
    const factor = activityFactors[data.exerciseFrequency as keyof typeof activityFactors] || 1.2;
    return Math.round(bmr * factor);
  };

  const dailyCalories = calculateBMR();
  // Ajuster le calcul des macros pour être plus standard (ex: protéines 1.6-2.2g/kg, glucides 45-65%, lipides 20-35%)
  // Pour la cohérence avec l'image, je vais utiliser des valeurs fixes ou des ratios
  // L'image montre 1972 Calories, 229g Carbs, 140g Protein, 54g Fats.
  // Je vais simuler ces valeurs ou les calculer si les données sont suffisantes.
  const protein = data.weight ? Math.round(data.weight * (data.heightUnit === 'imperial' ? 1 : 2.2)) : 140; // Ex: 1g/lb ou 2.2g/kg
  const carbs = Math.round((dailyCalories * 0.45) / 4); // 45% of calories
  const fats = Math.round((dailyCalories * 0.25) / 9); // 25% of calories

  // Calcul de la date cible
  const targetDate = new Date();
  // Utiliser la valeur de goalSpeed qui est une vitesse par semaine (ex: 1.5 lbs/semaine)
  // Assurez-vous que data.weight et data.desiredWeight sont dans la même unité pour ce calcul,
  // et que data.goalSpeed est aussi dans cette unité ou un ratio compatible.
  let weightDiff = 0;
  if (data.weight && data.desiredWeight) {
    if (data.heightUnit === 'imperial') {
        weightDiff = Math.abs(data.desiredWeight - data.weight); // Si les deux sont en lbs
    } else {
        weightDiff = Math.abs(data.desiredWeight - data.weight); // Si les deux sont en kg
    }
  }

  // Convertir goalSpeed en l'unité appropriée si nécessaire (si goalSpeed est en lbs/semaine et poids en kg)
  let speedPerWeek = data.goalSpeed || 1; // La vitesse est en lbs/semaine (0.2, 1.5, 3.0)
  if (data.heightUnit === 'metric') {
      speedPerWeek = speedPerWeek * 0.453592; // Convertir lbs/semaine en kg/semaine
  }

  const weeksToGoal = speedPerWeek > 0 ? Math.round(weightDiff / speedPerWeek) : 0;
  targetDate.setDate(targetDate.getDate() + (weeksToGoal * 7));

  // Texte pour le résumé de l'objectif de poids
  let goalSummaryText = "";
  if (data.goal === 'lose' && data.weight && data.desiredWeight) {
    const diff = Math.round(data.weight - data.desiredWeight);
    goalSummaryText = `Vous devriez perdre : ${diff} ${data.heightUnit === 'imperial' ? 'lbs' : 'kg'}`;
  } else if (data.goal === 'gain' && data.weight && data.desiredWeight) {
    const diff = Math.round(data.desiredWeight - data.weight);
    goalSummaryText = `Vous devriez gagner : ${diff} ${data.heightUnit === 'imperial' ? 'lbs' : 'kg'}`;
  } else {
    goalSummaryText = `Votre poids sera maintenu`;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-prot-orange rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-white text-2xl">✓</div>
          </div>
          
          <h1 className="text-2xl font-bold text-prot-black mb-2">
            Félicitations !
          </h1>
          <h2 className="text-xl font-semibold text-prot-black mb-4">
            Votre plan personnalisé est prêt
          </h2>
          
          {/* Nouveau bloc pour "You should Gain: 10.0 lbs by October 07" */}
          <div className="bg-prot-light-gray rounded-xl py-3 px-6 inline-block mb-8">
            <p className="text-prot-black font-semibold text-lg">
              {goalSummaryText} par le {targetDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <p className="text-prot-medium-gray text-lg mt-4"> {/* Ligne "Daily Recommendation" */}
            Recommandation Quotidienne
          </p>
          <p className="text-prot-medium-gray text-sm"> {/* Ligne "You can edit this any time" */}
            Vous pouvez modifier cela à tout moment
          </p>
        </div>

        <div className="w-full space-y-4 mb-8">
          {/* Grille de 2x2 pour les informations nutritionnelles */}
          <div className="grid grid-cols-2 gap-3">
            {/* Calories */}
            <div className="bg-prot-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm flex flex-col items-center justify-center">
              <div className="relative w-20 h-20 mb-2"> {/* Conteneur pour le cercle de progression */}
                {/* Ici vous intégreriez un composant de cercle de progression SVG/Canvas ou une librairie */}
                {/* Pour cet exemple, je vais simuler un cercle avec CSS pour le visuel initial */}
                <div className="w-full h-full rounded-full border-4 border-gray-200 flex items-center justify-center">
                  {/* Le cercle de progression noir comme dans l'image */}
                  <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-prot-black" 
                       style={{ clipPath: 'inset(0 50% 0 0)' }}> {/* Simule une partie remplie */}
                  </div>
                  <span className="text-prot-black text-2xl font-bold z-10">{dailyCalories}</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-prot-light-gray rounded-full p-1.5 shadow-md">
                    {/* Icône de crayon/édition - utiliser une icône réelle si disponible */}
                    ✏️
                </div>
              </div>
              <div className="text-sm text-prot-medium-gray">Calories</div>
            </div>
            
            {/* Carbs */}
            <div className="bg-prot-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm flex flex-col items-center justify-center">
              <div className="relative w-20 h-20 mb-2">
                <div className="w-full h-full rounded-full border-4 border-gray-200 flex items-center justify-center">
                  <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-prot-orange" 
                       style={{ clipPath: 'inset(0 50% 0 0)' }}> {/* Simule une partie remplie */}
                  </div>
                  <span className="text-prot-black text-2xl font-bold z-10">{carbs}g</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-prot-light-gray rounded-full p-1.5 shadow-md">
                    ✏️
                </div>
              </div>
              <div className="text-sm text-prot-medium-gray">Glucides</div> {/* Traduction */}
            </div>
            
            {/* Protein */}
            <div className="bg-prot-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm flex flex-col items-center justify-center">
              <div className="relative w-20 h-20 mb-2">
                <div className="w-full h-full rounded-full border-4 border-gray-200 flex items-center justify-center">
                  <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-red-500" // Utilisez la couleur que vous souhaitez pour la Protéine
                       style={{ clipPath: 'inset(0 50% 0 0)' }}> {/* Simule une partie remplie */}
                  </div>
                  <span className="text-prot-black text-2xl font-bold z-10">{protein}g</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-prot-light-gray rounded-full p-1.5 shadow-md">
                    ✏️
                </div>
              </div>
              <div className="text-sm text-prot-medium-gray">Protéines</div> {/* Traduction */}
            </div>
            
            {/* Fats */}
            <div className="bg-prot-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm flex flex-col items-center justify-center">
              <div className="relative w-20 h-20 mb-2">
                <div className="w-full h-full rounded-full border-4 border-gray-200 flex items-center justify-center">
                  <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-blue-500" // Utilisez la couleur que vous souhaitez pour les Lipides
                       style={{ clipPath: 'inset(0 50% 0 0)' }}> {/* Simule une partie remplie */}
                  </div>
                  <span className="text-prot-black text-2xl font-bold z-10">{fats}g</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-prot-light-gray rounded-full p-1.5 shadow-md">
                    ✏️
                </div>
              </div>
              <div className="text-sm text-prot-medium-gray">Lipides</div> {/* Traduction */}
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full h-14 bg-prot-orange hover:bg-prot-orange/90 text-prot-black font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg"
      >
        C'est parti !
      </Button> {/* Traduction */}
    </div>
  );
};

export default PlanSummary;
  
