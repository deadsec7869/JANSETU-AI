import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CivicIssue } from '../../types/civic';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/Card';
import { PriorityBadge, CategoryBadge, StatusBadge } from '../ui/Badge';
import { formatRelativeTime } from '../../utils/formatters';
import { 
  MapPin, 
  ThumbsUp, 
  Users, 
  Layers, 
  ArrowRight, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { Button } from '../ui/Button';

interface IssueCardProps {
  issue: CivicIssue;
  compact?: boolean;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, compact = false }) => {
  const navigate = useNavigate();
  const { toggleUpvote, confirmIssue } = useApp();

  return (
    <Card variant="interactive" className="overflow-hidden flex flex-col justify-between" onClick={() => navigate(`/issue/${issue.id}`)}>
      <div>
        {/* Card Header & Badges */}
        <div className="p-5 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge category={issue.category} />
              <PriorityBadge level={issue.priorityLevel} />
            </div>
            <StatusBadge status={issue.status} />
          </div>

          {/* Title */}
          <h4 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-2 leading-snug">
            {issue.title}
          </h4>

          {/* Description */}
          {!compact && (
            <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
              {issue.description}
            </p>
          )}

          {/* Cluster Link Pill */}
          {issue.clusterName && (
            <div className="mt-3 p-2 rounded-lg bg-purple-950/40 border border-purple-800/40 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="text-[11px] text-purple-200 truncate">
                Part of <span className="font-semibold text-purple-100">{issue.clusterName}</span>
              </span>
            </div>
          )}

          {/* Location & Metadata */}
          <div className="mt-3.5 space-y-1.5 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <span className="truncate">{issue.locationAddress}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatRelativeTime(issue.createdAt)}
              </span>
              <span className="font-mono text-slate-400">
                {issue.code}
              </span>
            </div>
          </div>
        </div>

        {/* Media preview thumbnail if present */}
        {issue.mediaUrls && issue.mediaUrls.length > 0 && !compact && (
          <div className="px-5 py-2">
            <div className="relative h-28 w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src={issue.mediaUrls[0]}
                alt={issue.title}
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm text-[10px] font-mono text-slate-300 border border-white/10 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-brand-400" />
                AI Verified
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 pt-3 border-t border-slate-800/60 bg-slate-900/40 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          {/* Upvote Button */}
          <button
            onClick={() => toggleUpvote(issue.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              issue.userHasUpvoted
                ? 'bg-brand-500/20 text-brand-300 border-brand-500/50 shadow-glow-cyan'
                : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200 hover:bg-slate-750'
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${issue.userHasUpvoted ? 'fill-current' : ''}`} />
            <span>{issue.upvotes}</span>
          </button>

          {/* Confirm Button */}
          <button
            onClick={() => confirmIssue(issue.id)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800/60 text-slate-400 border border-slate-700/60 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-950/30 transition-all"
            title="Confirm you are also affected by this issue"
          >
            <Users className="w-3.5 h-3.5" />
            <span>{issue.confirmationsCount}</span>
          </button>
        </div>

        {/* View Details Link */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/issue/${issue.id}`)}
          className="text-xs text-brand-400 hover:text-brand-300 px-2.5 py-1"
        >
          <span>Evidence</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </Card>
  );
};
