import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';

interface CalorieTrackingIntroProps {
  onNext: () => void;
  onBack: () => void;
}

const CalorieTrackingIntro: React.FC<CalorieTrackingIntroProps> = ({ onNext, onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Calorie tracking made easy",
      subtitle: "Scan your food with AI-powered recognition for instant nutritional analysis",
      bgGradient: "from-orange-100 to-orange-50"
    },
    {
      title: "Personalized nutrition insights",
      subtitle: "Get tailored recommendations based on your goals and dietary preferences",
      bgGradient: "from-blue-100 to-blue-50"
    },
    {
      title: "Track your progress",
      subtitle: "Monitor your journey with detailed analytics and smart goal tracking",
      bgGradient: "from-green-100 to-green-50"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onNext();
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <OnboardingLayout onBack={onBack}>
      <div className="flex-1 flex flex-col">
        {/* Image de fond avec effet de scan */}
        <div className={`flex-1 relative bg-gradient-to-br ${currentSlideData.bgGradient} flex items-center justify-center`}>
          {/* Zone de scan stylisée */}
          <div className="relative">
            <div className="w-80 h-80 border-2 border-prot-orange rounded-3xl relative overflow-hidden">
              {/* Lignes de scan animées */}
              <div className="absolute inset-4 border border-prot-orange/30 rounded-2xl"></div>
              <div className="absolute inset-8 border border-prot-orange/20 rounded-xl"></div>
              
              {/* Coins de scan */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-prot-orange rounded-tl-2xl"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-prot-orange rounded-tr-2xl"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-prot-orange rounded-bl-2xl"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-prot-orange rounded-br-2xl"></div>
              
              {/* Ligne de scan animée */}
              <div className="absolute inset-x-4 top-1/2 h-0.5 bg-prot-orange animate-pulse"></div>
              
              {/* Icône de nourriture stylisée */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-prot-orange/10 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-prot-orange" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.59 8.41L20 10L13.59 11.59L12 18L10.41 11.59L4 10L10.41 8.41L12 2Z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu textuel */}
        <div className="px-6 py-8 bg-prot-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-prot-black mb-4 leading-tight">
              {currentSlideData.title}
            </h2>
            <p className="text-prot-medium-gray text-lg leading-relaxed px-4">
              {currentSlideData.subtitle}
            </p>
          </div>

          {/* Indicateurs de pagination */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-prot-orange w-6' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bouton Next */}
          <Button
            onClick={handleNext}
            className="w-full h-14 bg-prot-orange hover:bg-prot-orange/90 text-prot-black font-semibold text-lg rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg"
          >
            {currentSlide < slides.length - 1 ? 'Next' : "Let's get started!"}
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default CalorieTrackingIntro;