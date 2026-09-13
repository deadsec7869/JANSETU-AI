import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Sun, 
  Moon, 
  PlusCircle, 
  Sparkles, 
  Play,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { AIStatusBadge } from '../../features/ai';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDemoActiveRoute = location.pathname === '/demo';

  const navLinks = [
    { to: '/', label: 'Home', exact: true },
    { to: '/report', label: 'Report' },
    { to: '/community', label: 'Community' },
    { to: '/gov', label: 'Government' },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-[20px] border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm'
          : 'bg-white/60 dark:bg-slate-950/60 backdrop-blur-[16px] border-b border-slate-200/40 dark:border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-2.5 shrink-0 cursor-pointer group" 
          onClick={() => navigate('/')}
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 p-0.5 shadow-sm transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white font-sans">
              JANSETU<span className="text-violet-600 dark:text-violet-400 font-mono text-xs ml-1 px-1.5 py-0.5 rounded bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30">AI</span>
            </span>
          </div>
        </div>

        {/* Center Editorial Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.exact}
              className={({ isActive }) => `
                px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150
                ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                }
              `}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Dedicated 3-Minute Demo Launcher Button */}
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

          {/* AI Mode Indicator */}
          <AIStatusBadge />

          {/* Quick Report Issue Button */}
          <Button
            variant="primary"
            size="sm"
            icon={PlusCircle}
            onClick={() => navigate('/report')}
            className="hidden sm:inline-flex shadow-sm hover:shadow-glow-blue text-xs px-3 py-1.5"
          >
            Report Issue
          </Button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

        </div>

      </div>
    </header>
  );
};
