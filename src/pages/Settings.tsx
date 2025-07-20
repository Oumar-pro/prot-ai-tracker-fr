import Navigation from "@/components/Navigation";
import { ChevronRight, User, Target, Shield, Mail, FileText, Sun, Moon, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth, useProfile, calculateAge, calculateBMI } from "@/hooks/useProfile";

const Settings = () => {
  const [burnedCalories, setBurnedCalories] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const { data: profile } = useProfile();

  const handleSettingClick = (setting: string) => {
    toast({
      title: setting,
      description: "Fonctionnalité à venir !",
    });
  };

  const handleNavigateToTerms = () => {
    navigate('/terms');
  };

  const handleNavigateToPrivacy = () => {
    navigate('/privacy');
  };

  const handleSupportEmail = () => {
    window.open('mailto:support@protai.app', '_blank');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="px-4 py-4 bg-card">
        <h1 className="text-2xl font-bold text-foreground">{t('settings')}</h1>
      </header>

      <div className="px-4 py-6">
        {/* Informations personnelles */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border mb-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">{t('personal_info')}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-foreground">{t('age')}</span>
              <span className="text-muted-foreground">
                {profile?.birth_date ? calculateAge(profile.birth_date) : '-'} ans
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">{t('height')}</span>
              <span className="text-muted-foreground">
                {profile?.height ? `${profile.height} cm` : '-'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">{t('current_weight')}</span>
              <span className="text-muted-foreground">
                {profile?.weight ? `${profile.weight} kg` : '-'}
              </span>
            </div>
          </div>
        </div>

        {/* Personnalisation */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">{t('customization')}</h2>
          
          <div className="bg-card rounded-xl shadow-sm border border-border">
            <button
              onClick={() => handleSettingClick(t('personal_details'))}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{t('personal_details')}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <div className="border-t border-border">
              <button
                onClick={() => handleSettingClick(t('adjust_goals'))}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-muted-foreground" />
                  <div className="text-left">
                    <div className="text-foreground">{t('adjust_goals')}</div>
                    <div className="text-sm text-muted-foreground">{t('calories_carbs_fats_proteins')}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Préférences */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">{t('preferences')}</h2>
          
          <div className="bg-card rounded-xl shadow-sm border border-border">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Sun className="w-5 h-5 text-muted-foreground" />
                )}
                <div>
                  <div className="text-foreground">{t('dark_mode')}</div>
                  <div className="text-sm text-muted-foreground">{t('switch_theme')}</div>
                </div>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
            
            <div className="border-t border-border">
              <div className="flex items-center justify-between p-4">
                <div>
                  <div className="text-foreground">{t('burned_calories')}</div>
                  <div className="text-sm text-muted-foreground">{t('add_burned_calories')}</div>
                </div>
                <Switch
                  checked={burnedCalories}
                  onCheckedChange={setBurnedCalories}
                />
              </div>
            </div>
            
            <div className="border-t border-border">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-foreground">{t('language')}</div>
                    <div className="text-sm text-muted-foreground">{t('select_language')}</div>
                  </div>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">🇫🇷</SelectItem>
                    <SelectItem value="en">🇺🇸</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Légal */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">{t('legal')}</h2>
          
          <div className="bg-card rounded-xl shadow-sm border border-border">
            <button
              onClick={handleNavigateToTerms}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{t('terms_conditions')}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <div className="border-t border-border">
              <button
                onClick={handleNavigateToPrivacy}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{t('privacy_policy')}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="border-t border-border">
              <button
                onClick={handleSupportEmail}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{t('support_email')}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Settings;