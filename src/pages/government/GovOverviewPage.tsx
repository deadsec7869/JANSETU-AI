import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ClusterCard } from '../../components/shared/ClusterCard';
import { 
  Building2, 
  Layers, 
  Flame, 
  Clock, 
  Coins, 
  ArrowRight, 
  Map, 
  FileSpreadsheet, 
  BarChart2,
  PieChart as PieIcon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const GovOverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { clusters, issues, departments, impactSummary } = useApp();

  const criticalClusters = clusters.filter(c => c.severityIndex >= 85);

  // Chart data: Issues per Department
  const deptData = departments.map(d => ({
    name: d.code,
    fullName: d.name,
    active: d.activeIssues,
    rate: d.resolutionRate,
  }));

  // Chart data: Category distribution
  const categoryCountMap: Record<string, number> = {};
  issues.forEach(i => {
    categoryCountMap[i.category] = (categoryCountMap[i.category] || 0) + 1;
  });

  const categoryPieData = Object.keys(categoryCountMap).map((cat, idx) => ({
    name: cat,
    value: categoryCountMap[cat],
    color: ['#06b6d4', '#f59e0b', '#10b981', '#6366f1', '#f43f5e', '#a855f7'][idx % 6],
  }));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Executive Command Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-2xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>BBMP Municipal Executive Cockpit • Command Central</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Civic Intelligence & Priority Decision Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Autonomous multi-vector triage converting fragmented citizen grievances into consolidated, budget-optimized municipal action orders.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="glass"
            size="md"
            icon={Map}
            onClick={() => navigate('/gov/priority-map')}
            className="border-indigo-500/40 text-indigo-200"
          >
            Open Priority Map
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={FileSpreadsheet}
            onClick={() => navigate('/gov/policy-brief')}
          >
            Generate Policy Brief
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card variant="glass" className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Clusters</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{clusters.length}</div>
            <p className="text-[11px] text-purple-300 mt-0.5">Merging 80+ citizen reports</p>
          </div>
        </Card>

        <Card variant="glass" className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Critical Hotspots</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono">{criticalClusters.length}</div>
            <p className="text-[11px] text-rose-300 mt-0.5">SLA breach risk &lt; 24 hrs</p>
          </div>
        </Card>

        <Card variant="glass" className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Funds Optimized</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{impactSummary.fundsOptimized}</div>
            <p className="text-[11px] text-emerald-300 mt-0.5">Via batch procurement & triage</p>
          </div>
        </Card>

        <Card variant="glass" className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Turnaround Speed</span>
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-brand-300 font-mono">+{impactSummary.avgTurnaroundReductionPercent}%</div>
            <p className="text-[11px] text-brand-400 mt-0.5">Faster resolution than legacy</p>
          </div>
        </Card>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Department Active Issues Bar Chart */}
        <Card variant="glass" className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-brand-400" />
                <span>Departmental Workload & Resolution Efficiency</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Live Telemetry</span>
            </CardTitle>
            <CardDescription>
              Active clustered workloads vs historical resolution rate by municipal wing.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="active" name="Active Issues" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                <Bar dataKey="rate" name="Resolution Rate (%)" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown Pie Chart */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-purple-400" />
              <span>Civic Sector Breakdown</span>
            </CardTitle>
            <CardDescription>
              Distribution of incoming reports by infrastructure sector.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="70%">
              <PieChart>
                <Pie
                  data={categoryPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] pt-2">
              {categoryPieData.slice(0, 4).map((entry) => (
                <div key={entry.name} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-300">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Actionable Clusters Requiring Municipal Order */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-400" />
              <span>Priority Action Queue: Consolidated Clusters</span>
            </h2>
            <p className="text-xs text-slate-400">
              Aggregated hotspots ranked by algorithmic risk, population density, and recurring public demand.
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/gov/clusters')}
            className="text-xs text-indigo-300 hover:text-white"
          >
            <span>View All Clusters</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {clusters.map((cluster) => (
            <ClusterCard key={cluster.id} cluster={cluster} />
          ))}
        </div>
      </div>

    </div>
  );
};
