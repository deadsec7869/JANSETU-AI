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
      case 'Critical': return 'bg-rose-500/15 border-rose-500/30 text-rose-400';
      case 'High': return 'bg-amber-500/15 border-amber-500/30 text-amber-400';
      default: return 'bg-cyan-500/15 border-brand-500/30 text-brand-300';
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Algorithmic Priority Score</h4>
            <p className="text-[11px] text-slate-400">Multi-vector civic risk calculation</p>
          </div>
        </div>

        <div className={`px-3 py-1.5 rounded-xl border font-mono text-center ${getBadgeBg(priorityLevel)}`}>
          <span className="text-xl font-black">{priorityScore.overallScore}</span>
          <span className="text-xs text-slate-400 font-normal">/100</span>
        </div>
      </div>

      {/* Explanation text */}
      <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800 leading-relaxed">
        {priorityScore.explanation}
      </p>

      {/* Factor Breakdown Grid */}
      <div className="space-y-3 pt-2">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              Safety & Physical Hazard Risk
            </span>
            <span className="font-mono text-slate-200">{priorityScore.safetyRisk}%</span>
          </div>
          <Progress value={priorityScore.safetyRisk} color="rose" size="sm" />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              Affected Population Density
            </span>
            <span className="font-mono text-slate-200">{priorityScore.affectedPopulation.toLocaleString()} people</span>
          </div>
          <Progress value={Math.min(100, (priorityScore.affectedPopulation / 50000) * 100)} color="cyan" size="sm" />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-slate-300">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              Economic & Transit Corridor Impact
            </span>
            <span className="font-mono text-slate-200">{priorityScore.economicImpact}%</span>
          </div>
          <Progress value={priorityScore.economicImpact} color="amber" size="sm" />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1.5 text-slate-300">
              <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
              Recurrence & Cluster Multiplier
            </span>
            <span className="font-mono text-purple-300 font-bold">{priorityScore.repeatFactor}x Reports</span>
          </div>
          <Progress value={Math.min(100, priorityScore.repeatFactor * 12)} color="gradient" size="sm" />
        </div>
      </div>
    </div>
  );
};
