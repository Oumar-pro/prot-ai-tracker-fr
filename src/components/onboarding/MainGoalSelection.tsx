// src/components/onboarding/MainGoalSelection.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';
import { OnboardingData } from '@/pages/Onboarding';

interface MainGoalSelectionProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const MainGoalSelection: React.FC<MainGoalSelectionProps> = ({ onNext, onBack, data }) => {
  const [selectedGoal, setSelectedGoal] = useState<'lose' | 'gain' | 'maintain' | null>(
    data.goal || null
  );

  const goalOptions = [
    { 
      value: 'lose' as const, 
      label: 'Perdre du poids', 
      description: 'Créer un déficit calorique'
      // Suppression de l'icône et de la couleur d'arrière-plan de l'icône
    },
    { 
      value: 'gain' as const, 
      label: 'Gagner du poids', 
      description: 'Créer un surplus calorique'
      // Suppression de l'icône et de la couleur d'arrière-plan de l'icône
    },
    { 
      value: 'maintain' as const, 
      label: 'Maintenir mon poids', 
      description: 'Équilibrer les calories'
      // Suppression de l'icône et de la couleur d'arrière-plan de l'icône
    }
  ];

  const handleNext = () => {
    if (selectedGoal) {
      onNext({ goal: selectedGoal });
    }
  };

  return (
    <OnboardingLayout onBack={onBack} showProgress currentStep={8} totalSteps={20}>
      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-prot-black mb-4 leading-tight">
            Quel est votre objectif principal ?
          </h2> {/* Traduction */}
          <p className="text-prot-medium-gray text-lg">
            Ceci nous aidera à créer votre plan personnalisé.
          </p> {/* Traduction */}
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-4 mb-12">
            {goalOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedGoal(option.value)}
                className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                  selectedGoal === option.value
                    ? 'bg-prot-orange border-prot-orange shadow-lg' // OPTION SÉLECTIONNÉE : Fond ORANGE, bordure ORANGE
                    : 'bg-prot-white border-gray-200 hover:border-gray-300' // OPTION NON SÉLECTIONNÉE : Fond BLANC, bordure GRIS CLAIR
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* RETIRÉ : le div `w-16 h-16 rounded-2xl ${option.color} flex items-center justify-center` */}
                  {/* RETIRÉ : le span `text-2xl` affichant `option.icon` */}

                  {/* Ajout du cercle de sélection pour aligner avec les autres écrans */}
                  <div className="w-6 h-6 rounded-full flex items-center justify-center">
                    {selectedGoal === option.value ? (
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
                    {/* Texte des labels - couleur NOIRE dans tous les cas */}
                    <div className={`text-xl font-semibold ${
                      selectedGoal === option.value ? 'text-prot-black' : 'text-prot-black'
                    }`}>
                      {option.label}
                    </div>
                    {/* Texte des descriptions - couleur gris moyen */}
                    <div className={`text-sm ${
                      selectedGoal === option.value ? 'text-prot-black/80' : 'text-prot-medium-gray'
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
          disabled={!selectedGoal}
          className="w-full h-14 bg-prot-orange hover:bg-prot-orange/90 text-prot-black font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:scale-100"
        >
          Suivant
        </Button> {/* Traduction */}
      </div>
    </OnboardingLayout>
  );
};

export default MainGoalSelection;
