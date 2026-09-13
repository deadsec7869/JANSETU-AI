import React from 'react';
import { PriorityScoreBreakdown, PriorityLevel } from '../../types/civic';
import { Progress } from '../ui/Progress';
import { ShieldAlert, Users, RotateCcw, TrendingUp, Sparkles } from 'lucide-react';

interface PriorityScoreIndicatorProps {
  priorityScore: PriorityScoreBreakdown;
  priorityLevel: PriorityLevel;
}

export const PriorityScoreIndicator: React.FC<PriorityScoreIndicatorProps> = ({
  priorityScore,
  priorityLevel,
}) => {
  const getBadgeBg = (lvl: PriorityLevel) => {
    switch (lvl) {
      case 'Critical': return 'bg-red-50 dark:bg-red-950/40 border-red-500/30 text-red-700 dark:text-red-300';
      case 'High': return 'bg-amber-50 dark:bg-amber-950/40 border-amber-500/30 text-amber-700 dark:text-amber-300';
      default: return 'bg-blue-50 dark:bg-blue-950/40 border-blue-500/30 text-blue-700 dark:text-blue-300';
    }
  };

  return (
    <div className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-4">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Algorithmic Priority Score</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Multi-vector civic risk calculation</p>
          </div>
        </div>

        <div className={`px-3 py-1.5 rounded-xl border font-mono text-center ${getBadgeBg(priorityLevel)}`}>
          <span className="text-xl font-black">{priorityScore.overallScore}</span>
          <span className="text-xs text-slate-400 font-normal">/100</span>
        </div>
      </div>

      {/* Explanation text */}
      <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50/80 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed">
        {priorityScore.explanation}
      </p>

      {/* Factor Breakdown Grid */}
      <div className="space-y-3 pt-2">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
              Safety & Physical Hazard Risk
            </span>
            <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">{priorityScore.safetyRisk}%</span>
          </div>
          <Progress value={priorityScore.safetyRisk} color="rose" size="sm" />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              Affected Population Density
            </span>
            <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">{priorityScore.affectedPopulation.toLocaleString()} people</span>
          </div>
          <Progress value={Math.min(100, (priorityScore.affectedPopulation / 50000) * 100)} color="cyan" size="sm" />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
              Economic & Transit Corridor Impact
            </span>
            <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">{priorityScore.economicImpact}%</span>
          </div>
          <Progress value={priorityScore.economicImpact} color="amber" size="sm" />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <RotateCcw className="w-3.5 h-3.5 text-violet-500" />
              Recurrence & Cluster Multiplier
            </span>
            <span className="font-mono text-violet-600 dark:text-violet-300 font-bold">{priorityScore.repeatFactor}x Reports</span>
          </div>
          <Progress value={Math.min(100, priorityScore.repeatFactor * 12)} color="gradient" size="sm" />
        </div>
      </div>
    </div>
  );
};
