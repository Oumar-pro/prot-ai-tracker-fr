// src/components/onboarding/KeyBenefitScreen.tsx
import React from 'react';
import { OnboardingData } from '@/pages/Onboarding';
import OnboardingLayout from './OnboardingLayout'; // Utiliser OnboardingLayout pour le bouton Next et la structure

interface KeyBenefitScreenProps {
  onNext: () => void; // Pas besoin de passer de données ici, juste avancer
  data: OnboardingData; // Pour accéder à data.goal
}

const KeyBenefitScreen: React.FC<KeyBenefitScreenProps> = ({ onNext, data }) => {
  // Déterminer le texte de l'objectif (perte ou gain de poids)
  const goalText = data.goal === 'lose' ? 'perdez deux fois plus de poids' : 
                   data.goal === 'gain' ? 'gagnez deux fois plus de poids' : 
                   'atteignez vos objectifs deux fois plus rapidement';

  return (
    <OnboardingLayout
      title={`Avec ProtAI, ${goalText}`} // Titre dynamique et traduit
      subtitle="Par rapport à un régime seul." // Traduction et ajustement
      onNext={onNext}
      onBack={() => {}} // Pas de bouton retour sur cet écran final de présentation
      showProgress={false} // Cet écran est souvent hors de la barre de progression principale
      // progress={...} // Ne pas définir si showProgress est false
      nextDisabled={false} // Le bouton est toujours actif
    >
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="bg-prot-white rounded-2xl p-6 mb-12 w-full max-w-sm shadow-lg flex flex-col items-center">
          <div className="flex justify-around w-full mb-8">
            {/* Carte "Sans ProtAI" */}
            <div className="flex flex-col items-center">
              <div className="bg-prot-light-gray rounded-xl w-32 h-40 flex items-center justify-center mb-2">
                <span className="text-prot-black font-bold text-3xl">20%</span>
              </div>
              <p className="text-prot-black text-sm font-semibold mt-2">Sans ProtAI</p> {/* Traduction */}
            </div>

            {/* Carte "Avec ProtAI" */}
            <div className="flex flex-col items-center">
              <div className="bg-prot-black rounded-xl w-32 h-40 flex items-center justify-center mb-2">
                <span className="text-prot-orange font-bold text-3xl">2X</span>
              </div>
              <p className="text-prot-black text-sm font-semibold mt-2">Avec ProtAI</p> {/* Traduction */}
            </div>
          </div>

          <p className="text-prot-medium-gray text-center text-base px-4">
            ProtAI facilite le processus et vous aide à rester responsable.
          </p> {/* Traduction */}
        </div>
        {/* Le bouton "Next" est fourni par OnboardingLayout et son texte est géré là-bas, mais si on veut un texte différent pour ce bouton de fin, on peut le passer en prop */}
        {/* Pour ce bouton, on peut le surcharger ou utiliser un bouton personnalisé si OnboardingLayout ne le permet pas */}
        {/* Dans notre cas, OnboardingLayout a un nextButtonSlot ou onNext est appelé.
            Puisque ce n'est pas un bouton "Next" mais "Commencer", je le définis manuellement ici. */}
        <Button
            onClick={onNext}
            className="w-full h-14 bg-prot-orange hover:bg-prot-orange/90 text-prot-black font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg"
        >
            C'est parti !
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default KeyBenefitScreen;
        
