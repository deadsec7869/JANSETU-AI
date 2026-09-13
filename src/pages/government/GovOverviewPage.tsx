import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  GovernmentReview,
} from '../../features/action';
import { 
  AITransparencyModal 
} from '../../features/ai';
import { 
  Building2, 
  Map, 
  FileSpreadsheet, 
  BarChart2,
  PieChart as PieIcon,
  ShieldCheck,
  PlusCircle,
  FolderOpen
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
  const { issues, clusters, departments, isTestMode } = useApp();
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [showTransparencyModal, setShowTransparencyModal] = useState<boolean>(false);

  // Department workloads
  const deptData = departments.map(d => ({
    name: d.code,
    fullName: d.name,
    active: d.activeIssues,
    rate: d.resolutionRate,
  }));

  // Category distribution
  const categoryCountMap: Record<string, number> = {};
  issues.forEach(i => {
    categoryCountMap[i.category] = (categoryCountMap[i.category] || 0) + 1;
  });

  const categoryPieData = Object.keys(categoryCountMap).map((cat, idx) => ({
    name: cat,
    value: categoryCountMap[cat],
    color: ['#2563eb', '#f59e0b', '#10b981', '#7c3aed', '#ef4444', '#a855f7'][idx % 6],
  }));

  const criticalIssuesCount = issues.filter(i => i.priorityLevel === 'Critical').length;
  const inProgressCount = issues.filter(i => i.status === 'in_progress' || i.status === 'action_scheduled').length;
  const resolvedCount = issues.filter(i => i.status === 'resolved').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 px-4 sm:px-6">
      
      {/* Executive Command Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 shadow-xl backdrop-blur-xl relative overflow-hidden">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-mono text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>GOVERNMENT DECISION SUPPORT WORKSPACE</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono ${
              isTestMode 
                ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}>
              {isTestMode ? 'TEST DATASET' : 'VERIFIED DATA ONLY'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Civic Intelligence Decision Command
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Multi-factor triage converting verified citizen reports into consolidated, prioritized municipal work recommendations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="glass"
            size="md"
            icon={ShieldCheck}
            onClick={() => setShowTransparencyModal(true)}
            className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            Governance
          </Button>

          <Button
            variant="glass"
            size="md"
            icon={Map}
            onClick={() => navigate('/gov/priority-map')}
            className="border-blue-200 dark:border-blue-500/40 text-blue-700 dark:text-blue-300"
          >
            Priority Map
          </Button>
          
          <Button
            variant="primary"
            size="md"
            icon={FileSpreadsheet}
            onClick={() => navigate('/gov/policy-brief')}
            className="shadow-sm"
          >
            Policy Brief
          </Button>
        </div>
      </div>

      {/* AI Transparency Modal */}
      {showTransparencyModal && (
        <AITransparencyModal onClose={() => setShowTransparencyModal(false)} />
      )}

      {/* Municipal Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-3xl w-full">
            <GovernmentReview onClose={() => setShowReviewModal(false)} />
          </div>
        </div>
      )}

      {/* Real Civic Intelligence KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 font-mono">
        
        <Card variant="glass" className="p-4 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Total Signals</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{issues.length}</div>
          <span className="text-[10px] text-blue-600 dark:text-blue-400">Logged Reports</span>
        </Card>

        <Card variant="glass" className="p-4 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400">Critical Priority</span>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400">{criticalIssuesCount}</div>
          <span className="text-[10px] text-rose-500 dark:text-rose-300">Urgent Intervention</span>
        </Card>

        <Card variant="glass" className="p-4 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-violet-600 dark:text-violet-400">Hotspot Clusters</span>
          <div className="text-2xl font-black text-violet-700 dark:text-violet-300">{clusters.length}</div>
          <span className="text-[10px] text-violet-500 dark:text-violet-400">Aggregated Signals</span>
        </Card>

        <Card variant="glass" className="p-4 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">Work Scheduled</span>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-300">{inProgressCount}</div>
          <span className="text-[10px] text-blue-500 dark:text-blue-400">In Pipeline</span>
        </Card>

        <Card variant="glass" className="p-4 space-y-1.5 col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Resolved Work</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-300">{resolvedCount}</div>
          <span className="text-[10px] text-emerald-500 dark:text-emerald-400">Verified Ground Relief</span>
        </Card>

      </div>

      {/* Flagship Priority Queue Table */}
      <Card className="p-6 glass-panel border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-[10px] font-mono uppercase text-blue-600 dark:text-blue-400 font-bold block">
              DETERMINISTIC PRIORITY QUEUE
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Ranked Municipal Decision Pipeline
            </h3>
          </div>
          <button
            onClick={() => navigate('/gov/clusters')}
            className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            VIEW ALL CLUSTERS ({clusters.length}) →
          </button>
        </div>

        {issues.length > 0 ? (
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 dark:bg-slate-900/90 text-slate-500 dark:text-slate-400 uppercase text-[10px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Issue / Cluster</th>
                  <th className="py-3 px-4">Ward</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                {issues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="py-3.5 px-4 font-extrabold text-blue-600 dark:text-blue-400 text-sm">
                      {issue.priorityScore?.overallScore || 'N/A'} <span className="text-xs text-slate-400">/ 100</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 dark:text-white block font-sans">
                        {issue.title}
                      </span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400">{issue.code} • {issue.category}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {issue.ward}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {issue.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => navigate(`/issue/${issue.id}`)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center space-y-3">
            <FolderOpen className="w-10 h-10 mx-auto text-slate-400" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">NO VERIFIED CIVIC SIGNALS IN QUEUE</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Recommendations will appear when citizen reports are submitted and triaged with deterministic rules.
            </p>
            <Button variant="primary" size="sm" icon={PlusCircle} onClick={() => navigate('/report')}>
              Submit Test Issue
            </Button>
          </div>
        )}
      </Card>

      {/* Real Analytics Charts Grid */}
      {issues.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Department Active Issues Bar Chart */}
          <Card variant="glass" className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Departmental Workload Breakdown</span>
                </div>
                <span className="text-xs font-mono text-slate-400">Verified Real Data</span>
              </CardTitle>
              <CardDescription>
                Active reports by municipal division.
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
                  <Bar dataKey="active" name="Active Issues" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Breakdown Pie Chart */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span>Sector Breakdown</span>
              </CardTitle>
              <CardDescription>
                Distribution of reports by infrastructure sector.
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

              <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] pt-2">
                {categoryPieData.slice(0, 4).map((entry) => (
                  <div key={entry.name} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-slate-600 dark:text-slate-300">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      )}

    </div>
  );
};
