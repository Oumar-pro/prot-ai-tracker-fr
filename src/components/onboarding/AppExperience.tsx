import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';
import { OnboardingData } from '@/pages/Onboarding';

interface AppExperienceProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const AppExperience: React.FC<AppExperienceProps> = ({ onNext, onBack, data }) => {
  const [hasExperience, setHasExperience] = useState<boolean | null>(
    data.hasAppExperience ?? null
  );

  const options = [
    { value: true, label: 'Yes', description: 'I have used nutrition apps before', icon: '📱' },
    { value: false, label: 'No', description: 'This is my first nutrition app', icon: '🆕' }
  ];

  const handleNext = () => {
    if (hasExperience !== null) {
      onNext({ hasAppExperience: hasExperience });
    }
  };

  return (
    <OnboardingLayout onBack={onBack} showProgress currentStep={5} totalSteps={20}>
      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-prot-black mb-4 leading-tight">
            Have you ever tried a nutritional analysis app?
          </h2>
          <p className="text-prot-medium-gray text-lg">
            This helps us customize your experience
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-4 mb-12">
            {options.map((option) => (
              <button
                key={option.value.toString()}
                onClick={() => setHasExperience(option.value)}
                className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                  hasExperience === option.value
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
          disabled={hasExperience === null}
          className="w-full h-14 bg-prot-orange hover:bg-prot-orange/90 text-prot-black font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:scale-100"
        >
          Next
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default AppExperience;