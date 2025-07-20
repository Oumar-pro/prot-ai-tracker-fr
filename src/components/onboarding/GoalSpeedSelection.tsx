// src/components/onboarding/GoalSpeedSelection.tsx
import React, { useState, useEffect } from 'react'; // Ajout de useEffect
import { OnboardingData } from '@/pages/Onboarding';
import OnboardingLayout from './OnboardingLayout';
import { Slider } from '@/components/ui/slider'; // Assurez-vous que le composant Slider gère bien le style souhaité
import { Button } from '@/components/ui/button';

interface GoalSpeedSelectionProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const speedLabels = {
  0.2: { label: 'Très Lent', icon: ' sloth', description: 'Prenez votre temps, développez de saines habitudes' }, // Valeur ajustée pour correspondre à l'image
  1.5: { label: 'Modéré', icon: ' rabbit', description: 'Approche équilibrée, progrès durable' }, // Valeur ajustée pour correspondre à l'image
  3.0: { label: 'Rapide', icon: ' cheetah', description: 'Résultats accélérés, plus de discipline nécessaire' }, // Valeur ajustée pour correspondre à l'image
};

const GoalSpeedSelection: React.FC<GoalSpeedSelectionProps> = ({
  onNext,
  onBack,
  data,
}) => {
  // Ajustez la valeur initiale pour qu'elle corresponde aux nouvelles min/max/step du slider de l'image
  const [goalSpeed, setGoalSpeed] = useState(data.goalSpeed || 1.5); // Default à 1.5 pour "Modéré"

  // Trouvez la description et l'icône basées sur la valeur actuelle la plus proche
  const currentSpeedLabel = Object.keys(speedLabels)
    .map(Number)
    .reduce((prev, curr) => (Math.abs(curr - goalSpeed) < Math.abs(prev - goalSpeed) ? curr : prev));

  const currentSpeed = speedLabels[currentSpeedLabel as keyof typeof speedLabels];

  // Définir la vitesse recommandée (ici, la valeur "Modéré")
  const recommendedSpeed = 1.5;

  // État pour la couleur du texte et du background du texte de vitesse
  const [speedDisplayBg, setSpeedDisplayBg] = useState('bg-prot-white');
  const [speedDisplayText, setSpeedDisplayText] = useState('text-prot-black');

  useEffect(() => {
    // Simule la conversion lbs/kg basée sur le goalSpeed (qui est une vitesse par semaine)
    // C'est une estimation car l'image affiche des lbs/kg mais le slider est sur 0.2, 1.5, 3.0 lbs
    // Je vais garder les valeurs de l'image pour les "min/max/step" du slider, et adapter l'affichage.
    // L'image utilise 1.9 lbs comme exemple pour la vitesse de prise de poids.
    // Je vais lier directement la valeur du slider à l'affichage du poids.
    // Pour "lose" ou "gain", la direction du poids est impliquée.
    // Pour cet exemple, je vais utiliser la valeur brute du slider et l'afficher comme "lbs" pour coller à l'image.

    if (data.goal === 'lose') {
        setSpeedDisplayBg('bg-red-100'); // Pour la perte de poids
        setSpeedDisplayText('text-red-800');
    } else if (data.goal === 'gain') {
        setSpeedDisplayBg('bg-green-100'); // Pour la prise de poids
        setSpeedDisplayText('text-green-800');
    } else {
        setSpeedDisplayBg('bg-blue-100'); // Pour le maintien
        setSpeedDisplayText('text-blue-800');
    }
  }, [data.goal]); // Se déclenche quand le goal change


  const handleNext = () => {
    onNext({ goalSpeed });
  };

  const handleRecommend = () => {
    setGoalSpeed(recommendedSpeed); // Définit la vitesse sur la valeur recommandée
  };

  // Titre et sous-titre traduits
  const pageTitle = "À quelle vitesse voulez-vous atteindre votre objectif ?"; // Traduction
  const pageSubtitle = "Choisissez votre calendrier préféré."; // Traduction

  // Texte du type de vitesse (gain/perte) basé sur le goal
  const speedTypeLabel = data.goal === 'gain' ? 'Vitesse de prise de poids par semaine' : 
                         data.goal === 'lose' ? 'Vitesse de perte de poids par semaine' :
                         'Changement de poids par semaine';

  // L'affichage de la valeur réelle sur le slider (ex: 1.9 lbs)
  // Utilisons les valeurs directement du slider (0.2, 1.5, 3.0) et multiplions par un facteur si nécessaire
  // Pour coller à l'image qui montre 1.9 lbs, on va juste prendre la valeur actuelle du slider
  // et l'afficher avec une décimale.
  const displayValue = goalSpeed; // La valeur du slider (0.2, 1.5, 3.0)

  return (
    <OnboardingLayout
      title={pageTitle}
      subtitle={pageSubtitle}
      onBack={onBack}
      showProgress={true}
      currentStep={11} // Ajustez le numéro d'étape
      totalSteps={20}
      nextDisabled={false} // Le bouton est toujours actif une fois une valeur sélectionnée (par défaut)
    >
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="bg-prot-white rounded-2xl p-6 mb-8 w-full max-w-sm shadow-lg"> {/* Conteneur blanc central */}
          <div className="text-center mb-8">
            <p className="text-prot-medium-gray text-lg mb-2">{speedTypeLabel}</p> {/* Texte au-dessus du poids */}
            <div className={`text-6xl font-bold ${speedDisplayText}`}> {/* Couleur du texte dynamique */}
              {displayValue} <span className="text-3xl">lbs</span> {/* Toujours en lbs pour coller à l'image */}
            </div>
          </div>

          <div className="px-6"> {/* Padding pour le slider et les labels */}
            <Slider
              value={[goalSpeed]}
              onValueChange={(value) => setGoalSpeed(value[0])}
              min={0.2} // Minimum comme sur l'image
              max={3.0} // Maximum comme sur l'image
              step={0.1} // Pas plus fin pour permettre 1.9 lbs
              className="w-full"
              // Le style du slider track et thumb doit être configuré dans tailwind.config.js
              // pour utiliser 'prot-orange' comme 'primary' ou surcharger directement.
              // Le thumb peut être en 'prot-black' comme dans l'image.
            />
            <div className="flex justify-between text-base text-prot-medium-gray mt-4">
              <div className="text-center">
                <span className="text-3xl">{speedLabels[0.2].icon}</span> {/* Paresseux */}
                <div>Lent</div> {/* Traduction */}
              </div>
              <div className="text-center">
                <span className="text-3xl">{speedLabels[1.5].icon}</span> {/* Lapin */}
                <div>Modéré</div> {/* Traduction */}
              </div>
              <div className="text-center">
                <span className="text-3xl">{speedLabels[3.0].icon}</span> {/* Guépard */}
                <div>Rapide</div> {/* Traduction */}
              </div>
            </div>
          </div>

          <Button
            onClick={handleRecommend}
            className="w-full mt-8 h-12 bg-prot-light-gray hover:bg-gray-300 text-prot-black font-semibold text-lg rounded-2xl transition-all duration-200 shadow-md"
          >
            Recommandé
          </Button> {/* Traduction */}
        </div>
      </div>
      {/* Le bouton "Suivant" est géré par OnboardingLayout avec le style Orange/Noir */}
    </OnboardingLayout>
  );
};

export default GoalSpeedSelection;
            
