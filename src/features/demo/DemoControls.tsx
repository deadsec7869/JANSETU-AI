import React from 'react';
import { useDemo } from './demoController';
import { ArrowLeft, ArrowRight, RotateCcw, X } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const DemoControls: React.FC = () => {
  const { currentStageIndex, totalStages, nextStage, prevStage, resetDemoData, exitDemo } = useDemo();

  const isFirst = currentStageIndex === 0;
  const isLast = currentStageIndex === totalStages - 1;

  return (
    <div className="flex items-center gap-2">
      {/* Back Button */}
      <button
        onClick={prevStage}
        disabled={isFirst}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
          isFirst
            ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-500 bg-slate-900/50'
            : 'border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700 hover:border-slate-600'
        }`}
        title="Previous Stage (ArrowLeft)"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Back</span>
        <kbd className="hidden md:inline-block px-1 py-0.5 rounded bg-slate-900 border border-slate-700 text-[9px] font-mono text-slate-400">
          ←
        </kbd>
      </button>

      {/* Next / Finish Button */}
      <Button
        variant="primary"
        size="sm"
        onClick={nextStage}
        className="shadow-glow-cyan text-xs font-bold"
        title="Next Stage (ArrowRight)"
      >
        <span>{isLast ? 'Finish Demo' : 'Next Stage'}</span>
        <ArrowRight className="w-3.5 h-3.5 ml-1" />
        <kbd className="hidden md:inline-block ml-1 px-1 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[9px] font-mono text-cyan-200">
          →
        </kbd>
      </Button>

      {/* Reset Button */}
      <button
        onClick={resetDemoData}
        className="p-1.5 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-amber-300 hover:bg-amber-500/10 hover:border-amber-500/30 transition-colors"
        title="Reset Demo (R)"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>

      {/* Exit Demo */}
      <button
        onClick={exitDemo}
        className="p-1.5 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-colors"
        title="Exit Demo Mode (Esc)"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
