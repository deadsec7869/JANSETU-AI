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
          <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
            {issue.title}
          </h4>

          {/* Description */}
          {!compact && (
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
              {issue.description}
            </p>
          )}

          {/* Cluster Link Pill */}
          {issue.clusterName && (
            <div className="mt-3 p-2 rounded-lg bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800/40 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 shrink-0" />
              <span className="text-[11px] text-violet-800 dark:text-violet-200 truncate">
                Part of <span className="font-semibold text-violet-900 dark:text-violet-100">{issue.clusterName}</span>
              </span>
            </div>
          )}

          {/* Location & Metadata */}
          <div className="mt-3.5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="truncate">{issue.locationAddress}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatRelativeTime(issue.createdAt)}
              </span>
              <span className="font-mono text-slate-600 dark:text-slate-400">
                {issue.code}
              </span>
            </div>
          </div>
        </div>

        {/* Media preview thumbnail if present */}
        {issue.mediaUrls && issue.mediaUrls.length > 0 && !compact && (
          <div className="px-5 py-2">
            <div className="relative h-28 w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
              <img
                src={issue.mediaUrls[0]}
                alt={issue.title}
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-white/90 dark:bg-slate-950/80 backdrop-blur-sm text-[10px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 flex items-center gap-1 shadow-sm">
                <Sparkles className="w-2.5 h-2.5 text-violet-600 dark:text-violet-400" />
                AI Verified
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 pt-3 border-t border-slate-200/80 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          {/* Upvote Button */}
          <button
            onClick={() => toggleUpvote(issue.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              issue.userHasUpvoted
                ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-300 border-blue-300 dark:border-blue-500/50 shadow-sm'
                : 'bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750'
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${issue.userHasUpvoted ? 'fill-current' : ''}`} />
            <span>{issue.upvotes}</span>
          </button>

          {/* Confirm Button */}
          <button
            onClick={() => confirmIssue(issue.id)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60 hover:text-emerald-600 dark:hover:text-emerald-300 hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all"
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
          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-2.5 py-1"
        >
          <span>Evidence</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </Card>
  );
};
