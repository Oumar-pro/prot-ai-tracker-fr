// src/components/onboarding/DietPreference.tsx
import React, { useState } from 'react';
import { OnboardingData } from '@/pages/Onboarding';
import OnboardingLayout from './OnboardingLayout';
import { Button } from '@/components/ui/button';

interface DietPreferenceProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const dietOptions = [
  // Options directement tirées de l'image, sans emojis
  { id: 'classic', label: 'Classique' }, // Traduction
  { id: 'pescatarian', label: 'Pescétarien' }, // Traduction
  { id: 'vegetarian', label: 'Végétarien' }, // Traduction
  { id: 'vegan', label: 'Végétalien' }, // Traduction
];

const DietPreference: React.FC<DietPreferenceProps> = ({
  onNext,
  onBack,
  data,
}) => {
  const [selectedDiet, setSelectedDiet] = useState(data.diet || '');

  const handleNext = () => {
    onNext({ diet: selectedDiet });
  };

  return (
    <OnboardingLayout
      title="Suivez-vous un régime alimentaire spécifique ?"
      subtitle="Aidez-nous à personnaliser vos recommandations de repas."
      onBack={onBack}
      onNext={handleNext} // ✅ Ajout de la prop manquante
      showProgress={true}
      currentStep={10} // Ajustez le numéro d'étape
      totalSteps={20}
      nextDisabled={!selectedDiet}
    >
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="space-y-4 mb-12">
          {dietOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedDiet(option.id)}
              className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.01] flex items-center space-x-4 ${
                selectedDiet === option.id
                  ? 'bg-prot-orange border-prot-orange shadow-lg'
                  : 'bg-prot-white border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Cercle de sélection (sans icône/emoji) */}
              <div className="w-6 h-6 rounded-full flex items-center justify-center">
                {selectedDiet === option.id ? (
                  // Cercle blanc avec point noir si sélectionné (sur fond orange)
                  <div className="w-full h-full rounded-full bg-prot-white flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-prot-black" />
                  </div>
                ) : (
                  // Cercle noir avec point blanc si non sélectionné (sur fond blanc)
                  <div className="w-full h-full rounded-full bg-prot-black border border-prot-black/30 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-prot-white" />
                  </div>
                )}
              </div>
              
              <div className="text-left flex-1">
                <div className={`text-xl font-semibold ${
                  selectedDiet === option.id ? 'text-prot-black' : 'text-prot-black'
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

export default DietPreference;
