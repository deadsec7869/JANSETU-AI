import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAction } from '../../context/ActionContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  ClosedLoopVisual, 
  ActionRecommendation, 
  GovernmentReview,
  DemoControlHUD
} from '../../features/action';
import { 
  AITraceHUD, 
  AITransparencyModal 
} from '../../features/ai';
import { 
  Building2, 
  Flame, 
  Map, 
  FileSpreadsheet, 
  BarChart2,
  PieChart as PieIcon,
  ShieldCheck,
  Terminal
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
  const { issues, departments } = useApp();
  const { workOrder, status } = useAction();
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [showTransparencyModal, setShowTransparencyModal] = useState<boolean>(false);
  const [judgeModeActive, setJudgeModeActive] = useState<boolean>(true);

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
    color: ['#06b6d4', '#f59e0b', '#10b981', '#6366f1', '#f43f5e', '#a855f7'][idx % 6],
  }));

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Product Signature: Closed Loop Visual */}
      <ClosedLoopVisual />

      {/* Judge Mode & AI Intelligence Trace Panel */}
      {judgeModeActive && (
        <AITraceHUD
          inputLanguage="Kannada (ಮಳೆ ಬಂದಾಗ ಇಲ್ಲಿ ನೀರು...) & English"
          classification="Water & Drainage (Confidence 0.94)"
          clusterMatch="CL-BLR-150-01 (Bellandur SWD Culvert)"
          clusterConfidence={94}
          priorityScore={94}
          ruleEngineCitation="JANSETU Multi-Vector Risk Index Eq. 3.2 (Demand 30% + Severity 25% + Vulnerability 25% + Evidence 20%)"
          actionRecommendation="Emergency Culvert Desilting + Automated SCADA Weir Gate Installation"
        />
      )}

      {/* Executive Command Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>BBMP MUNICIPAL EXECUTIVE COCKPIT</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">
              SYNTHETIC DEMO DATA
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Civic Intelligence & Action Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Autonomous multi-vector triage converting fragmented citizen grievances into consolidated, budget-optimized municipal action orders.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setJudgeModeActive(!judgeModeActive)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
              judgeModeActive
                ? 'bg-cyan-950 border-cyan-500 text-cyan-300 shadow-glow-cyan'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{judgeModeActive ? 'JUDGE MODE: ON' : 'JUDGE MODE: OFF'}</span>
          </button>

          <Button
            variant="glass"
            size="md"
            icon={ShieldCheck}
            onClick={() => setShowTransparencyModal(true)}
            className="border-slate-700 text-slate-300 hover:text-white"
          >
            AI Governance
          </Button>

          <Button
            variant="glass"
            size="md"
            icon={Map}
            onClick={() => navigate('/gov/priority-map')}
            className="border-cyan-500/40 text-cyan-200"
          >
            Priority Map
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={FileSpreadsheet}
            onClick={() => navigate('/gov/policy-brief')}
          >
            Policy Brief
          </Button>
        </div>
      </div>

      {/* AI Transparency Modal */}
      {showTransparencyModal && (
        <AITransparencyModal onClose={() => setShowTransparencyModal(false)} />
      )}

      {/* Phase 5 Action Recommendation Feature Box */}
      <ActionRecommendation 
        onOpenReviewModal={() => setShowReviewModal(true)} 
      />

      {/* Municipal Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-3xl w-full">
            <GovernmentReview onClose={() => setShowReviewModal(false)} />
          </div>
        </div>
      )}

      {/* Executive Civic Intelligence KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 font-mono">
        
        <Card variant="glass" className="p-4 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-400">Active Priorities</span>
          <div className="text-2xl font-black text-white">8</div>
          <span className="text-[10px] text-cyan-400">Across 12 Wards</span>
        </Card>

        <Card variant="glass" className="p-4 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-rose-400">Critical (90+)</span>
          <div className="text-2xl font-black text-rose-400">3</div>
          <span className="text-[10px] text-rose-300">Urgent Intervention</span>
        </Card>

        <Card variant="glass" className="p-4 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-amber-400">Awaiting Review</span>
          <div className="text-2xl font-black text-amber-300">{status === 'awaiting_review' ? 2 : 1}</div>
          <span className="text-[10px] text-amber-400">Zonal Standing Order</span>
        </Card>

        <Card variant="glass" className="p-4 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-cyan-400">In Execution</span>
          <div className="text-2xl font-black text-cyan-300">5</div>
          <span className="text-[10px] text-cyan-400">Field Work Active</span>
        </Card>

        <Card variant="glass" className="p-4 space-y-1.5 col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase font-bold text-emerald-400">Verified Relief</span>
          <div className="text-2xl font-black text-emerald-300">12</div>
          <span className="text-[10px] text-emerald-400">86% Citizen Consensus</span>
        </Card>

      </div>

      {/* Top Priorities Decision Table */}
      <Card variant="glass" className="overflow-hidden p-0 border border-slate-800">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Top Algorithmic Municipal Priorities</span>
            </h3>
            <p className="text-xs text-slate-400">
              Ranked cross-departmental civic clusters with causal evidence packets.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
            BBMP AUTOMATED RANKING
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Cluster / Issue</th>
                <th className="py-3 px-4">Ward</th>
                <th className="py-3 px-4">Citizen Reports</th>
                <th className="py-3 px-4">Workflow Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              
              {/* Flagship Row #1 */}
              <tr className="bg-cyan-950/20 hover:bg-cyan-950/40 transition-colors">
                <td className="py-3.5 px-4 font-extrabold text-rose-400 text-sm">
                  94 / 100
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-bold text-white block font-sans">
                    Outer Ring Road SWD Culvert Desilting
                  </span>
                  <span className="text-[10px] text-cyan-400">{workOrder.clusterId} • Water & Drainage</span>
                </td>
                <td className="py-3.5 px-4 text-slate-300">
                  Ward 150 - Bellandur
                </td>
                <td className="py-3.5 px-4 text-slate-200 font-bold">
                  312 Reports
                </td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                    status === 'verified'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : status === 'in_progress'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {status.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => navigate('/gov/projects')}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-glow-cyan"
                  >
                    View Order
                  </button>
                </td>
              </tr>

              {/* Other Priority Rows */}
              <tr className="hover:bg-slate-900/60 transition-colors">
                <td className="py-3.5 px-4 font-bold text-rose-400">89 / 100</td>
                <td className="py-3.5 px-4">
                  <span className="font-bold text-white block font-sans">14th Main Arterial Pothole Inundation</span>
                  <span className="text-[10px] text-slate-400">CL-BLR-174-05 • Roads & Transport</span>
                </td>
                <td className="py-3.5 px-4 text-slate-300">Ward 174 - HSR Layout</td>
                <td className="py-3.5 px-4 text-slate-200">188 Reports</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-900 text-slate-300 border border-slate-700">
                    IN PROGRESS
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => navigate('/gov/clusters')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
                  >
                    Inspect
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-900/60 transition-colors">
                <td className="py-3.5 px-4 font-bold text-amber-300">86 / 100</td>
                <td className="py-3.5 px-4">
                  <span className="font-bold text-white block font-sans">ITPB Main Road Streetlighting Blackout</span>
                  <span className="text-[10px] text-slate-400">CL-BLR-138-09 • Public Safety</span>
                </td>
                <td className="py-3.5 px-4 text-slate-300">Ward 138 - Whitefield</td>
                <td className="py-3.5 px-4 text-slate-200">142 Reports</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-900 text-slate-300 border border-slate-700">
                    ASSIGNED
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => navigate('/gov/clusters')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
                  >
                    Inspect
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </Card>

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
              <span className="text-xs font-mono text-slate-400">Synthetic Live Telemetry</span>
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

      {/* Floating Demo Control HUD for Judges */}
      <DemoControlHUD />

    </div>
  );
};
