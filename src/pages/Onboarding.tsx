import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashScreen from '@/components/onboarding/SplashScreen';
import CalorieTrackingIntro from '@/components/onboarding/CalorieTrackingIntro';
import GenderSelection from '@/components/onboarding/GenderSelection';
import BirthDateSelection from '@/components/onboarding/BirthDateSelection';
import ExerciseFrequency from '@/components/onboarding/ExerciseFrequency';
import AppExperience from '@/components/onboarding/AppExperience';
import LongTermResults from '@/components/onboarding/LongTermResults';
import HeightWeightInput from '@/components/onboarding/HeightWeightInput';
import MainGoalSelection from '@/components/onboarding/MainGoalSelection';
import PlaceholderComponent from '@/components/onboarding/PlaceholderComponent';
import DesiredWeightSelection from '@/components/onboarding/DesiredWeightSelection';
import DietPreference from '@/components/onboarding/DietPreference';
import GoalSpeedSelection from '@/components/onboarding/GoalSpeedSelection';
import ObstacleIdentification from '@/components/onboarding/ObstacleIdentification';
import AccomplishmentSelection from '@/components/onboarding/AccomplishmentSelection';
import LoadingScreen from '@/components/onboarding/LoadingScreen';
import PlanSummary from '@/components/onboarding/PlanSummary';
import ThankYouScreen from '@/components/onboarding/ThankYouScreen';
import RatingScreen from '@/components/onboarding/RatingScreen';

export interface OnboardingData {
  gender?: 'male' | 'female' | 'other';
  birthDate?: { month: number; day: number; year: number };
  exerciseFrequency?: '0-1' | '2-3' | '4-5' | '6-7';
  hasAppExperience?: boolean;
  heightUnit?: 'imperial' | 'metric';
  height?: number;
  weight?: number;
  goal?: 'lose' | 'gain' | 'maintain';
  desiredWeight?: number;
  diet?: string;
  goalSpeed?: number;
  obstacles?: string[];
  accomplishments?: string[];
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({});

  const totalSteps = 20;

  const handleNext = (stepData?: Partial<OnboardingData>) => {
    if (stepData) {
      setData(prev => ({ ...prev, ...stepData }));
    }
    
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Onboarding terminé, rediriger vers l'accueil
      navigate('/');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SplashScreen onNext={handleNext} />;
      case 1:
        return <CalorieTrackingIntro onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <GenderSelection onNext={handleNext} onBack={handleBack} data={data} />;
      case 3:
        return <BirthDateSelection onNext={handleNext} onBack={handleBack} data={data} />;
      case 4:
        return <ExerciseFrequency onNext={handleNext} onBack={handleBack} data={data} />;
      case 5:
        return <AppExperience onNext={handleNext} onBack={handleBack} data={data} />;
      case 6:
        return <LongTermResults onNext={handleNext} onBack={handleBack} />;
      case 7:
        return <HeightWeightInput onNext={handleNext} onBack={handleBack} data={data} />;
      case 8:
        return <MainGoalSelection onNext={handleNext} onBack={handleBack} data={data} />;
      case 9:
        return <DesiredWeightSelection onNext={handleNext} onBack={handleBack} data={data} />;
      case 10:
        return <DietPreference onNext={handleNext} onBack={handleBack} data={data} />;
      case 11:
        return <PlaceholderComponent 
          onNext={handleNext} 
          onBack={handleBack} 
          data={data}
          title="Realistic target confirmation"
          subtitle="Your goal is achievable!"
          currentStep={11}
        />;
      case 12:
        return <GoalSpeedSelection onNext={handleNext} onBack={handleBack} data={data} />;
      case 13:
        return <PlaceholderComponent 
          onNext={handleNext} 
          onBack={handleBack} 
          data={data}
          title="You have great potential!"
          subtitle="Studies show you can crush your goal"
          currentStep={13}
        />;
      case 14:
        return <ObstacleIdentification onNext={handleNext} onBack={handleBack} data={data} />;
      case 15:
        return <AccomplishmentSelection onNext={handleNext} onBack={handleBack} data={data} />;
      case 16:
        return <LoadingScreen onNext={handleNext} data={data} />;
      case 17:
        return <PlanSummary onNext={handleNext} data={data} />;
      case 18:
        return <ThankYouScreen onNext={handleNext} />;
      case 19:
        return <RatingScreen onNext={handleNext} />;
      default:
        return <SplashScreen onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-prot-white">
      {renderStep()}
    </div>
  );
};

export default Onboarding;