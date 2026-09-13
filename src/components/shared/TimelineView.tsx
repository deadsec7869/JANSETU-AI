import React from 'react';
import { IssueTimelineEvent } from '../../types/civic';
import { 
  FileEdit, 
  Sparkles, 
  Layers, 
  Flame, 
  Wrench, 
  CheckCircle2, 
  User, 
  Bot, 
  Building2 
} from 'lucide-react';

interface TimelineViewProps {
  timeline: IssueTimelineEvent[];
}

export const TimelineView: React.FC<TimelineViewProps> = ({ timeline }) => {
  const getStageIcon = (stage: IssueTimelineEvent['stage']) => {
    switch (stage) {
      case 'Reported':
        return { icon: FileEdit, color: 'text-brand-400 bg-brand-950 border-brand-500/40' };
      case 'AI Triaged':
        return { icon: Sparkles, color: 'text-cyan-400 bg-cyan-950 border-cyan-500/40' };
      case 'Clustered':
        return { icon: Layers, color: 'text-purple-400 bg-purple-950 border-purple-500/40' };
      case 'Prioritized':
        return { icon: Flame, color: 'text-rose-400 bg-rose-950 border-rose-500/40' };
      case 'Action Plan':
      case 'Work In Progress':
        return { icon: Wrench, color: 'text-amber-400 bg-amber-950 border-amber-500/40' };
      case 'Resolved':
        return { icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-950 border-emerald-500/40' };
    }
  };

  const getActorBadge = (role: IssueTimelineEvent['actorRole']) => {
    switch (role) {
      case 'AI Engine':
        return <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-500/30"><Bot className="w-2.5 h-2.5" /> AI Engine</span>;
      case 'Citizen':
        return <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"><User className="w-2.5 h-2.5" /> Citizen</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30"><Building2 className="w-2.5 h-2.5" /> Municipal</span>;
    }
  };

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
      {timeline.map((event) => {
        const config = getStageIcon(event.stage);
        const Icon = config.icon;

        return (
          <div key={event.id} className="relative group">
            {/* Stage Icon Node */}
            <div className={`absolute -left-6 top-0 flex items-center justify-center w-6 h-6 rounded-full border shadow-sm ${config.color}`}>
              <Icon className="w-3 h-3" />
            </div>

            {/* Event Card */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white tracking-tight">{event.title}</span>
                  {getActorBadge(event.actorRole)}
                </div>
                <span className="text-[11px] font-mono text-slate-400">{event.timestamp}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                {event.description}
              </p>
              <div className="mt-2 text-[11px] text-slate-500 font-medium">
                Actor: <span className="text-slate-400">{event.actor}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
