import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
  className?: string;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  onBack,
  showProgress = false,
  currentStep = 0,
  totalSteps = 20,
  className = ''
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

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
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default OnboardingLayout;