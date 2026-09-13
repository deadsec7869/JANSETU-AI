import React, { useState } from 'react';
import { useAction } from '../../context/ActionContext';
import { 
  RotateCcw, 
  FastForward, 
  TrendingUp, 
  Settings2, 
  ChevronUp,
  ChevronDown
} from 'lucide-react';

export const DemoControlHUD: React.FC = () => {
  const { status, resetDemoWorkflow, advanceWorkflowStage, setStageDirectly } = useAction();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm rounded-2xl bg-slate-950/95 border border-cyan-500/40 backdrop-blur-2xl shadow-2xl p-3 space-y-2.5 font-mono text-xs">
      
      {/* Control Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
          <Settings2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] tracking-wider uppercase">DEMO CONTROLLER</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
            JUDGE TOOL
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white"
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Current Stage:</span>
            <span className="text-cyan-300 font-bold uppercase">{status.replace('_', ' ')}</span>
          </div>

          {/* Quick Action Button Grid */}
          <div className="grid grid-cols-3 gap-1.5 text-[10px]">
            
            {/* Reset */}
            <button
              onClick={resetDemoWorkflow}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-750 text-slate-300 hover:text-white flex flex-col items-center justify-center gap-1 transition-all"
              title="Reset Canonical Scenario to Fresh Submission"
            >
              <RotateCcw className="w-3 h-3 text-amber-400" />
              <span>Reset Demo</span>
            </button>

            {/* Advance Step */}
            <button
              onClick={advanceWorkflowStage}
              className="p-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 hover:text-white flex flex-col items-center justify-center gap-1 transition-all"
              title="Advance to Next Lifecycle Stage"
            >
              <FastForward className="w-3 h-3 text-cyan-400" />
              <span>Next Stage</span>
            </button>

            {/* Show Impact */}
            <button
              onClick={() => setStageDirectly('verified')}
              className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 hover:text-white flex flex-col items-center justify-center gap-1 transition-all"
              title="Jump directly to Verified Impact State"
            >
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span>Show Impact</span>
            </button>

          </div>

          <div className="text-[9px] text-slate-500 leading-tight">
            Use to test repeatable judge walkthrough from Citizen Voice → Impact Verification.
          </div>
        </div>
      )}

    </div>
  );
};
