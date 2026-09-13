import React from 'react';
import { Card } from '../../components/ui/Card';
import { EvidenceGraphScene } from '../../three';
import { Network, Sparkles, Cpu } from 'lucide-react';

export const EvidenceGraphPlaceholder: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Network className="w-4 h-4" />
            <span>Interactive 3D Civic Knowledge Graph</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Causal Evidence & Priority Graph Studio
          </h1>
          <p className="text-sm text-slate-400">
            Interactive multi-source causal linkages connecting citizen reports, spatial vulnerability, and municipal asset registries into explainable priority scores.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold">
          <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>SYNTHETIC DEMO ENGINE v2.4</span>
        </div>
      </div>

      {/* 3D Evidence Graph Studio Canvas */}
      <Card variant="glass" className="overflow-hidden p-0 border border-cyan-500/30 shadow-2xl shadow-cyan-950/30">
        <div className="relative h-[680px] w-full">
          <EvidenceGraphScene isStandalone />
        </div>
      </Card>

      {/* Methodological Transparency Note */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-200">How JANSETU Calculates Decision Evidence:</span>
          <p className="leading-relaxed">
            Priorities are not based merely on report volume. JANSETU builds an interconnected evidence graph tracing citizen geotagged photos, audio NLP transcripts, flow gauge telemetry, demographic vulnerability, and structural asset blockage to compute transparent priority scores.
          </p>
        </div>
      </div>

    </div>
  );
};
