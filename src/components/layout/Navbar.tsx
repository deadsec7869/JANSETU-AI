import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  User, 
  Sun, 
  Moon, 
  PlusCircle, 
  Search, 
  MapPin, 
  Sparkles, 
  Bell,
  Play
} from 'lucide-react';
import { Button } from '../ui/Button';
import { AIStatusBadge } from '../../features/ai';

export const Navbar: React.FC = () => {
  const { role, setRole, theme, toggleTheme, wards, selectedWard, setSelectedWard, searchQuery, setSearchQuery, issues } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const urgentCount = issues.filter(i => i.priorityLevel === 'Critical').length;
  const isDemoActiveRoute = location.pathname === '/demo';

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Editorial Tagline */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => navigate(role === 'citizen' ? '/' : '/gov')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 p-0.5 shadow-glow-blue">
            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white font-sans">
                JANSETU<span className="text-violet-600 dark:text-violet-400 font-mono text-sm ml-1 px-1.5 py-0.5 rounded bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30">AI</span>
              </span>
              <span className="hidden md:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                Civic 2.0
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              From Citizen Voice to Measurable Action
            </p>
          </div>
        </div>

        {/* Search & Ward Selector */}
        <div className="hidden lg:flex items-center gap-3 flex-1 max-w-xl mx-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search issues, clusters, wards, or departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
            />
          </div>

          <div className="relative shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-white/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700">
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                aria-label="Select Ward"
                className="bg-transparent text-xs text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer pr-2"
              >
                {wards.map((w) => (
                  <option key={w.id} value={w.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Role Switcher & Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Dedicated 3-Minute Demo Launcher Button for Judges */}
          <button
            onClick={() => navigate('/demo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              isDemoActiveRoute
                ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white border-transparent shadow-glow-blue'
                : 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/60 hover:bg-violet-100 dark:hover:bg-violet-900/40'
            }`}
            title="Open 3-Minute Hackathon Demo"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">3-MIN DEMO</span>
            <span className="sm:hidden">DEMO</span>
          </button>

          {/* Dual Role Toggle Switch */}
          <div className="flex items-center p-1 bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-inner">
            <button
              onClick={() => {
                setRole('citizen');
                if (location.pathname.startsWith('/gov')) {
                  navigate('/');
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'citizen'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Citizen</span>
            </button>
            <button
              onClick={() => {
                setRole('government');
                if (!location.pathname.startsWith('/gov')) {
                  navigate('/gov');
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'government'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Government</span>
              {urgentCount > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping ml-0.5" />
              )}
            </button>
          </div>

          {/* Quick Report CTA (Citizen mode) */}
          {role === 'citizen' && (
            <Button
              variant="primary"
              size="sm"
              icon={PlusCircle}
              onClick={() => navigate('/report')}
              className="hidden xl:inline-flex"
            >
              Report Issue
            </Button>
          )}

          {/* AI Mode Indicator */}
          <AIStatusBadge />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Notifications preview icon */}
          <button
            className="relative p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800 transition-colors"
            title="Civic Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 ring-2 ring-white dark:ring-slate-950" />
          </button>
        </div>

      </div>
    </header>
  );
};
