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
        {/* Logo Prot AI */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            {/* Icône pomme/lime stylisée */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-prot-orange to-orange-600 flex items-center justify-center shadow-lg">
              <div className="w-20 h-20 text-prot-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 2L13.59 8.41L20 10L13.59 11.59L12 18L10.41 11.59L4 10L10.41 8.41L12 2Z"/>
                </svg>
              </div>
            </div>
            
            {/* Effet de brillance subtil */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-20 rounded-full"></div>
          </div>
          
          {/* Texte Prot AI */}
          <h1 className="text-4xl font-bold text-prot-black tracking-tight">
            Prot <span className="text-prot-orange">AI</span>
          </h1>
          
          {/* Tagline subtil */}
          <p className="text-prot-medium-gray text-lg mt-2 font-light">
            Votre coach nutrition intelligent
          </p>
        </div>
        
        {/* Animation de chargement discrète */}
        <div className="flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-prot-orange rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-prot-orange rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-prot-orange rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;