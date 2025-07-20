// src/components/onboarding/SplashScreen.tsx
import React, { useEffect } from 'react';

interface SplashScreenProps {
  onNext: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onNext }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="min-h-screen bg-prot-white flex items-center justify-center">
      <div className="text-center animate-fade-in">
        {/* Logo (circulaire orange avec l'étoile/croix à l'intérieur) - INCHANGÉ */}
        <div className="mb-8"> {/* Marge en bas pour espacer du texte */}
          <div className="w-32 h-32 mx-auto mb-6 relative">
            {/* Icône stylisée originale - INCHANGÉE */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-prot-orange to-orange-600 flex items-center justify-center shadow-lg">
              <div className="w-20 h-20 text-prot-white">
                {/* SVG de l'icône originale - INCHANGÉ */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 2L13.59 8.41L20 10L13.59 11.59L12 18L10.41 11.59L4 10L10.41 8.41L12 2Z"/>
                </svg>
              </div>
            </div>
            
            {/* Effet de brillance subtil - INCHANGÉ */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-20 rounded-full"></div>
          </div>
        </div>
        
        {/* NOM DE L'APPLICATION : "Prot AI" - AVEC "AI" EN ORANGE */}
        <h1 className="text-4xl font-bold text-prot-black tracking-tight">
          Prot <span className="text-prot-orange">AI</span> {/* CORRIGÉ : "AI" est de nouveau en orange */}
        </h1>
        
        {/* Tagline et 3 points sont supprimés */}
      </div>
    </div>
  );
};

export default SplashScreen;
