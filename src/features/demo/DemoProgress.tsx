import React from 'react';
import { useDemo } from './demoController';
import { DEMO_STAGES } from './demoState';
import { Clock } from 'lucide-react';

export const DemoProgress: React.FC = () => {
  const { currentStageIndex, goToStage, totalStages } = useDemo();

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-cyan-400">
            DEMO STEP {String(currentStageIndex + 1).padStart(2, '0')} / {String(totalStages).padStart(2, '0')}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 font-medium">{DEMO_STAGES[currentStageIndex]?.title}</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
          <Clock className="w-3 h-3" />
          <span>{DEMO_STAGES[currentStageIndex]?.timeline}</span>
        </div>
      </div>

      {/* 8-Stage Progress Step Bar */}
      <div className="grid grid-cols-8 gap-1.5">
        {DEMO_STAGES.map((st, idx) => {
          const isCurrent = idx === currentStageIndex;
          const isPassed = idx < currentStageIndex;

          return (
            <button
              key={st.key}
              onClick={() => goToStage(idx)}
              title={`${st.stageNumber}: ${st.title} (${st.timeline})`}
              className={`h-2 rounded-full transition-all duration-300 relative group ${
                isCurrent
                  ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-glow-cyan'
                  : isPassed
                  ? 'bg-cyan-600/60 hover:bg-cyan-500'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              {/* Tooltip on hover */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-1 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] text-slate-200 whitespace-nowrap pointer-events-none shadow-xl z-50">
                <span>{st.stageNumber}</span>
                <span className="text-slate-400 font-mono">({st.timeline})</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
