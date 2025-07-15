import { ReactNode } from "react";

interface MacroCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  unit: string;
  color: string;
  progress: number;
}

const MacroCard = ({ icon, label, value, unit, color, progress }: MacroCardProps) => {
  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
            {icon}
          </div>
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
        </div>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
      
      <div className="mb-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default MacroCard;