import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';
import { OnboardingData } from '@/pages/Onboarding';

interface MainGoalSelectionProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const MainGoalSelection: React.FC<MainGoalSelectionProps> = ({ onNext, onBack, data }) => {
  const [selectedGoal, setSelectedGoal] = useState<'lose' | 'gain' | 'maintain' | null>(
    data.goal || null
  );

  const goalOptions = [
    { 
      value: 'lose' as const, 
      label: 'Perdre du poids', 
      description: 'Créer un déficit calorique',
      icon: '📉',
      color: 'bg-red-100'
    },
    { 
      value: 'gain' as const, 
      label: 'Gagner du poids', 
      description: 'Créer un surplus calorique',
      icon: '📈',
      color: 'bg-green-100'
    },
    { 
      value: 'maintain' as const, 
      label: 'Maintenir mon poids', 
      description: 'Équilibrer les calories',
      icon: '⚖️',
      color: 'bg-blue-100'
    }
  ];

  const handleNext = () => {
    if (selectedGoal) {
      onNext({ goal: selectedGoal });
    }
  };

  return (
    <OnboardingLayout onBack={onBack} showProgress currentStep={8} totalSteps={20}>
      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-prot-black mb-4 leading-tight">
            What is your goal?
          </h2>
          <p className="text-prot-medium-gray text-lg">
            This will help us create your personalized plan
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-4 mb-12">
            {goalOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedGoal(option.value)}
                className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                  selectedGoal === option.value
                    ? 'bg-prot-orange border-prot-orange shadow-lg'
                    : 'bg-prot-light-gray border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-2xl ${option.color} flex items-center justify-center`}>
                    <span className="text-2xl">{option.icon}</span>
                  </div>
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
          disabled={!selectedGoal}
          className="w-full h-14 bg-prot-orange hover:bg-prot-orange/90 text-prot-black font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:scale-100"
        >
          Next
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default MainGoalSelection;