import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { CivicCanvas } from '../CivicCanvas';
import { CivicWorld } from '../CivicWorld';
import { CivicPostProcessing } from '../effects/CivicPostProcessing';
import { WardRegion } from './map/WardRegion';
import { HotspotNode } from './map/HotspotNode';
import { HotspotField } from './map/HotspotField';
import { MapConnections } from './map/MapConnections';
import { MapLabels } from './map/MapLabels';
import { EvidenceGraphScene } from './EvidenceGraphScene';
import { 
  BENGALURU_PRIORITY_MAP_DATA, 
  type CityHotspotData, 
  type WardPolygonData 
} from '../data/priorityMapData';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { 
  MapPin, 
  Flame, 
  TrendingUp, 
  RotateCcw, 
  Network, 
  Layers, 
  ArrowLeft
} from 'lucide-react';


interface PriorityMapSceneProps {
  isStandalone?: boolean;
}

// Inner 3D Map Subsystem (Rendered inside R3F Canvas)
const PriorityMap3D: React.FC<{
  selectedHotspot: CityHotspotData | null;
  selectedWard: WardPolygonData | null;
  hoveredHotspotId: string | null;
  hoveredWardId: string | null;
  filteredHotspots: CityHotspotData[];
  trendWeekIndex: number;
  onHoverHotspot: (id: string | null) => void;
  onHoverWard: (id: string | null) => void;
  onSelectHotspot: (hotspot: CityHotspotData) => void;
  onSelectWard: (ward: WardPolygonData) => void;
}> = ({
  selectedHotspot,
  selectedWard,
  hoveredHotspotId,
  hoveredWardId,
  filteredHotspots,
  trendWeekIndex,
  onHoverHotspot,
  onHoverWard,
  onSelectHotspot,
  onSelectWard,
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const reducedMotion = useReducedMotion();
  const dataset = BENGALURU_PRIORITY_MAP_DATA;

  // GSAP Camera controller for spatial drill-down
  useEffect(() => {
    if (reducedMotion || !camera) return;

    if (selectedHotspot) {
      // Smooth focus glide to selected hotspot
      const targetX = selectedHotspot.position[0] * 0.75;
      const targetY = selectedHotspot.position[1] * 0.75;
      gsap.to(camera.position, {
        x: targetX,
        y: targetY,
        z: 4.5,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          if (controlsRef.current) {
            controlsRef.current.target.set(selectedHotspot.position[0], selectedHotspot.position[1], 0);
            controlsRef.current.update();
          }
        },
      });
    } else if (selectedWard) {
      // Focus on ward center
      const targetX = selectedWard.center[0] * 0.8;
      const targetY = selectedWard.center[1] * 0.8;
      gsap.to(camera.position, {
        x: targetX,
        y: targetY,
        z: 5.5,
        duration: 1.0,
        ease: 'power2.out',
        onUpdate: () => {
          if (controlsRef.current) {
            controlsRef.current.target.set(selectedWard.center[0], selectedWard.center[1], 0);
            controlsRef.current.update();
          }
        },
      });
    } else {
      // Reset to overview
      gsap.to(camera.position, {
        x: 0,
        y: -0.8,
        z: 8.8,
        duration: 1.0,
        ease: 'power2.out',
        onUpdate: () => {
          if (controlsRef.current) {
            controlsRef.current.target.set(0, 0, 0);
            controlsRef.current.update();
          }
        },
      });
    }
  }, [selectedHotspot, selectedWard, camera, reducedMotion]);

  return (
    <group>
      {/* Constrained Orbit Controls */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        minDistance={3.5}
        maxDistance={14}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 4.5}
      />

      {/* Spatial Header Datum Label */}
      <MapLabels regionName={dataset.regionName} />

      {/* 3D Ward Extruded Polygonal Regions */}
      {dataset.wards.map((ward) => {
        const isSelected = selectedWard?.id === ward.id || selectedHotspot?.wardNumber === ward.wardNumber;
        const isHovered = hoveredWardId === ward.id;
        const isDimmed =
          (selectedWard !== null && !isSelected) ||
          (selectedHotspot !== null && selectedHotspot.wardNumber !== ward.wardNumber);

        return (
          <WardRegion
            key={ward.id}
            ward={ward}
            isSelected={isSelected}
            isHovered={isHovered}
            isDimmed={isDimmed}
            onHover={onHoverWard}
            onSelect={onSelectWard}
          />
        );
      })}

      {/* 3D Arterial Corridor Linkages */}
      <MapConnections
        hotspots={dataset.hotspots}
        selectedHotspotId={selectedHotspot?.id || null}
      />

      {/* 3D Hotspot Nodes */}
      {dataset.hotspots.map((hotspot) => {
        const isVisible = filteredHotspots.some((h) => h.id === hotspot.id);
        if (!isVisible) return null;

        const isSelected = selectedHotspot?.id === hotspot.id;
        const isHovered = hoveredHotspotId === hotspot.id;
        const isDimmed = selectedHotspot !== null && !isSelected;

        // Trend factor from simulated weekly trajectory
        const weeklyVal = hotspot.trendHistory[trendWeekIndex];
        const trendFactor = weeklyVal ? weeklyVal / 90 : 1.0;

        return (
          <HotspotNode
            key={hotspot.id}
            hotspot={hotspot}
            isSelected={isSelected}
            isHovered={isHovered}
            isDimmed={isDimmed}
            trendFactor={trendFactor}
            onHover={onHoverHotspot}
            onSelect={onSelectHotspot}
          />
        );
      })}

      {/* Ambient Flowing Signal Particles */}
      <HotspotField hotspots={filteredHotspots} />
    </group>
  );
};

