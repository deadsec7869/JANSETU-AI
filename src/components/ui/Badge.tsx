import React from 'react';
import { PriorityLevel, IssueStatus, CivicCategory } from '../../types/civic';
import { getPriorityColor, getStatusBadgeInfo } from '../../utils/formatters';
import { 
  AlertTriangle, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Activity, 
  Droplets, 
  Navigation, 
  Trash2, 
  Zap, 
  ShieldAlert, 
  Trees, 
  HeartPulse 
} from 'lucide-react';

export const PriorityBadge: React.FC<{ level: PriorityLevel; showDot?: boolean; className?: string }> = ({
  level,
  showDot = true,
  className = '',
}) => {
  const colors = getPriorityColor(level);
  
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${colors.badge} ${className}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} ${level === 'Critical' ? 'animate-ping' : ''}`} />
      )}
      {level === 'Critical' && <Flame className="w-3 h-3 text-red-500" />}
      {level === 'High' && <AlertTriangle className="w-3 h-3 text-amber-500" />}
      {level} Priority
    </span>
  );
};

export const StatusBadge: React.FC<{ status: IssueStatus; className?: string }> = ({
  status,
  className = '',
}) => {
  const info = getStatusBadgeInfo(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${info.colorClass} ${className}`}
    >
      {status === 'resolved' && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
      {status === 'in_progress' && <Activity className="w-3 h-3 text-blue-500 animate-pulse" />}
      {status === 'clustered' && <Layers className="w-3 h-3 text-violet-500" />}
      {status === 'action_scheduled' && <Clock className="w-3 h-3 text-amber-500" />}
      {info.label}
    </span>
  );
};

export const CategoryBadge: React.FC<{ category: CivicCategory; className?: string }> = ({
  category,
  className = '',
}) => {
  const getCategoryConfig = (cat: CivicCategory) => {
    switch (cat) {
      case 'Water & Drainage':
        return { icon: Droplets, color: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800' };
      case 'Roads & Transport':
        return { icon: Navigation, color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800' };
      case 'Waste Management':
        return { icon: Trash2, color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800' };
      case 'Electricity & Lighting':
        return { icon: Zap, color: 'text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/60 border-violet-200 dark:border-violet-800' };
      case 'Public Safety':
        return { icon: ShieldAlert, color: 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-800' };
      case 'Parks & Environment':
        return { icon: Trees, color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800' };
      case 'Public Health':
        return { icon: HeartPulse, color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800' };
      default:
        return { icon: Activity, color: 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700' };
    }
  };

  const config = getCategoryConfig(category);
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-medium border ${config.color} ${className}`}
    >
      <Icon className="w-3 h-3" />
      {category}
    </span>
  );
};

export const ScoreBadge: React.FC<{ score: number; label?: string }> = ({ score, label = 'AI Priority Score' }) => {
  const getScoreColor = (s: number) => {
    if (s >= 90) return 'text-red-700 dark:text-red-300 border-red-500/30 bg-red-50 dark:bg-red-950/40';
    if (s >= 75) return 'text-amber-700 dark:text-amber-300 border-amber-500/30 bg-amber-50 dark:bg-amber-950/40';
    return 'text-blue-700 dark:text-blue-300 border-blue-500/30 bg-blue-50 dark:bg-blue-950/40';
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono ${getScoreColor(score)}`}>
      <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-sans">{label}</span>
      <span className="text-sm font-bold">{score}<span className="text-xs text-slate-400 font-normal">/100</span></span>
    </div>
  );
};

