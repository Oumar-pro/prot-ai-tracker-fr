import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Navigation
    'home': 'Accueil',
    'analytics': 'Analyses',
    'settings': 'Paramètres',
    
    // Home page
    'calories_remaining': 'Calories restantes',
    'goal': 'Objectif',
    'consumed': 'consommées',
    'progress': 'Progression',
    'proteins': 'Protéines',
    'carbs': 'Glucides',
    'fats': 'Lipides',
    'remaining': 'restantes',
    'recent_meals': 'Repas récents',
    'no_meals_added': 'Vous n\'avez ajouté aucun aliment',
    'start_tracking': 'Commencez à suivre vos repas d\'aujourd\'hui en prenant des photos rapides',
    'tap_plus_to_analyze': 'Appuyez sur le + pour analyser.',
    
    // Settings
    'personal_info': 'Informations personnelles',
    'age': 'Âge',
    'height': 'Taille',
    'current_weight': 'Poids actuel',
    'customization': 'Personnalisation',
    'personal_details': 'Détails personnels',
    'adjust_goals': 'Ajuster les objectifs',
    'calories_carbs_fats_proteins': 'Calories, glucides, lipides et protéines',
    'preferences': 'Préférences',
    'dark_mode': 'Mode sombre',
    'switch_theme': 'Basculer entre thème clair et sombre',
    'burned_calories': 'Calories brûlées',
    'add_burned_calories': 'Ajouter les calories brûlées à l\'objectif quotidien',
    'language': 'Langue',
    'select_language': 'Sélectionner la langue de l\'application',
    'legal': 'Légal',
    'terms_conditions': 'Conditions générales',
    'privacy_policy': 'Politique de confidentialité',
    'support_email': 'Email de support',
    
    // Analytics
    'weight_overview': 'Aperçu du poids',
    'this_week': 'Cette semaine',
    'last_week': 'Semaine dernière',
    'weeks_ago_2': 'Il y a 2 sem.',
    'weeks_ago_3': 'Il y a 3 sem.',
    'nutrition_breakdown': 'Répartition nutritionnelle',
    'weekly_overview': 'Vue d\'ensemble hebdomadaire',
    
    // Weight overview
    'weight_goal': 'Objectif de poids',
    'update': 'Mettre à jour',
    'try_weigh_weekly': 'Essayez de vous peser une fois par semaine pour que nous puissions ajuster votre plan et vous assurer d\'atteindre votre objectif.',
    'log_weight': 'Enregistrer le poids',
    'your_bmi': 'Votre IMC',
    'your_weight_is': 'Votre poids est',
    'healthy': 'Sain',
    'underweight': 'Insuffisant',
    'overweight': 'Surpoids',
    'obese': 'Obèse',
    'goal_progress': 'Progression de l\'objectif',
    'goal_reached': 'Objectif atteint',
    'progress_chart': 'Graphique de progression',
    'no_data_available': 'Aucune donnée disponible',
  },
  en: {
    // Navigation
    'home': 'Home',
    'analytics': 'Analytics',
    'settings': 'Settings',
    
    // Home page
    'calories_remaining': 'Calories remaining',
    'goal': 'Goal',
    'consumed': 'consumed',
    'progress': 'Progress',
    'proteins': 'Proteins',
    'carbs': 'Carbs',
    'fats': 'Fats',
    'remaining': 'remaining',
    'recent_meals': 'Recent meals',
    'no_meals_added': 'You haven\'t added any food',
    'start_tracking': 'Start tracking your meals today by taking quick photos',
    'tap_plus_to_analyze': 'Tap the + to analyze.',
    
    // Settings
    'personal_info': 'Personal Information',
    'age': 'Age',
    'height': 'Height',
    'current_weight': 'Current weight',
    'customization': 'Customization',
    'personal_details': 'Personal details',
    'adjust_goals': 'Adjust goals',
    'calories_carbs_fats_proteins': 'Calories, carbs, fats and proteins',
    'preferences': 'Preferences',
    'dark_mode': 'Dark mode',
    'switch_theme': 'Switch between light and dark theme',
    'burned_calories': 'Burned calories',
    'add_burned_calories': 'Add burned calories to daily goal',
    'language': 'Language',
    'select_language': 'Select app language',
    'legal': 'Legal',
    'terms_conditions': 'Terms & Conditions',
    'privacy_policy': 'Privacy Policy',
    'support_email': 'Support Email',
    
    // Analytics
    'weight_overview': 'Weight Overview',
    'this_week': 'This week',
    'last_week': 'Last week',
    'weeks_ago_2': '2 weeks ago',
    'weeks_ago_3': '3 weeks ago',
    'nutrition_breakdown': 'Nutrition breakdown',
    'weekly_overview': 'Weekly overview',
    
    // Weight overview
    'weight_goal': 'Weight goal',
    'update': 'Update',
    'try_weigh_weekly': 'Try to weigh yourself once a week so we can adjust your plan and ensure you reach your goal.',
    'log_weight': 'Log weight',
    'your_bmi': 'Your BMI',
    'your_weight_is': 'Your weight is',
    'healthy': 'Healthy',
    'underweight': 'Underweight',
    'overweight': 'Overweight',
    'obese': 'Obese',
    'goal_progress': 'Goal progress',
    'goal_reached': 'Goal reached',
    'progress_chart': 'Progress chart',
    'no_data_available': 'No data available',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('prot-ai-language') as Language;
    return savedLanguage || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('prot-ai-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};