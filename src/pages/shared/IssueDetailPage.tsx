import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PriorityBadge, CategoryBadge, StatusBadge } from '../../components/ui/Badge';
import { PriorityScoreIndicator } from '../../components/shared/PriorityScoreIndicator';
import { TimelineView } from '../../components/shared/TimelineView';
import { formatDate } from '../../utils/formatters';
import { 
  ArrowLeft, 
  MapPin, 
  ThumbsUp, 
  Users, 
  Layers, 
  Sparkles, 
  Building2, 
  Clock, 
  Camera, 
  Mic, 
  ShieldCheck, 
  Share2
} from 'lucide-react';

export const IssueDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getIssueById, toggleUpvote, confirmIssue } = useApp();

  const issue = getIssueById(id || '');

  if (!issue) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-white">Civic Issue Not Found</h2>
        <p className="text-xs text-slate-400">The requested report ID could not be located in the civic index.</p>
        <Button variant="primary" size="sm" onClick={() => navigate('/')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Nav Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Share2}
            onClick={() => alert(`Issue link copied: ${window.location.href}`)}
          >
            Share Report
          </Button>
        </div>
      </div>

      {/* Main Issue Header Card */}
      <Card variant="glass" className="p-6 sm:p-8 space-y-6">
        
        {/* Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-brand-400 bg-brand-950 px-2.5 py-1 rounded border border-brand-800">
              {issue.code}
            </span>
            <CategoryBadge category={issue.category} />
            <PriorityBadge level={issue.priorityLevel} />
          </div>

          <StatusBadge status={issue.status} />
        </div>

        {/* Title & Reporter Info */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            {issue.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
              <span className="text-slate-200">{issue.locationAddress}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Reported on {formatDate(issue.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>By {issue.reporter.name} ({issue.reporter.verificationLevel})</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
          <span className="text-[10px] uppercase font-mono text-slate-400 font-bold">
            Citizen Ground Report
          </span>
          <p className="text-sm text-slate-200 leading-relaxed">
            {issue.description}
          </p>
        </div>

        {/* Voice memo transcript if present */}
        {issue.voiceMemoTranscript && (
          <div className="p-4 rounded-xl bg-brand-950/20 border border-brand-500/30 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-brand-500/20 text-brand-400 shrink-0 mt-0.5">
              <Mic className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-brand-300">Voice Memo Transcript (AI Transcribed)</span>
              <p className="text-xs text-slate-300 italic">"{issue.voiceMemoTranscript}"</p>
            </div>
          </div>
        )}

        {/* Media Photo Evidence Gallery */}
        {issue.mediaUrls && issue.mediaUrls.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-brand-400" />
              Geotagged Photo Evidence
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {issue.mediaUrls.map((url, idx) => (
                <div key={idx} className="relative h-48 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                  <img src={url} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-white/10 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-400" />
                    GPS Verified ({issue.coordinates.lat.toFixed(4)}, {issue.coordinates.lng.toFixed(4)})
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Engagement Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleUpvote(issue.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                issue.userHasUpvoted
                  ? 'bg-brand-500/20 text-brand-300 border-brand-500/50 shadow-glow-cyan'
                  : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-750'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${issue.userHasUpvoted ? 'fill-current' : ''}`} />
              <span>{issue.upvotes} Upvotes</span>
            </button>

            <button
              onClick={() => confirmIssue(issue.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800/60 text-slate-300 border border-slate-700 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-950/30 transition-all"
            >
              <Users className="w-4 h-4" />
              <span>{issue.confirmationsCount} Confirmations</span>
            </button>
          </div>

          {issue.clusterName && (
            <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-950/50 px-3 py-1.5 rounded-xl border border-purple-800/50">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Assigned to <strong className="text-white">{issue.clusterName}</strong></span>
            </div>
          )}
        </div>

      </Card>

      {/* Grid: Priority Breakdown & Department Proposed Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Priority Breakdown Indicator */}
        <PriorityScoreIndicator
          priorityScore={issue.priorityScore}
          priorityLevel={issue.priorityLevel}
        />

        {/* Responsible Department & SLA Action */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Building2 className="w-4 h-4 text-brand-400" />
              <span>Assigned Municipal Division</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-brand-950 text-brand-300 border border-brand-800">
              SLA: {issue.responsibleDepartment.slaHours}h
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">{issue.responsibleDepartment.name}</h4>
            <p className="text-xs text-slate-400">Designated Officer: {issue.responsibleDepartment.officerInCharge}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Recommended Action Plan
              </span>
              <span className="font-mono font-bold text-white">{issue.proposedAction.estimatedCost}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {issue.proposedAction.summary}
            </p>
          </div>
        </div>

      </div>

      {/* Timeline Section */}
      <Card variant="glass" className="p-6 sm:p-8 space-y-4">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-400" />
            <span>Civic Milestone Timeline</span>
          </CardTitle>
          <CardDescription>
            Audit trail from initial citizen ingestion to algorithmic prioritization and work orders.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 pt-2">
          <TimelineView timeline={issue.timeline} />
        </CardContent>
      </Card>

    </div>
  );
};
