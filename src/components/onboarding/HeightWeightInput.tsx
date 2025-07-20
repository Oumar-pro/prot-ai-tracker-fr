// src/components/onboarding/HeightWeightInput.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';
import { OnboardingData } from '@/pages/Onboarding';

interface HeightWeightInputProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

// Composant de sélecteur défilant réutilisable (adapté de BirthDateSelection)
const ScrollPicker = ({ 
  items, 
  selectedIndex, 
  onSelect, 
  containerRef,
  formatter = (item: any) => item.toString()
}: {
  items: any[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  formatter?: (item: any) => string;
}) => {
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const itemHeight = 60; // Hauteur de chaque élément
    const scrollTop = container.scrollTop;
    // Calculer l'index basé sur la position de défilement
    const newIndex = Math.round(scrollTop / itemHeight);
    const clampedIndex = Math.max(0, Math.min(newIndex, items.length - 1));
    
    if (clampedIndex !== selectedIndex) {
      onSelect(clampedIndex);
    }
  };

  useEffect(() => {
    if (containerRef.current && selectedIndex >= 0 && selectedIndex < items.length) {
      // Défilement initial pour centrer l'élément sélectionné
      containerRef.current.scrollTop = selectedIndex * 60;
    }
  }, [selectedIndex, containerRef, items.length]); // Dépendance items.length ajoutée

  return (
    <div 
      ref={containerRef}
      className="h-60 overflow-y-auto scrollbar-hide relative" // Hauteur fixe pour le picker
      onScroll={handleScroll}
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {/* Indicateur de sélection - couleur blanche/transparente sur fond sombre */}
      <div className="absolute inset-x-0 top-[100px] h-[60px] bg-prot-white/10 border-y-2 border-prot-white/20 pointer-events-none z-10 rounded-xl" />
      
      {/* Padding top et bottom pour centrer l'élément sélectionné */}
      <div className="h-[100px]" />
      
      {items.map((item, index) => (
        <div
          key={index}
          className={`h-[60px] flex items-center justify-center transition-all duration-200 ${
            index === selectedIndex 
              ? 'text-prot-orange text-3xl font-bold' // Texte orange et plus grand si sélectionné
              : 'text-prot-white/50 text-xl' // Texte blanc/gris et plus petit si non sélectionné
          }`}
          style={{ scrollSnapAlign: 'center' }}
        >
          {formatter(item)}
        </div>
      ))}
      
      <div className="h-[100px]" />
    </div>
  );
};


