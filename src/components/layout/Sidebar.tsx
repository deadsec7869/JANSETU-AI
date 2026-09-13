import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Home,
  PlusCircle,
  FileText,
  Users,
  Bot,
  LayoutDashboard,
  Map,
  Layers,
  Network,
  KanbanSquare,
  BarChart3,
  FileSpreadsheet,
  Flame,
  ShieldCheck,
  Award,
  LucideIcon
} from 'lucide-react';

interface SidebarNavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  highlight?: boolean;
  badge?: string | number;
  badgeVariant?: 'primary' | 'danger' | 'warning' | 'neutral';
}

export const Sidebar: React.FC = () => {
  const { role, issues, clusters } = useApp();

  const citizenNavItems: SidebarNavItem[] = [
    {
      to: '/',
      label: 'Home',
      icon: Home,
      exact: true,
    },
    {
      to: '/report',
      label: 'Report Issue',
      icon: PlusCircle,
      highlight: true,
    },
    {
      to: '/my-reports',
      label: 'My Reports',
      icon: FileText,
      badge: issues.filter(i => i.reporter.name.includes('You')).length || undefined,
    },
    {
      to: '/community',
      label: 'Community Feed',
      icon: Users,
      badge: issues.length,
    },
    {
      to: '/ai-assistant',
      label: 'AI Assistant',
      icon: Bot,
      badge: 'v2.4',
    },
  ];

  const criticalClustersCount = clusters.filter(c => c.severityIndex >= 85).length;

  const governmentNavItems: SidebarNavItem[] = [
    {
      to: '/gov',
      label: 'Overview',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      to: '/gov/priority-map',
      label: 'Priority Map',
      icon: Map,
      badge: `${criticalClustersCount} Hot`,
      badgeVariant: 'danger',
    },
    {
      to: '/gov/clusters',
      label: 'Issue Clusters',
      icon: Layers,
      badge: clusters.length,
    },
    {
      to: '/gov/evidence',
      label: 'Evidence Graph',
      icon: Network,
    },
    {
      to: '/gov/projects',
      label: 'Civic Projects',
      icon: KanbanSquare,
    },
    {
      to: '/gov/impact',
      label: 'Impact Analytics',
      icon: BarChart3,
    },
    {
      to: '/gov/policy-brief',
      label: 'Policy Brief',
      icon: FileSpreadsheet,
    },
  ];

  const navItems = role === 'citizen' ? citizenNavItems : governmentNavItems;

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col justify-between glass-panel border-r border-slate-800/80 p-4 min-h-[calc(100vh-4rem)]">
      
      {/* Navigation Links */}
      <div className="space-y-6">
        
        {/* Mode Label */}
        <div className="px-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
              {role === 'citizen' ? 'Citizen Workspace' : 'Government Cockpit'}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
              role === 'citizen' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
            }`}>
              {role === 'citizen' ? 'PUBLIC' : 'ADMIN'}
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) => `
                flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                ${
                  isActive
                    ? role === 'citizen'
                      ? 'bg-brand-500/15 text-brand-300 border border-brand-500/40 shadow-glow-cyan font-semibold'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-lg font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/60 border border-transparent'
                }
                ${item.highlight ? 'text-brand-300 font-semibold hover:border-brand-500/30' : ''}
              `}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-medium ${
                    item.badgeVariant === 'danger'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Dynamic Widget */}
        {role === 'citizen' ? (
          <div className="p-4 rounded-xl bg-gradient-to-b from-brand-950/40 to-slate-900 border border-brand-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Civic Voice Impact</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Your reports are processed through spatial clustering to hold municipal wards accountable.
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-gradient-to-b from-indigo-950/40 to-slate-900 border border-indigo-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>SLA Critical Alert</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {criticalClustersCount} hot clusters require cross-departmental engineer signoff today.
            </p>
          </div>
        )}

      </div>

      {/* Footer Hackathon Info */}
      <div className="pt-4 border-t border-slate-800/60 space-y-3">
        <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-900/60 border border-slate-800 rounded-xl">
          <Award className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="text-[11px] leading-tight">
            <p className="text-white font-semibold">Code for Communities 2.0</p>
            <p className="text-slate-400 font-mono text-[10px]">Hackathon Edition</p>
          </div>
        </div>
      </div>

    </aside>
  );
};
