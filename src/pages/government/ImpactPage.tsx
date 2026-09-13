import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  ImpactSummary, 
  CitizenVerification, 
} from '../../features/action';
import { 
  BarChart3, 
  Network,
  FolderOpen,
  PlusCircle
} from 'lucide-react';

export const ImpactPage: React.FC = () => {
  const { isTestMode } = useApp();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 px-4 sm:px-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-lg">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            <span>Executive Impact Intelligence</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono ${
              isTestMode 
                ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}>
              {isTestMode ? 'TEST SIMULATION' : 'VERIFIED MEASUREMENTS'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Measurable Civic Impact & Outcome Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Evaluating before/after ground measurements, turnaround acceleration, and citizen satisfaction.
          </p>
        </div>

        <button
          onClick={() => navigate('/gov/evidence')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-900 border border-blue-500/40 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold transition-all shadow-sm"
        >
          <Network className="w-4 h-4" />
          <span>Inspect 3D Evidence Graph</span>
        </button>
      </div>

      {isTestMode ? (
        /* Test Impact Telemetry */
        <div className="space-y-8">
          <ImpactSummary />
          <CitizenVerification />
        </div>
      ) : (
        /* Real Mode Honest Empty State */
        <Card variant="glass" className="text-center py-16 px-4">
          <div className="space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
              <FolderOpen className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                IMPACT NOT YET MEASURABLE
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Measurable impact metrics (turnaround acceleration, service capacity recovery, and satisfaction ratings) are calculated strictly after an intervention is completed and verified by local residents.
              </p>
            </div>
            <div className="pt-2">
              <Button variant="primary" size="md" icon={PlusCircle} onClick={() => navigate('/report')}>
                Submit Real Issue
              </Button>
            </div>
          </div>
        </Card>
      )}

    </div>
  );
};
