
import React from 'react';
import { Trophy, Calendar, LayoutGrid, Clock, Timer, Sparkles } from 'lucide-react';

// Use a map to avoid passing non-serializable components as props
const ICON_MAP: Record<string, React.ElementType> = {
  trophy: Trophy,
  calendar: Calendar,
  layout: LayoutGrid,
  clock: Clock,
  timer: Timer,
  sparkles: Sparkles
};

interface StatBoxProps {
  label: string;
  value: string | number;
  subtext?: string;
  iconName?: string;
  progress?: number;
  progressColor?: string;
}

export const StatBox: React.FC<StatBoxProps> = ({ 
  label, 
  value, 
  subtext, 
  iconName, 
  progress, 
  progressColor = "bg-sky-500" 
}) => {
  const Icon = iconName ? ICON_MAP[iconName] : null;

  return (
    <div className="glass p-5 rounded-2xl flex flex-col items-center justify-center transition-all hover:scale-105 border border-white/5 hover:border-white/20">
      {Icon && (
        <div className="mb-2 text-sky-400">
          <Icon size={18} />
        </div>
      )}
      <span className="text-slate-400 text-[10px] uppercase tracking-widest mb-1 font-bold">{label}</span>
      <span className="text-xl font-black text-white tabular-nums">{value}</span>
      {progress !== undefined && (
        <div className="w-full h-1.5 bg-slate-800/50 rounded-full mt-3 overflow-hidden border border-white/5">
          <div 
            className={`h-full ${progressColor} transition-all duration-700 ease-out shadow-[0_0_8px_rgba(56,189,248,0.3)]`}
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        </div>
      )}
      {subtext && <span className="text-slate-500 text-[9px] mt-1 font-medium text-center">{subtext}</span>}
    </div>
  );
};
