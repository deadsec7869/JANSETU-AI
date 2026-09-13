import React from 'react';
import { useDemo } from './demoController';
import { DemoProgress } from './DemoProgress';
import { DemoControls } from './DemoControls';
import { 
  ChevronUp, 
  ChevronDown, 
  ShieldAlert, 
  Info, 
  Zap 
} from 'lucide-react';

export const DemoOverlay: React.FC = () => {
  const { 
    isDemoActive, 
    currentStage, 
    currentStageIndex, 
    isOverlayCollapsed, 
    setIsOverlayCollapsed 
  } = useDemo();

  if (!isDemoActive) return null;

  return (
    <aside aria-label="Hackathon Demo Controller" className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-[540px] z-50 transition-all duration-300">
      <div className="glass-panel border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/80 backdrop-blur-2xl overflow-hidden bg-slate-950/95">
        
        {/* Header Ribbon */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              <Zap className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-white tracking-wide font-sans">
                  JANSETU 3-MIN DEMO
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {currentStage.stageNumber}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DemoControls />
            <button
              onClick={() => setIsOverlayCollapsed((prev) => !prev)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isOverlayCollapsed ? 'Expand Guide' : 'Collapse Guide'}
            >
              {isOverlayCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Stepper Progress Line */}
        <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/80">
          <DemoProgress />
        </div>

        {/* Expandable Presenter Notes & Judge Guide */}
        {!isOverlayCollapsed && (
          <div className="p-4 space-y-3.5 text-xs">
            {/* Stage Title & Subtitle */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                  <span className="text-cyan-400">Step {currentStageIndex + 1}:</span>
                  <span>{currentStage.title}</span>
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-semibold">
                  {currentStage.provenanceLabel}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {currentStage.subtitle}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 py-1">
              {currentStage.metrics.map((m, i) => (
                <div key={i} className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/90 text-center">
                  <p className="text-[10px] text-slate-400 truncate">{m.label}</p>
                  <p className="text-xs font-mono font-bold text-cyan-300 truncate">{m.value}</p>
                </div>
              ))}
            </div>

            {/* Judge Talking Points */}
            <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3 h-3 text-cyan-400" />
                <span>Presenter Talking Points for Judges:</span>
              </p>
              <ul className="space-y-1 pl-4 list-disc text-slate-300 text-[11px] leading-relaxed">
                {currentStage.talkingPoints.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>

            {/* Core Principle Footer */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
                <ShieldAlert className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">{currentStage.keyPrinciple}</span>
              </div>
              <span className="font-mono text-slate-500 shrink-0 ml-2">
                SYNTHETIC DEMO
              </span>
            </div>
          </div>
        )}

      </div>
    </aside>
  );
};
