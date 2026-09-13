import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { IssueCard } from '../../components/shared/IssueCard';
import { Tabs } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { 
  FileText, 
  PlusCircle, 
  Search,
  FolderOpen
} from 'lucide-react';

export const MyReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const { issues } = useApp();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [filterQuery, setFilterQuery] = useState('');

  // Find user reports or fallback to top sample reports
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
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Citizen Tracking Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Civic Submissions & Tracked Issues
          </h1>
          <p className="text-sm text-slate-400">
            Real-time milestone transparency, cluster associations, and municipal work order status.
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
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500/60"
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
            <div>
              <h3 className="text-lg font-bold text-white">No Issues Found in this Filter</h3>
              <p className="text-xs text-slate-400 mt-1">
                You haven't submitted or tracked issues matching this status yet.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              icon={PlusCircle}
              onClick={() => navigate('/report')}
            >
              Report Your First Issue
            </Button>
          </CardContent>
        </Card>
      )}

    </div>
  );
};
