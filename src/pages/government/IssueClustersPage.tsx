import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PriorityBadge, CategoryBadge } from '../../components/ui/Badge';
import { 
  Layers, 
  MapPin, 
  Users, 
  Building2, 
  Wrench, 
  ArrowRight,
  FileCheck2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const IssueClustersPage: React.FC = () => {
  const navigate = useNavigate();
  const { clusters, issues } = useApp();
  const [selectedClusterId, setSelectedClusterId] = useState<string>(clusters[0]?.id || '');

  const activeCluster = clusters.find(c => c.id === selectedClusterId) || clusters[0];
  const linkedIssues = issues.filter(i => activeCluster?.linkedIssueIds.includes(i.id) || i.clusterId === activeCluster?.id);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>AI Aggregation Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Consolidated Issue Clusters
          </h1>
          <p className="text-sm text-slate-400">
            Automated clustering merges individual citizen complaints into single capital works orders.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cluster List Sidebar */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Active Municipal Clusters ({clusters.length})
          </div>

          {clusters.map((cluster) => {
            const isSelected = cluster.id === selectedClusterId;
            return (
              <div
                key={cluster.id}
                onClick={() => setSelectedClusterId(cluster.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500/60 shadow-lg text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-brand-400">{cluster.code}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    cluster.severityIndex >= 85 ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {cluster.severityIndex}/100 Severity
                  </span>
                </div>
                <h4 className="text-sm font-bold leading-snug line-clamp-2">{cluster.name}</h4>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/60">
                  <span>{cluster.totalReportsCount} Linked Reports</span>
                  <span className="text-emerald-400 font-mono font-semibold">{cluster.estimatedBudget}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Cluster Cockpit */}
        <div className="lg:col-span-2 space-y-6">
          {activeCluster && (
            <>
              <Card variant="glass" className="p-6 space-y-5">
                
                {/* Cluster Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brand-400 bg-brand-950 px-2.5 py-0.5 rounded border border-brand-800">
                        {activeCluster.code}
                      </span>
                      <CategoryBadge category={activeCluster.category} />
                    </div>
                    <h2 className="text-xl font-bold text-white mt-1">{activeCluster.name}</h2>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-brand-400" />
                      <span>{activeCluster.centerLocation} ({activeCluster.ward})</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono">
                    <div className="text-[10px] text-slate-400 uppercase">Severity Multiplier</div>
                    <div className="text-xl font-black text-rose-400">{activeCluster.severityIndex}</div>
                  </div>
                </div>

                {/* AI Root Cause Hypothesis */}
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>AI Root Cause & Structural Hypothesis</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeCluster.rootCauseHypothesis}
                  </p>
                </div>

                {/* Recommended Municipal Intervention */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                      <Wrench className="w-4 h-4 text-emerald-400" />
                      <span>Recommended Municipal Intervention</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      Est. Budget: {activeCluster.estimatedBudget}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">
                    {activeCluster.recommendedIntervention}
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Nodal Agency: <strong className="text-slate-200">{activeCluster.primaryDepartment}</strong></span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    icon={FileCheck2}
                    onClick={() => navigate('/gov/projects')}
                    className="shadow-glow-cyan"
                  >
                    Sanction Work Order & Project
                  </Button>
                  <Button
                    variant="glass"
                    size="md"
                    icon={ExternalLink}
                    onClick={() => navigate('/gov/evidence')}
                  >
                    View In Evidence Graph
                  </Button>
                </div>

              </Card>

              {/* Linked Citizen Reports Feed */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-400" />
                    <span>Aggregated Citizen Tickets ({linkedIssues.length} Linked)</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Auto-clustered via spatial proximity</span>
                </div>

                <div className="space-y-3">
                  {linkedIssues.map((issue) => (
                    <div
                      key={issue.id}
                      onClick={() => navigate(`/issue/${issue.id}`)}
                      className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-brand-500/40 transition-colors cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-slate-400">{issue.code}</span>
                          <PriorityBadge level={issue.priorityLevel} />
                        </div>
                        <h4 className="text-xs font-bold text-white">{issue.title}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{issue.locationAddress}</p>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-brand-400 hover:text-brand-300 p-0"
                      >
                        Inspect
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

      </div>

    </div>
  );
};
