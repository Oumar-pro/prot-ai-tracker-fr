import { Apple, Flame, Zap, Wheat, Droplets } from "lucide-react";
import Navigation from "@/components/Navigation";
import WeekCalendar from "@/components/WeekCalendar";
import MacroCard from "@/components/MacroCard";
import FloatingAddButton from "@/components/FloatingAddButton";
import { useTodayMacros } from "@/hooks/useFoodAnalyses";

const Home = () => {
  const { data: macros } = useTodayMacros();
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 bg-card">
        <div className="flex items-center gap-2">
          <Apple className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Prot AI</h1>
        </div>
        <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-medium">{macros?.calories || 0}</span>
        </div>
      </header>

      <div className="px-4 py-6">
        <WeekCalendar />
        
        {/* Calories principales */}
        <div className="mb-6">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-4xl font-bold text-foreground">
                {Math.max(2100 - (macros?.calories || 0), 0)}
              </h2>
              <div className="w-16 h-16 rounded-full border-4 border-muted flex items-center justify-center">
                <Flame className="w-6 h-6 text-calories" />
              </div>
            </div>
            <p className="text-muted-foreground">Calories restantes</p>
            <div className="mt-2 text-sm text-muted-foreground">
              {macros?.calories || 0} / 2100 consommées
            </div>
          </div>
        </div>

        {/* Macronutriments */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <MacroCard
            icon={<Zap className="w-4 h-4 text-white" />}
            label="Protéines"
            value={Math.max(120 - Math.round(macros?.proteins || 0), 0).toString()}
            unit="g restantes"
            color="bg-protein"
            progress={Math.min((macros?.proteins || 0) / 120 * 100, 100)}
          />
          <MacroCard
            icon={<Wheat className="w-4 h-4 text-white" />}
            label="Glucides"
            value={Math.max(250 - Math.round(macros?.carbs || 0), 0).toString()}
            unit="g restantes"
            color="bg-carbs"
            progress={Math.min((macros?.carbs || 0) / 250 * 100, 100)}
          />
          <MacroCard
            icon={<Droplets className="w-4 h-4 text-white" />}
            label="Lipides"
            value={Math.max(70 - Math.round(macros?.fats || 0), 0).toString()}
            unit="g restantes"
            color="bg-fats"
            progress={Math.min((macros?.fats || 0) / 70 * 100, 100)}
          />
        </div>

        {/* Repas récents */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold mb-4">Repas récents</h3>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-2">Vous n'avez ajouté aucun aliment</p>
            <p className="text-sm text-muted-foreground">
              Commencez à suivre vos repas d'aujourd'hui en prenant des photos rapides
            </p>
          </div>
        </div>
      </div>

      <FloatingAddButton />
      <Navigation />
    </div>
  );
};

export default Home;