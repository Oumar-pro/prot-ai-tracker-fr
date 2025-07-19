import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';
import { OnboardingData } from '@/pages/Onboarding';

interface ExerciseFrequencyProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const ExerciseFrequency: React.FC<ExerciseFrequencyProps> = ({ onNext, onBack, data }) => {
  const [selectedFrequency, setSelectedFrequency] = useState<'0-1' | '2-3' | '4-5' | '6-7' | null>(
    data.exerciseFrequency || null
  );

  const frequencyOptions = [
    { value: '0-1' as const, label: '0-1 times', description: 'Sedentary lifestyle', icon: '🏠' },
    { value: '2-3' as const, label: '2-3 times', description: 'Light activity', icon: '🚶' },
    { value: '4-5' as const, label: '4-5 times', description: 'Moderate activity', icon: '🏃' },
    { value: '6-7' as const, label: '6-7 times', description: 'Very active', icon: '💪' }
  ];

  const handleNext = () => {
    if (selectedFrequency) {
      onNext({ exerciseFrequency: selectedFrequency });
    }
  };

  return (
    <OnboardingLayout onBack={onBack} showProgress currentStep={4} totalSteps={20}>
      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-prot-black mb-4 leading-tight">
            How many times do you exercise per week?
          </h2>
          <p className="text-prot-medium-gray text-lg">
            This helps us calculate your calorie needs
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-4 mb-12">
            {frequencyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedFrequency(option.value)}
                className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                  selectedFrequency === option.value
                    ? 'bg-prot-orange border-prot-orange shadow-lg'
                    : 'bg-prot-light-gray border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{option.icon}</span>
                  <div className="text-left flex-1">
                    <div className="text-xl font-semibold text-prot-black">{option.label}</div>
                    <div className="text-prot-medium-gray text-sm">{option.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleNext}
          disabled={!selectedFrequency}
          className="w-full h-14 bg-prot-orange hover:bg-prot-orange/90 text-prot-black font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:scale-100"
        >
          Next
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default ExerciseFrequency;