import React, { useState } from 'react';
import { OnboardingData } from '@/pages/Onboarding';
import OnboardingLayout from './OnboardingLayout';
import { Slider } from '@/components/ui/slider';

interface GoalSpeedSelectionProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const speedLabels = {
  0.5: { label: 'Slow & Steady', icon: '🐢', description: 'Take your time, build healthy habits' },
  1: { label: 'Moderate', icon: '🐰', description: 'Balanced approach, sustainable progress' },
  1.5: { label: 'Fast Track', icon: '🐆', description: 'Accelerated results, more discipline needed' },
};

const GoalSpeedSelection: React.FC<GoalSpeedSelectionProps> = ({
  onNext,
  onBack,
  data,
}) => {
  const [goalSpeed, setGoalSpeed] = useState(data.goalSpeed || 1);
  const currentSpeed = speedLabels[goalSpeed as keyof typeof speedLabels];

  const handleNext = () => {
    onNext({ goalSpeed });
  };

  return (
    <OnboardingLayout
      title="How fast do you want to reach your goal?"
      subtitle="Choose your preferred timeline"
      onNext={handleNext}
      onBack={onBack}
      showProgress={true}
      progress={65}
    >
      <div className="space-y-8">
        <div className="text-center">
          <div className="text-6xl mb-4">{currentSpeed.icon}</div>
          <div className="text-2xl font-bold text-prot-black mb-2">
            {currentSpeed.label}
          </div>
          <div className="text-prot-gray">
            {currentSpeed.description}
          </div>
        </div>

        <div className="px-6">
          <Slider
            value={[goalSpeed]}
            onValueChange={(value) => setGoalSpeed(value[0])}
            min={0.5}
            max={1.5}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-prot-gray mt-4">
            <div className="text-center">
              <div>🐢</div>
              <div>Slow</div>
            </div>
            <div className="text-center">
              <div>🐰</div>
              <div>Moderate</div>
            </div>
            <div className="text-center">
              <div>🐆</div>
              <div>Fast</div>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default GoalSpeedSelection;