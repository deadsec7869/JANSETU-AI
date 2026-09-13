import React from 'react';
import { useAction } from '../../context/ActionContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  ClosedLoopVisual, 
  DemoControlHUD 
} from '../../features/action';
import { 
  FileSpreadsheet, 
  Download, 
  Printer, 
  Building2, 
  Calendar, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';

export const PolicyBriefPage: React.FC = () => {
  const { workOrder, status } = useAction();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 font-sans">
      
      {/* Product Signature: Closed Loop Visual */}
      <ClosedLoopVisual />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <FileSpreadsheet className="w-4 h-4" />
            <span>AUTONOMOUS MUNICIPAL POLICY BRIEF</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
              SYNTHETIC DEMO DATA
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
            Municipal Priority Policy Brief
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Synthesized executive memorandum for BBMP Special Commissioner, Ward Corporators, and Zonal Finance Committee.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="glass" 
            size="sm" 
            icon={Printer}
            onClick={() => window.print()}
          >
            Print Brief
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            icon={Download}
            onClick={() => alert('Synthetic Executive PDF exported.')}
          >
            Export PDF
          </Button>
        </div>
      </div>

      {/* Official Policy Brief Document Card */}
      <Card variant="glass" className="p-8 sm:p-10 space-y-7 bg-slate-900/95 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        
        {/* Document Letterhead */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>JANSETU AI EXECUTIVE POLICY SYNTHESIS • CONFIDENTIAL MUNICIPAL MEMO</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1.5 tracking-tight">
              MUNICIPAL PRIORITY BRIEF: WARD 150 (BELLANDUR)
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2 font-mono">
              <span className="flex items-center gap-1 text-slate-300">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                Target: {workOrder.clusterId} • Water & Drainage
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Dated: September 2026
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center font-mono">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Priority Score</div>
            <div className="text-2xl font-black text-rose-400">{workOrder.priorityScore} / 100</div>
            <span className="text-[9px] text-rose-400/80 font-bold block">Rank #1 Critical</span>
          </div>
        </div>

        {/* Section 1: Executive Finding */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            1. EXECUTIVE FINDING & PROBLEM DIAGNOSIS
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            A concentrated stormwater service deficit is affecting the Outer Ring Road tech corridor. Primary Stormwater Culvert #412 is silted by <strong>78%</strong>, generating persistent backflow that submerges arterial lanes outside EcoSpace and strands an estimated <strong>84,000 daily commuters</strong> during moderate rainfall events.
          </p>
        </div>

        {/* Section 2: Multimodal Causal Evidence Chain */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            2. MULTIMODAL EVIDENCE & SPATIAL TELEMETRY
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Citizen Voices</span>
              <span className="text-base font-black text-white">312 Reports</span>
              <span className="text-[9px] text-cyan-400 block">Multimodal NLP</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Geotagged Photos</span>
              <span className="text-base font-black text-white">142 Photos</span>
              <span className="text-[9px] text-cyan-400 block">Vision Verified</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Voice Notes</span>
              <span className="text-base font-black text-white">98 Audio</span>
              <span className="text-[9px] text-cyan-400 block">Kannada / Eng</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Culvert Choke</span>
              <span className="text-base font-black text-rose-400">78% Blocked</span>
              <span className="text-[9px] text-rose-400/80 block">Sensor Baseline</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Capacity Deficit</span>
              <span className="text-base font-black text-rose-400">87% Gap</span>
              <span className="text-[9px] text-rose-400/80 block">Critical Deficit</span>
            </div>
          </div>
        </div>

        {/* Section 3: Recommended Municipal Intervention */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            3. RECOMMENDED MUNICIPAL ACTION & FAST-TRACK BUDGET
          </h3>
          <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-base font-extrabold text-white">
                {workOrder.recommendedAction}
              </h4>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                EST. BUDGET: {workOrder.estimatedBudget} • {workOrder.estimatedDays} DAYS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300 pt-1 font-sans">
              {workOrder.technicalScope.map((scope, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{scope}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Accountability & Next Steps */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-mono">
            <span>Status: </span>
            <strong className="text-cyan-300 uppercase">{status.replace('_', ' ')}</strong>
            <span> • Nodal: {workOrder.department}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/gov/evidence')}
              className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono font-bold transition-all"
            >
              Inspect 3D Evidence Graph →
            </button>
            <button
              onClick={() => navigate('/gov/projects')}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold transition-all shadow-glow-cyan"
            >
              View Work Order Dossier
            </button>
          </div>
        </div>

      </Card>

      {/* Floating Demo Control HUD for Judges */}
      <DemoControlHUD />

    </div>
  );
};
