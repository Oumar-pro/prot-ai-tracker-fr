// src/components/onboarding/DesiredWeightSelection.tsx
import React, { useState, useEffect, useRef } from 'react';
import { OnboardingData } from '@/pages/Onboarding';
import OnboardingLayout from './OnboardingLayout';
import { Button } from '@/components/ui/button'; // Assurez-vous d'importer Button si vous l'utilisez directement dans le layout

interface DesiredWeightSelectionProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const DesiredWeightSelection: React.FC<DesiredWeightSelectionProps> = ({
  onNext,
  onBack,
  data,
}) => {
  const currentWeight = data.weight || 70; // En kg
  const isWeightLoss = data.goal === 'lose';

  // Définir les plages en KG
  const minWeightKg = isWeightLoss ? Math.max(40, currentWeight - 50) : currentWeight;
  const maxWeightKg = isWeightLoss ? currentWeight - 1 : currentWeight + 50;

  // Calculer la valeur initiale du poids désiré en fonction de l'unité
  const initialDesiredWeight = data.desiredWeight || 
    (isWeightLoss ? currentWeight - 10 : currentWeight + 10); // Toujours en kg initialement

  const [desiredWeight, setDesiredWeight] = useState(initialDesiredWeight); // Poids en KG

  // Convertir le poids et les plages en LBS si l'unité est impériale pour l'affichage
  const displayMinWeight = data.heightUnit === 'imperial' ? Math.round(minWeightKg * 2.20462) : minWeightKg;
  const displayMaxWeight = data.heightUnit === 'imperial' ? Math.round(maxWeightKg * 2.20462) : maxWeightKg;
  const displayDesiredWeight = data.heightUnit === 'imperial' ? Math.round(desiredWeight * 2.20462) : desiredWeight;


  const handleNext = () => {
    // S'assurer que la valeur stockée est toujours en KG avant de passer
    let finalDesiredWeightKg = desiredWeight;
    if (data.heightUnit === 'imperial') {
        finalDesiredWeightKg = Math.round(desiredWeight * 0.453592); // Convertir lbs en kg si nécessaire
    }
    onNext({ desiredWeight: finalDesiredWeightKg });
  };

  // Titre et sous-titre traduits
  const pageTitle = "Choisissez votre poids désiré";
  const pageSubtitle = `Poids actuel : ${Math.round(currentWeight)} ${data.heightUnit === 'imperial' ? 'lbs' : 'kg'}`;

  // Logique pour la règle personnalisée
  const rulerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(0); // Position en pixels du curseur sur la règle

  // Fonction pour calculer la valeur du poids à partir d'une position de slider
  const getValueFromPosition = (position: number) => {
    if (!rulerRef.current) return desiredWeight;
    const rulerWidth = rulerRef.current.clientWidth;
    const range = displayMaxWeight - displayMinWeight;
    const valuePerPixel = range / rulerWidth;
    let newValue = displayMinWeight + (position * valuePerPixel);
    
    // Arrondir à l'incrément approprié (1 pour lbs, 0.5 pour kg)
    const step = data.heightUnit === 'imperial' ? 1 : 0.5;
    newValue = Math.round(newValue / step) * step;

    return data.heightUnit === 'imperial' ? newValue : Math.round(newValue * 10) / 10; // Arrondi pour kg
  };

  // Fonction pour calculer la position du slider à partir d'une valeur de poids
  const getPositionFromValue = (value: number) => {
    if (!rulerRef.current) return 0;
    const rulerWidth = rulerRef.current.clientWidth;
    const range = displayMaxWeight - displayMinWeight;
    const percentage = (value - displayMinWeight) / range;
    return percentage * rulerWidth;
  };

  useEffect(() => {
    // Initialiser la position du slider en fonction du poids désiré initial
    if (rulerRef.current) {
        const initialPos = getPositionFromValue(displayDesiredWeight);
        setSliderPosition(initialPos);
    }
  }, [displayDesiredWeight]);


  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startPos = sliderPosition;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!rulerRef.current) return;
      const currentX = moveEvent.clientX;
      const deltaX = currentX - startX;
      let newPos = startPos + deltaX;

      // Clamper la position dans les limites de la règle
      newPos = Math.max(0, Math.min(newPos, rulerRef.current.clientWidth));
      setSliderPosition(newPos);
      setDesiredWeight(getValueFromPosition(newPos)); // Mise à jour du poids désiré
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
    // Adaptez pour les événements tactiles si nécessaire (onTouchStart, onTouchMove, onTouchEnd)


  // Génération des graduations
  const renderRulerMarks = () => {
    const marks = [];
    const numMajorMarks = 10; // Ex: tous les 10 kg/lbs
    const numMinorMarks = 5;  // 5 subdivisions entre chaque major mark

    const totalRange = displayMaxWeight - displayMinWeight;
    
    // Déterminer l'intervalle pour les marques majeures
    const majorInterval = totalRange / numMajorMarks;

    for (let i = 0; i <= numMajorMarks; i++) {
        const value = displayMinWeight + (i * majorInterval);
        const percentage = (value - displayMinWeight) / totalRange;
        const leftPosition = percentage * 100; // En pourcentage de la largeur du conteneur

        // Marque majeure
        marks.push(
            <div 
                key={`major-${i}`} 
                className="absolute bg-prot-black h-8 w-0.5" 
                style={{ left: `${leftPosition}%`, transform: 'translateX(-50%)' }}
            ></div>
        );

        // Marques mineures (sauf à la dernière marque majeure)
        if (i < numMajorMarks) {
            for (let j = 1; j < numMinorMarks; j++) {
                const minorValue = value + (majorInterval / numMinorMarks) * j;
                const minorPercentage = (minorValue - displayMinWeight) / totalRange;
                const minorLeftPosition = minorPercentage * 100;

                marks.push(
                    <div 
                        key={`minor-${i}-${j}`} 
                        className="absolute bg-prot-black h-4 w-0.5" 
                        style={{ left: `${minorLeftPosition}%`, transform: 'translateX(-50%)' }}
                    ></div>
                );
            }
        }
    }
    return marks;
  };


  return (
    <OnboardingLayout
      title={pageTitle}
      subtitle={pageSubtitle}
      onBack={onBack}
      showProgress={true}
      currentStep={9} // Ajustez le numéro d'étape
      totalSteps={20}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="text-center mb-12">
          {/* Le titre et le sous-titre sont maintenant dans OnboardingLayout */}
        </div>

        <div className="flex-1 flex flex-col justify-center w-full max-w-md"> {/* Utiliser max-w-md pour une meilleure gestion de la largeur */}
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-prot-black mb-2">
              {Math.round(displayDesiredWeight)} {/* Afficher le poids dans l'unité d'affichage */}
            </div>
            <div className="text-xl text-prot-medium-gray">
              {data.heightUnit === 'imperial' ? 'lbs' : 'kg'}
            </div>
          </div>

          <div className="relative w-full h-24 bg-prot-white rounded-xl shadow-inner flex items-center justify-center overflow-hidden" ref={rulerRef} onMouseDown={handleMouseDown}>
            {/* Graduations de la règle */}
            {renderRulerMarks()}

            {/* Curseur central (le triangle noir) */}
            <div 
              className="absolute w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-prot-black -translate-y-2 z-20" // Ajusté pour le positionnement
              style={{ left: `calc(${sliderPosition}px - 5px)` }} // Positionne le centre du triangle
            ></div>
             {/* Ligne indiquant la sélection actuelle */}
            <div className="absolute bg-prot-orange h-1 w-full rounded-full" style={{ left: 0, top: '50%', transform: 'translateY(-50%)' }}></div>
          </div>

          <div className="flex justify-between text-base text-prot-medium-gray mt-2 w-full max-w-md">
            <span>{displayMinWeight}</span>
            <span>{displayMaxWeight}</span>
          </div>
        </div>
        
        {/* Le bouton Suivant est géré par OnboardingLayout avec le style Orange/Noir */}
        {/* OnboardingLayout appellera onNext */}
      </div>
    </OnboardingLayout>
  );
};

export default DesiredWeightSelection;
         
