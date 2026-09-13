import React, { useState } from 'react';
import { useAction } from '../../context/ActionContext';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  CheckCircle2, 
  X, 
  IndianRupee, 
  Clock, 
  ShieldAlert, 
  ArrowRight,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';

interface GovernmentReviewProps {
  onClose?: () => void;
  className?: string;
}

export const GovernmentReview: React.FC<GovernmentReviewProps> = ({
  onClose,
  className = '',
}) => {
  const { workOrder, status, approveIntervention, requestReview } = useAction();
  const [animatingApproval, setAnimatingApproval] = useState<boolean>(false);
  const [approvalStage, setApprovalStage] = useState<'idle' | 'approving' | 'work_order_created'>('idle');
  const [reviewNote, setReviewNote] = useState<string>('');
  const [showReviewInput, setShowReviewInput] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleApprove = () => {
    setAnimatingApproval(true);
    setApprovalStage('approving');

    setTimeout(() => {
      approveIntervention();
      setApprovalStage('work_order_created');
      setTimeout(() => {
        setAnimatingApproval(false);
      }, 1400);
    }, 1200);
  };

  const handleRequestReview = () => {
    requestReview(reviewNote);
    setShowReviewInput(false);
  };

  return (
    <div className={`p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden space-y-6 ${className}`}>
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                MUNICIPAL PRIORITY REVIEW
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                SYNTHETIC DEMO WORKFLOW
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Executive Intervention Authorization
            </h2>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Review Summary Card */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 font-mono">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-cyan-400">{workOrder.clusterId}</span>
            <h3 className="text-sm font-extrabold text-white font-sans mt-0.5">
              {workOrder.title}
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
            Priority Score: {workOrder.priorityScore} / 100
          </span>
        </div>

        {/* Evidence Metric Summary */}
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Verified Citizen Reports</span>
            <span className="font-extrabold text-white text-sm">{workOrder.reasoningChain.citizenReports} Verified</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Service Capacity Deficit</span>
            <span className="font-extrabold text-rose-400 text-sm">{workOrder.reasoningChain.serviceCapacityDeficit}%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Evidence Confidence</span>
            <span className="font-extrabold text-cyan-300 text-sm">{workOrder.evidenceConfidence}%</span>
          </div>
        </div>

        {/* Recommended Action & Financials */}
        <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 space-y-3 font-sans">
          <span className="text-[11px] font-mono font-bold text-cyan-300 uppercase tracking-wider block">
            Recommended Action:
          </span>
          <p className="text-sm font-extrabold text-white">
            {workOrder.recommendedAction}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-cyan-500/20 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
              <IndianRupee className="w-4 h-4" />
              <span>Budget: {workOrder.estimatedBudget}</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Clock className="w-4 h-4" />
              <span>Duration: {workOrder.estimatedDays} Days</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span>Department: {workOrder.department}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Approval Transition Container */}
      {animatingApproval ? (
        <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/50 text-center space-y-4 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-400/60 flex items-center justify-center mx-auto text-indigo-300">
            {approvalStage === 'approving' ? (
              <Sparkles className="w-8 h-8 animate-spin" />
            ) : (
              <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
            )}
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-extrabold text-white">
              {approvalStage === 'approving' ? 'Authorizing Municipal Budget...' : 'Work Order Created!'}
            </h4>
            <p className="text-xs text-slate-300 font-mono">
              {approvalStage === 'approving'
                ? 'Validating algorithmic priority telemetry and routing to Zonal Finance...'
                : `Generated Work Order ID: ${workOrder.id}`}
            </p>
          </div>
        </div>
      ) : status === 'approved' || status === 'assigned' || status === 'in_progress' ? (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <span className="text-xs font-mono font-bold text-emerald-300 uppercase">
                AUTHORIZATION ACTIVE • {workOrder.id}
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                Work order is sanctioned and active in municipal execution pipeline.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/gov/projects')}
            className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-glow-cyan"
          >
            <span>Track Execution</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        /* Action Authorization Buttons */
        <div className="space-y-3">
          {showReviewInput ? (
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
              <span className="text-xs font-mono text-slate-300 font-bold block">
                Administrative Notes / Clarification Request:
              </span>
              <textarea
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Specify required evidence revisions or budget questions..."
                className="w-full h-20 p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowReviewInput(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestReview}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
                >
                  Submit Review Flag
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setShowReviewInput(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-amber-300 hover:text-white text-xs font-semibold transition-all"
              >
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Request Zonal Review</span>
              </button>

              <button
                onClick={handleApprove}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-slate-950 font-extrabold text-xs hover:opacity-95 transition-all shadow-glow-cyan"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>APPROVE MUNICIPAL WORK ORDER ({workOrder.estimatedBudget})</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Policy Brief Generation Link */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span>Need formal documentation for the Standing Committee?</span>
        <button
          onClick={() => navigate('/gov/policy-brief')}
          className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Generate AI Policy Brief</span>
        </button>
      </div>

    </div>
  );
};
