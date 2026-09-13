import React from 'react';
import { useAction } from '../../context/ActionContext';
import { 
  MessageSquareQuote, 
  Network, 
  Flame, 
  Briefcase, 
  TrendingUp, 
  CheckCircle2, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface ClosedLoopVisualProps {
  className?: string;
  compact?: boolean;
}

export const ClosedLoopVisual: React.FC<ClosedLoopVisualProps> = ({ 
  className = '',
  compact = false 
}) => {
  const { status } = useAction();

  const stages = [
    { key: 'voice', label: 'CITIZEN VOICE', icon: MessageSquareQuote, activeFor: ['identified'] },
    { key: 'evidence', label: 'EVIDENCE GRAPH', icon: Network, activeFor: ['identified', 'prioritized'] },
    { key: 'priority', label: 'PRIORITY #1', icon: Flame, activeFor: ['prioritized', 'awaiting_review'] },
    { key: 'action', label: 'GOV ACTION', icon: Briefcase, activeFor: ['approved', 'assigned', 'in_progress'] },
    { key: 'impact', label: 'IMPACT MEASURED', icon: TrendingUp, activeFor: ['completed', 'verified'] },
    { key: 'verify', label: 'CITIZEN VERIFIED', icon: CheckCircle2, activeFor: ['verified'] },
  ];

  // Map status to active stage index
  const getActiveStageIndex = () => {
    switch (status) {
      case 'identified': return 0;
      case 'prioritized': return 1;
      case 'awaiting_review': return 2;
      case 'approved':
      case 'assigned':
      case 'in_progress': return 3;
      case 'completed': return 4;
      case 'verified': return 5;
      default: return 3;
    }
  };

  const activeIndex = getActiveStageIndex();

  return (
    <div className={`p-3 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-lg ${className}`}>
      
      {/* Header */}
      {!compact && (
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200/80 dark:border-slate-800/80 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
            <span>JANSETU CLOSED-LOOP CIVIC ACCOUNTABILITY</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
            AUTONOMOUS PRODUCT LOOP
          </span>
        </div>
      )}

      {/* Responsive Horizontal Loop */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-1.5 sm:gap-2">
        {stages.map((stage, idx) => {
          const isActive = idx === activeIndex;
          const isPassed = idx < activeIndex;
          const Icon = stage.icon;

          return (
            <React.Fragment key={stage.key}>
              <div
                className={`flex-1 min-w-[90px] p-2 rounded-xl border transition-all text-center flex flex-col items-center justify-center gap-1 ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/70 border-blue-500 dark:border-blue-400 text-blue-900 dark:text-blue-100 shadow-sm scale-[1.03]'
                    : isPassed
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                    : 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 text-slate-400 dark:text-slate-500'
                }`}
              >
                <div className="flex items-center justify-center">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600 dark:text-blue-400 animate-pulse' : isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                </div>
                <span className="text-[9px] font-mono font-bold tracking-tight uppercase leading-none">
                  {stage.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping mt-0.5" />
                )}
              </div>

              {idx < stages.length - 1 && (
                <div className="hidden md:flex items-center justify-center text-slate-400 dark:text-slate-600 text-xs px-0.5 font-mono">
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Closed Loop Return Arrow */}
        <div className="hidden lg:flex items-center gap-1 px-2 text-[10px] font-mono text-blue-600 dark:text-blue-400 shrink-0">
          <RotateCcw className="w-3.5 h-3.5 animate-spin text-blue-500" style={{ animationDuration: '10s' }} />
          <span>LOOP</span>
        </div>
      </div>

    </div>
  );
};
