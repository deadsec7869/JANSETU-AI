import React, { useState } from 'react';
import { useAction } from '../../context/ActionContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { 
  ClosedLoopVisual, 
  WorkOrderTimeline, 
  InterventionProgress, 
  CitizenVerification,
  DemoControlHUD
} from '../../features/action';
import { 
  KanbanSquare, 
  TrendingUp
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { workOrder, status } = useAction();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'flagship' | 'all'>('flagship');

  const otherProjects = [
    {
      id: 'WO-BLR-174-002',
      title: 'HSR Layout 14th Main Arterial Road Bitumen Overlay & Drainage Realignment',
      clusterId: 'CL-BLR-174-05',
      ward: 'Ward 174 - HSR Layout',
      department: 'BBMP Major Roads Division',
      contractor: 'South City Infrastructure Corp',
      budget: '₹ 48,00,000',
      spent: '₹ 22,50,000',
      progress: 45,
      status: 'IN PROGRESS',
      timeline: 'Sep 10 - Sep 24, 2026',
      milestone: 'Surface milling complete; geogrid reinforcement laying active.',
    },
    {
      id: 'WO-BLR-138-003',
      title: 'Whitefield ITPB Main Corridor Subterranean Feeder Cable Overhaul',
      clusterId: 'CL-BLR-138-09',
      ward: 'Ward 138 - Whitefield',
      department: 'BESCOM Urban Power Distribution',
      contractor: 'BESCOM Rapid Cable Crew Team 2',
      budget: '₹ 14,50,000',
      spent: '₹ 12,00,000',
      progress: 82,
      status: 'TESTING & COMMISSIONING',
      timeline: 'Sep 08 - Sep 18, 2026',
      milestone: 'Armored cable spliced; luminaire lux illumination testing in progress.',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Product Signature: Closed Loop Visual */}
      <ClosedLoopVisual />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <KanbanSquare className="w-4 h-4" />
            <span>MUNICIPAL WORK ORDER PIPELINE</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
              SYNTHETIC WORKFLOW
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
            Sanctioned Civic Projects & Field Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time execution telemetry, contractor milestones, expenditure accountability, and ground-truth verification.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('flagship')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'flagship'
                ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Flagship: {workOrder.id}
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Active Orders (3)
          </button>
        </div>
      </div>

      {activeTab === 'flagship' ? (
        /* Flagship Scenario: Bellandur SWD Desilting */
        <div className="space-y-8">
          
          {/* Work Order Lifecycle Dossier */}
          <WorkOrderTimeline />

          {/* Real-time Field Telemetry */}
          <InterventionProgress />

          {/* Citizen Verification Loop (if nearing completion or completed) */}
          <CitizenVerification />

          {/* Quick Bridge to Impact Analytics */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-300 uppercase block">
                POST-INTERVENTION ACCOUNTABILITY
              </span>
              <h3 className="text-lg font-extrabold text-white mt-0.5">
                Inspect Measurable Outcome Telemetry (-76% Service Gap Reduction)
              </h3>
              <p className="text-xs text-slate-300">
                View before/after satellite drain flow measurements and citizen grievance reduction rates.
              </p>
            </div>

            <button
              onClick={() => navigate('/gov/impact')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs hover:opacity-95 transition-all shadow-glow-cyan flex items-center gap-2 shrink-0"
            >
              <TrendingUp className="w-4 h-4" />
              <span>VIEW IMPACT DASHBOARD →</span>
            </button>
          </div>

        </div>
      ) : (
        /* All Active Projects Grid */
        <div className="space-y-5">
          
          {/* Work Order #1 (Canonical) */}
          <Card variant="glass" className="p-6 space-y-4 border-cyan-500/40">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-cyan-300 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-700">
                  {workOrder.id}
                </span>
                <span className="text-slate-400">{workOrder.clusterId} • {workOrder.wardName}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold uppercase">
                {status.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">{workOrder.title}</h3>
              <p className="text-xs text-slate-300">
                Mechanical desilting of culvert #412 and automated SCADA weir gate installation on Outer Ring Road.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono pt-2">
                <div>Budget: <strong className="text-emerald-400">{workOrder.estimatedBudget}</strong></div>
                <div>Spent: <strong className="text-slate-200">{workOrder.actualSpent}</strong></div>
                <div>Priority: <strong className="text-rose-400">{workOrder.priorityScore}/100</strong></div>
                <div>Contractor: <strong className="text-slate-300">{workOrder.assignedContractor.split(' ')[0]}</strong></div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveTab('flagship')}
                className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                Inspect Full Dossier
              </button>
            </div>
          </Card>

          {/* Work Order #2 */}
          {otherProjects.map((prj) => (
            <Card key={prj.id} variant="glass" className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-300 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700">
                    {prj.id}
                  </span>
                  <span className="text-slate-400">{prj.clusterId} • {prj.ward}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700 font-bold">
                  {prj.status}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-white">{prj.title}</h3>
                <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800 font-mono">
                  <strong className="text-cyan-300">Active Milestone:</strong> {prj.milestone}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono pt-1 text-slate-400">
                  <div>Budget: <strong className="text-emerald-400">{prj.budget}</strong></div>
                  <div>Spent: <strong className="text-slate-200">{prj.spent}</strong></div>
                  <div>Progress: <strong className="text-cyan-300">{prj.progress}%</strong></div>
                  <div>Contractor: <strong className="text-slate-300">{prj.contractor.split(' ')[0]}</strong></div>
                </div>
              </div>
            </Card>
          ))}

        </div>
      )}

      {/* Floating Demo Control HUD for Judges */}
      <DemoControlHUD />

    </div>
  );
};
