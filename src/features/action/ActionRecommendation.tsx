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
    <div className={`p-5 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 backdrop-blur-2xl shadow-xl relative overflow-hidden space-y-5 ${className}`}>
      
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Header Tagline */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Sparkles className="w-4 h-4 animate-pulse text-violet-500" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono font-bold text-blue-600 dark:text-blue-400 tracking-wider block">
              AI MUNICIPAL INTERVENTION ENGINE
            </span>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
              Recommended Municipal Action
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
            SYNTHETIC DEMO WORKFLOW
          </span>
          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase ${
            isApprovedOrActive 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40' 
              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/40 animate-pulse'
          }`}>
            {status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Hero Title & Description */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span>{workOrder.id}</span>
          <span>•</span>
          <span className="text-violet-600 dark:text-violet-400 font-bold">{workOrder.department}</span>
          <span>•</span>
          <span>Target Ward: {workOrder.wardName}</span>
        </div>
        <h3 className="text-xl font-black text-slate-900 dark:text-white leading-snug">
          {workOrder.recommendedAction}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
          Comprehensive civil intervention targeting primary stormwater culvert decongestion, mechanical silt clearance, and automated SCADA weir telemetry to eliminate commuter submergence across the Outer Ring Road corridor.
        </p>
      </div>

      {/* Multi-Dimensional Action Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1 text-[11px]">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-500" />
            <span>Estimated Capex</span>
          </div>
          <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            {workOrder.estimatedBudget}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">from Stormwater Fund</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>Execution Timeline</span>
          </div>
          <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
            {workOrder.estimatedDays} Days
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">3-Phase Staged Works</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1 text-[11px]">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>Priority Rank</span>
          </div>
          <span className="text-base font-extrabold text-red-600 dark:text-red-400 font-mono">
            {workOrder.priorityScore} / 100
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">#1 Critical in Ward</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-violet-500" />
            <span>Evidence Confidence</span>
          </div>
          <span className="text-base font-extrabold text-blue-600 dark:text-blue-400 font-mono">
            {workOrder.evidenceConfidence}%
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Multi-Source Verified</span>
        </div>
      </div>


      {/* Scope Breakdown */}
      <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
        <span className="text-[10px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400 tracking-wider block">
          Prescribed Engineering Scope:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
          {workOrder.technicalScope.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* "WHY THIS ACTION?" Reasoning Toggle */}
      <div className="space-y-2">
        <button
          onClick={() => setShowReasoning(!showReasoning)}
          className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-semibold transition-all group shadow-sm"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
            <span>Why This Specific Intervention? (Causal Reasoning Chain)</span>
          </div>
          {showReasoning ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showReasoning && (
          <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-500/30 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Citizen Voices</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{workOrder.reasoningChain.citizenReports} Reports</span>
              </div>
              <div className="p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Culvert Choke</span>
                <span className="font-extrabold text-red-600 dark:text-red-400">{workOrder.reasoningChain.culvertBlockage}%</span>
              </div>
              <div className="p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Capacity Gap</span>
                <span className="font-extrabold text-red-600 dark:text-red-400">{workOrder.reasoningChain.serviceCapacityDeficit}%</span>
              </div>
              <div className="p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Vulnerability</span>
                <span className="font-extrabold text-amber-600 dark:text-amber-300">{workOrder.reasoningChain.vulnerabilityScore}/100</span>
              </div>
              <div className="p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Prior Capex</span>
                <span className="font-extrabold text-slate-700 dark:text-slate-300">{workOrder.reasoningChain.priorAllocation}</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1 border-t border-blue-200 dark:border-blue-500/20">
              <strong className="text-blue-700 dark:text-blue-300">Algorithmic Synthesis:</strong> {workOrder.reasoningChain.algorithmicConclusion}
            </p>
          </div>
        )}
      </div>

      {/* Interactive Action Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={() => navigate('/gov/evidence')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-white text-xs font-semibold transition-all shadow-sm"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Inspect 3D Evidence Graph</span>
        </button>

        <div className="flex items-center gap-2.5">
          {onOpenReviewModal && (
            <button
              onClick={onOpenReviewModal}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-sm"
            >
              Review Recommendation
            </button>
          )}

          {!isApprovedOrActive ? (
            <button
              onClick={approveIntervention}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all shadow-md shadow-emerald-500/25"
            >
              <CheckCircle className="w-4 h-4" />
              <span>APPROVE INTERVENTION →</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/gov/projects')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-all shadow-md shadow-blue-500/25"
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
