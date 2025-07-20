import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingScreenProps {
  onNext: () => void;
}

const RatingScreen: React.FC<RatingScreenProps> = ({ onNext }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <h1 className="text-2xl font-bold text-prot-black mb-2">
          Give us a rating
        </h1>
        <p className="text-lg text-prot-gray mb-8">
          <span className="text-prot-orange font-semibold">Prot AI</span> was made for people like you
        </p>

        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={40}
              className={`cursor-pointer transition-colors ${
                star <= (hoveredRating || rating)
                  ? 'fill-prot-orange text-prot-orange'
                  : 'text-prot-light'
              }`}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={handleStarLeave}
            />
          ))}
        </div>

        <div className="mb-8">
          <div className="flex justify-center gap-3 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-12 h-12 rounded-full bg-prot-light border-2 border-prot-light"></div>
            ))}
          </div>
          
          <div className="bg-white border-2 border-prot-light rounded-2xl p-4 shadow-sm">
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className="fill-prot-orange text-prot-orange"
                />
              ))}
            </div>
            <p className="text-sm text-prot-gray italic">
              "This app completely changed how I think about nutrition. The AI analysis is incredibly accurate!"
            </p>
            <p className="text-xs text-prot-gray mt-2 font-medium">
              - Sarah M.
            </p>
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full bg-prot-orange text-prot-black font-semibold py-4 rounded-2xl text-lg transition-all hover:bg-opacity-90"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RatingScreen;