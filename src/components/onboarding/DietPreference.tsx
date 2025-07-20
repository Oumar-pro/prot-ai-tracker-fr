import React, { useState } from 'react';
import { OnboardingData } from '@/pages/Onboarding';
import OnboardingLayout from './OnboardingLayout';

interface DietPreferenceProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const dietOptions = [
  { id: 'none', label: 'No specific diet', icon: '🍽️' },
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥗' },
  { id: 'vegan', label: 'Vegan', icon: '🌱' },
  { id: 'keto', label: 'Keto', icon: '🥑' },
  { id: 'paleo', label: 'Paleo', icon: '🥩' },
  { id: 'mediterranean', label: 'Mediterranean', icon: '🫒' },
  { id: 'intermittent', label: 'Intermittent Fasting', icon: '⏰' },
  { id: 'lowcarb', label: 'Low Carb', icon: '🥕' },
];

const DietPreference: React.FC<DietPreferenceProps> = ({
  onNext,
  onBack,
  data,
}) => {
  const [selectedDiet, setSelectedDiet] = useState(data.diet || '');

  const handleNext = () => {
    onNext({ diet: selectedDiet });
  };

  return (
    <OnboardingLayout
      title="Do you follow a specific diet?"
      subtitle="Help us customize your meal recommendations"
      onNext={handleNext}
      onBack={onBack}
      showProgress={true}
      progress={55}
      nextDisabled={!selectedDiet}
    >
      <div className="grid grid-cols-2 gap-3">
        {dietOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelectedDiet(option.id)}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedDiet === option.id
                ? 'bg-prot-orange border-prot-orange'
                : 'bg-prot-light border-prot-light hover:border-prot-gray'
            }`}
          >
            <div className="text-2xl mb-2 text-center">{option.icon}</div>
            <div className={`text-center font-semibold ${
              selectedDiet === option.id ? 'text-prot-black' : 'text-prot-black'
            }`}>
              {option.label}
            </div>
          </div>
        ))}
      </div>
    </OnboardingLayout>
  );
};

export default DietPreference;