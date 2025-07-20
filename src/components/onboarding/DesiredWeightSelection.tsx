import React, { useState } from 'react';
import { OnboardingData } from '@/pages/Onboarding';
import OnboardingLayout from './OnboardingLayout';
import { Slider } from '@/components/ui/slider';

interface DesiredWeightSelectionProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const DesiredWeightSelection: React.FC<DesiredWeightSelectionProps> = ({
  onNext,
  onBack,
  data,
}) => {
  const currentWeight = data.weight || 70;
  const isWeightLoss = data.goal === 'lose';
  const minWeight = isWeightLoss ? Math.max(40, currentWeight - 50) : currentWeight;
  const maxWeight = isWeightLoss ? currentWeight - 1 : currentWeight + 50;
  
  const [desiredWeight, setDesiredWeight] = useState(
    data.desiredWeight || (isWeightLoss ? currentWeight - 10 : currentWeight + 10)
  );

  const handleNext = () => {
    onNext({ desiredWeight });
  };

  return (
    <OnboardingLayout
      title={`Choose your desired weight`}
      subtitle={`Current weight: ${currentWeight} ${data.heightUnit === 'imperial' ? 'lbs' : 'kg'}`}
      onNext={handleNext}
      onBack={onBack}
      showProgress={true}
      progress={50}
    >
      <div className="space-y-8">
        <div className="text-center">
          <div className="text-6xl font-bold text-prot-black mb-2">
            {Math.round(desiredWeight)}
          </div>
          <div className="text-xl text-prot-gray">
            {data.heightUnit === 'imperial' ? 'lbs' : 'kg'}
          </div>
        </div>

        <div className="px-6">
          <Slider
            value={[desiredWeight]}
            onValueChange={(value) => setDesiredWeight(value[0])}
            min={minWeight}
            max={maxWeight}
            step={data.heightUnit === 'imperial' ? 1 : 0.5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-prot-gray mt-2">
            <span>{minWeight}</span>
            <span>{maxWeight}</span>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default DesiredWeightSelection;