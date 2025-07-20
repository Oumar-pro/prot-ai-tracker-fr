import React, { useState } from 'react';
import { OnboardingData } from '@/pages/Onboarding';
import OnboardingLayout from './OnboardingLayout';

interface ObstacleIdentificationProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const obstacleOptions = [
  { id: 'time', label: 'Lack of time', icon: '⏰' },
  { id: 'motivation', label: 'Loss of motivation', icon: '😴' },
  { id: 'planning', label: 'Poor meal planning', icon: '📝' },
  { id: 'social', label: 'Social pressure', icon: '👥' },
  { id: 'stress', label: 'Stress eating', icon: '😰' },
  { id: 'exercise', label: 'Avoiding exercise', icon: '🏃‍♂️' },
  { id: 'budget', label: 'Budget constraints', icon: '💰' },
  { id: 'habits', label: 'Old habits', icon: '🔄' },
];

const ObstacleIdentification: React.FC<ObstacleIdentificationProps> = ({
  onNext,
  onBack,
  data,
}) => {
  const [selectedObstacles, setSelectedObstacles] = useState<string[]>(data.obstacles || []);

  const toggleObstacle = (obstacleId: string) => {
    setSelectedObstacles(prev => 
      prev.includes(obstacleId)
        ? prev.filter(id => id !== obstacleId)
        : [...prev, obstacleId]
    );
  };

  const handleNext = () => {
    onNext({ obstacles: selectedObstacles });
  };

  return (
    <OnboardingLayout
      title="What makes you stop before reaching your goal?"
      subtitle="Let's identify potential obstacles (select all that apply)"
      onNext={handleNext}
      onBack={onBack}
      showProgress={true}
      progress={75}
    >
      <div className="grid grid-cols-2 gap-3">
        {obstacleOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => toggleObstacle(option.id)}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedObstacles.includes(option.id)
                ? 'bg-prot-orange border-prot-orange'
                : 'bg-prot-light border-prot-light hover:border-prot-gray'
            }`}
          >
            <div className="text-2xl mb-2 text-center">{option.icon}</div>
            <div className={`text-center font-semibold text-sm ${
              selectedObstacles.includes(option.id) ? 'text-prot-black' : 'text-prot-black'
            }`}>
              {option.label}
            </div>
          </div>
        ))}
      </div>
    </OnboardingLayout>
  );
};

export default ObstacleIdentification;