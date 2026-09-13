import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useApp } from '../../context/AppContext';
import { DemoOverlay } from '../../features/demo';
import { Home, PlusCircle, FileText, Users, LayoutDashboard, Map, Layers, BarChart3 } from 'lucide-react';

export const AppShell: React.FC = () => {
  const { role } = useApp();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900 dark:text-slate-100 bg-grid-pattern selection:bg-blue-600 selection:text-white">
      <Navbar />

      <div className={`flex-1 flex w-full ${isHomePage ? 'max-w-full' : 'max-w-[1700px]'} mx-auto`}>
        {/* Render Sidebar only on internal operational pages */}
        {!isHomePage && <Sidebar />}

        {/* Main Content Area */}
        <main className={`flex-1 min-w-0 ${isHomePage ? 'p-0 pb-16' : 'p-4 sm:p-6 lg:p-8 pb-24 md:pb-12'} overflow-y-auto`}>
          <Outlet />
        </main>
      </div>

      {/* Persistent Presenter Demo Overlay (Rendered when Demo Mode is Active) */}
      <DemoOverlay />

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-2 flex items-center justify-around">
        {role === 'citizen' ? (
          <>
            <NavLink
              to="/"
              className={({ isActive }) => `flex flex-col items-center gap-1 p-2 text-xs font-medium ${isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/report"
              className={({ isActive }) => `flex flex-col items-center gap-1 p-2 text-xs font-medium ${isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-blue-600 dark:text-blue-400'}`}
            >
              <div className="p-1.5 rounded-full bg-blue-600 text-white shadow-glow-blue">
                <PlusCircle className="w-5 h-5" />
              </div>
              <span className="text-blue-700 dark:text-blue-300 font-bold">Report</span>
            </NavLink>
            <NavLink
              to="/my-reports"
              className={({ isActive }) => `flex flex-col items-center gap-1 p-2 text-xs font-medium ${isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
            >
              <FileText className="w-5 h-5" />
              <span>My Reports</span>
            </NavLink>
            <NavLink
              to="/community"
              className={({ isActive }) => `flex flex-col items-center gap-1 p-2 text-xs font-medium ${isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
            >
              <Users className="w-5 h-5" />
              <span>Community</span>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/gov"
              className={({ isActive }) => `flex flex-col items-center gap-1 p-2 text-xs font-medium ${isActive ? 'text-violet-600 dark:text-violet-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Overview</span>
            </NavLink>
            <NavLink
              to="/gov/priority-map"
              className={({ isActive }) => `flex flex-col items-center gap-1 p-2 text-xs font-medium ${isActive ? 'text-violet-600 dark:text-violet-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
            >
              <Map className="w-5 h-5" />
              <span>Map</span>
            </NavLink>
            <NavLink
              to="/gov/clusters"
              className={({ isActive }) => `flex flex-col items-center gap-1 p-2 text-xs font-medium ${isActive ? 'text-violet-600 dark:text-violet-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
            >
              <Layers className="w-5 h-5" />
              <span>Clusters</span>
            </NavLink>
            <NavLink
              to="/gov/impact"
              className={({ isActive }) => `flex flex-col items-center gap-1 p-2 text-xs font-medium ${isActive ? 'text-violet-600 dark:text-violet-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Impact</span>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};
