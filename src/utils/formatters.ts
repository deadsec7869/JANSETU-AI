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
        bg: 'bg-rose-50 dark:bg-rose-500/15',
        text: 'text-rose-700 dark:text-rose-400',
        border: 'border-rose-200 dark:border-rose-500/30',
        dot: 'bg-rose-500',
        badge: 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30',
      };
    case 'High':
      return {
        bg: 'bg-amber-50 dark:bg-amber-500/15',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-500/30',
        dot: 'bg-amber-500',
        badge: 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30',
      };
    case 'Medium':
      return {
        bg: 'bg-blue-50 dark:bg-blue-500/15',
        text: 'text-blue-700 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-500/30',
        dot: 'bg-blue-500',
        badge: 'bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30',
      };
    case 'Low':
    default:
      return {
        bg: 'bg-slate-100 dark:bg-slate-500/15',
        text: 'text-slate-700 dark:text-slate-400',
        border: 'border-slate-200 dark:border-slate-500/30',
        dot: 'bg-slate-400',
        badge: 'bg-slate-100 dark:bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-500/30',
      };
  }
}

export function getStatusBadgeInfo(status: IssueStatus): {
  label: string;
  colorClass: string;
} {
  switch (status) {
    case 'reported':
      return { label: 'Received & Queued', colorClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
    case 'under_review':
      return { label: 'Under Review', colorClass: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' };
    case 'clustered':
      return { label: 'Clustered Hotspot', colorClass: 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800' };
    case 'action_scheduled':
      return { label: 'Work Scheduled', colorClass: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' };
    case 'in_progress':
      return { label: 'In Progress (Crew Onsite)', colorClass: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' };
    case 'resolved':
      return { label: 'Verified Resolved', colorClass: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' };
  }
}