const HeightWeightInput: React.FC<HeightWeightInputProps> = ({ onNext, onBack, data }) => {
  const [unit, setUnit] = useState<'imperial' | 'metric'>(data.heightUnit || 'metric');
  
  // États pour les valeurs brutes de taille et de poids
  const [heightCm, setHeightCm] = useState(data.height || 170); // Default cm
  const [weightKg, setWeightKg] = useState(data.weight || 70); // Default kg

  // États pour les valeurs impériales (dérivées ou initiales)
  const [heightFt, setHeightFt] = useState(Math.floor((data.height || 170) * 0.0328084)); // cm to ft
  const [heightIn, setHeightIn] = useState(Math.round(((data.height || 170) * 0.0328084 - heightFt) * 12)); // remaining inches
  const [weightLbs, setWeightLbs] = useState(Math.round((data.weight || 70) * 2.20462)); // kg to lbs

  // Refs pour les scroll pickers
  const cmRef = useRef<HTMLDivElement>(null);
  const kgRef = useRef<HTMLDivElement>(null);
  const ftRef = useRef<HTMLDivElement>(null);
  const inRef = useRef<HTMLDivElement>(null);
  const lbsRef = useRef<HTMLDivElement>(null);

  // Gammes de valeurs pour les scroll pickers
  const cmOptions = Array.from({ length: 121 }, (_, i) => 100 + i); // 100cm à 220cm
  const kgOptions = Array.from({ length: 171 }, (_, i) => 30 + i); // 30kg à 200kg

  const ftOptions = Array.from({ length: 5 }, (_, i) => 3 + i); // 3ft à 7ft
  const inOptions = Array.from({ length: 12 }, (_, i) => i); // 0in à 11in
  const lbsOptions = Array.from({ length: 241 }, (_, i) => 60 + i); // 60lbs à 300lbs

  // Fonction pour convertir les unités et appeler onNext
  const handleNext = () => {
    let finalHeight: number;
    let finalWeight: number;

    if (unit === 'metric') {
      finalHeight = heightCm;
      finalWeight = weightKg;
    } else {
      // Convertir pieds/pouces en cm
      finalHeight = Math.round((heightFt * 30.48) + (heightIn * 2.54));
      // Convertir lbs en kg
      finalWeight = Math.round(weightLbs * 0.453592);
    }
    
    onNext({ 
      heightUnit: unit,
      height: finalHeight,
      weight: finalWeight
    });
  };

  // Synchroniser les unités lorsque l'utilisateur bascule
  useEffect(() => {
    if (unit === 'metric') {
      // Convertir les valeurs impériales actuelles en métriques pour pré-remplir
      const convertedCm = Math.round((heightFt * 30.48) + (heightIn * 2.54));
      const convertedKg = Math.round(weightLbs * 0.453592);
      setHeightCm(convertedCm);
      setWeightKg(convertedKg);
    } else {
      // Convertir les valeurs métriques actuelles en impériales pour pré-remplir
      const totalInches = heightCm * 0.393701; // cm to inches
      setHeightFt(Math.floor(totalInches / 12));
      setHeightIn(Math.round(totalInches % 12));
      setWeightLbs(Math.round(weightKg * 2.20462));
    }
  }, [unit]); // S'exécute lorsque l'unité change


  return (
    <OnboardingLayout onBack={onBack} showProgress currentStep={7} totalSteps={20}>
      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-prot-black mb-4 leading-tight">
            Taille et Poids
          </h2> {/* Traduction */}
          <p className="text-prot-medium-gray text-lg">
            Ceci sera utilisé pour calibrer votre plan personnalisé.
          </p> {/* Traduction et adaptation au sous-titre de l'image */}
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {/* Sélecteur d'unité */}
          <div className="bg-prot-black rounded-2xl p-2 mb-8 flex shadow-lg">
            <button
              onClick={() => setUnit('metric')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                unit === 'metric'
                  ? 'bg-prot-orange text-prot-black shadow-md'
                  : 'text-prot-white'
              }`}
            >
              Métrique
            </button> {/* Traduction */}
            <button
              onClick={() => setUnit('imperial')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                unit === 'imperial'
                  ? 'bg-prot-orange text-prot-black shadow-md'
                  : 'text-prot-white'
              }`}
            >
              Impérial
            </button> {/* Traduction */}
          </div>

          {/* Sélecteurs de taille et poids */}
          <div className="grid grid-cols-2 gap-4 mb-12 bg-prot-light-gray rounded-2xl p-4 shadow-lg"> {/* Conteneur gris clair pour les sélecteurs */}
            {/* Colonne Gauche (Taille) */}
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-prot-medium-gray mb-2">
                Taille
              </label> {/* Traduction */}
              {unit === 'metric' ? (
                <div className="bg-prot-white rounded-xl text-center w-full shadow-sm">
                  <ScrollPicker
                    items={cmOptions}
                    selectedIndex={cmOptions.indexOf(heightCm)}
                    onSelect={(index) => setHeightCm(cmOptions[index])}
                    containerRef={cmRef}
                    formatter={(item) => `${item} cm`}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="bg-prot-white rounded-xl text-center shadow-sm">
                    <ScrollPicker
                      items={ftOptions}
                      selectedIndex={ftOptions.indexOf(heightFt)}
                      onSelect={(index) => setHeightFt(ftOptions[index])}
                      containerRef={ftRef}
                      formatter={(item) => `${item} ft`}
                    />
                  </div>
                  <div className="bg-prot-white rounded-xl text-center shadow-sm">
                    <ScrollPicker
                      items={inOptions}
                      selectedIndex={inOptions.indexOf(heightIn)}
                      onSelect={(index) => setHeightIn(inOptions[index])}
                      containerRef={inRef}
                      formatter={(item) => `${item} in`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Colonne Droite (Poids) */}
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-prot-medium-gray mb-2">
                Poids
              </label> {/* Traduction */}
              <div className="bg-prot-white rounded-xl text-center w-full shadow-sm">
                <ScrollPicker
                  items={unit === 'metric' ? kgOptions : lbsOptions}
                  selectedIndex={unit === 'metric' ? kgOptions.indexOf(weightKg) : lbsOptions.indexOf(weightLbs)}
                  onSelect={(index) => 
                    unit === 'metric' ? setWeightKg(kgOptions[index]) : setWeightLbs(lbsOptions[index])
                  }
                  containerRef={kgRef} // Utilisation de kgRef pour kg et lbs
                  formatter={(item) => `${item} ${unit === 'metric' ? 'kg' : 'lb'}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bouton Suivant */}
        <Button
          onClick={handleNext}
          className="w-full h-14 bg-prot-black hover:bg-prot-black/80 text-prot-white font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg"
        >
          Suivant
        </Button> {/* Traduction */}
      </div>
    </OnboardingLayout>
  );
};

export default HeightWeightInput;
      