// Main Priority Map Scene Component with 2D HUD, Filters, and Evidence Graph Bridge
export const PriorityMapScene: React.FC<PriorityMapSceneProps> = ({
  isStandalone = true,
}) => {
  const dataset = BENGALURU_PRIORITY_MAP_DATA;

  const [selectedHotspot, setSelectedHotspot] = useState<CityHotspotData | null>(null);
  const [selectedWard, setSelectedWard] = useState<WardPolygonData | null>(null);
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);
  const [hoveredWardId, setHoveredWardId] = useState<string | null>(null);

  // Filter states
  const [domainFilter, setDomainFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Trend simulation state (Weeks 1 to 4)
  const [isTrendActive, setIsTrendActive] = useState<boolean>(false);
  const [trendWeek, setTrendWeek] = useState<number>(3); // 0=W1, 1=W2, 2=W3, 3=W4
  const trendTimerRef = useRef<any>(null);

  // Evidence Graph Bridge state
  const [inspectingEvidence, setInspectingEvidence] = useState<boolean>(false);

  // Filtered hotspots list
  const filteredHotspots = useMemo(() => {
    return dataset.hotspots.filter((h) => {
      const matchDomain =
        domainFilter === 'All' ||
        h.category.toLowerCase().includes(domainFilter.toLowerCase()) ||
        (domainFilter === 'Water' && h.category === 'Water & Drainage') ||
        (domainFilter === 'Roads' && h.category === 'Roads & Transport') ||
        (domainFilter === 'Lighting' && h.category === 'Electricity & Lighting') ||
        (domainFilter === 'Waste' && h.category === 'Waste Management') ||
        (domainFilter === 'Safety' && h.category === 'Public Safety') ||
        (domainFilter === 'Health' && h.category === 'Public Health');

      const matchStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Critical' && h.priority >= 90) ||
        (statusFilter === 'High' && h.priority >= 75 && h.priority < 90) ||
        (statusFilter === 'Medium' && h.priority < 75);

      return matchDomain && matchStatus;
    });
  }, [domainFilter, statusFilter, dataset.hotspots]);

  // Trend Simulation Playback
  const toggleTrendSimulation = useCallback(() => {
    if (isTrendActive) {
      if (trendTimerRef.current) clearInterval(trendTimerRef.current);
      setIsTrendActive(false);
    } else {
      setIsTrendActive(true);
      setTrendWeek(0);
      let week = 0;
      trendTimerRef.current = setInterval(() => {
        week = (week + 1) % 4;
        setTrendWeek(week);
      }, 1600);
    }
  }, [isTrendActive]);

  useEffect(() => {
    return () => {
      if (trendTimerRef.current) clearInterval(trendTimerRef.current);
    };
  }, []);

  const resetView = useCallback(() => {
    setSelectedHotspot(null);
    setSelectedWard(null);
    setHoveredHotspotId(null);
    setHoveredWardId(null);
    setDomainFilter('All');
    setStatusFilter('All');
  }, []);

  // If user drilled down to inspect evidence, render the Phase 3 Evidence Graph seamlessly!
  if (inspectingEvidence) {
    return (
      <div className="relative w-full h-full min-h-[640px] rounded-3xl overflow-hidden glass-panel border border-slate-200/80 dark:border-slate-800/80 shadow-2xl">
        <div className="absolute top-4 left-4 z-30">
          <button
            onClick={() => setInspectingEvidence(false)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-white text-xs font-bold transition-all shadow-md backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Spatial Priority Map</span>
          </button>
        </div>
        <EvidenceGraphScene onClose={() => setInspectingEvidence(false)} isStandalone />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full min-h-[640px] flex flex-col justify-between overflow-hidden rounded-3xl ${isStandalone ? 'glass-panel border border-slate-200/80 dark:border-slate-800/80 shadow-2xl' : ''}`}>
      
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <CivicCanvas cameraPosition={[0, -0.8, 8.8]} fov={45}>
          <CivicWorld showGrid intensity={1.0} />
          <PriorityMap3D
            selectedHotspot={selectedHotspot}
            selectedWard={selectedWard}
            hoveredHotspotId={hoveredHotspotId}
            hoveredWardId={hoveredWardId}
            filteredHotspots={filteredHotspots}
            trendWeekIndex={trendWeek}
            onHoverHotspot={setHoveredHotspotId}
            onHoverWard={setHoveredWardId}
            onSelectHotspot={setSelectedHotspot}
            onSelectWard={setSelectedWard}
          />
          <CivicPostProcessing bloomIntensity={0.22} />
        </CivicCanvas>
      </div>

      {/* Top Header Filter & Command Toolbar */}
      <div className="relative z-20 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pointer-events-none">
        
        {/* Left: Region Tag */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/85 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-lg pointer-events-auto">
          <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            SPATIAL PRIORITY MAP
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
            SYNTHETIC DEMO DATA
          </span>
        </div>

        {/* Center/Right: Category & Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          
          {/* Domain Category Filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/85 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md text-[11px] font-medium text-slate-700 dark:text-slate-300 shadow-sm">
            {['All', 'Water', 'Roads', 'Lighting', 'Waste', 'Safety'].map((cat) => (
              <button
                key={cat}
                onClick={() => setDomainFilter(cat)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  domainFilter === cat
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Priority Severity Filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/85 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md text-[11px] font-medium shadow-sm">
            <button
              onClick={() => setStatusFilter(statusFilter === 'Critical' ? 'All' : 'Critical')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                statusFilter === 'Critical'
                  ? 'bg-red-500 text-white font-bold shadow-md shadow-red-500/20'
                  : 'text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800'
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>Critical (90+)</span>
            </button>
          </div>

          {/* Trend Simulation Toggle */}
          <button
            onClick={toggleTrendSimulation}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm backdrop-blur-md ${
              isTrendActive
                ? 'bg-amber-500 text-slate-950 shadow-amber-500/30 animate-pulse'
                : 'bg-white/85 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{isTrendActive ? `Trend: Wk ${trendWeek + 1}/4` : 'Show Trend'}</span>
          </button>

          {/* Reset Camera View */}
          <button
            onClick={resetView}
            className="p-2 rounded-xl bg-white/85 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all backdrop-blur-md shadow-sm"
            title="Reset Map View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>

      {/* Floating Right-Side Inspection Drawer */}
      <div className="absolute top-20 right-4 z-20 w-84 max-w-[calc(100vw-2rem)] max-h-[calc(100%-6.5rem)] overflow-y-auto p-4.5 rounded-2xl bg-white/90 dark:bg-slate-900/92 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl space-y-4 text-xs">
        
        {selectedHotspot ? (
          <div className="space-y-3.5 animate-in fade-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold">
                {selectedHotspot.category}
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  selectedHotspot.priority >= 90
                    ? 'bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/30'
                    : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                }`}
              >
                {selectedHotspot.status} • {selectedHotspot.priority}/100
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block">{selectedHotspot.code}</span>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm tracking-tight mt-0.5">
                {selectedHotspot.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 mt-1 font-mono">
                <MapPin className="w-3 h-3 text-blue-500" />
                <span>{selectedHotspot.wardName}</span>
              </div>
            </div>

            {/* Root Cause Hypothesis */}
            <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-mono text-blue-600 dark:text-blue-400 font-bold block">
                Algorithmic Root Cause:
              </span>
              <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                {selectedHotspot.rootCauseHypothesis}
              </p>
            </div>

            {/* Telemetry Metrics */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Verified Reports</span>
                <span className="font-bold text-slate-900 dark:text-white text-xs">{selectedHotspot.reportCount} Citizens</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Affected Commuters</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-xs">{selectedHotspot.affectedPopulation.toLocaleString()}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Estimated Budget</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">{selectedHotspot.estimatedBudget}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Service Gap</span>
                <span className="font-bold text-red-600 dark:text-red-400 text-xs">{selectedHotspot.serviceGap}%</span>
              </div>
            </div>

            {/* 4-Week Simulated Trend History */}
            <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <span>4-Week Priority Trajectory:</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">Escalating +12%</span>
              </div>
              <div className="flex items-center gap-1.5">
                {selectedHotspot.trendHistory.map((val, idx) => (
                  <div key={idx} className="flex-1 text-center">
                    <div className="h-8 bg-slate-200 dark:bg-slate-950 rounded flex items-end justify-center p-0.5">
                      <div
                        className="w-full bg-blue-600 dark:bg-blue-500 rounded-sm transition-all"
                        style={{ height: `${(val / 100) * 100}%` }}
                      />
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 block mt-0.5">W{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seamless Drill-Down Action into Phase 3 Evidence Graph */}
            <button
              onClick={() => setInspectingEvidence(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/25"
            >
              <Network className="w-4 h-4" />
              <span>INSPECT 3D EVIDENCE GRAPH →</span>
            </button>

            <button
              onClick={() => setSelectedHotspot(null)}
              className="w-full py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
            >
              Back to Overview
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            <div className="pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Spatial Civic Pulse
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Active Hotspots:</span>
                <span className="font-bold text-slate-900 dark:text-white">{filteredHotspots.length} Concentrated Zones</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Critical (90+):</span>
                <span className="font-bold text-red-600 dark:text-red-400">
                  {filteredHotspots.filter((h) => h.priority >= 90).length} Clusters
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">High Priority (75-89):</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {filteredHotspots.filter((h) => h.priority >= 75 && h.priority < 90).length} Clusters
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Top Priority Score:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">96 / 100</span>
              </div>
            </div>

            {/* Quick Top Hotspots List */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold block">
                Highest Urgency Hotspots:
              </span>
              {filteredHotspots.slice(0, 3).map((h) => (
                <div
                  key={h.id}
                  onClick={() => setSelectedHotspot(h)}
                  className="p-2 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="max-w-[190px] truncate">
                    <span className="font-bold text-slate-900 dark:text-white text-[11px] group-hover:text-blue-600 dark:group-hover:text-blue-400 block truncate">
                      {h.title}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      {h.wardName.split(' - ')[1]} • {h.reportCount} reports
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 shrink-0">
                    {h.priority}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
              Click any 3D ward or glowing hotspot beacon to begin spatial drill-down into causal telemetry evidence.
            </p>
          </div>
        )}

        {/* Footer Synthetic Demo Data Notice */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[9px] font-mono text-slate-500">
          <span>SYNTHETIC DEMO DATA</span>
          <span>EPSG:4326 • BENGALURU</span>
        </div>
      </div>

      {/* Bottom Telemetry Legend */}
      <div className="relative z-20 p-4 pointer-events-none">
        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/85 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 backdrop-blur-md shadow-sm">
          <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Critical (&gt;90)
          </span>
          <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            High (75-89)
          </span>
          <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Medium (50-74)
          </span>
        </div>
      </div>

    </div>
  );
};
