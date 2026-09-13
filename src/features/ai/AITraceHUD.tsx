import React, { useState } from 'react';
import { 
  Terminal, 
  ShieldCheck, 
  Flame, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';

interface AITraceHUDProps {
  inputLanguage?: string;
  classification?: string;
  clusterMatch?: string;
  clusterConfidence?: number;
  priorityScore?: number;
  ruleEngineCitation?: string;
  actionRecommendation?: string;
  className?: string;
}

export const AITraceHUD: React.FC<AITraceHUDProps> = ({
  inputLanguage = 'Kannada / English Auto-Detected',
  classification = 'Water & Drainage (Confidence 0.94)',
  clusterMatch = 'CL-BLR-150-01 (Bellandur SWD)',
  clusterConfidence = 94,
  priorityScore = 94,
  ruleEngineCitation = 'JANSETU Multi-Factor Risk Index Eq. 3.2',
  actionRecommendation = 'Emergency Culvert Desilting + Automated Weir Gate',
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className={`p-4 rounded-3xl bg-slate-950/95 border border-cyan-500/40 backdrop-blur-2xl shadow-2xl space-y-3 font-mono text-xs ${className}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white tracking-wider uppercase text-[11px]">
            AI INTELLIGENCE & RULE TRACE
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold">
            JUDGE MODE ACTIVE
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-2.5 animate-in fade-in duration-150">
          
          {/* Row 1: Language & Classification */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-500 block uppercase">Detected Language:</span>
              <span className="font-bold text-cyan-300">{inputLanguage}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
              <span className="text-[10px] text-slate-500 block uppercase">NLP Classification:</span>
              <span className="font-bold text-white">{classification}</span>
            </div>
          </div>

          {/* Row 2: Semantic Clustering */}
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Semantic Cluster Target:</span>
              <span className="font-bold text-emerald-400">{clusterMatch}</span>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Cluster Match Confidence:</span>
              <span className="font-bold text-cyan-300">{clusterConfidence}% Convergence</span>
            </div>
          </div>

          {/* Row 3: Deterministic Rule Engine Calculation */}
          <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-300 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>Deterministic Priority Calculation:</span>
              </span>
              <span className="text-rose-300 font-extrabold text-sm">{priorityScore} / 100</span>
            </div>
            <span className="text-[10px] text-slate-400 block">
              Formula: {ruleEngineCitation}
            </span>
          </div>

          {/* Row 4: AI Recommendation vs Human Decision */}
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
            <span className="text-slate-400 text-[10px] uppercase block">AI Prescribed Intervention:</span>
            <span className="font-bold text-white block">{actionRecommendation}</span>
            <div className="pt-1.5 mt-1 border-t border-slate-800 flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Governance Boundary:</span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Requires Human Commissioner Sanction
              </span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
