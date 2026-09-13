import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StructuredIssueResult } from '../../utils/intelligenceSimulator';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { PriorityBadge, CategoryBadge, ScoreBadge } from '../ui/Badge';
import { 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Building2, 
  MapPin, 
  ArrowRight, 
  FileText
} from 'lucide-react';

interface StructuredPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: StructuredIssueResult | null;
}

export const StructuredPreviewModal: React.FC<StructuredPreviewModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  const navigate = useNavigate();

  if (!result) return null;
  const { issue, clusterMatch } = result;

  const handleGoToReport = () => {
    onClose();
    navigate(`/issue/${issue.id}`);
  };

  const handleGoToMyReports = () => {
    onClose();
    navigate('/my-reports');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="3xl"
      title={
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase font-mono text-emerald-400 font-bold">
              Structured Issue Synthesized
            </div>
            <h3 className="text-lg font-bold text-white">AI Civic Intelligence Preview</h3>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        
        {/* Top Summary Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-brand-950/70 via-slate-900 to-emerald-950/50 border border-brand-500/30 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-mono text-slate-400">Tracking Code</span>
            <div className="text-base font-black text-white font-mono tracking-wider">{issue.code}</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={issue.category} />
            <PriorityBadge level={issue.priorityLevel} />
            <ScoreBadge score={issue.priorityScore.overallScore} />
          </div>
        </div>

        {/* Issue Title & Description */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <h4 className="text-base font-bold text-white">{issue.title}</h4>
          <p className="text-xs text-slate-300 leading-relaxed">{issue.description}</p>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
            <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span>{issue.locationAddress} ({issue.ward})</span>
          </div>
        </div>

        {/* AI Ingestion Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          
          {/* Cluster Match Box */}
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Cluster Correlation</span>
              </div>
              <span className="text-[10px] font-mono bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded">
                94% Match
              </span>
            </div>
            {clusterMatch ? (
              <div>
                <p className="text-xs font-medium text-white line-clamp-1">{clusterMatch.clusterName}</p>
                <p className="text-[11px] text-purple-300/80 mt-1">
                  Merged with {clusterMatch.totalLinkedCount} existing citizen reports into unified ward priority.
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Created new localized micro-cluster.</p>
            )}
          </div>

          {/* Department SLA Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                <Building2 className="w-4 h-4 text-brand-400" />
                <span>Assigned Department</span>
              </div>
              <span className="text-[10px] font-mono bg-brand-950 text-brand-300 px-2 py-0.5 rounded border border-brand-800/60">
                SLA: {issue.responsibleDepartment.slaHours}h
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">{issue.responsibleDepartment.name}</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Designated Officer: {issue.responsibleDepartment.officerInCharge}
              </p>
            </div>
          </div>

        </div>

        {/* Action Recommendation */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Recommended Government Action Plan</span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {issue.proposedAction.estimatedCost}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {issue.proposedAction.summary}
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleGoToMyReports}
            icon={FileText}
          >
            Go to My Reports
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleGoToReport}
              icon={ArrowRight}
              iconPosition="right"
            >
              Explore Evidence Graph
            </Button>
          </div>
        </div>

      </div>
    </Modal>
  );
};
