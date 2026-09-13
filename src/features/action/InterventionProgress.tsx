import React from 'react';
import { useAction } from '../../context/ActionContext';
import { 
  Activity
} from 'lucide-react';

interface InterventionProgressProps {
  className?: string;
}

export const InterventionProgress: React.FC<InterventionProgressProps> = ({ className = '' }) => {
  const { workOrder } = useAction();

  // Calculate overall progress percentage
  const completedMilestones = workOrder.milestones.filter(m => m.status === 'completed').length;
  const inProgressMilestone = workOrder.milestones.find(m => m.status === 'in_progress');
  const overallPercent = Math.min(
    100,
    Math.round(
      (completedMilestones / workOrder.milestones.length) * 100 +
        (inProgressMilestone ? inProgressMilestone.progressPercent / workOrder.milestones.length : 0)
    )
  );

  return (
    <div className={`p-6 rounded-3xl bg-slate-950/90 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-6 ${className}`}>
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
              FIELD INTERVENTION TELEMETRY
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
              SYNTHETIC DEMO WORKFLOW
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
            Engineering Execution Progress
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            WO-BLR-150-001 • Day {workOrder.daysElapsed} of {workOrder.estimatedDays} Days Estimated
          </span>
        </div>

        {/* Aggregate Progress Pill */}
        <div className="flex items-center gap-3">
          <div className="text-right font-mono">
            <span className="text-[10px] text-slate-400 uppercase block">Total Progress</span>
            <span className="text-lg font-extrabold text-cyan-300">{overallPercent}%</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 font-mono">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Milestone Completion</span>
          <span className="text-white font-bold">{completedMilestones} / {workOrder.milestones.length} Milestones Complete</span>
        </div>
        <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-brand-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500 shadow-glow-cyan"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      {/* Milestone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {workOrder.milestones.map((m, idx) => {
          const isDone = m.status === 'completed';
          const isActive = m.status === 'in_progress';

          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                isActive
                  ? 'bg-slate-900/90 border-cyan-500/60 shadow-glow-cyan'
                  : isDone
                  ? 'bg-slate-900/60 border-emerald-500/30'
                  : 'bg-slate-950/40 border-slate-900 opacity-60'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    isDone 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                      : isActive 
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 animate-pulse'
                      : 'bg-slate-900 text-slate-500'
                  }`}>
                    {m.day}
                  </span>
                  <span className="text-slate-400">{m.timestamp}</span>
                </div>

                <h4 className="font-extrabold text-white text-xs leading-snug">
                  {m.stageName}
                </h4>

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {m.description}
                </p>
              </div>

              {/* Sub-metric Pill */}
              {m.metrics && (
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">{m.metrics.label}:</span>
                  <span className={`font-bold ${isDone ? 'text-emerald-300' : isActive ? 'text-cyan-300' : 'text-slate-500'}`}>
                    {m.metrics.value}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
