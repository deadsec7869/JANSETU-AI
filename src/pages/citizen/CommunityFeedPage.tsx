import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IssueCard } from '../../components/shared/IssueCard';
import { 
  Users, 
  Search, 
  MapPin, 
  ArrowDownUp 
} from 'lucide-react';

export const CommunityFeedPage: React.FC = () => {
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
      return b.priorityScore.overallScore - a.priorityScore.overallScore;
    }
    if (sortBy === 'upvotes') {
      return b.upvotes - a.upvotes;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-brand-400 font-mono text-xs font-semibold uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>Decentralized Citizen Ground Truth</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Community Civic Intelligence Stream
        </h1>
        <p className="text-sm text-slate-400">
          Explore nearby verified issues, upvote critical hazards, or confirm you are also affected to accelerate municipal cluster thresholds.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        
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
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500/60"
            />
          </div>

          {/* Ward Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                aria-label="Filter by Ward"
                className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-2"
              >
                {wards.map((w) => (
                  <option key={w.id} value={w.id} className="bg-slate-900 text-slate-100">
                    {w.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300">
              <ArrowDownUp className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort issues by"
                className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="urgent" className="bg-slate-900 text-slate-100">Most Urgent (AI Score)</option>
                <option value="upvotes" className="bg-slate-900 text-slate-100">Most Upvoted</option>
                <option value="newest" className="bg-slate-900 text-slate-100">Newest First</option>
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
                    ? 'bg-brand-500/20 border-brand-500/60 text-brand-300 shadow-glow-cyan font-semibold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Results Count & Issues Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Showing <strong className="text-white font-mono">{sortedIssues.length}</strong> verified civic issues</span>
          <span className="font-mono text-[11px] text-brand-400">All data backed by citizen ground truth</span>
        </div>

        {sortedIssues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400">
            <p className="text-sm">No issues matching your active filter criteria.</p>
          </div>
        )}
      </div>

    </div>
  );
};
