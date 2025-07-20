import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  user_id: string;
  gender?: string;
  birth_date?: any;
  exercise_frequency?: string;
  has_app_experience?: boolean;
  height_unit?: string;
  height?: number;
  weight?: number;
  goal?: string;
  desired_weight?: number;
  diet?: string;
  goal_speed?: number;
  obstacles?: string[];
  accomplishments?: string[];
  created_at: string;
  updated_at: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, session, loading };
};

export const useProfile = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data as UserProfile | null;
    },
    enabled: !!user,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (profileData: Partial<UserProfile>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          ...profileData,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });
};

// Helper function to calculate BMI
export const calculateBMI = (weight: number, height: number): number => {
  // Height should be in meters
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

// Helper function to calculate age from birth date
export const calculateAge = (birthDate: any): number => {
  if (!birthDate || !birthDate.year) return 0;
  
  const today = new Date();
  const birth = new Date(birthDate.year, birthDate.month - 1, birthDate.day);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

// Helper function to calculate daily calorie goal
export const calculateDailyCalories = (profile: UserProfile): number => {
  if (!profile.weight || !profile.height || !profile.birth_date) return 2000;
  
  const age = calculateAge(profile.birth_date);
  const weight = profile.weight;
  const height = profile.height;
  const gender = profile.gender;
  
  // Using Mifflin-St Jeor Equation
  let bmr = 0;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  // Activity factor based on exercise frequency
  let activityFactor = 1.2; // Sedentary
  switch (profile.exercise_frequency) {
    case '2-3':
      activityFactor = 1.375; // Lightly active
      break;
    case '4-5':
      activityFactor = 1.55; // Moderately active
      break;
    case '6-7':
      activityFactor = 1.725; // Very active
      break;
  }
  
  let dailyCalories = bmr * activityFactor;
  
  // Adjust for goal
  if (profile.goal === 'lose') {
    const weightToLose = (profile.weight || 0) - (profile.desired_weight || 0);
    const weeksToGoal = weightToLose / (profile.goal_speed || 0.5);
    const calorieDeficit = (weightToLose * 7700) / (weeksToGoal * 7); // 7700 calories per kg
    dailyCalories -= calorieDeficit;
  } else if (profile.goal === 'gain') {
    const weightToGain = (profile.desired_weight || 0) - (profile.weight || 0);
    const weeksToGoal = weightToGain / (profile.goal_speed || 0.5);
    const calorieSurplus = (weightToGain * 7700) / (weeksToGoal * 7);
    dailyCalories += calorieSurplus;
  }
  
  return Math.round(dailyCalories);
};