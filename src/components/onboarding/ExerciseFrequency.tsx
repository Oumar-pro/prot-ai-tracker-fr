// src/components/onboarding/ExerciseFrequency.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';
import { OnboardingData } from '@/pages/Onboarding';
import { Circle, CheckCircle2 } from 'lucide-react'; // Importez les icônes de Lucide React

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
            {frequencyOptions.map((option) => (
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
                  {/* Icônes premium de sélection */}
                  <div className="w-6 h-6 flex items-center justify-center">
                    {selectedFrequency === option.value ? (
                      // Icône de cercle cochée pour l'option sélectionnée (sur fond orange)
                      <CheckCircle2 size={24} className="text-prot-black" /> // Icône noire sur fond orange
                    ) : (
                      // Icône de cercle vide pour l'option non sélectionnée (sur fond blanc)
                      <Circle size={24} className="text-prot-black" /> // Icône noire sur fond blanc
                    )}
                  </div>
                  
                  <div className="text-left flex-1">
                    {/* Texte des labels - couleur en fonction de la sélection */}
                    <div className={`text-xl font-semibold ${
                      selectedFrequency === option.value ? 'text-prot-black' : 'text-prot-black'
                    }`}>
                      {option.label}
                    </div>
                    {/* Texte des descriptions - couleur plus subtile */}
                    <div className={`text-sm ${
                      selectedFrequency === option.value ? 'text-prot-black/80' : 'text-prot-medium-gray'
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
          // Modifié pour être orange
          className="w-full h-14 bg-prot-orange hover:bg-prot-orange/80 text-prot-white font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:scale-100"
        >
          Suivant
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default ExerciseFrequency;
        
