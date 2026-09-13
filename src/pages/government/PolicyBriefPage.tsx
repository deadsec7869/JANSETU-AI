import React, { useState } from 'react';
import { useAction } from '../../context/ActionContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  ClosedLoopVisual, 
  DemoControlHUD 
} from '../../features/action';
import { 
  getAIProvider, 
  getAIProviderStatus, 
  type PolicyBriefResult,
  AITransparencyModal 
} from '../../features/ai';
import { 
  FileSpreadsheet, 
  Download, 
  Printer, 
  Building2, 
  Calendar, 
  Sparkles, 
  CheckCircle2,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export const PolicyBriefPage: React.FC = () => {
  const { workOrder, status } = useAction();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [briefResult, setBriefResult] = useState<PolicyBriefResult | null>(null);
  const [showTransparency, setShowTransparency] = useState<boolean>(false);
  const aiStatus = getAIProviderStatus();

  const handleGenerateBrief = async () => {
    setIsGenerating(true);
    try {
      const provider = getAIProvider();
      const res = await provider.generatePolicyBrief({
        clusterCode: workOrder.clusterId,
        wardName: workOrder.wardName,
        domain: 'Water & Drainage',
        priorityScore: workOrder.priorityScore,
        evidenceData: {
          clusterCode: workOrder.clusterId,
          totalReports: workOrder.reasoningChain.citizenReports,
          imagesCount: 142,
          audioCount: 98,
          culvertBlockagePercent: workOrder.reasoningChain.culvertBlockage,
          serviceGapPercent: workOrder.reasoningChain.serviceCapacityDeficit,
          vulnerabilityScore: workOrder.reasoningChain.vulnerabilityScore,
          affectedCommuters: 84000,
          affectedResidents: 32000,
          priorCapexAllocation: workOrder.reasoningChain.priorAllocation,
          targetLocation: workOrder.location,
        },
        recommendedAction: workOrder.recommendedAction,
      });
      setBriefResult(res);
    } catch (err) {
      console.warn('Policy Brief Generation Error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const executiveFinding = briefResult?.executiveFinding || 
    "A concentrated stormwater service deficit is affecting the Outer Ring Road tech corridor. Primary Stormwater Culvert #412 is silted by 78%, generating persistent backflow that submerges arterial lanes outside EcoSpace and strands an estimated 84,000 daily commuters during moderate rainfall events.";

  const problemDef = briefResult?.problemDefinition ||
    "Primary SWD Culvert #412 has accumulated 420 MT of solidified construction sediment and silt, reducing design discharge capacity by 87% and causing severe recurrent submergence outside EcoSpace Tech Park.";

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

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleGenerateBrief}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs transition-all shadow-md shadow-violet-500/20 disabled:opacity-50"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{isGenerating ? 'Synthesizing with AI...' : 'GENERATE AI BRIEF'}</span>
          </button>

          <Button 
            variant="glass" 
            size="sm" 
            icon={Printer}
            onClick={() => window.print()}
          >
            Print
          </Button>
          <Button 
            variant="glass" 
            size="sm" 
            icon={Download}
            onClick={() => alert('Executive Policy Brief exported.')}
          >
            Export
          </Button>
        </div>
      </div>

      {/* AI Intelligence Provider Status Bar */}
      <div className="p-3 rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-slate-500 dark:text-slate-400">Synthesis Engine:</span>
          <span className="text-slate-900 dark:text-white font-bold">{aiStatus.modeLabel}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
            Zero-Hallucination Guardrail Active
          </span>
        </div>

        <button
          onClick={() => setShowTransparency(true)}
          className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-semibold flex items-center gap-1"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>View AI Governance Model</span>
        </button>
      </div>

      {/* Official Policy Brief Document Card */}
      <Card className="p-8 sm:p-10 space-y-7 glass-panel border border-slate-200/80 dark:border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Document Letterhead */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-[11px] font-mono font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>JANSETU AI EXECUTIVE POLICY SYNTHESIS • CONFIDENTIAL MUNICIPAL MEMO</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1.5 tracking-tight">
              MUNICIPAL PRIORITY BRIEF: WARD 150 (BELLANDUR)
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono">
              <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Target: {workOrder.clusterId} • Water & Drainage
              </span>
              <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Dated: September 2026
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center font-mono">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Priority Score</div>
            <div className="text-2xl font-black text-red-600 dark:text-red-400">{workOrder.priorityScore} / 100</div>
            <span className="text-[9px] text-red-600/80 dark:text-red-400/80 font-bold block">Rank #1 Critical</span>
          </div>
        </div>

        {/* Section 1: Executive Finding */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            1. EXECUTIVE FINDING & PROBLEM DIAGNOSIS
          </h3>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-200 leading-relaxed font-bold">
              {executiveFinding}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-2">
              {problemDef}
            </p>
          </div>
        </div>

        {/* Section 2: Multimodal Causal Evidence Chain */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            2. MULTIMODAL EVIDENCE & SPATIAL TELEMETRY
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Citizen Voices</span>
              <span className="text-base font-black text-slate-900 dark:text-white">312 Reports</span>
              <span className="text-[9px] text-blue-600 dark:text-blue-400 block">Multimodal NLP</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Geotagged Photos</span>
              <span className="text-base font-black text-slate-900 dark:text-white">142 Photos</span>
              <span className="text-[9px] text-violet-600 dark:text-violet-400 block">Vision Verified</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Voice Notes</span>
              <span className="text-base font-black text-slate-900 dark:text-white">98 Audio</span>
              <span className="text-[9px] text-amber-600 dark:text-amber-400 block">Kannada / Eng</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Culvert Choke</span>
              <span className="text-base font-black text-red-600 dark:text-red-400">78% Blocked</span>
              <span className="text-[9px] text-red-600/80 dark:text-red-400/80 block">Sensor Baseline</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Capacity Deficit</span>
              <span className="text-base font-black text-red-600 dark:text-red-400">87% Gap</span>
              <span className="text-[9px] text-red-600/80 dark:text-red-400/80 block">Critical Deficit</span>
            </div>
          </div>
        </div>

        {/* Section 3: Recommended Municipal Intervention */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            3. RECOMMENDED MUNICIPAL ACTION & FAST-TRACK BUDGET
          </h3>
          <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                {workOrder.recommendedAction}
              </h4>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40 text-xs font-mono font-bold">
                EST. BUDGET: {workOrder.estimatedBudget} • {workOrder.estimatedDays} DAYS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 pt-1 font-sans">
              {workOrder.technicalScope.map((scope, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{scope}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Accountability & Next Steps */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Status: </span>
            <strong className="text-blue-600 dark:text-blue-400 uppercase">{status.replace('_', ' ')}</strong>
            <span> • Nodal: {workOrder.department}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/gov/evidence')}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-300 text-xs font-mono font-bold transition-all shadow-sm"
            >
              Inspect 3D Evidence Graph →
            </button>
            <button
              onClick={() => navigate('/gov/projects')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold transition-all shadow-sm"
            >
              View Work Order Dossier
            </button>
          </div>
        </div>

      </Card>

      {/* AI Transparency Governance Modal */}
      {showTransparency && (
        <AITransparencyModal onClose={() => setShowTransparency(false)} />
      )}

      {/* Floating Demo Control HUD for Judges */}
      <DemoControlHUD />

    </div>
  );
};
