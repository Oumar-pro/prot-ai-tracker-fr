import React, { useEffect, useState } from 'react';

interface ThankYouScreenProps {
  onNext: () => void;
}

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ onNext }) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; rotation: number }>>([]);

  useEffect(() => {
    // Generate confetti particles
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
    }));
    setConfetti(particles);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Confetti */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 bg-prot-orange rounded animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `rotate(${particle.rotation}deg)`,
            animationDelay: `${particle.id * 0.1}s`,
            animationDuration: '2s',
          }}
        />
      ))}

      <div className="text-center max-w-sm z-10">
        <div className="mb-8">
          <div className="w-20 h-20 bg-prot-orange rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-white text-3xl">✓</div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-prot-black mb-4">
          All done!
        </h1>
        <h2 className="text-xl font-semibold text-prot-black mb-6">
          Thank you for trusting us
        </h2>
        
        <p className="text-prot-gray text-lg mb-8 leading-relaxed">
          Your plan has been created successfully. We're committed to protecting your privacy and helping you achieve your health goals.
        </p>

        <button
          onClick={onNext}
          className="w-full bg-prot-orange text-prot-black font-semibold py-4 rounded-2xl text-lg transition-all hover:bg-opacity-90"
        >
          Create my plan
        </button>
      </div>
    </div>
  );
};

export default ThankYouScreen;