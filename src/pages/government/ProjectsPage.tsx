import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  WorkOrderTimeline, 
  InterventionProgress, 
  CitizenVerification,
} from '../../features/action';
import { 
  KanbanSquare, 
  TrendingUp,
  FolderOpen,
  PlusCircle
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { isTestMode } = useApp();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 px-4 sm:px-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-lg">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <KanbanSquare className="w-4 h-4" />
            <span>Municipal Work Order Pipeline</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono ${
              isTestMode 
                ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}>
              {isTestMode ? 'TEST WORKFLOW' : 'OFFICIAL WORK ORDERS'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Sanctioned Civic Projects & Field Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Execution telemetry, contractor milestones, expenditure accountability, and ground verification.
          </p>
        </div>
      </div>

      {isTestMode ? (
        /* Test Scenario Dossier */
        <div className="space-y-8">
          <WorkOrderTimeline />
          <InterventionProgress />
          <CitizenVerification />

          <div className="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400 uppercase block">
                POST-INTERVENTION ACCOUNTABILITY
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                Inspect Measurable Outcome Telemetry
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                View before/after satellite drain flow measurements and citizen grievance reduction rates.
              </p>
            </div>

            <button
              onClick={() => navigate('/gov/impact')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 shrink-0"
            >
              <TrendingUp className="w-4 h-4" />
              <span>VIEW IMPACT DASHBOARD →</span>
            </button>
          </div>
        </div>
      ) : (
        /* Real Mode Clean Empty State */
        <Card variant="glass" className="text-center py-16 px-4">
          <div className="space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
              <FolderOpen className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                NO ACTIVE WORK ORDERS
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Work orders appear here after municipal officials review prioritized clusters in the Government Cockpit and sanction field execution.
              </p>
            </div>
            <div className="pt-2">
              <Button variant="primary" size="md" icon={PlusCircle} onClick={() => navigate('/gov')}>
                Review Priority Queue
              </Button>
            </div>
          </div>
        </Card>
      )}

    </div>
  );
};
