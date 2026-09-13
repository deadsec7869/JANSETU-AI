import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAction } from '../../context/ActionContext';
import { IssueCard } from '../../components/shared/IssueCard';
import { Tabs } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { 
  ClosedLoopVisual, 
  CitizenVerification 
} from '../../features/action';
import { 
  FileText, 
  PlusCircle, 
  Search,
  FolderOpen,
  Sparkles,
  Users,
  Flame,
  CheckCircle2,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

export const MyReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const { issues } = useApp();
  const { workOrder, status } = useAction();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [filterQuery, setFilterQuery] = useState('');

  // Find user reports or fallback to sample reports
  const userReports = issues.filter(
    (i) => i.reporter.name.includes('You') || i.userHasUpvoted
  );

  const filteredReports = userReports.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      issue.category.toLowerCase().includes(filterQuery.toLowerCase()) ||
      issue.code.toLowerCase().includes(filterQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'in_progress') return issue.status === 'in_progress' || issue.status === 'action_scheduled';
    if (activeTab === 'clustered') return issue.status === 'clustered';
    if (activeTab === 'resolved') return issue.status === 'resolved';
    return true;
  });

  const tabItems = [
    { id: 'all', label: 'All Tracked Issues', count: userReports.length },
    { id: 'clustered', label: 'Clustered Hotspots', count: userReports.filter(i => i.status === 'clustered').length },
    { id: 'in_progress', label: 'Work Scheduled / Active', count: userReports.filter(i => i.status === 'in_progress' || i.status === 'action_scheduled').length },
    { id: 'resolved', label: 'Resolved', count: userReports.filter(i => i.status === 'resolved').length },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Product Signature: Closed Loop Visual */}
      <ClosedLoopVisual />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>CITIZEN TRACKING VAULT</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
              CLOSED-LOOP TRANSPARENCY
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
            My Civic Submissions & Impact Trace
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Track how your individual report was clustered, prioritized, sanctioned for municipal action, and resolved.
          </p>
        </div>

        <Button
          variant="primary"
          icon={PlusCircle}
          onClick={() => navigate('/report')}
          className="shadow-glow-cyan"
        >
          File New Report
        </Button>
      </div>

      {/* Prominent Citizen Impact Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/40 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>YOUR CIVIC VOICE TRANSFORMED INTO COLLECTIVE ACTION</span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
            status === 'verified'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse'
          }`}>
            WORKFLOW STATUS: {status.replace('_', ' ')}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
          <div className="lg:col-span-2 space-y-1.5">
            <span className="text-xs text-slate-400 font-mono block">
              YOUR REPORT <strong className="text-white">#RPT-2026-442</strong> CONTRIBUTED TO:
            </span>
            <h2 className="text-lg font-extrabold text-white">
              {workOrder.clusterId} — {workOrder.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-1">
              <span className="flex items-center gap-1 text-cyan-300 font-bold">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                312 Community Reports
              </span>
              <span className="flex items-center gap-1 text-rose-400 font-bold">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                Priority 94 / 100
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Work Order {workOrder.id}
              </span>
            </div>
          </div>

          <div className="flex justify-start lg:justify-end">
            <button
              onClick={() => navigate('/gov/impact')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-xs hover:opacity-95 transition-all shadow-glow-cyan flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>VIEW COMMUNITY IMPACT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Citizen Verification Card Component */}
      <CitizenVerification />

      {/* Tabs & Search Filter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <Tabs tabs={tabItems} activeTab={activeTab} onChange={setActiveTab} />

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by title or code..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60"
          />
        </div>
      </div>

      {/* Issues Grid or Empty State */}
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReports.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      ) : (
        <Card variant="glass" className="text-center py-12">
          <CardContent className="space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
              <FolderOpen className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">No Issues in this Category</h3>
              <p className="text-xs text-slate-400">
                You do not have any tracked reports under "{activeTab}". File a report to trigger AI analysis and clustering.
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={() => navigate('/report')}>
              Report a Civic Problem
            </Button>
          </CardContent>
        </Card>
      )}

    </div>
  );
};
