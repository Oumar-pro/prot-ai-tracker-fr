// src/components/onboarding/ExerciseFrequency.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';
import { OnboardingData } from '@/pages/Onboarding';

interface ExerciseFrequencyProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const ExerciseFrequency: React.FC<ExerciseFrequencyProps> = ({ onNext, onBack, data }) => {
  const [selectedFrequency, setSelectedFrequency] = useState<'0-1' | '2-3' | '4-5' | '6-7' | null>(
    data.exerciseFrequency || null
  );

  const frequencyOptions = [
    { value: '0-1' as const, label: '0-1 fois par semaine', description: 'Mode de vie sédentaire' },
    { value: '2-3' as const, label: '2-3 fois par semaine', description: 'Activité légère' },
    { value: '4-5' as const, label: '4-5 fois par semaine', description: 'Activité modérée' },
    { value: '6-7' as const, label: '6-7 fois par semaine', description: 'Très actif' }
  ];

  const handleNext = () => {
    if (selectedFrequency) {
      onNext({ exerciseFrequency: selectedFrequency });
    }
  };

  return (
    <OnboardingLayout 
      onBack={onBack} 
      showProgress 
      currentStep={4} 
      totalSteps={20}
      // Assurez-vous que le OnboardingLayout a un fond blanc (bg-prot-white)
      // et que le padding est correct.
    >
      <div className="flex-1 flex flex-col px-6 py-8"> {/* Maintenez le padding général de la page */}
        {/* Titre et sous-titre */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-prot-black mb-4 leading-tight">
            Combien de fois faites-vous de l'exercice par semaine ?
          </h2>
          <p className="text-prot-medium-gray text-lg">
            Ceci nous aide à calibrer votre plan personnalisé.
          </p> {/* Texte ajusté pour correspondre à l'image */}
        </div>

        {/* Options de fréquence */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-4 mb-12">
            {frequencyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedFrequency(option.value)}
                // Design des options : fond foncé, texte clair, bordure subtile
                className={`w-full py-4 px-6 rounded-2xl transition-all duration-200 hover:scale-[1.02]
                  ${
                    selectedFrequency === option.value
                      ? 'bg-prot-orange border-prot-orange shadow-lg' // COULEUR ORANGE POUR L'OPTION SÉLECTIONNÉE
                      : 'bg-prot-black border border-gray-700' // FOND NOIR, BORDURE GRIS FONCÉ POUR NON SÉLECTIONNÉ
                  }
                `}
              >
                <div className="flex items-center space-x-4"> {/* Maintien space-x-4 pour l'icône de cercle */}
                  {/* Icône de cercle de sélection */}
                  <div className="w-6 h-6 rounded-full flex items-center justify-center">
                    {selectedFrequency === option.value ? (
                      // Cercle blanc avec point noir si sélectionné
                      <div className="w-full h-full rounded-full bg-prot-white flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-prot-black" />
                      </div>
                    ) : (
                      // Cercle noir avec point blanc si non sélectionné
                      <div className="w-full h-full rounded-full bg-prot-black border border-prot-white/30 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-prot-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-left flex-1">
                    {/* Texte des labels - couleur en fonction de la sélection */}
                    <div className={`text-xl font-semibold ${
                      selectedFrequency === option.value ? 'text-prot-black' : 'text-prot-white'
                    }`}>
                      {option.label}
                    </div>
                    {/* Texte des descriptions - couleur claire */}
                    <div className={`text-sm ${
                      selectedFrequency === option.value ? 'text-prot-black/80' : 'text-gray-300' // Légèrement plus clair pour la description
                    }`}>
                      {option.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bouton Suivant */}
        <Button
          onClick={handleNext}
          disabled={!selectedFrequency}
          className="w-full h-14 bg-prot-black hover:bg-prot-black/80 text-prot-white font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:scale-100" // Bouton Next en noir, texte blanc
        >
          Suivant
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default ExerciseFrequency;
                    
