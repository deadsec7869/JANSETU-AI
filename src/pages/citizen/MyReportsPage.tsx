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
  const { issues, isTestMode } = useApp();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [filterQuery, setFilterQuery] = useState('');

  // Find user reports
  const userReports = isTestMode
    ? issues
    : issues.filter((i) => i.reporter.name.includes('You') || i.userHasUpvoted);

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
    <div className="space-y-8 max-w-7xl mx-auto pb-16 px-4 sm:px-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-lg">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-mono text-xs font-semibold">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Citizen Tracking Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Civic Submissions & Impact Trace
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Track how your individual reports are clustered, prioritized, and resolved with full provenance.
          </p>
        </div>

        <Button
          variant="primary"
          icon={PlusCircle}
          onClick={() => navigate('/report')}
          className="shadow-sm hover:shadow-glow-blue"
        >
          File New Report
        </Button>
      </div>

      {/* Tabs & Search Filter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <Tabs tabs={tabItems} activeTab={activeTab} onChange={setActiveTab} />

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by title, category, or code..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Issues Grid or Beautiful Intentional Empty State */}
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReports.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      ) : (
        <Card variant="glass" className="text-center py-16 px-4">
          <CardContent className="space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
              <FolderOpen className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                NO CIVIC REPORTS FILED YET
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Reports you submit with voice, photos, or text will appear here with transparent tracking through clustering, municipal review, and resolution.
              </p>
            </div>
            <div className="pt-2">
              <Button variant="primary" size="md" icon={PlusCircle} onClick={() => navigate('/report')}>
                Submit Your First Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
};
