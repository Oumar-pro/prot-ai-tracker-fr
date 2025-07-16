// src/components/AnalysisNotification.tsx
import React from 'react';

interface AnalysisNotificationProps {
  progress: number;
  onClose?: () => void;
  errorMessage?: string | null;
  foodName?: string | null;
}

const AnalysisNotification: React.FC<AnalysisNotificationProps> = ({ 
  progress, 
  onClose, 
  errorMessage,
  foodName 
}) => {
  const isComplete = progress >= 100;
  const hasError = !!errorMessage;
  const statusText = hasError ? "Analysis failed!" : (isComplete ? (foodName ? `${foodName} analyzed!` : "Analysis complete!") : "Analyzing food...");
  const progressBarColor = hasError ? "bg-red-500" : (isComplete ? "bg-green-500" : "bg-blue-500");
  const textColor = hasError ? "text-red-700" : (isComplete ? "text-green-700" : "text-gray-800");

  return (
    <div 
      className={`
        fixed bottom-4 left-1/2 -translate-x-1/2 
        bg-white rounded-lg shadow-lg p-4 w-11/12 max-w-sm 
        flex items-center space-x-4 z-50 
        transition-all duration-300 ease-out 
        ${progress === 0 && !hasError ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}
      `}
    >
      <div className="relative w-16 h-16 flex-shrink-0">
        {isComplete && !hasError ? (
          <svg className="w-full h-full text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        ) : hasError ? (
          <svg className="w-full h-full text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        ) : (
          <div className="relative w-full h-full">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 stroke-current"
                strokeWidth="8"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className={`${progressBarColor} stroke-current transition-all duration-300 ease-out`}
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - progress / 100)}
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-700">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className={`font-semibold text-lg mb-1 ${textColor}`}>
          {statusText}
        </h3>
        <p className="text-sm text-gray-600">
          {hasError ? errorMessage : (isComplete ? "Your food data has been updated." : "We'll notify you when it's done.")}
        </p>
      </div>

      {onClose && (
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default AnalysisNotification;
            
