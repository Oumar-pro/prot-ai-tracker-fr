// src/components/onboarding/CalorieTrackingIntro.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react'; // Importez ArrowLeft pour le bouton retour
// OnboardingLayout n'est plus l'enveloppe principale pour ce design,
// mais vous pouvez garder son import si vous l'utilisez pour d'autres props (comme les couleurs, bien que nous les définissions ici).
// Pour la clarté de la mise en page spécifique, nous n'allons pas l'utiliser comme conteneur principal.

interface CalorieTrackingIntroProps {
  onNext: () => void;
  onBack: () => void;
}

const CalorieTrackingIntro: React.FC<CalorieTrackingIntroProps> = ({ onNext, onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Remplacez les bgGradient par des placeholders d'images plus tard
  const slides = [
    {
      title: "Suivi des calories simplifié",
      subtitle: "Scannez vos aliments grâce à la reconnaissance IA pour une analyse nutritionnelle instantanée",
      // Remplacez 'bgImage' par un chemin d'image réel plus tard, ou laissez vide si vous mettez une couleur temporaire
      bgImageClass: "bg-gradient-to-br from-orange-100 to-orange-50" // TEMPORAIRE : Classe de fond si pas d'image
    },
    {
      title: "Informations nutritionnelles personnalisées",
      subtitle: "Obtenez des recommandations adaptées à vos objectifs et préférences alimentaires",
      bgImageClass: "bg-gradient-to-br from-blue-100 to-blue-50" // TEMPORAIRE
    },
    {
      title: "Suivez vos progrès",
      subtitle: "Suivez votre parcours avec des analyses détaillées et un suivi intelligent des objectifs",
      bgImageClass: "bg-gradient-to-br from-green-100 to-green-50" // TEMPORAIRE
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
    <div className="relative min-h-screen bg-prot-white flex flex-col justify-end">
      {/* Zone de l'image de fond (remplissez avec une vraie image plus tard) */}
      <div className={`absolute inset-0 z-0 ${currentSlideData.bgImageClass}`}>
        {/* Ceci est la zone où votre image de fond sera affichée */}
        {/* Pour l'exemple, j'utilise un div avec une couleur de fond. */}
        {/* Si vous aviez une image, ce serait <img src={currentSlideData.imageUrl} alt="..." className="w-full h-full object-cover"/> */}
      </div>

      {/* Bouton de retour en haut à gauche - Repris de OnboardingLayout */}
      <div className="absolute top-0 left-0 px-6 pt-4 pb-2 z-20 safe-area-top">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="w-10 h-10 rounded-full hover:bg-prot-light-gray"
        >
          <ArrowLeft className="w-5 h-5 text-prot-black" />
        </Button>
      </div>

      {/* Panneau blanc arrondi en bas */}
      <div className="relative z-10 bg-prot-white rounded-t-3xl shadow-lg pt-8 px-6 pb-8 min-h-[50vh] flex flex-col justify-between"> {/* min-h-[50vh] pour une hauteur initiale */}
        <div className="text-center mb-8 flex-1 flex flex-col justify-center"> {/* flex-1 pour centrer verticalement le contenu texte */}
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
          {currentSlide < slides.length - 1 ? 'Suivant' : "C'est parti !"}
        </Button>
      </div>
    </div>
  );
};

export default CalorieTrackingIntro;
