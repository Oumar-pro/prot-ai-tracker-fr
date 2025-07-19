import React from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';
import { OnboardingData } from '@/pages/Onboarding';

interface PlaceholderComponentProps {
  onNext: (data?: Partial<OnboardingData>) => void;
  onBack: () => void;
  data?: OnboardingData;
  title: string;
  subtitle: string;
  currentStep: number;
}

const PlaceholderComponent: React.FC<PlaceholderComponentProps> = ({ 
  onNext, 
  onBack, 
  title, 
  subtitle, 
  currentStep 
}) => {
  return (
    <OnboardingLayout onBack={onBack} showProgress currentStep={currentStep} totalSteps={20}>
      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-prot-black mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-prot-medium-gray text-lg">
            {subtitle}
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-32 h-32 bg-prot-light-gray rounded-full flex items-center justify-center mb-8">
            <span className="text-4xl">🚧</span>
          </div>
          <p className="text-prot-medium-gray text-center">
            This screen is coming soon!
          </p>
        </div>

        <Button
          onClick={() => onNext()}
          className="w-full h-14 bg-prot-orange hover:bg-prot-orange/90 text-prot-black font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg"
        >
          Continue
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default PlaceholderComponent;