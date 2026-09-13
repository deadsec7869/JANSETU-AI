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
      {level === 'Critical' && <Flame className="w-3 h-3 text-rose-400" />}
      {level === 'High' && <AlertTriangle className="w-3 h-3 text-amber-400" />}
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
      {status === 'resolved' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
      {status === 'in_progress' && <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />}
      {status === 'clustered' && <Layers className="w-3 h-3 text-purple-400" />}
      {status === 'action_scheduled' && <Clock className="w-3 h-3 text-amber-400" />}
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
        return { icon: Droplets, color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60' };
      case 'Roads & Transport':
        return { icon: Navigation, color: 'text-amber-400 bg-amber-950/60 border-amber-800/60' };
      case 'Waste Management':
        return { icon: Trash2, color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60' };
      case 'Electricity & Lighting':
        return { icon: Zap, color: 'text-yellow-400 bg-yellow-950/60 border-yellow-800/60' };
      case 'Public Safety':
        return { icon: ShieldAlert, color: 'text-rose-400 bg-rose-950/60 border-rose-800/60' };
      case 'Parks & Environment':
        return { icon: Trees, color: 'text-green-400 bg-green-950/60 border-green-800/60' };
      case 'Public Health':
        return { icon: HeartPulse, color: 'text-purple-400 bg-purple-950/60 border-purple-800/60' };
      default:
        return { icon: Activity, color: 'text-slate-400 bg-slate-900 border-slate-700' };
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
    if (s >= 85) return 'text-rose-400 border-rose-500/40 bg-rose-500/10 shadow-glow-rose';
    if (s >= 70) return 'text-amber-400 border-amber-500/40 bg-amber-500/10 shadow-glow-amber';
    return 'text-cyan-400 border-brand-500/40 bg-brand-500/10 shadow-glow-cyan';
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono ${getScoreColor(score)}`}>
      <span className="text-xs uppercase tracking-wider text-slate-400 font-sans">{label}</span>
      <span className="text-sm font-bold">{score}<span className="text-xs text-slate-500 font-normal">/100</span></span>
    </div>
  );
};
