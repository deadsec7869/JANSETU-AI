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
  Bell
} from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { role, setRole, theme, toggleTheme, wards, selectedWard, setSelectedWard, searchQuery, setSearchQuery, issues } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const urgentCount = issues.filter(i => i.priorityLevel === 'Critical').length;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 transition-colors">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => navigate(role === 'citizen' ? '/' : '/gov')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-cyan-500 to-emerald-400 p-0.5 shadow-glow-cyan">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                JANSETU<span className="text-brand-400 font-mono text-sm ml-1 px-1.5 py-0.5 rounded bg-brand-500/10 border border-brand-500/30">AI</span>
              </span>
              <span className="hidden md:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500/20 to-emerald-500/20 text-orange-300 border border-orange-500/30">
                Civic 2.0
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-400 font-medium">
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
              className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30 transition-all"
            />
          </div>

          <div className="relative shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-300 hover:border-slate-700">
              <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                aria-label="Select Ward"
                className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-2"
              >
                {wards.map((w) => (
                  <option key={w.id} value={w.id} className="bg-slate-900 text-slate-100">
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Role Switcher & Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Dual Role Toggle Switch */}
          <div className="flex items-center p-1 bg-slate-900/90 border border-slate-800 rounded-xl shadow-inner">
            <button
              onClick={() => {
                setRole('citizen');
                if (location.pathname.startsWith('/gov')) {
                  navigate('/');
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'citizen'
                  ? 'bg-brand-500 text-slate-950 shadow-glow-cyan'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
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
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
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
              className="hidden sm:inline-flex"
            >
              Report Issue
            </Button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Notifications preview icon */}
          <button
            className="relative p-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800 transition-colors"
            title="Civic Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-400 ring-2 ring-slate-950" />
          </button>
        </div>

      </div>
    </header>
  );
};
