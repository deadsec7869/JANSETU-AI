import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { IssueCard } from '../../components/shared/IssueCard';
import { Button } from '../../components/ui/Button';
import { 
  Users, 
  Search, 
  MapPin, 
  ArrowDownUp,
  PlusCircle,
  FolderOpen
} from 'lucide-react';

export const CommunityFeedPage: React.FC = () => {
  const navigate = useNavigate();
  const { issues, selectedWard, setSelectedWard, wards, searchQuery, setSearchQuery } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'urgent' | 'upvotes' | 'newest'>('urgent');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Sectors' },
    { id: 'Water & Drainage', label: 'Water & Drainage' },
    { id: 'Roads & Transport', label: 'Roads & Transport' },
    { id: 'Electricity & Lighting', label: 'Electricity & Lighting' },
    { id: 'Waste Management', label: 'Waste Management' },
    { id: 'Public Safety', label: 'Public Safety' },
  ];

  // Filtering
  const filteredIssues = issues.filter((issue) => {
    // Ward filter
    const activeWardObj = wards.find(w => w.id === selectedWard);
    if (selectedWard !== 'all' && activeWardObj) {
      const wardKeyword = activeWardObj.name.toLowerCase().split(' - ')[1] || activeWardObj.name.toLowerCase();
      if (!issue.ward.toLowerCase().includes(wardKeyword)) return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && issue.category !== selectedCategory) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = issue.title.toLowerCase().includes(q) ||
        issue.description.toLowerCase().includes(q) ||
        issue.locationAddress.toLowerCase().includes(q) ||
        issue.code.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  // Sorting
  const sortedIssues = [...filteredIssues].sort((a, b) => {
    if (sortBy === 'urgent') {
      return (b.priorityScore?.overallScore || 0) - (a.priorityScore?.overallScore || 0);
    }
    if (sortBy === 'upvotes') {
      return (b.upvotes || 0) - (a.upvotes || 0);
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 px-4 sm:px-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Citizen Ground Truth Stream</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Community Civic Intelligence Stream
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Explore nearby verified issues, corroborate reported hazards, and track collective neighborhood priorities.
          </p>
        </div>

        <Button
          variant="primary"
          icon={PlusCircle}
          onClick={() => navigate('/report')}
          className="shadow-sm hover:shadow-glow-blue"
        >
          Submit Report
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
        
        {/* Top Controls Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by keywords, street name, or tracking code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Ward Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                aria-label="Filter by Ward"
                className="bg-transparent text-xs text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer pr-2"
              >
                {wards.map((w) => (
                  <option key={w.id} value={w.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                    {w.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300">
              <ArrowDownUp className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort issues by"
                className="bg-transparent text-xs text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="urgent" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Most Urgent (AI Score)</option>
                <option value="upvotes" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Most Upvoted</option>
                <option value="newest" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Newest First</option>
              </select>
            </div>
          </div>

        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Results Count & Issues Grid or Empty State */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 font-mono">
          <span>Showing <strong className="text-slate-900 dark:text-white font-mono">{sortedIssues.length}</strong> verified civic signal(s)</span>
          <span className="text-blue-600 dark:text-blue-400">Deterministic provenance on every report</span>
        </div>

        {sortedIssues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        ) : (
          <div className="p-16 text-center rounded-3xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
              <FolderOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                NO CIVIC REPORTS IN STREAM YET
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Be the first citizen to report an issue in this sector or ward.
              </p>
            </div>
            <Button variant="primary" size="sm" icon={PlusCircle} onClick={() => navigate('/report')}>
              File a Report
            </Button>
          </div>
        )}
      </div>

    </div>
  );
};
