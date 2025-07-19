import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';
import { OnboardingData } from '@/pages/Onboarding';

interface HeightWeightInputProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const HeightWeightInput: React.FC<HeightWeightInputProps> = ({ onNext, onBack, data }) => {
  const [unit, setUnit] = useState<'imperial' | 'metric'>(data.heightUnit || 'metric');
  const [height, setHeight] = useState(data.height || (unit === 'metric' ? 170 : 67));
  const [weight, setWeight] = useState(data.weight || (unit === 'metric' ? 70 : 154));

  const handleNext = () => {
    onNext({ 
      heightUnit: unit,
      height,
      weight 
    });
  };

  return (
    <OnboardingLayout onBack={onBack} showProgress currentStep={7} totalSteps={20}>
      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-prot-black mb-4 leading-tight">
            Height & Weight
          </h2>
          <p className="text-prot-medium-gray text-lg">
            We need this to calculate your daily calorie needs
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {/* Sélecteur d'unité */}
          <div className="bg-prot-light-gray rounded-2xl p-2 mb-8 flex">
            <button
              onClick={() => setUnit('metric')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                unit === 'metric'
                  ? 'bg-prot-orange text-prot-black shadow-md'
                  : 'text-prot-medium-gray'
              }`}
            >
              Metric
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                unit === 'imperial'
                  ? 'bg-prot-orange text-prot-black shadow-md'
                  : 'text-prot-medium-gray'
              }`}
            >
              Imperial
            </button>
          </div>

          {/* Inputs pour taille et poids */}
          <div className="space-y-6 mb-12">
            <div className="bg-prot-light-gray rounded-2xl p-6">
              <label className="block text-sm font-medium text-prot-medium-gray mb-2">
                Height {unit === 'metric' ? '(cm)' : '(inches)'}
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full text-2xl font-bold text-prot-black bg-transparent border-none outline-none text-center"
                min={unit === 'metric' ? 100 : 36}
                max={unit === 'metric' ? 250 : 96}
              />
            </div>

            <div className="bg-prot-light-gray rounded-2xl p-6">
              <label className="block text-sm font-medium text-prot-medium-gray mb-2">
                Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full text-2xl font-bold text-prot-black bg-transparent border-none outline-none text-center"
                min={unit === 'metric' ? 30 : 66}
                max={unit === 'metric' ? 300 : 660}
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleNext}
          className="w-full h-14 bg-prot-orange hover:bg-prot-orange/90 text-prot-black font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg"
        >
          Next
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default HeightWeightInput;