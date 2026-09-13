import React from 'react';

interface ProgressProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  sublabel?: string;
  showPercentage?: boolean;
  color?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  sublabel,
  showPercentage = false,
  color = 'cyan',
  size = 'md',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorStyles = {
    cyan: 'bg-brand-500 shadow-glow-cyan',
    emerald: 'bg-emerald-500 shadow-glow-emerald',
    amber: 'bg-amber-500 shadow-glow-amber',
    rose: 'bg-rose-500 shadow-glow-rose',
    gradient: 'bg-gradient-to-r from-brand-500 via-emerald-400 to-amber-400',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage || sublabel) && (
        <div className="flex items-center justify-between text-xs mb-1.5">
          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            {label}
            {sublabel && <span className="text-slate-500">({sublabel})</span>}
          </div>
          {showPercentage && (
            <span className="font-mono font-semibold text-slate-200">{percentage}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-750 ${heightStyles[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorStyles[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
