import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Info } from "lucide-react";

const WeightOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("90 Days");
  const { toast } = useToast();

  const periods = ["90 Days", "6 Months", "1 Year", "All time"];

  const handleUpdateWeight = () => {
    toast({
      title: "Mise à jour du poids",
      description: "Fonctionnalité de mise à jour du poids à venir !",
    });
  };

  const handleLogWeight = () => {
    toast({
      title: "Enregistrer le poids",
      description: "Fonctionnalité d'enregistrement du poids à venir !",
    });
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border mb-6">
      {/* Objectif de poids */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Objectif de poids</h2>
        <Button variant="outline" size="sm" onClick={handleUpdateWeight}>
          Mettre à jour
        </Button>
      </div>
      
      <div className="text-3xl font-bold text-foreground mb-4">72 kg</div>

      {/* Poids actuel */}
      <div className="mb-4">
        <h3 className="text-base font-medium text-foreground mb-2">Poids actuel</h3>
        <div className="bg-muted rounded-lg p-4 mb-2">
          <div className="text-3xl font-bold text-foreground mb-1">54 kg</div>
          <p className="text-sm text-muted-foreground">
            Essayez de vous peser une fois par semaine pour que nous puissions ajuster votre plan et vous assurer d'atteindre votre objectif.
          </p>
        </div>
        
        <Button 
          onClick={handleLogWeight}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Enregistrer le poids
        </Button>
      </div>

      {/* IMC */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-base font-medium text-foreground">Votre IMC</h3>
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>
        
        <div className="flex items-center gap-3 mb-2">
          <span className="text-muted-foreground">Votre poids est</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
            Sain
          </span>
        </div>
        
        <div className="text-2xl font-bold text-foreground mb-3">19.83</div>
        
        {/* Barre de progression IMC */}
        <div className="relative mb-3">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full"></div>
          <div className="absolute top-0 left-1/4 w-0.5 h-2 bg-black"></div>
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>● Insuffisant</span>
          <span>● Sain</span>
          <span>● Surpoids</span>
          <span>● Obèse</span>
        </div>
      </div>

      {/* Progression de l'objectif */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-medium text-foreground">Progression de l'objectif</h3>
          <span className="text-sm text-muted-foreground">0.0% Objectif atteint</span>
        </div>
        
        {/* Sélecteur de période */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedPeriod === period
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
        
        {/* Graphique de progression */}
        <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-sm">Graphique de progression</div>
            <div className="text-xs">Aucune donnée disponible</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightOverview;