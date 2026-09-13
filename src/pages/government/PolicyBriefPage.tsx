import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  FileSpreadsheet, 
  Download, 
  Printer, 
  Building2, 
  Calendar
} from 'lucide-react';

export const PolicyBriefPage: React.FC = () => {
  const { clusters } = useApp();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Autonomous Executive Reporting</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Municipal Policy & Ward Action Brief
          </h1>
          <p className="text-sm text-slate-400">
            Automated intelligence brief synthesized for Ward Corporators, MLAs, and BBMP Special Commissioners.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Printer}>
            Print Brief
          </Button>
          <Button variant="primary" size="sm" icon={Download}>
            Export PDF
          </Button>
        </div>
      </div>

      {/* Official Policy Brief Document Card */}
      <Card variant="glass" className="p-8 sm:p-10 space-y-6 bg-slate-900/90 border-slate-750 font-sans">
        
        {/* Document Letterhead */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/80">
          <div>
            <div className="text-xs font-mono font-bold text-brand-400 uppercase tracking-widest">
              JANSETU AI EXECUTIVE SYNTHESIS • CONFIDENTIAL MUNICIPAL MEMORANDUM
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Ward Infrastructure Health & Hotspot Action Brief
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
              <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> Zone: Mahadevapura / Ward 150</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Date: September 2026</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono">
            <div className="text-[10px] text-slate-400 uppercase">Ward Health Index</div>
            <div className="text-2xl font-black text-amber-400">72.4/100</div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-brand-300">
            1. Executive Summary & Causal Diagnosis
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In the past 14 days, JANSETU AI processed 142 distinct multimodal citizen submissions across Mahadevapura Zone. Spatial clustering algorithms merged these reports into <strong>4 high-priority systemic clusters</strong>, identifying severe culvert siltation beneath the Outer Ring Road service corridor and subterranean power cable ruptures near major transit junctions as the primary root causes.
          </p>
        </div>

        {/* Priority Interventions Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-brand-300">
            2. Priority Sanction Recommendations
          </h3>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-3">Cluster Code</th>
                  <th className="p-3">Infrastructure Focus</th>
                  <th className="p-3">Nodal Dept</th>
                  <th className="p-3">Est. Budget</th>
                  <th className="p-3">Action Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {clusters.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-850/50">
                    <td className="p-3 font-mono font-bold text-brand-300">{c.code}</td>
                    <td className="p-3 font-medium">{c.name}</td>
                    <td className="p-3 text-slate-400">{c.primaryDepartment}</td>
                    <td className="p-3 font-mono text-emerald-400 font-bold">{c.estimatedBudget}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.severityIndex >= 85 ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {c.severityIndex >= 85 ? 'Emergency S1' : 'High Priority S2'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Budget Allocation Impact */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            3. Algorithmic Budget Optimization Analysis
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            By grouping isolated citizen complaints into consolidated works orders, the municipal corporation realizes an estimated <strong>₹ 35.2 Lakhs savings (24.8%)</strong> in contractor mobilization overheads and reduces commuter transit delays by ~32,000 person-hours daily.
          </p>
        </div>

      </Card>

    </div>
  );
};
