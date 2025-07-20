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
      {/* Conteneur principal pour le logo et le texte, centré */}
      <div className="flex items-center justify-center animate-fade-in space-x-4"> {/* MODIFICATION ICI */}
        {/* Logo (l'icône circulaire orange) */}
        <div className="relative"> {/* MODIFICATION : Retiré mb-8 ici, ajusté pour la taille */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-prot-orange to-orange-600 flex items-center justify-center shadow-lg"> {/* MODIFICATION : Taille réduite (w-16 h-16) */}
            <div className="w-10 h-10 text-prot-white"> {/* MODIFICATION : Taille de l'icône SVG réduite */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2L13.59 8.41L20 10L13.59 11.59L12 18L10.41 11.59L4 10L10.41 8.41L12 2Z"/>
              </svg>
            </div>
          </div>
          
          {/* Effet de brillance subtil */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-20 rounded-full"></div>
        </div>
        
        {/* NOM DE L'APPLICATION : "Prot AI" - Maintenant à côté du logo */}
        <h1 className="text-4xl font-bold text-prot-black tracking-tight"> {/* MODIFICATION : Pas de marge ici */}
          Prot <span className="text-prot-orange">AI</span>
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
