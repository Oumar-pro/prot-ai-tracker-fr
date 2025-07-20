import React from 'react';
import { OnboardingData } from '@/pages/Onboarding';

interface PlanSummaryProps {
  onNext: () => void;
  data: OnboardingData;
}

const PlanSummary: React.FC<PlanSummaryProps> = ({ onNext, data }) => {
  // Calculate BMR using Mifflin-St Jeor equation
  const calculateBMR = () => {
    if (!data.height || !data.weight || !data.birthDate || !data.gender) return 2000;
    
    const age = new Date().getFullYear() - data.birthDate.year;
    let bmr = 0;
    
    if (data.gender === 'male') {
      bmr = 88.362 + (13.397 * data.weight) + (4.799 * data.height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * data.weight) + (3.098 * data.height) - (4.330 * age);
    }
    
    // Apply activity factor
    const activityFactors = {
      '0-1': 1.2,
      '2-3': 1.375,
      '4-5': 1.55,
      '6-7': 1.725
    };
    
    const factor = activityFactors[data.exerciseFrequency as keyof typeof activityFactors] || 1.2;
    return Math.round(bmr * factor);
  };

  const dailyCalories = calculateBMR();
  const protein = Math.round(data.weight! * 2.2); // 2.2g per kg
  const carbs = Math.round((dailyCalories * 0.45) / 4); // 45% of calories
  const fats = Math.round((dailyCalories * 0.25) / 9); // 25% of calories

  const targetDate = new Date();
  const weightDiff = Math.abs((data.desiredWeight || data.weight!) - (data.weight || 0));
  const weeksToGoal = Math.round(weightDiff / (data.goalSpeed || 1));
  targetDate.setDate(targetDate.getDate() + (weeksToGoal * 7));

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-prot-orange rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-white text-2xl">✓</div>
          </div>
          
          <h1 className="text-2xl font-bold text-prot-black mb-2">
            Congratulations!
          </h1>
          <h2 className="text-xl font-semibold text-prot-black mb-4">
            Your custom plan is ready
          </h2>
          
          <p className="text-prot-gray">
            Goal: <span className="text-prot-orange font-semibold">
              {data.goal === 'lose' ? 'Lose' : data.goal === 'gain' ? 'Gain' : 'Maintain'} weight
            </span>
          </p>
          <p className="text-prot-gray">
            Target: <span className="text-prot-orange font-semibold">
              {data.desiredWeight} {data.heightUnit === 'imperial' ? 'lbs' : 'kg'}
            </span>
          </p>
          <p className="text-prot-gray">
            By: <span className="text-prot-orange font-semibold">
              {targetDate.toLocaleDateString()}
            </span>
          </p>
        </div>

        <div className="w-full space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-prot-black text-center mb-4">
            Daily Nutrition Plan
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border-2 border-prot-light rounded-2xl p-4 text-center shadow-sm">
              <div className="w-12 h-12 mx-auto mb-2 bg-prot-black rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white rounded-full"></div>
              </div>
              <div className="text-2xl font-bold text-prot-black">{dailyCalories}</div>
              <div className="text-sm text-prot-gray">Calories</div>
            </div>
            
            <div className="bg-white border-2 border-prot-light rounded-2xl p-4 text-center shadow-sm">
              <div className="w-12 h-12 mx-auto mb-2 bg-prot-orange rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white rounded-full" style={{ background: '#FF9F40' }}></div>
              </div>
              <div className="text-2xl font-bold text-prot-black">{carbs}g</div>
              <div className="text-sm text-prot-gray">Carbs</div>
            </div>
            
            <div className="bg-white border-2 border-prot-light rounded-2xl p-4 text-center shadow-sm">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ background: '#FF6B9D' }}>
                <div className="w-6 h-6 border-2 border-white rounded-full"></div>
              </div>
              <div className="text-2xl font-bold text-prot-black">{protein}g</div>
              <div className="text-sm text-prot-gray">Protein</div>
            </div>
            
            <div className="bg-white border-2 border-prot-light rounded-2xl p-4 text-center shadow-sm">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ background: '#4FC3F7' }}>
                <div className="w-6 h-6 border-2 border-white rounded-full"></div>
              </div>
              <div className="text-2xl font-bold text-prot-black">{fats}g</div>
              <div className="text-sm text-prot-gray">Fats</div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-prot-orange text-prot-black font-semibold py-4 rounded-2xl text-lg transition-all hover:bg-opacity-90"
      >
        Let's get started!
      </button>
    </div>
  );
};

export default PlanSummary;