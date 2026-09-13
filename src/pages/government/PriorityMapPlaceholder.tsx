import React from 'react';
import { Card } from '../../components/ui/Card';
import { PriorityMapScene } from '../../three';
import { Map, Cpu, Sparkles, MapPin, Database, ArrowRight, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export const PriorityMapPlaceholder: React.FC = () => {
  const { isTestMode, toggleTestMode, clusters, issues } = useApp();
  const hasData = isTestMode || clusters.length > 0 || issues.length > 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Map className="w-4 h-4" />
            <span>Spatial Infrastructure Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Spatial Civic Priority Map
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Geospatial intelligence mapping multi-source civic hotspots, ward vulnerability clusters, and algorithmic prioritization.
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
              <Database className="w-3.5 h-3.5 text-blue-500" />
              <span>PRODUCTION DATA PIPELINE</span>
            </div>
          )}
        </div>
      </div>

      {/* Main 3D Priority Map Scene Canvas or Clean Empty State */}
      {hasData ? (
        <Card variant="glass" className="overflow-hidden p-0 border border-slate-200 dark:border-slate-800 shadow-2xl">
          {isTestMode && (
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between text-xs text-amber-700 dark:text-amber-300 font-mono">
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>SYNTHETIC GEODATA: Visualizing simulated coordinate vectors for interface demonstration only.</span>
              </span>
              <button
                onClick={toggleTestMode}
                className="underline hover:text-amber-900 dark:hover:text-amber-100 text-[11px] font-sans"
              >
                Disable Test Data
              </button>
            </div>
          )}
          <div className="relative h-[720px] w-full">
            <PriorityMapScene isStandalone />
          </div>
        </Card>
      ) : (
        <Card variant="glass" className="p-12 text-center border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-sm">
            <MapPin className="w-8 h-8" />
          </div>
          
          <div className="max-w-md mx-auto space-y-2">
            <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-mono font-bold uppercase tracking-wider">
              ZERO-FABRICATION PROTOCOL
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              MAP DATA UNAVAILABLE
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              No verified spatial coordinates or municipal GIS layers have been ingested yet.
              JANSETU never renders fabricated map pins or synthetic ward boundaries as live government data.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/report"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2"
            >
              <span>Submit Report with GPS Coordinates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={toggleTestMode}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 text-amber-500" />
              <span>Load Synthetic Demo Map Data</span>
            </button>
          </div>
        </Card>
      )}

      {/* Spatial Methodological Note */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400 shadow-sm">
        <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-900 dark:text-slate-200">How Spatial Prioritization Operates:</span>
          <p className="leading-relaxed">
            JANSETU aggregates citizen signal density and computes cross-ward infrastructure vulnerability without proprietary map dependencies. Verified coordinates feed directly into deterministic DBSCAN clustering and spatial 3D visualization.
          </p>
        </div>
      </div>

    </div>
  );
};
