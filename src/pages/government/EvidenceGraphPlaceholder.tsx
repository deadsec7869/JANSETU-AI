import React from 'react';
import { Card } from '../../components/ui/Card';
import { EvidenceGraphScene } from '../../three';
import { Network, Sparkles, Cpu, Database, ArrowRight, ShieldAlert, GitGraph } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export const EvidenceGraphPlaceholder: React.FC = () => {
  const { isTestMode, toggleTestMode, clusters, issues } = useApp();
  const hasData = isTestMode || clusters.length > 0 || issues.length > 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Network className="w-4 h-4" />
            <span>Interactive 3D Civic Knowledge Graph</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Causal Evidence & Priority Graph Studio
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Multi-source causal linkages connecting citizen reports, spatial vulnerability, and asset registries into explainable priority scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isTestMode ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>TEST DATASET ACTIVE</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold">
              <Database className="w-3.5 h-3.5 text-violet-500" />
              <span>PRODUCTION DATA PIPELINE</span>
            </div>
          )}
        </div>
      </div>

      {/* 3D Evidence Graph Studio Canvas or Clean Empty State */}
      {hasData ? (
        <Card variant="glass" className="overflow-hidden p-0 border border-slate-200 dark:border-slate-800 shadow-2xl">
          {isTestMode && (
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between text-xs text-amber-700 dark:text-amber-300 font-mono">
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>SYNTHETIC GRAPH: Visualizing causal graph architecture for interface evaluation only.</span>
              </span>
              <button
                onClick={toggleTestMode}
                className="underline hover:text-amber-900 dark:hover:text-amber-100 text-[11px] font-sans"
              >
                Disable Test Data
              </button>
            </div>
          )}
          <div className="relative h-[680px] w-full">
            <EvidenceGraphScene isStandalone />
          </div>
        </Card>
      ) : (
        <Card variant="glass" className="p-12 text-center border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400 flex items-center justify-center mx-auto shadow-sm">
            <GitGraph className="w-8 h-8" />
          </div>
          
          <div className="max-w-md mx-auto space-y-2">
            <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-mono font-bold uppercase tracking-wider">
              ZERO-FABRICATION PROTOCOL
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              NO VERIFIED EVIDENCE GRAPH YET
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Causal evidence graphs are deterministically synthesized when verified citizen reports, multimodal evidence, and cluster signals are ingested into the platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/report"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-all shadow-md shadow-violet-500/25 flex items-center justify-center gap-2"
            >
              <span>Submit Multimodal Evidence</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={toggleTestMode}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 text-amber-500" />
              <span>Load Synthetic Demo Graph</span>
            </button>
          </div>
        </Card>
      )}

      {/* Methodological Transparency Note */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400 shadow-sm">
        <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-900 dark:text-slate-200">How JANSETU Calculates Decision Evidence:</span>
          <p className="leading-relaxed">
            Priorities are not based merely on report volume. JANSETU builds an interconnected evidence graph tracing citizen geotagged photos, audio NLP transcripts, flow gauge telemetry, demographic vulnerability, and structural asset blockage to compute transparent priority scores.
          </p>
        </div>
      </div>

    </div>
  );
};
