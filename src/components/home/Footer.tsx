import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-10 pb-16 border-t border-slate-200/80 dark:border-slate-800/80 text-slate-600 dark:text-slate-400">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Tagline */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              JANSETU<span className="text-violet-600 dark:text-violet-400 font-mono text-xs ml-1 px-1.5 py-0.5 rounded bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30">AI</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">CIVIC 2.0</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            From Citizen Voice to Measurable Action.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Citizen
          </Link>
          <Link to="/gov" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Government
          </Link>
          <Link to="/gov/evidence" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Evidence
          </Link>
          <Link to="/gov/impact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Impact
          </Link>
          <Link to="/demo" className="text-violet-600 dark:text-violet-400 font-bold hover:underline">
            3-Min Demo
          </Link>
        </div>

        {/* Synthetic Demo Badge */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400">
            SYNTHETIC DEMO ENVIRONMENT
          </span>
        </div>

      </div>
    </footer>
  );
};
