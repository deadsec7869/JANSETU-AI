import { PriorityLevel, IssueStatus } from '../types/civic';

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

export function formatRelativeTime(dateString: string): string {
  try {
    const d = new Date(dateString);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffSec < 60) return 'Just now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
    return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  } catch {
    return dateString;
  }
}

export function getPriorityColor(level: PriorityLevel): {
  bg: string;
  text: string;
  border: string;
  dot: string;
  badge: string;
} {
  switch (level) {
    case 'Critical':
      return {
        bg: 'bg-rose-500/10 dark:bg-rose-500/20',
        text: 'text-rose-600 dark:text-rose-400',
        border: 'border-rose-500/30',
        dot: 'bg-rose-500',
        badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      };
    case 'High':
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-500/20',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-500/30',
        dot: 'bg-amber-500',
        badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      };
    case 'Medium':
      return {
        bg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
        text: 'text-cyan-600 dark:text-cyan-400',
        border: 'border-cyan-500/30',
        dot: 'bg-cyan-500',
        badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
      };
    case 'Low':
    default:
      return {
        bg: 'bg-slate-500/10 dark:bg-slate-500/20',
        text: 'text-slate-600 dark:text-slate-400',
        border: 'border-slate-500/30',
        dot: 'bg-slate-400',
        badge: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
      };
  }
}

export function getStatusBadgeInfo(status: IssueStatus): {
  label: string;
  colorClass: string;
} {
  switch (status) {
    case 'reported':
      return { label: 'Received & Queued', colorClass: 'bg-slate-500/20 text-slate-300 border-slate-600/40' };
    case 'under_review':
      return { label: 'Under Review', colorClass: 'bg-blue-500/20 text-blue-400 border-blue-500/40' };
    case 'clustered':
      return { label: 'Clustered Hotspot', colorClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40' };
    case 'action_scheduled':
      return { label: 'Work Scheduled', colorClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
    case 'in_progress':
      return { label: 'In Progress (Crew Onsite)', colorClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' };
    case 'resolved':
      return { label: 'Verified Resolved', colorClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
  }
}
