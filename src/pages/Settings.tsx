import Navigation from "@/components/Navigation";
import { ChevronRight, User, Target, Shield, Mail, FileText } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [burnedCalories, setBurnedCalories] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
        <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>
      </header>

      <div className="px-4 py-6">
        {/* Informations personnelles */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-foreground">Âge</span>
              <span className="text-muted-foreground">19</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">Taille</span>
              <span className="text-muted-foreground">165.0 cm</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">Poids actuel</span>
              <span className="text-muted-foreground">54 kg</span>
            </div>
          </div>
        </div>

        {/* Personnalisation */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Personnalisation</h2>
          
          <div className="bg-card rounded-xl shadow-sm border border-border">
            <button
              onClick={() => handleSettingClick("Détails personnels")}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">Détails personnels</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <div className="border-t border-border">
              <button
                onClick={() => handleSettingClick("Ajuster les objectifs")}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-muted-foreground" />
                  <div className="text-left">
                    <div className="text-foreground">Ajuster les objectifs</div>
                    <div className="text-sm text-muted-foreground">Calories, glucides, lipides et protéines</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Préférences */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Préférences</h2>
          
          <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-foreground">Calories brûlées</div>
                <div className="text-sm text-muted-foreground">Ajouter les calories brûlées à l'objectif quotidien</div>
              </div>
              <Switch
                checked={burnedCalories}
                onCheckedChange={setBurnedCalories}
              />
            </div>
          </div>
        </div>

        {/* Légal */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Légal</h2>
          
          <div className="bg-card rounded-xl shadow-sm border border-border">
            <button
              onClick={handleNavigateToTerms}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">Conditions générales</span>
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
                  <span className="text-foreground">Politique de confidentialité</span>
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
                  <span className="text-foreground">Email de support</span>
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