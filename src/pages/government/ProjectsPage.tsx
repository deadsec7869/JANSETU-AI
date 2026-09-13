import React from 'react';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { 
  KanbanSquare, 
  Wrench 
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const projects = [
    {
      id: 'PRJ-BLR-2026-09',
      title: 'Outer Ring Road Bellandur Twin Culvert & Desilting Project',
      clusterId: 'CL-BLR-150-01',
      department: 'BBMP Stormwater Drainage',
      contractor: 'L&T Infrastructure Civil Division',
      budget: '₹ 18,50,000',
      spent: '₹ 6,20,000',
      progress: 35,
      status: 'In Progress',
      timeline: 'Sep 12 - Sep 28, 2026',
      milestone: 'Subgrade dewatering complete; precast culvert box installation in progress.',
    },
    {
      id: 'PRJ-BLR-2026-14',
      title: 'Indiranagar 100ft Road Subterranean Feeder Cable Overhaul',
      clusterId: 'CL-BLR-080-02',
      department: 'BESCOM Urban Distribution',
      contractor: 'BESCOM Rapid Cable Crew Team 4',
      budget: '₹ 3,20,000',
      spent: '₹ 2,90,000',
      progress: 85,
      status: 'Testing & Commissioning',
      timeline: 'Sep 10 - Sep 16, 2026',
      milestone: '120m armored cable spliced; luminaire lux test pending.',
    },
    {
      id: 'PRJ-BLR-2026-18',
      title: 'Channasandra Flyover Incline Bitumen Milling & Rapid Overlay',
      clusterId: 'CL-BLR-084-03',
      department: 'BBMP Major Roads',
      contractor: 'Bengaluru Road Infrastructure Ltd',
      budget: '₹ 12,00,000',
      spent: '₹ 1,50,000',
      progress: 15,
      status: 'Scheduled',
      timeline: 'Sep 15 - Sep 22, 2026',
      milestone: 'Traffic diversion permission granted by Traffic Police.',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <KanbanSquare className="w-4 h-4" />
            <span>Works Order Lifecycle</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Sanctioned Municipal Civic Projects
          </h1>
          <p className="text-sm text-slate-400">
            Track execution milestones, budget utilization, contractor performance, and post-repair citizen satisfaction.
          </p>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-5">
        {projects.map((prj) => (
          <Card key={prj.id} variant="glass" className="p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-brand-400 bg-brand-950 px-2.5 py-0.5 rounded border border-brand-800">
                  {prj.id}
                </span>
                <span className="text-xs font-mono text-purple-300 bg-purple-950 px-2 py-0.5 rounded">
                  {prj.clusterId}
                </span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
                <Wrench className="w-3 h-3" />
                {prj.status}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-2">
                <h3 className="text-base font-bold text-white">{prj.title}</h3>
                <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <strong className="text-brand-300">Active Milestone:</strong> {prj.milestone}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span>Contractor: <strong className="text-slate-200">{prj.contractor}</strong></span>
                  <span>Timeline: <strong className="text-slate-200">{prj.timeline}</strong></span>
                </div>
              </div>

              {/* Budget & Progress */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Budget Spent</span>
                  <span className="font-mono font-bold text-emerald-400">{prj.spent} / {prj.budget}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Civil Progress</span>
                    <span className="font-mono font-bold text-brand-300">{prj.progress}%</span>
                  </div>
                  <Progress value={prj.progress} color="cyan" size="sm" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};
