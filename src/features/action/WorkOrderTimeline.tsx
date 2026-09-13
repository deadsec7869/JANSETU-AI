import React from 'react';
import { useAction } from '../../context/ActionContext';
import { 
  CheckCircle2, 
  Clock, 
  Flame, 
  ShieldCheck, 
  IndianRupee, 
  Building2, 
  FileText,
  UserCheck,
  CheckCheck
} from 'lucide-react';

interface WorkOrderTimelineProps {
  className?: string;
}

export const WorkOrderTimeline: React.FC<WorkOrderTimelineProps> = ({ className = '' }) => {
  const { workOrder, status, activeStepIndex, advanceWorkflowStage } = useAction();

  const workflowSteps = [
    { key: 'identified', label: 'IDENTIFIED', desc: '312 Citizen reports clustered via multimodal voice & spatial NLP', icon: FileText },
    { key: 'prioritized', label: 'PRIORITIZED', desc: 'Algorithmic calculation yields Priority #1 (Score 94/100)', icon: Flame },
    { key: 'awaiting_review', label: 'REVIEWED', desc: 'BBMP Zonal Engineering Committee completed technical inspection', icon: ShieldCheck },
    { key: 'approved', label: 'APPROVED', desc: '₹1.45 Cr emergency municipal capital grant authorized', icon: CheckCircle2 },
    { key: 'assigned', label: 'ASSIGNED', desc: 'Bengaluru Urban Infra Dynamics Ltd mobilizes 3x hydro-suction rigs', icon: Building2 },
    { key: 'in_progress', label: 'IN PROGRESS', desc: 'Mechanical desilting & automated weir installation active', icon: Clock },
    { key: 'completed', label: 'COMPLETED', desc: '100% culvert clearance verified by robotic crawler inspection', icon: CheckCheck },
    { key: 'verified', label: 'VERIFIED', desc: '86% Citizen community consensus confirms on-ground relief', icon: UserCheck },
  ];

  return (
    <div className={`p-6 rounded-3xl bg-slate-950/90 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-6 ${className}`}>
      
      {/* Work Order Dossier Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
              WORK ORDER DOSSIER
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
              SYNTHETIC WORK ORDER
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
            {workOrder.id}
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Linked Cluster: <strong className="text-cyan-300">{workOrder.clusterId}</strong> • {workOrder.wardName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase border ${
            status === 'verified'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-glow-cyan'
              : status === 'in_progress'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 animate-pulse'
              : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
          }`}>
            STAGE: {status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Quick Spec Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-500 block">Department</span>
          <span className="font-bold text-white text-xs truncate block">{workOrder.department}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-500 block">Sanctioned Budget</span>
          <span className="font-bold text-emerald-400 text-xs flex items-center gap-1">
            <IndianRupee className="w-3 h-3" />
            {workOrder.estimatedBudget}
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-500 block">Assigned Contractor</span>
          <span className="font-bold text-slate-300 text-xs truncate block">{workOrder.assignedContractor}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-500 block">Lead Engineer</span>
          <span className="font-bold text-cyan-300 text-xs truncate block">{workOrder.leadEngineer}</span>
        </div>
      </div>

      {/* Vertical Accountability Timeline */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
          Lifecycle & Governance Timeline:
        </h3>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
          {workflowSteps.map((step, idx) => {
            const isCurrent = step.key === status;
            const isCompleted = idx < activeStepIndex || status === 'verified';
            const Icon = step.icon;

            return (
              <div key={step.key} className="relative group">
                
                {/* Node Icon Circle */}
                <div
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20'
                      : isCurrent
                      ? 'bg-cyan-400 text-slate-950 ring-4 ring-cyan-500/30 animate-pulse'
                      : 'bg-slate-900 text-slate-500 border border-slate-700'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                </div>

                {/* Step Content */}
                <div className={`p-3.5 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-slate-900/90 border-cyan-500/50 shadow-glow-cyan'
                    : isCompleted
                    ? 'bg-slate-900/40 border-slate-800'
                    : 'bg-slate-950/40 border-slate-900 opacity-60'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-cyan-400' : isCompleted ? 'text-emerald-400' : 'text-slate-600'}`} />
                      <span className={`text-xs font-extrabold tracking-tight ${isCurrent ? 'text-white' : isCompleted ? 'text-slate-200' : 'text-slate-500'}`}>
                        {step.label}
                      </span>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isCompleted
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : isCurrent
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold'
                        : 'bg-slate-900 text-slate-600'
                    }`}>
                      {isCompleted ? 'Passed' : isCurrent ? 'Active Stage' : 'Queued'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Stage Progression Action for Testing / Judges */}
      {status !== 'verified' && (
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">Simulate next milestone execution:</span>
          <button
            onClick={advanceWorkflowStage}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-cyan-300 hover:text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <span>ADVANCE WORKFLOW STAGE →</span>
          </button>
        </div>
      )}

    </div>
  );
};
