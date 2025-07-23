// src/components/onboarding/ExerciseFrequency.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';
import { OnboardingData } from '@/pages/Onboarding';
import { CheckCircle, CircleDot, Dumbbell, Running, Bike, Award } from 'lucide-react'; // Importez les icônes nécessaires

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
    { value: '0-1' as const, label: '0-1 fois par semaine', description: 'Mode de vie sédentaire', icon: Dumbbell },
    { value: '2-3' as const, label: '2-3 fois par semaine', description: 'Activité légère', icon: Running },
    { value: '4-5' as const, label: '4-5 fois par semaine', description: 'Activité modérée', icon: Bike },
    { value: '6-7' as const, label: '6-7 fois par semaine', description: 'Très actif', icon: Award }
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
    >
      <div className="flex-1 flex flex-col px-6 py-8">
        {/* Titre et sous-titre */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-prot-black mb-4 leading-tight">
            Combien de fois faites-vous de l'exercice par semaine ?
          </h2>
          <p className="text-prot-medium-gray text-lg">
            Ceci nous aide à calibrer votre plan personnalisé.
          </p>
        </div>

        {/* Options de fréquence */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-4 mb-12">
            {frequencyOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => setSelectedFrequency(option.value)}
                  className={`w-full py-4 px-6 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02]
                    ${
                      selectedFrequency === option.value
                        ? 'bg-prot-orange border-prot-orange shadow-lg'
                        : 'bg-prot-white border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center space-x-4">
                    {/* Icône de sélection et icône de l'option */}
                    <div className="flex items-center justify-center gap-2">
                      {selectedFrequency === option.value ? (
                        <CheckCircle className="w-6 h-6 text-prot-black" />
                      ) : (
                        <CircleDot className="w-6 h-6 text-gray-400" />
                      )}
                      {IconComponent && (
                        <IconComponent className={`w-8 h-8 ${selectedFrequency === option.value ? 'text-prot-black' : 'text-prot-medium-gray'}`} />
                      )}
                    </div>

                    <div className="text-left flex-1">
                      <div className={`text-xl font-semibold ${
                        selectedFrequency === option.value ? 'text-prot-black' : 'text-prot-black'
                      }`}>
                        {option.label}
                      </div>
                      <div className={`text-sm ${
                        selectedFrequency === option.value ? 'text-prot-black/80' : 'text-prot-medium-gray'
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

        {/* Bouton Suivant */}
        <Button
          onClick={handleNext}
          disabled={!selectedFrequency}
          className="w-full h-14 bg-prot-orange hover:bg-prot-orange/80 text-prot-black font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:scale-100"
        >
          Suivant
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default ExerciseFrequency;
