import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';
import { OnboardingData } from '@/pages/Onboarding';

interface GenderSelectionProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const GenderSelection: React.FC<GenderSelectionProps> = ({ onNext, onBack, data }) => {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | 'other' | null>(
    data.gender || null
  );

  const genderOptions = [
    { value: 'male' as const, label: 'Male', icon: '👨' },
    { value: 'female' as const, label: 'Female', icon: '👩' },
    { value: 'other' as const, label: 'Other', icon: '👤' }
  ];

  const handleNext = () => {
    if (selectedGender) {
      onNext({ gender: selectedGender });
    }
  };

  return (
    <OnboardingLayout onBack={onBack} showProgress currentStep={2} totalSteps={20}>
      <div className="flex-1 flex flex-col px-6 py-8">
        {/* Titre et sous-titre */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-prot-black mb-4 leading-tight">
            Choose your Gender
          </h2>
          <p className="text-prot-medium-gray text-lg">
            This helps us personalize your nutrition plan
          </p>
        </div>

        {/* Options de genre */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-4 mb-12">
            {genderOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedGender(option.value)}
                className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                  selectedGender === option.value
                    ? 'bg-prot-orange border-prot-orange shadow-lg'
                    : 'bg-prot-light-gray border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-3xl">{option.icon}</span>
                  <span className={`text-xl font-semibold ${
                    selectedGender === option.value ? 'text-prot-black' : 'text-prot-black'
                  }`}>
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bouton Next */}
        <Button
          onClick={handleNext}
          disabled={!selectedGender}
          className="w-full h-14 bg-prot-orange hover:bg-prot-orange/90 text-prot-black font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:scale-100"
        >
          Next
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default GenderSelection;