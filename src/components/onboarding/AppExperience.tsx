// src/components/onboarding/AppExperience.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';
import { OnboardingData } from '@/pages/Onboarding';
import { CheckCircle, CircleDot, Sparkles, NotebookText } from 'lucide-react'; // Importez les icônes nécessaires

interface AppExperienceProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const AppExperience: React.FC<AppExperienceProps> = ({ onNext, onBack, data }) => {
  const [hasExperience, setHasExperience] = useState<boolean | null>(
    data.hasAppExperience ?? null
  );

  const options = [
    { value: true, label: 'Oui', description: 'J\'ai déjà utilisé des applications de nutrition', icon: Sparkles }, // Icône pour "Oui"
    { value: false, label: 'Non', description: 'C\'est ma première application de nutrition', icon: NotebookText } // Icône pour "Non"
  ];

  const handleNext = () => {
    if (hasExperience !== null) {
      onNext({ hasAppExperience: hasExperience });
    }
  };

  return (
    <OnboardingLayout onBack={onBack} showProgress currentStep={5} totalSteps={20}>
      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-prot-black mb-4 leading-tight">
            Avez-vous déjà utilisé une application d'analyse nutritionnelle ?
          </h2>
          <p className="text-prot-medium-gray text-lg">
            Ceci nous aide à personnaliser votre expérience
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-4 mb-12">
            {options.map((option) => {
              const IconComponent = option.icon; // Récupère le composant icône spécifique à l'option
              return (
                <button
                  key={option.value.toString()}
                  onClick={() => setHasExperience(option.value)}
                  className={`w-full py-4 px-6 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                    hasExperience === option.value
                      ? 'bg-prot-orange border-prot-orange shadow-lg' // OPTION SÉLECTIONNÉE : Fond ORANGE
                      : 'bg-prot-white border-gray-200 hover:border-gray-300' // OPTION NON SÉLECTIONNÉE : Fond BLANC
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Conteneur pour les icônes de sélection et d'option */}
                    <div className="flex items-center justify-center gap-2">
                      {hasExperience === option.value ? (
                        // Icône de validation moderne pour sélectionné
                        <CheckCircle className="w-6 h-6 text-prot-black" /> 
                      ) : (
                        // Icône d'état non sélectionné moderne
                        <CircleDot className="w-6 h-6 text-gray-400" /> 
                      )}
                      {IconComponent && (
                        <IconComponent className={`w-8 h-8 ${hasExperience === option.value ? 'text-prot-black' : 'text-prot-medium-gray'}`} />
                      )}
                    </div>

                    <div className="text-left flex-1">
                      <div className={`text-xl font-semibold ${
                        hasExperience === option.value ? 'text-prot-black' : 'text-prot-black'
                      }`}>
                        {option.label}
                      </div>
                      <div className={`text-sm ${
                        hasExperience === option.value ? 'text-prot-black/80' : 'text-prot-medium-gray'
                      }`}>
                        {option.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <Button
          onClick={handleNext}
          disabled={hasExperience === null}
          className="w-full h-14 bg-prot-orange hover:bg-prot-orange/80 text-prot-black font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:scale-100" // Bouton Next en ORANGE, texte NOIR
        >
          Suivant
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default AppExperience;
