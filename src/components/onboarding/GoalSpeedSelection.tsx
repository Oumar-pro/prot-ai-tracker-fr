// src/components/onboarding/GoalSpeedSelection.tsx
import React, { useState, useEffect } from 'react';
import { OnboardingData } from '@/pages/Onboarding';
import OnboardingLayout from './OnboardingLayout';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
// Pas d'icônes Lucide pour paresseux, lapin, guépard. Utiliser des emojis ou d'autres sources.
// import { ... } from 'lucide-react'; // Si tu as des icônes alternatives

interface GoalSpeedSelectionProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const speedLabels = {
  0.2: { label: 'Lent', icon: '🦥', description: 'Prenez votre temps, développez de saines habitudes' }, // Emoji paresseux
  1.5: { label: 'Modéré', icon: '🐇', description: 'Approche équilibrée, progrès durable' }, // Emoji lapin
  3.0: { label: 'Rapide', icon: '🐆', description: 'Résultats accélérés, plus de discipline nécessaire' }, // Emoji guépard
};

const GoalSpeedSelection: React.FC<GoalSpeedSelectionProps> = ({
  onNext,
  onBack,
  data,
}) => {
  const [goalSpeed, setGoalSpeed] = useState(data.goalSpeed || 1.5);

  // Déterminez la valeur de slider la plus proche pour afficher les labels correct
  const currentSpeedKey = Object.keys(speedLabels)
    .map(Number)
    .reduce((prev, curr) => (Math.abs(curr - goalSpeed) < Math.abs(prev - goalSpeed) ? curr : prev));

  const currentSpeedInfo = speedLabels[currentSpeedKey as keyof typeof speedLabels];

  // Définir la vitesse recommandée (ici, la valeur "Modéré")
  const recommendedSpeed = 1.5;

  // L'image n'a pas de couleurs dynamiques pour le texte de vitesse (3.0 lbs), il est noir.
  // Nous allons donc retirer la logique `speedDisplayBg` et `speedDisplayText` car elle n'est pas dans le design de l'image.

  const handleNext = () => {
    onNext({ goalSpeed });
  };

  const handleRecommend = () => {
    setGoalSpeed(recommendedSpeed);
  };

  // Titre et sous-titre traduits
  const pageTitle = "À quelle vitesse voulez-vous atteindre votre objectif ?";
  const pageSubtitle = "Choisissez votre calendrier préféré.";

  // Texte du type de vitesse (gain/perte) basé sur le goal
  const speedTypeLabel = data.goal === 'gain' ? 'Vitesse de prise de poids par semaine' :
                         data.goal === 'lose' ? 'Vitesse de perte de poids par semaine' :
                         'Changement de poids par semaine';

  // L'affichage de la valeur réelle sur le slider (ex: 1.9 lbs)
  // Formatons pour toujours avoir une décimale comme dans l'image
  const displayValue = goalSpeed.toFixed(1);

  // Condition pour afficher le message d'avertissement si la vitesse est la plus rapide (3.0 lbs)
  const showWarning = goalSpeed === 3.0;


  return (
    <OnboardingLayout
      onBack={onBack}
      showProgress={true}
      currentStep={11} // Ajustez le numéro d'étape
      totalSteps={20}
      nextDisabled={false} // Le bouton est toujours actif une fois une valeur sélectionnée (par défaut)
    >
      <div className="flex-1 flex flex-col items-center justify-start px-6 py-8"> {/* Ajusté justify-start pour le placement du titre */}
        {/* Titre et sous-titre traduits */}
        <div className="text-center mb-12 w-full">
          <h2 className="text-3xl font-bold text-prot-black mb-4 leading-tight">
            {pageTitle}
          </h2>
          <p className="text-prot-medium-gray text-lg">
            {pageSubtitle}
          </p>
        </div>

        <div className="bg-prot-white rounded-2xl p-6 mb-8 w-full max-w-sm shadow-lg flex flex-col items-center"> {/* Conteneur blanc central */}
          <div className="text-center mb-8 w-full">
            <p className="text-prot-medium-gray text-lg mb-2">{speedTypeLabel}</p>
            <div className={`text-6xl font-bold text-prot-black`}> {/* Couleur du texte fixe en noir */}
              {displayValue} <span className="text-3xl">lbs</span>
            </div>
          </div>

          <div className="px-2 w-full"> {/* Padding ajusté pour le slider et les labels, w-full pour occuper l'espace */}
            <Slider
              value={[goalSpeed]}
              onValueChange={(value) => setGoalSpeed(value[0])}
              min={0.2}
              max={3.0}
              step={0.1}
              className="w-full"
              // Le style du slider track et thumb (couleur orange pour le track, noir pour le thumb)
              // est généralement défini via le fichier `globals.css` ou dans la configuration Shadcn/Tailwind.
              // Exemple de classes qui pourraient être appliquées si Shadcn le permet:
              // track-color="bg-prot-orange" thumb-color="bg-prot-black"
            />
            <div className="flex justify-between text-base text-prot-medium-gray mt-4 w-full">
              <div className="flex flex-col items-center text-center flex-1">
                <span className="text-3xl mb-1">{speedLabels[0.2].icon}</span> {/* Paresseux */}
                <div className="text-prot-black text-sm">{speedLabels[0.2].label}</div> {/* Texte noir pour les labels sous les icônes */}
              </div>
              <div className="flex flex-col items-center text-center flex-1">
                <span className="text-3xl mb-1">{speedLabels[1.5].icon}</span> {/* Lapin */}
                <div className="text-prot-black text-sm">{speedLabels[1.5].label}</div>
              </div>
              <div className="flex flex-col items-center text-center flex-1">
                <span className="text-3xl mb-1">{speedLabels[3.0].icon}</span> {/* Guépard */}
                <div className="text-prot-black text-sm">{speedLabels[3.0].label}</div>
              </div>
            </div>
          </div>

          {showWarning && (
            <div className="bg-prot-light-gray rounded-xl p-4 mt-8 text-center text-prot-black text-base max-w-[280px]"> {/* Conteneur de message */}
              Vous pourriez vous sentir très fatigué et développer un excès de peau. {/* Traduction du texte de l'image */}
            </div>
          )}


          <Button
            onClick={handleRecommend}
            className="w-full mt-8 h-12 bg-prot-light-gray hover:bg-prot-light-gray/80 text-prot-black font-semibold text-lg rounded-2xl transition-all duration-200 shadow-md"
          >
            Recommandé
          </Button>
        </div>
      </div>
      {/* Le bouton "Suivant" est automatiquement ajouté par OnboardingLayout en bas */}
    </OnboardingLayout>
  );
};

export default GoalSpeedSelection;
      
