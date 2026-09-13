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
  ExternalLink,
  PlusCircle,
  FolderOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const IssueClustersPage: React.FC = () => {
  const navigate = useNavigate();
  const { clusters, issues } = useApp();
  const [selectedClusterId, setSelectedClusterId] = useState<string>(clusters[0]?.id || '');

  const activeCluster = clusters.find(c => c.id === selectedClusterId) || clusters[0];
  const linkedIssues = issues.filter(i => activeCluster?.linkedIssueIds.includes(i.id) || i.clusterId === activeCluster?.id);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 px-4 sm:px-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Spatial Aggregation Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Consolidated Issue Clusters
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Automated spatial grouping merges individual citizen complaints into single capital works orders.
          </p>
        </div>

        <Button
          variant="primary"
          icon={PlusCircle}
          onClick={() => navigate('/report')}
          className="shadow-sm"
        >
          Submit New Signal
        </Button>
      </div>

      {clusters.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Cluster List Sidebar */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 font-mono">
              Active Municipal Clusters ({clusters.length})
            </div>

            {clusters.map((cluster) => {
              const isSelected = cluster.id === (activeCluster?.id || selectedClusterId);
              return (
                <div
                  key={cluster.id}
                  onClick={() => setSelectedClusterId(cluster.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-violet-50 dark:bg-violet-950/40 border-violet-500/60 shadow-md text-slate-900 dark:text-white'
                      : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-violet-600 dark:text-violet-400">{cluster.code}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      cluster.severityIndex >= 85 ? 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800' : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                    }`}>
                      {cluster.severityIndex}/100 Severity
                    </span>
                  </div>
                  <h4 className="text-sm font-bold leading-snug line-clamp-2 text-slate-900 dark:text-white">{cluster.name}</h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span>{cluster.totalReportsCount} Linked Reports</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono font-semibold">{cluster.ward.split(' - ')[1] || cluster.ward}</span>
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
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950 px-2.5 py-0.5 rounded border border-violet-200 dark:border-violet-800">
                          {activeCluster.code}
                        </span>
                        <CategoryBadge category={activeCluster.category} />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{activeCluster.name}</h2>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>{activeCluster.centerLocation} ({activeCluster.ward})</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center font-mono">
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Severity Multiplier</div>
                      <div className="text-xl font-black text-rose-600 dark:text-rose-400">{activeCluster.severityIndex}</div>
                    </div>
                  </div>

                  {/* Root Cause Hypothesis */}
                  <div className="p-4 rounded-xl bg-violet-50/60 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800/40 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-violet-700 dark:text-violet-300">
                      <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                      <span>Cluster Aggregation Analysis</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activeCluster.rootCauseHypothesis}
                    </p>
                  </div>

                  {/* Recommended Municipal Intervention */}
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        <Wrench className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Recommended Municipal Intervention</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        {activeCluster.estimatedBudget}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                      {activeCluster.recommendedIntervention}
                    </p>
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Nodal Agency: <strong className="text-slate-800 dark:text-slate-200">{activeCluster.primaryDepartment}</strong></span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      variant="primary"
                      size="md"
                      icon={FileCheck2}
                      onClick={() => navigate('/gov/projects')}
                    >
                      Sanction Work Order
                    </Button>
                    <Button
                      variant="glass"
                      size="md"
                      icon={ExternalLink}
                      onClick={() => navigate('/gov/evidence')}
                    >
                      View in Evidence Graph
                    </Button>
                  </div>

                </Card>

                {/* Linked Citizen Reports Feed */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Linked Citizen Tickets ({linkedIssues.length})</span>
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">Aggregated via spatial proximity</span>
                  </div>

                  <div className="space-y-3">
                    {linkedIssues.map((issue) => (
                      <div
                        key={issue.id}
                        onClick={() => navigate(`/issue/${issue.id}`)}
                        className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-colors cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] text-slate-400">{issue.code}</span>
                            <PriorityBadge level={issue.priorityLevel} />
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{issue.title}</h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{issue.locationAddress}</p>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-blue-600 dark:text-blue-400 p-0"
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
      ) : (
        <Card variant="glass" className="text-center py-16 px-4">
          <div className="space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 flex items-center justify-center mx-auto text-violet-600 dark:text-violet-400">
              <FolderOpen className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                NO ACTIVE CLUSTERS YET
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                When citizen reports are filed in close proximity, DBSCAN spatial aggregation groups them into unified municipal clusters.
              </p>
            </div>
            <div className="pt-2">
              <Button variant="primary" size="md" icon={PlusCircle} onClick={() => navigate('/report')}>
                Submit a Report
              </Button>
            </div>
          </div>
        </Card>
      )}

    </div>
  );
};
