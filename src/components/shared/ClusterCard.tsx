import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IssueCluster } from '../../types/civic';
import { Card, CardContent } from '../ui/Card';
import { CategoryBadge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { 
  Layers, 
  Users, 
  Building2, 
  ArrowUpRight, 
  AlertOctagon, 
  Coins, 
  Flame,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '../ui/Button';

interface ClusterCardProps {
  cluster: IssueCluster;
}

export const ClusterCard: React.FC<ClusterCardProps> = ({ cluster }) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: IssueCluster['status']) => {
    switch (status) {
      case 'Active Hotspot':
        return { label: 'Active Hotspot', class: 'bg-rose-500/20 text-rose-300 border-rose-500/40', icon: Flame };
      case 'Work Scheduled':
        return { label: 'Work Scheduled', class: 'bg-amber-500/20 text-amber-300 border-amber-500/40', icon: Clock };
      case 'Mitigation Ongoing':
        return { label: 'Mitigation Ongoing', class: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40', icon: AlertOctagon };
      case 'Resolved':
        return { label: 'Resolved Cluster', class: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', icon: CheckCircle2 };
    }
  };

  const statusConfig = getStatusBadge(cluster.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card variant="interactive" className="p-0 overflow-hidden" onClick={() => navigate(`/gov/clusters`)}>
      <CardContent className="p-6">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-brand-400 bg-brand-950/60 px-2 py-0.5 rounded border border-brand-800/60">
              {cluster.code}
            </span>
            <CategoryBadge category={cluster.category} />
          </div>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusConfig.class}`}>
            <StatusIcon className="w-3 h-3" />
            {statusConfig.label}
          </span>
        </div>

        {/* Cluster Title */}
        <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors leading-snug">
          {cluster.name}
        </h3>

        {/* Root Cause AI Hypothesis */}
        <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-brand-400 font-bold tracking-wider">
            AI Root Cause Analysis
          </span>
          <p className="text-slate-300 leading-relaxed line-clamp-2">
            {cluster.rootCauseHypothesis}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center">
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Reports</div>
            <div className="text-sm font-bold text-white mt-0.5 flex items-center justify-center gap-1">
              <Layers className="w-3 h-3 text-purple-400" />
              {cluster.totalReportsCount}
            </div>
          </div>

          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Affected Pop</div>
            <div className="text-sm font-bold text-white mt-0.5 flex items-center justify-center gap-1">
              <Users className="w-3 h-3 text-cyan-400" />
              {(cluster.affectedPopulationEstimate / 1000).toFixed(0)}k+
            </div>
          </div>

          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Est Budget</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center justify-center gap-1 font-mono">
              <Coins className="w-3 h-3" />
              {cluster.estimatedBudget.replace('₹ ', '')}
            </div>
          </div>
        </div>

        {/* Severity Progress */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Cluster Severity Score</span>
            <span className={`font-mono font-bold ${cluster.severityIndex >= 85 ? 'text-rose-400' : 'text-amber-400'}`}>
              {cluster.severityIndex}/100
            </span>
          </div>
          <Progress 
            value={cluster.severityIndex} 
            color={cluster.severityIndex >= 85 ? 'rose' : 'amber'} 
            size="sm" 
          />
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 truncate max-w-[70%]">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{cluster.primaryDepartment}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-brand-400 hover:text-brand-300 p-0 hover:bg-transparent"
          >
            <span>Action Plan</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
