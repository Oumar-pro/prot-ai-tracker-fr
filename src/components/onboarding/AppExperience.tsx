// src/components/onboarding/AppExperience.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';
import { OnboardingData } from '@/pages/Onboarding';

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
    { value: true, label: 'Oui', description: 'J\'ai déjà utilisé des applications de nutrition' }, // Traduction et suppression emoji
    { value: false, label: 'Non', description: 'C\'est ma première application de nutrition' }     // Traduction et suppression emoji
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
          </h2> {/* Traduction */}
          <p className="text-prot-medium-gray text-lg">
            Ceci nous aide à personnaliser votre expérience
          </p> {/* Traduction */}
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-4 mb-12">
            {options.map((option) => (
              <button
                key={option.value.toString()}
                onClick={() => setHasExperience(option.value)}
                className={`w-full py-4 px-6 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] ${ // Ajustement du padding
                  hasExperience === option.value
                    ? 'bg-prot-orange border-prot-orange shadow-lg' // OPTION SÉLECTIONNÉE : Fond ORANGE
                    : 'bg-prot-black border border-gray-700' // OPTION NON SÉLECTIONNÉE : Fond NOIR
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Icône de cercle de sélection */}
                  <div className="w-6 h-6 rounded-full flex items-center justify-center">
                    {hasExperience === option.value ? (
                      // Cercle blanc avec point noir si sélectionné (sur fond orange)
                      <div className="w-full h-full rounded-full bg-prot-white flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-prot-black" />
                      </div>
                    ) : (
                      // Cercle noir avec point blanc si non sélectionné (sur fond noir)
                      <div className="w-full h-full rounded-full bg-prot-black border border-prot-white/30 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-prot-white" />
                      </div>
                    )}
                  </div>

                  <div className="text-left flex-1">
                    {/* Texte des labels - couleur en fonction de la sélection */}
                    <div className={`text-xl font-semibold ${
                      hasExperience === option.value ? 'text-prot-black' : 'text-prot-white'
                    }`}>
                      {option.label}
                    </div>
                    {/* Texte des descriptions - couleur claire/grise */}
                    <div className={`text-sm ${
                      hasExperience === option.value ? 'text-prot-black/80' : 'text-gray-300'
                    }`}>
                      {option.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleNext}
          disabled={hasExperience === null}
          className="w-full h-14 bg-prot-black hover:bg-prot-black/80 text-prot-white font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:scale-100"
        >
          Suivant
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default AppExperience;
