import React, { useEffect, useState } from 'react';
import { OnboardingData } from '@/pages/Onboarding';
import { supabase } from '@/integrations/supabase/client';

interface LoadingScreenProps {
  onNext: () => void;
  data: OnboardingData;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onNext, data }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Calculating BMR...');

  const steps = [
    'Calculating BMR...',
    'Analyzing your goals...',
    'Creating nutrition plan...',
    'Finalizing recommendations...',
  ];

  useEffect(() => {
    const saveProfileData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const profileData = {
            user_id: user.id,
            gender: data.gender,
            birth_date: data.birthDate,
            exercise_frequency: data.exerciseFrequency,
            has_app_experience: data.hasAppExperience,
            height_unit: data.heightUnit,
            height: data.height,
            weight: data.weight,
            goal: data.goal,
            desired_weight: data.desiredWeight,
            diet: data.diet,
            goal_speed: data.goalSpeed,
            obstacles: data.obstacles,
            accomplishments: data.accomplishments,
          };

          const { error } = await supabase
            .from('profiles')
            .upsert(profileData, { onConflict: 'user_id' });

          if (error) {
            console.error('Error saving profile:', error);
          }
        }
      } catch (error) {
        console.error('Error in saveProfileData:', error);
      }
    };

    let currentStepIndex = 0;
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += 25;
      
      if (currentProgress <= 100) {
        setProgress(currentProgress);
        
        if (currentStepIndex < steps.length - 1 && currentProgress % 25 === 0) {
          currentStepIndex++;
          setCurrentStep(steps[currentStepIndex]);
        }
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Save profile data when loading is complete
        saveProfileData();
        setTimeout(() => {
          onNext();
        }, 500);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [onNext, data]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="w-full h-full border-4 border-prot-light rounded-full"></div>
            <div 
              className="absolute top-0 left-0 w-full h-full border-4 border-prot-orange rounded-full transition-all duration-300"
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${50 + progress * 0.35}% 0%, ${50 + progress * 0.5}% ${50 - progress * 0.5}%, 50% 50%)`
              }}
            ></div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-prot-black mb-4">
          We're setting everything up for you
        </h1>
        
        <p className="text-prot-gray text-lg mb-8">
          {currentStep}
        </p>
        
        <div className="w-full bg-prot-light rounded-full h-2">
          <div 
            className="bg-prot-orange h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-prot-gray text-sm mt-4">
          {progress}% complete
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;