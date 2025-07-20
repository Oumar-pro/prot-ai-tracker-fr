import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  onNext?: () => void;
  onBack?: () => void;
  showProgress?: boolean;
  progress?: number;
  currentStep?: number;
  totalSteps?: number;
  nextDisabled?: boolean;
  nextButtonText?: string;
  className?: string;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  title,
  subtitle,
  onNext,
  onBack,
  showProgress = false,
  progress,
  currentStep = 0,
  totalSteps = 20,
  nextDisabled = false,
  nextButtonText = "Next",
  className = ''
}) => {
  const progressPercentage = progress || (currentStep / totalSteps) * 100;

  return (
    <div className={`min-h-screen bg-prot-white flex flex-col ${className}`}>
      {/* Header avec bouton retour et barre de progression */}
      {(onBack || showProgress) && (
        <div className="safe-area-top px-6 pt-4 pb-2">
          <div className="flex items-center justify-between mb-4">
            {onBack ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="w-10 h-10 rounded-full hover:bg-prot-light-gray"
              >
                <ArrowLeft className="w-5 h-5 text-prot-black" />
              </Button>
            ) : (
              <div className="w-10 h-10" />
            )}
            
            {showProgress && (
              <div className="flex-1 max-w-20 mx-4">
                <div className="h-1 bg-prot-light-gray rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-prot-orange rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}
            
            <div className="w-10 h-10" />
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col px-6">
        {title && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-prot-black mb-3">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-prot-gray">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className="flex-1 flex flex-col justify-center">
          {children}
        </div>
        
        {onNext && (
          <div className="mt-8 pb-8">
            <Button
              onClick={onNext}
              disabled={nextDisabled}
              className="w-full bg-prot-orange text-prot-black font-semibold py-4 rounded-2xl text-lg hover:bg-prot-orange/90 disabled:bg-prot-light disabled:text-prot-gray"
            >
              {nextButtonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingLayout;