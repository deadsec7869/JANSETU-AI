import React from 'react';
import { Card } from '../../components/ui/Card';
import { PriorityMapScene } from '../../three';
import { Map, Cpu, Sparkles } from 'lucide-react';

export const PriorityMapPlaceholder: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Map className="w-4 h-4" />
            <span>Spatial Infrastructure Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Spatial Civic Priority Map
          </h1>
          <p className="text-sm text-slate-400">
            Interactive geospatial intelligence mapping multi-source civic hotspots, ward vulnerability clusters, and algorithmic prioritization across Greater Bengaluru.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold">
          <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>SPATIAL COMMAND ENGINE v2.4</span>
        </div>
      </div>

      {/* Main 3D Priority Map Scene Canvas */}
      <Card variant="glass" className="overflow-hidden p-0 border border-cyan-500/30 shadow-2xl shadow-cyan-950/30">
        <div className="relative h-[720px] w-full">
          <PriorityMapScene isStandalone />
        </div>
      </Card>

      {/* Spatial Methodological Note */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-200">How Spatial Prioritization Operates:</span>
          <p className="leading-relaxed">
            JANSETU aggregates citizen signal density and computes cross-ward infrastructure vulnerability without proprietary map dependencies. Click any glowing hotspot beacon to drill down into causal telemetry and inspect the full 3D Evidence Graph.
          </p>
        </div>
      </div>

    </div>
  );
};
