import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAction } from '../../context/ActionContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { 
  ClosedLoopVisual, 
  ImpactSummary, 
  CitizenVerification, 
  DemoControlHUD 
} from '../../features/action';
import { 
  BarChart3, 
  TrendingUp, 
  Network
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export const ImpactPage: React.FC = () => {
  const { impactSummary } = useApp();
  const { workOrder } = useAction();
  const navigate = useNavigate();

  const turnaroundTrendData = [
    { month: 'Apr', legacyDays: 14.2, jansetuDays: 7.8 },
    { month: 'May', legacyDays: 13.8, jansetuDays: 6.4 },
    { month: 'Jun', legacyDays: 15.1, jansetuDays: 5.9 },
    { month: 'Jul', legacyDays: 16.0, jansetuDays: 5.1 },
    { month: 'Aug', legacyDays: 14.5, jansetuDays: 4.3 },
    { month: 'Sep', legacyDays: 15.0, jansetuDays: 3.8 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Product Signature: Closed Loop Visual */}
      <ClosedLoopVisual />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            <span>EXECUTIVE IMPACT INTELLIGENCE</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
              SYNTHETIC IMPACT SIMULATION
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
            Measurable Civic Impact & Outcome Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Evaluating on-ground outcome metrics, service capacity deficit reduction, turnaround acceleration, and citizen satisfaction.
          </p>
        </div>

        <button
          onClick={() => navigate('/gov/evidence')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:text-white font-mono text-xs font-bold transition-all shadow-xl"
        >
          <Network className="w-4 h-4" />
          <span>Inspect 3D Evidence Graph</span>
        </button>
      </div>

      {/* Signature Phase 5 Before / After Impact Engine */}
      <ImpactSummary />

      {/* Community Ground-Truth Verification Section */}
      <CitizenVerification />

      {/* Macro System ROI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass" className="p-5">
          <div className="text-xs font-bold uppercase text-slate-400">Citizens Impacted</div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-2">
            {impactSummary.citizensEmpowered.toLocaleString()}
          </div>
          <p className="text-[11px] text-cyan-300 mt-1">Protected Across 12 Wards</p>
        </Card>

        <Card variant="glass" className="p-5">
          <div className="text-xs font-bold uppercase text-slate-400">Turnaround Reduction</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-2">
            -{impactSummary.avgTurnaroundReductionPercent}%
          </div>
          <p className="text-[11px] text-emerald-300 mt-1">From 18.0 days to 3.8 days</p>
        </Card>

        <Card variant="glass" className="p-5">
          <div className="text-xs font-bold uppercase text-slate-400">Procurement Savings</div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono mt-2">
            {impactSummary.fundsOptimized}
          </div>
          <p className="text-[11px] text-cyan-300 mt-1">Via clustered contractor tenders</p>
        </Card>

        <Card variant="glass" className="p-5">
          <div className="text-xs font-bold uppercase text-slate-400">Citizen Trust Index</div>
          <div className="text-2xl sm:text-3xl font-black text-purple-300 font-mono mt-2">
            {workOrder.verification.improvedPercent}%
          </div>
          <p className="text-[11px] text-purple-300 mt-1">Ground verification consensus</p>
        </Card>
      </div>

      {/* Turnaround Acceleration Area Chart */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Resolution Turnaround: Legacy Municipal Portals vs. JANSETU AI (Days)</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Synthetic Live Telemetry</span>
          </CardTitle>
          <CardDescription>
            Average turnaround time from citizen report triage to verified on-ground completion.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={turnaroundTrendData}>
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} unit="d" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#f8fafc',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="legacyDays"
                name="Legacy Municipal Portal (Days)"
                stroke="#f43f5e"
                fill="#f43f5e"
                fillOpacity={0.15}
              />
              <Area
                type="monotone"
                dataKey="jansetuDays"
                name="JANSETU AI Workflow (Days)"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Floating Demo Control HUD for Judges */}
      <DemoControlHUD />

    </div>
  );
};
