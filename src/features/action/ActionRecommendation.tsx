import React, { useState } from 'react';
import { useAction } from '../../context/ActionContext';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle, 
  Clock, 
  IndianRupee, 
  Flame, 
  ShieldCheck, 
  ArrowRight,
  FileCheck2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ActionRecommendationProps {
  onOpenReviewModal?: () => void;
  className?: string;
}

export const ActionRecommendation: React.FC<ActionRecommendationProps> = ({
  onOpenReviewModal,
  className = '',
}) => {
  const { workOrder, status, approveIntervention } = useAction();
  const [showReasoning, setShowReasoning] = useState<boolean>(false);
  const navigate = useNavigate();

  const isApprovedOrActive = ['approved', 'assigned', 'in_progress', 'completed', 'verified'].includes(status);

  return (
    <div className={`p-5 rounded-3xl bg-slate-950/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden space-y-5 ${className}`}>
      
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Header Tagline */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 tracking-wider block">
              AI MUNICIPAL INTERVENTION ENGINE
            </span>
            <h2 className="text-lg font-extrabold text-white tracking-tight">
              Recommended Municipal Action
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
            SYNTHETIC DEMO WORKFLOW
          </span>
          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase ${
            isApprovedOrActive 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
          }`}>
            {status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Core Action Title & Context */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-cyan-300 font-bold">{workOrder.clusterId}</span>
          <span>•</span>
          <span>{workOrder.wardName}</span>
          <span>•</span>
          <span className="text-rose-400 font-bold">Priority {workOrder.priorityScore}/100</span>
        </div>
        <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug">
          {workOrder.recommendedAction}
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Comprehensive civil intervention targeting primary stormwater culvert decongestion, mechanical silt clearance, and automated SCADA weir telemetry to eliminate commuter submergence across the Outer Ring Road corridor.
        </p>
      </div>

      {/* KPI Value Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
            <span>Estimated Budget</span>
          </div>
          <div className="text-base font-extrabold text-white font-mono">
            {workOrder.estimatedBudget}
          </div>
          <span className="text-[9px] text-slate-500 block">Zonal Emergency Capex</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Estimated Duration</span>
          </div>
          <div className="text-base font-extrabold text-white font-mono">
            {workOrder.estimatedDays} Days
          </div>
          <span className="text-[9px] text-slate-500 block">Fast-Track Turnaround</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Priority Rank</span>
          </div>
          <div className="text-base font-extrabold text-rose-300 font-mono">
            {workOrder.priorityScore} / 100
          </div>
          <span className="text-[9px] text-rose-400/80 font-bold block">#1 Critical in Bengaluru</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
            <span>Evidence Confidence</span>
          </div>
          <div className="text-base font-extrabold text-cyan-300 font-mono">
            {workOrder.evidenceConfidence}%
          </div>
          <span className="text-[9px] text-slate-500 block">Multi-Source Verified</span>
        </div>
      </div>

      {/* Scope Breakdown */}
      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
        <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider block">
          Prescribed Engineering Scope:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
          {workOrder.technicalScope.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* "WHY THIS ACTION?" Reasoning Toggle */}
      <div className="space-y-2">
        <button
          onClick={() => setShowReasoning(!showReasoning)}
          className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-slate-300 font-semibold transition-all group"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Why This Specific Intervention? (Causal Reasoning Chain)</span>
          </div>
          {showReasoning ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showReasoning && (
          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Citizen Voices</span>
                <span className="font-extrabold text-white">{workOrder.reasoningChain.citizenReports} Reports</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Culvert Choke</span>
                <span className="font-extrabold text-rose-400">{workOrder.reasoningChain.culvertBlockage}%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Capacity Gap</span>
                <span className="font-extrabold text-rose-400">{workOrder.reasoningChain.serviceCapacityDeficit}%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Vulnerability</span>
                <span className="font-extrabold text-amber-300">{workOrder.reasoningChain.vulnerabilityScore}/100</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Prior Capex</span>
                <span className="font-extrabold text-slate-300">{workOrder.reasoningChain.priorAllocation}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-cyan-500/20">
              <strong className="text-cyan-300">Algorithmic Synthesis:</strong> {workOrder.reasoningChain.algorithmicConclusion}
            </p>
          </div>
        )}
      </div>

      {/* Interactive Action Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={() => navigate('/gov/evidence')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-cyan-300 hover:text-white text-xs font-semibold transition-all"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Inspect 3D Evidence Graph</span>
        </button>

        <div className="flex items-center gap-2.5">
          {onOpenReviewModal && (
            <button
              onClick={onOpenReviewModal}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold transition-all"
            >
              Review Recommendation
            </button>
          )}

          {!isApprovedOrActive ? (
            <button
              onClick={approveIntervention}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-slate-950 font-extrabold text-xs hover:opacity-95 transition-all shadow-glow-cyan"
            >
              <CheckCircle className="w-4 h-4" />
              <span>APPROVE INTERVENTION →</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/gov/projects')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs hover:bg-cyan-400 transition-all shadow-glow-cyan"
            >
              <span>VIEW ACTIVE WORK ORDER ({workOrder.id})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
