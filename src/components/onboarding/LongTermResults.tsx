import React from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';

interface LongTermResultsProps {
  onNext: () => void;
  onBack: () => void;
}

const LongTermResults: React.FC<LongTermResultsProps> = ({ onNext, onBack }) => {
  return (
    <OnboardingLayout onBack={onBack} showProgress currentStep={6} totalSteps={20}>
      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-prot-black mb-4 leading-tight">
            Prot AI builds long-term results
          </h2>
          <p className="text-prot-medium-gray text-lg mb-8">
            Studies show that people using AI-powered nutrition tracking achieve 80% better long-term success
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {/* Graphique simplifié */}
          <div className="bg-prot-light-gray rounded-2xl p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-prot-black mb-2">Weight Loss Success Rate</h3>
              <p className="text-prot-medium-gray text-sm">Over 12 months</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-prot-black">Prot AI Users</span>
                <span className="text-2xl font-bold text-prot-orange">80%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div className="h-3 bg-prot-orange rounded-full w-4/5"></div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-medium text-prot-black">Traditional Methods</span>
                <span className="text-2xl font-bold text-gray-400">35%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div className="h-3 bg-gray-400 rounded-full w-1/3"></div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-prot-orange/10 to-orange-100 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-prot-black font-semibold">
              Join thousands who achieved their goals with smart nutrition tracking
            </p>
          </div>
        </div>

        <Button
          onClick={onNext}
          className="w-full h-14 bg-prot-orange hover:bg-prot-orange/90 text-prot-black font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg mt-8"
        >
          Continue
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default LongTermResults;