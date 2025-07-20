// src/components/onboarding/BirthDateSelection.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';
import { OnboardingData } from '@/pages/Onboarding';

interface BirthDateSelectionProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const BirthDateSelection: React.FC<BirthDateSelectionProps> = ({ onNext, onBack, data }) => {
  const [selectedDate, setSelectedDate] = useState(
    data.birthDate || { month: new Date().getMonth() + 1, day: 15, year: 1995 }
  );

  const monthRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  const months = [
    'Janv', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
    'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'
  ]; // Traduction des mois

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const handleNext = () => {
    onNext({ birthDate: selectedDate });
  };

  // Composant de sélecteur défilant - INCHANGÉ (logique interne)
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
      const itemHeight = 60;
      const scrollTop = container.scrollTop;
      const newIndex = Math.round(scrollTop / itemHeight);
      const clampedIndex = Math.max(0, Math.min(newIndex, items.length - 1));
      
      if (clampedIndex !== selectedIndex) {
        onSelect(clampedIndex);
      }
    };

    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = selectedIndex * 60;
      }
    }, [selectedIndex, containerRef]);

    return (
      <div 
        ref={containerRef}
        className="h-60 overflow-y-auto scrollbar-hide relative"
        onScroll={handleScroll}
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {/* Indicateur de sélection */}
        <div className="absolute inset-x-0 top-[100px] h-[60px] bg-prot-orange/10 border-y-2 border-prot-orange/20 pointer-events-none z-10 rounded-xl" />
        
        {/* Padding top et bottom pour centrer */}
        <div className="h-[100px]" />
        
        {items.map((item, index) => (
          <div
            key={index}
            className={`h-[60px] flex items-center justify-center transition-all duration-200 ${
              index === selectedIndex 
                ? 'text-prot-black text-2xl font-bold' 
                : 'text-prot-medium-gray text-lg opacity-60'
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

  return (
    <OnboardingLayout onBack={onBack} showProgress currentStep={3} totalSteps={20}>
      <div className="flex-1 flex flex-col px-6 py-8">
        {/* Titre et sous-titre */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-prot-black mb-4 leading-tight">
            Quelle est votre date de naissance ?
          </h2> {/* Traduction */}
          <p className="text-prot-medium-gray text-lg">
            Ceci nous aide à calculer vos besoins nutritionnels
          </p> {/* Traduction */}
        </div>

        {/* Sélecteurs de date */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* Mois */}
            <div className="bg-prot-light-gray rounded-2xl">
              <div className="p-3 text-center">
                <span className="text-sm font-medium text-prot-medium-gray">Mois</span>
              </div> {/* Traduction */}
              <ScrollPicker
                items={months}
                selectedIndex={selectedDate.month - 1}
                onSelect={(index) => setSelectedDate(prev => ({ ...prev, month: index + 1 }))}
                containerRef={monthRef}
              />
            </div>

            {/* Jour */}
            <div className="bg-prot-light-gray rounded-2xl">
              <div className="p-3 text-center">
                <span className="text-sm font-medium text-prot-medium-gray">Jour</span>
              </div> {/* Traduction */}
              <ScrollPicker
                items={days}
                selectedIndex={selectedDate.day - 1}
                onSelect={(index) => setSelectedDate(prev => ({ ...prev, day: index + 1 }))}
                containerRef={dayRef}
              />
            </div>

            {/* Année */}
            <div className="bg-prot-light-gray rounded-2xl">
              <div className="p-3 text-center">
                <span className="text-sm font-medium text-prot-medium-gray">Année</span>
              </div> {/* Traduction */}
              <ScrollPicker
                items={years}
                selectedIndex={years.indexOf(selectedDate.year)}
                onSelect={(index) => setSelectedDate(prev => ({ ...prev, year: years[index] }))}
                containerRef={yearRef}
              />
            </div>
          </div>

          {/* Date sélectionnée */}
          <div className="text-center mb-8">
            <p className="text-xl font-semibold text-prot-black">
              {months[selectedDate.month - 1]} {selectedDate.day}, {selectedDate.year}
            </p>
          </div>
        </div>

        {/* Bouton Next */}
        <Button
          onClick={handleNext}
          className="w-full h-14 bg-prot-orange hover:bg-prot-orange/90 text-prot-black font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg"
        >
          Suivant
        </Button> {/* Traduction */}
      </div>
    </OnboardingLayout>
  );
};

export default BirthDateSelection;
    
