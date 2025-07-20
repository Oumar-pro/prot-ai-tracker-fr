// src/components/onboarding/LongTermResults.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';

interface LongTermResultsProps {
  onNext: () => void;
  onBack: () => void;
}

const LongTermResults: React.FC<LongTermResultsProps> = ({ onNext, onBack }) => {
  return (
    <OnboardingLayout onBack={onBack} showProgress currentStep={6} totalSteps={20}>
      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-prot-black mb-4 leading-tight">
            Perdez deux fois plus de poids avec Prot AI vs seul
          </h2> {/* Traduction et adaptation au titre de l'image */}
          <p className="text-prot-medium-gray text-lg mb-8">
            Ceci sera utilisé pour calibrer votre plan personnalisé.
          </p> {/* Traduction et adaptation au sous-titre de l'image */}
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {/* Conteneur pour les deux blocs côte à côte */}
          <div className="bg-prot-light-gray rounded-2xl p-4 mb-6 flex justify-around items-end gap-4 shadow-lg"> {/* Utilise bg-prot-light-gray comme fond principal du conteneur */}
            {/* Bloc "Sans Prot AI" */}
            <div className="flex-1 bg-prot-white rounded-xl p-4 text-center flex flex-col items-center justify-between min-h-[160px] max-w-[150px] shadow-sm">
              <span className="text-lg font-semibold text-prot-black mb-4">Sans Prot AI</span> {/* Traduction */}
              <div className="flex-1 flex items-center justify-center">
                 <span className="text-3xl font-bold text-prot-black">20%</span> {/* Texte en noir */}
              </div>
            </div>

            {/* Bloc "Avec Prot AI" */}
            <div className="flex-1 bg-prot-black rounded-xl p-4 text-center flex flex-col items-center justify-between min-h-[160px] max-w-[150px] shadow-md">
              <span className="text-lg font-semibold text-prot-white mb-4">Avec Prot AI</span> {/* Traduction, texte blanc */}
              <div className="flex-1 flex items-center justify-center">
                <span className="text-3xl font-bold text-prot-white">2X</span> {/* Texte blanc */}
              </div>
            </div>
          </div>

          {/* Texte de description sous les blocs */}
          <div className="text-center text-prot-black font-semibold text-lg px-4 mb-12">
            Prot AI facilite le processus et vous rend responsable.
          </div> {/* Traduction et adaptation au texte de l'image */}
        </div>

        <Button
          onClick={onNext}
          className="w-full h-14 bg-prot-black hover:bg-prot-black/80 text-prot-white font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg mt-8"
        >
          Suivant
        </Button> {/* Traduction */}
      </div>
    </OnboardingLayout>
  );
};

export default LongTermResults;
                
