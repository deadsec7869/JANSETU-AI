import React from 'react';
import { useAction } from '../../context/ActionContext';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingDown, 
  TrendingUp, 
  Network, 
  Sparkles
} from 'lucide-react';

interface ImpactSummaryProps {
  className?: string;
  showEvidenceLink?: boolean;
}

export const ImpactSummary: React.FC<ImpactSummaryProps> = ({
  className = '',
  showEvidenceLink = true,
}) => {
  const { workOrder } = useAction();
  const navigate = useNavigate();

  const { before, after, serviceGapReductionPercent, reportsReductionPercent, satisfactionImprovementPercent } = workOrder.impactMetrics;

  return (
    <div className={`p-6 rounded-3xl bg-slate-950/90 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-6 ${className}`}>
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
              OUTCOME & IMPACT ENGINE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
              SYNTHETIC IMPACT SIMULATION
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
            Measurable Civic Intervention Outcomes
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Evaluating Work Order {workOrder.id} • {workOrder.title}
          </span>
        </div>

        {/* Global Impact Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold shadow-glow-cyan">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>-76% SERVICE GAP REDUCTION</span>
        </div>
      </div>

      {/* 3 Core Highlight KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        
        {/* Service Capacity Deficit Drop */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-950 border border-rose-500/30 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Service Capacity Deficit</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">
              -{serviceGapReductionPercent}%
            </span>
            <span className="text-xs text-slate-400 font-mono">
              (87% → 21%)
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            Arterial drain flow restored to 79% design capacity across ORR.
          </p>
        </div>

        {/* Citizen Grievance Drop */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Weekly Grievance Inflow</span>
            <TrendingDown className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-cyan-300 font-mono">
              -{reportsReductionPercent}%
            </span>
            <span className="text-xs text-slate-400 font-mono">
              (312 → 68 / wk)
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            78% drop in citizen waterlogging and flood distress complaints.
          </p>
        </div>

        {/* Public Commuter Satisfaction */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Commuter Satisfaction</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-mono">
              +{satisfactionImprovementPercent}%
            </span>
            <span className="text-xs text-slate-400 font-mono">
              (38% → 86%)
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            Measured across 84,000 daily commuters navigating EcoSpace junction.
          </p>
        </div>

      </div>

      {/* Signature Before / After Comparison Bar */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
          Before vs After Intervention Comparison:
        </span>

        {/* Service Gap Bars */}
        <div className="space-y-3 font-mono text-xs">
          
          {/* Before */}
          <div className="space-y-1">
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span className="text-rose-400 font-bold">BEFORE INTERVENTION (Aug 2026)</span>
              <span className="text-rose-400 font-extrabold">{before.serviceGapPercent}% SERVICE GAP</span>
            </div>
            <div className="h-6 w-full bg-slate-950 rounded-xl overflow-hidden p-1 border border-rose-500/30">
              <div
                className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-lg flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                style={{ width: `${before.serviceGapPercent}%` }}
              >
                {before.serviceGapPercent}% Blocked
              </div>
            </div>
          </div>

          {/* After */}
          <div className="space-y-1">
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span className="text-emerald-400 font-bold">AFTER INTERVENTION (Sep 2026)</span>
              <span className="text-emerald-400 font-extrabold">{after.serviceGapPercent}% SERVICE GAP</span>
            </div>
            <div className="h-6 w-full bg-slate-950 rounded-xl overflow-hidden p-1 border border-emerald-500/30">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg flex items-center justify-end pr-2 text-[10px] text-slate-950 font-bold shadow-glow-cyan"
                style={{ width: `${after.serviceGapPercent}%` }}
              >
                {after.serviceGapPercent}% Residual
              </div>
            </div>
          </div>

        </div>

        {/* Detailed Metrics Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-slate-800 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Waterlogging Duration</span>
            <span className="font-extrabold text-white">{before.waterloggingHours} hrs → {after.waterloggingHours} hrs</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">-91% Rain Recovery</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Weekly Citizen Grievances</span>
            <span className="font-extrabold text-white">{before.reportsWeekly} → {after.reportsWeekly} reports</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">-78% Incident Relief</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Protected Commuters</span>
            <span className="font-extrabold text-cyan-300">84,000 / day</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">EcoSpace Tech Corridor</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-500 block">Cost per Citizen Impacted</span>
            <span className="font-extrabold text-emerald-400">₹172 / Commuter</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">₹1.45 Cr Total Capex</span>
          </div>
        </div>

      </div>

      {/* Traceability Link to Evidence Graph */}
      {showEvidenceLink && (
        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <Network className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Verify the causal chain from 312 reports to priority score in 3D:</span>
          </div>
          <button
            onClick={() => navigate('/gov/evidence')}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-glow-cyan shrink-0"
          >
            Inspect Evidence Graph →
          </button>
        </div>
      )}

    </div>
  );
};
