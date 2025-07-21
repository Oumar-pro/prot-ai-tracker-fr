import React, { useState } from 'react';
import { OnboardingData } from '@/pages/Onboarding';
import OnboardingLayout from './OnboardingLayout';

interface AccomplishmentSelectionProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const accomplishmentOptions = [
  { id: 'energy', label: 'More energy', icon: '⚡' },
  { id: 'confidence', label: 'Boost confidence', icon: '💪' },
  { id: 'health', label: 'Better health', icon: '❤️' },
  { id: 'clothes', label: 'Fit in clothes', icon: '👕' },
  { id: 'habits', label: 'Healthy habits', icon: '🌟' },
  { id: 'sleep', label: 'Better sleep', icon: '😴' },
  { id: 'mood', label: 'Improve mood', icon: '😊' },
  { id: 'strength', label: 'Get stronger', icon: '🏋️‍♂️' },
];

const AccomplishmentSelection: React.FC<AccomplishmentSelectionProps> = ({
  onNext,
  onBack,
  data,
}) => {
  const [selectedAccomplishments, setSelectedAccomplishments] = useState<string[]>(
    data.accomplishments || []
  );

  const toggleAccomplishment = (accomplishmentId: string) => {
    setSelectedAccomplishments(prev => 
      prev.includes(accomplishmentId)
        ? prev.filter(id => id !== accomplishmentId)
        : [...prev, accomplishmentId]
    );
  };

  const handleNext = () => {
    onNext({ accomplishments: selectedAccomplishments });
  };

  return (
    <OnboardingLayout
      title="What would you like to accomplish?"
      subtitle="Set your personal achievements (select all that apply)"
      onNext={handleNext}
      onBack={onBack}
      showProgress={true}
      progress={80}
    >
      <div className="grid grid-cols-2 gap-3">
        {accomplishmentOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => toggleAccomplishment(option.id)}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedAccomplishments.includes(option.id)
                ? 'bg-prot-orange border-prot-orange'
                : 'bg-prot-light border-prot-light hover:border-prot-gray'
            }`}
          >
            <div className="text-2xl mb-2 text-center">{option.icon}</div>
            <div className={`text-center font-semibold text-sm ${
              selectedAccomplishments.includes(option.id) ? 'text-prot-black' : 'text-prot-black'
            }`}>
              {option.label}
            </div>
          </div>
        ))}
      </div>
    </OnboardingLayout>
  );
};

export default AccomplishmentSelection;
