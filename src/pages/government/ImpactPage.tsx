import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { 
  BarChart3, 
  TrendingUp
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

  const turnaroundTrendData = [
    { month: 'Apr', legacyDays: 14.2, jansetuDays: 7.8 },
    { month: 'May', legacyDays: 13.8, jansetuDays: 6.4 },
    { month: 'Jun', legacyDays: 15.1, jansetuDays: 5.9 },
    { month: 'Jul', legacyDays: 16.0, jansetuDays: 5.1 },
    { month: 'Aug', legacyDays: 14.5, jansetuDays: 4.3 },
    { month: 'Sep', legacyDays: 15.0, jansetuDays: 3.8 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            <span>Civic ROI & Accountability</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Measurable Civic Impact & Outcome Analytics
          </h1>
          <p className="text-sm text-slate-400">
            Quantifying municipal cost optimization, turnaround acceleration, and citizen satisfaction.
          </p>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass" className="p-5">
          <div className="text-xs font-bold uppercase text-slate-400">Citizens Empowered</div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-2">
            {impactSummary.citizensEmpowered.toLocaleString()}
          </div>
          <p className="text-[11px] text-brand-300 mt-1">Across 8 BBMP Zones</p>
        </Card>

        <Card variant="glass" className="p-5">
          <div className="text-xs font-bold uppercase text-slate-400">Turnaround Reduction</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-2">
            -{impactSummary.avgTurnaroundReductionPercent}%
          </div>
          <p className="text-[11px] text-emerald-300 mt-1">From 15 days to 3.8 days</p>
        </Card>

        <Card variant="glass" className="p-5">
          <div className="text-xs font-bold uppercase text-slate-400">Procurement Savings</div>
          <div className="text-2xl sm:text-3xl font-black text-brand-400 font-mono mt-2">
            {impactSummary.fundsOptimized}
          </div>
          <p className="text-[11px] text-brand-300 mt-1">Via clustered contractor tenders</p>
        </Card>

        <Card variant="glass" className="p-5">
          <div className="text-xs font-bold uppercase text-slate-400">Community Trust Index</div>
          <div className="text-2xl sm:text-3xl font-black text-purple-300 font-mono mt-2">
            {impactSummary.communityTrustIndex}%
          </div>
          <p className="text-[11px] text-purple-300 mt-1">Post-resolution verification rate</p>
        </Card>
      </div>

      {/* Trend Chart */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Resolution Turnaround: Legacy Portals vs. JANSETU AI (Days)</span>
            </div>
          </CardTitle>
          <CardDescription>
            Average turnaround time from citizen report to verified on-ground completion.
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
              <Area type="monotone" dataKey="legacyDays" name="Legacy Grievance Portals (Days)" stroke="#94a3b8" fill="rgba(148, 163, 184, 0.1)" />
              <Area type="monotone" dataKey="jansetuDays" name="JANSETU AI Clustered Resolution (Days)" stroke="#06b6d4" fill="rgba(6, 182, 212, 0.2)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
};
