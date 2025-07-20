// src/components/onboarding/ObstacleIdentification.tsx
import React, { useState } from 'react';
import { OnboardingData } from '@/pages/Onboarding';
import OnboardingLayout from './OnboardingLayout';
import { Button } from '@/components/ui/button';

interface ObstacleIdentificationProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const obstacleOptions = [
  // Options avec icônes et traductions, inspirées de l'image de référence et de vos options
  // L'image de référence utilise des icônes de "graphique à barres", "main", "calendrier", "pomme"
  // Je vais adapter les icônes à celles de l'image fournie où elles sont pertinentes, sinon j'utiliserai vos emojis.
  { id: 'consistency', label: 'Manque de régularité', icon: '📊' }, // Inspiré de "Lack of consistency" dans l'image
  { id: 'unhealthy_habits', label: 'Mauvaises habitudes alimentaires', icon: '🍔' }, // N'est pas directement dans l'image mais une option courante
  { id: 'lack_of_support', label: 'Manque de soutien', icon: '🤝' }, // Inspiré de "Lack of supports" dans l'image
  { id: 'busy_schedule', label: 'Emploi du temps chargé', icon: '🗓️' }, // Inspiré de "Busy schedule" dans l'image
  { id: 'meal_inspiration', label: "Manque d'inspiration pour les repas", icon: '🍎' }, // Inspiré de "Lack of meal inspiration" dans l'image
  // Vos options originales qui n'étaient pas dans l'image mais qui peuvent être conservées :
  { id: 'time', label: 'Manque de temps', icon: '⏰' },
  { id: 'motivation', label: 'Perte de motivation', icon: '😴' },
  { id: 'planning', label: 'Mauvaise planification des repas', icon: '📝' },
  { id: 'social', label: 'Pression sociale', icon: '👥' },
  { id: 'stress', label: 'Manger à cause du stress', icon: '😰' },
  { id: 'exercise', label: "Évitement de l'exercice", icon: '🏃‍♂️' },
  { id: 'budget', label: 'Contraintes budgétaires', icon: '💰' },
  { id: 'habits', label: 'Anciennes habitudes', icon: '🔄' },
];


const ObstacleIdentification: React.FC<ObstacleIdentificationProps> = ({
  onNext,
  onBack,
  data,
}) => {
  const [selectedObstacles, setSelectedObstacles] = useState<string[]>(data.obstacles || []);

  const toggleObstacle = (obstacleId: string) => {
    setSelectedObstacles(prev => 
      prev.includes(obstacleId)
        ? prev.filter(id => id !== obstacleId)
        : [...prev, obstacleId]
    );
  };

  const handleNext = () => {
    onNext({ obstacles: selectedObstacles });
  };

  return (
    <OnboardingLayout
      title="Qu'est-ce qui vous empêche d'atteindre vos objectifs ?" // Traduction
      subtitle="Identifions les obstacles potentiels (sélectionnez tout ce qui s'applique)" // Traduction
      onBack={onBack}
      showProgress={true}
      currentStep={12} // Ajustez le numéro d'étape
      totalSteps={20}
      nextDisabled={selectedObstacles.length === 0} // Le bouton est désactivé si rien n'est sélectionné
    >
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="space-y-4 mb-12"> {/* Utilisation de space-y pour l'espacement vertical */}
          {obstacleOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleObstacle(option.id)}
              className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.01] flex items-center space-x-4 ${ // Ajout de flexbox pour aligner l'icône et le texte
                selectedObstacles.includes(option.id)
                  ? 'bg-prot-orange border-prot-orange shadow-lg' // OPTION SÉLECTIONNÉE : Fond ORANGE, bordure ORANGE
                  : 'bg-prot-white border-gray-200 hover:border-gray-300' // OPTION NON SÉLECTIONNÉE : Fond BLANC, bordure GRIS CLAIR
              }`}
            >
              {/* Conteneur pour l'icône, similaire au design de l'image */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedObstacles.includes(option.id) ? 'bg-prot-white' : 'bg-prot-light-gray' // Fond blanc si sélectionné, gris clair si non sélectionné
              }`}>
                <span className="text-xl">{option.icon}</span> {/* Icône (emoji) */}
              </div>
              
              <div className="text-left flex-1">
                <div className={`text-xl font-semibold ${
                  selectedObstacles.includes(option.id) ? 'text-prot-black' : 'text-prot-black' // Texte NOIR dans tous les cas
                }`}>
                  {option.label}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Le bouton "Suivant" est géré par OnboardingLayout */}
    </OnboardingLayout>
  );
};

export default ObstacleIdentification;
