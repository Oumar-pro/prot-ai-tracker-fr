import Navigation from "@/components/Navigation";
import WeightOverview from "@/components/WeightOverview";
import { useState } from "react";

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Cette semaine");
  
  const periods = ["Cette semaine", "Semaine dernière", "Il y a 2 sem.", "Il y a 3 sem."];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="px-4 py-4 bg-card">
        <h1 className="text-2xl font-bold text-foreground">Vue d'ensemble</h1>
      </header>

      <div className="px-4 py-6">
        {/* Vue d'ensemble du poids */}
        <WeightOverview />

        {/* Nutrition */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border mb-6">
          <h2 className="text-lg font-semibold mb-4">Nutrition</h2>
          
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

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-3xl font-bold text-foreground">0</div>
              <div className="text-sm text-muted-foreground">Calories totales</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">0.0</div>
              <div className="text-sm text-muted-foreground">Moyenne quotidienne</div>
            </div>
          </div>

          {/* Graphique hebdomadaire */}
          <div className="h-32 bg-muted rounded-lg flex items-end justify-center p-4">
            <div className="flex items-end gap-2 text-xs text-muted-foreground">
              <div className="text-center">
                <div className="w-6 h-1 bg-muted-foreground/30 rounded mb-1"></div>
                <span>L</span>
              </div>
              <div className="text-center">
                <div className="w-6 h-1 bg-muted-foreground/30 rounded mb-1"></div>
                <span>M</span>
              </div>
              <div className="text-center">
                <div className="w-6 h-1 bg-muted-foreground/30 rounded mb-1"></div>
                <span>M</span>
              </div>
              <div className="text-center">
                <div className="w-6 h-1 bg-muted-foreground/30 rounded mb-1"></div>
                <span>J</span>
              </div>
              <div className="text-center">
                <div className="w-6 h-1 bg-muted-foreground/30 rounded mb-1"></div>
                <span>V</span>
              </div>
              <div className="text-center">
                <div className="w-6 h-1 bg-muted-foreground/30 rounded mb-1"></div>
                <span>S</span>
              </div>
              <div className="text-center">
                <div className="w-6 h-1 bg-muted-foreground/30 rounded mb-1"></div>
                <span>D</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Analytics;