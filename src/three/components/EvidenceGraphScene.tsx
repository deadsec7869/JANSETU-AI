import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { CivicCanvas } from '../CivicCanvas';
import { CivicWorld } from '../CivicWorld';
import { CivicPostProcessing } from '../effects/CivicPostProcessing';
import { EvidenceNode } from './evidence/EvidenceNode';
import { EvidenceEdge } from './evidence/EvidenceEdge';
import { EvidenceLabels } from './evidence/EvidenceLabels';
import { WATER_EVIDENCE_GRAPH, type EvidenceNodeData } from '../data/evidenceGraphData';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { 
  Network, 
  Sparkles, 
  RotateCcw, 
  Layers, 
  X
} from 'lucide-react';


interface EvidenceGraphSceneProps {
  onClose?: () => void;
  isStandalone?: boolean;
}

// Inner 3D Graph Component (Inside R3F Canvas)
export const EvidenceGraph3D: React.FC<{
  selectedNode: EvidenceNodeData | null;
  hoveredNodeId: string | null;
  whyStep: number | null;
  onHoverNode: (id: string | null) => void;
  onSelectNode: (node: EvidenceNodeData) => void;
}> = ({
  selectedNode,
  hoveredNodeId,
  whyStep,
  onHoverNode,
  onSelectNode,
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const reducedMotion = useReducedMotion();
  const graphData = WATER_EVIDENCE_GRAPH;

  // Node position map for quick edge lookups
  const nodeMap = React.useMemo(() => {
    const map = new Map<string, EvidenceNodeData>();
    graphData.nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [graphData.nodes]);

  // Smooth camera transitions using GSAP
  useEffect(() => {
    if (reducedMotion || !camera) return;

    if (selectedNode) {
      // Zoom toward selected node
      const targetX = selectedNode.position[0] * 0.7;
      const targetY = selectedNode.position[1] * 0.7;
      gsap.to(camera.position, {
        x: targetX,
        y: targetY,
        z: 4.8,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          if (controlsRef.current) {
            controlsRef.current.target.set(targetX * 0.5, targetY * 0.5, 0);
            controlsRef.current.update();
          }
        },
      });
    } else {
      // Reset to default wide view
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 7.5,
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
  }, [selectedNode, camera, reducedMotion]);

  // Handle "Why #1?" tour step focusing
  useEffect(() => {
    if (reducedMotion || whyStep === null || !camera) return;

    const activeStepNode = graphData.nodes.find((n) => n.whyStep === whyStep);
    if (activeStepNode) {
      const targetX = activeStepNode.position[0] * 0.75;
      const targetY = activeStepNode.position[1] * 0.75;
      gsap.to(camera.position, {
        x: targetX,
        y: targetY,
        z: 4.5,
        duration: 0.9,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (controlsRef.current) {
            controlsRef.current.target.set(targetX * 0.5, targetY * 0.5, 0);
            controlsRef.current.update();
          }
        },
      });
    }
  }, [whyStep, camera, graphData.nodes, reducedMotion]);

  return (
    <group>
      {/* Interactive Orbit Controls with constrained limits */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        minDistance={3.2}
        maxDistance={12}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3.5}
      />

      {/* Floating Header Label */}
      <EvidenceLabels
        clusterTitle={graphData.clusterTitle}
        clusterId={graphData.clusterId}
        priorityScore={graphData.priorityScore}
      />

      {/* 3D Edges */}
      {graphData.edges.map((edge) => {
        const srcNode = nodeMap.get(edge.source);
        const dstNode = nodeMap.get(edge.target);
        if (!srcNode || !dstNode) return null;

        const isHighlighted =
          hoveredNodeId === edge.source ||
          hoveredNodeId === edge.target ||
          selectedNode?.id === edge.source ||
          selectedNode?.id === edge.target;

        const isWhyActive =
          whyStep !== null &&
          ((srcNode.whyStep === whyStep && dstNode.whyStep === whyStep + 1) ||
            (dstNode.whyStep === whyStep && srcNode.whyStep === whyStep - 1) ||
            (srcNode.whyStep === whyStep || dstNode.whyStep === whyStep));

        const isDimmed =
          (selectedNode !== null && !isHighlighted) ||
          (whyStep !== null && !isWhyActive);

        return (
          <EvidenceEdge
            key={edge.id}
            edge={edge}
            sourcePos={srcNode.position}
            targetPos={dstNode.position}
            isHighlighted={isHighlighted}
            isDimmed={isDimmed}
            isWhyActive={isWhyActive}
          />
        );
      })}

      {/* 3D Nodes */}
      {graphData.nodes.map((node) => {
        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNodeId === node.id;
        const isWhyActive = whyStep !== null && node.whyStep === whyStep;
        const isDimmed =
          (selectedNode !== null && !isSelected && !node.relationships.includes(selectedNode.id)) ||
          (whyStep !== null && node.whyStep !== whyStep && !node.isWhyPath);

        return (
          <EvidenceNode
            key={node.id}
            node={node}
            isSelected={isSelected}
            isHovered={isHovered}
            isDimmed={isDimmed}
            isWhyActive={isWhyActive}
            onHover={onHoverNode}
            onSelect={onSelectNode}
          />
        );
      })}
    </group>
  );
};

// Complete Evidence Graph Scene Container with 2D Inspection Drawer
export const EvidenceGraphScene: React.FC<EvidenceGraphSceneProps> = ({
  onClose,
  isStandalone = false,
}) => {
  const [selectedNode, setSelectedNode] = useState<EvidenceNodeData | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [whyStep, setWhyStep] = useState<number | null>(null);
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

  const graphData = WATER_EVIDENCE_GRAPH;

  // "Why #1?" Tour Step Sequencer
  const startWhyTour = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedNode(null);
    setIsTourActive(true);
    setWhyStep(1);

    let step = 1;
    timerRef.current = setInterval(() => {
      step += 1;
      if (step > 6) {
        clearInterval(timerRef.current);
        setIsTourActive(false);
        // Focus on final priority node
        const priorityNode = graphData.nodes.find((n) => n.type === 'priority');
        if (priorityNode) setSelectedNode(priorityNode);
      } else {
        setWhyStep(step);
      }
    }, 2400);
  }, [graphData.nodes]);

  const stopWhyTour = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTourActive(false);
    setWhyStep(null);
  }, []);

  const resetView = useCallback(() => {
    stopWhyTour();
    setSelectedNode(null);
    setHoveredNodeId(null);
  }, [stopWhyTour]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[640px] flex flex-col justify-between overflow-hidden rounded-3xl ${isStandalone ? 'glass-panel border border-slate-200/80 dark:border-slate-800/80 shadow-2xl' : ''}`}>
      
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <CivicCanvas cameraPosition={[0, 0, 7.5]} fov={45}>
          <CivicWorld showGrid intensity={1.0} />
          <EvidenceGraph3D
            selectedNode={selectedNode}
            hoveredNodeId={hoveredNodeId}
            whyStep={whyStep}
            onHoverNode={setHoveredNodeId}
            onSelectNode={setSelectedNode}
          />
          <CivicPostProcessing bloomIntensity={0.22} />
        </CivicCanvas>
      </div>

      {/* Top HUD Action Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-3 pointer-events-none">
        
        {/* Left: Engine Tag */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/85 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-lg pointer-events-auto">
          <Network className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            3D EVIDENCE GRAPH • {graphData.clusterId}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-50 dark:bg-violet-950/80 border border-violet-200 dark:border-violet-700 text-violet-700 dark:text-violet-300 font-bold">
            Priority {graphData.priorityScore}
          </span>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={isTourActive ? stopWhyTour : startWhyTour}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm backdrop-blur-md ${
              isTourActive
                ? 'bg-amber-500 text-slate-950 shadow-amber-500/30 animate-pulse'
                : 'bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-500/25'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isTourActive ? `Touring Step ${whyStep}/6 (Stop)` : 'WHY IS THIS PRIORITY #1?'}</span>
          </button>

          <button
            onClick={resetView}
            className="p-2 rounded-xl bg-white/85 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all backdrop-blur-md shadow-sm"
            title="Reset Camera View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/85 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all backdrop-blur-md shadow-sm"
              title="Close Evidence Mode"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Floating 2D Inspection Drawer (Right Side) */}
      <div className="absolute top-16 right-4 z-20 w-80 max-w-[calc(100vw-2rem)] max-h-[calc(100%-6rem)] overflow-y-auto p-4.5 rounded-2xl bg-white/90 dark:bg-slate-900/92 border border-slate-200/80 dark:border-slate-800/90 backdrop-blur-xl shadow-xl space-y-4 text-xs">
        
        {/* Active Node or Cluster Overview */}
        {selectedNode ? (
          <div className="space-y-3 animate-in fade-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 font-bold">
                {selectedNode.category}
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                {selectedNode.confidence}% Confidence
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm tracking-tight">
                {selectedNode.label}
              </h3>
              {selectedNode.subtitle && (
                <p className="text-[11px] font-mono text-blue-600 dark:text-blue-400 mt-0.5">
                  {selectedNode.subtitle}
                </p>
              )}
            </div>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
              {selectedNode.description}
            </p>

            <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Metric Value:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedNode.value}</span>
            </div>

            {selectedNode.whyExplanation && (
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-200 text-[11px] leading-snug">
                <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1">Causal Impact on Priority:</span>
                {selectedNode.whyExplanation}
              </div>
            )}

            <button
              onClick={() => {
                window.location.href = '/gov';
              }}
              className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/25"
            >
              <span>RECOMMEND MUNICIPAL ACTION →</span>
            </button>

            <button
              onClick={() => setSelectedNode(null)}
              className="w-full py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
            >
              Back to Graph Overview
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                Evidence Synthesis HUD
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Clustered Reports:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{graphData.totalReports} citizen voice/images</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Service Gap Deficit:</span>
                <span className="font-mono font-bold text-red-600 dark:text-red-400">{graphData.serviceGapPercent}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Evidence Confidence:</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{graphData.evidenceConfidencePercent}%</span>
              </div>
            </div>

            {/* Multi-Factor Radar Breakdown */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500 dark:text-slate-400">Deterministic Priority:</span>
                <span className="text-red-600 dark:text-red-400 font-extrabold">{graphData.priorityScore} / 100</span>
              </div>
              <div className="p-2.5 rounded-xl bg-violet-50/80 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-500/30 text-[11px] space-y-1">
                <span className="text-violet-700 dark:text-violet-300 font-bold block flex items-center gap-1 font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Explainability Synthesis:
                </span>
                <p className="text-slate-800 dark:text-slate-200 leading-snug font-sans">
                  "Priority #1 is elevated due to the convergence of 312 citizen voices, severe 78% culvert choke, and 84,000 daily commuter exposure."
                </p>
                <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 block pt-1 border-t border-violet-200 dark:border-violet-500/20">
                  Model Role: AI summarized evidence. Priority score calculated by JANSETU Rule Engine.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono pt-1">
                <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Demand:</span>
                  <span className="text-slate-900 dark:text-white font-bold">{graphData.priorityBreakdown.demand}</span>
                </div>
                <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Severity:</span>
                  <span className="text-slate-900 dark:text-white font-bold">{graphData.priorityBreakdown.severity}</span>
                </div>
                <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Vulnerability:</span>
                  <span className="text-slate-900 dark:text-white font-bold">{graphData.priorityBreakdown.vulnerability}</span>
                </div>
                <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Urgency:</span>
                  <span className="text-slate-900 dark:text-white font-bold">{graphData.priorityBreakdown.urgency}</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
              Click any 3D node in space to inspect causal telemetry linkages and municipal asset citations.
            </p>
          </div>
        )}

        {/* Footer Synthetic Demo Data Notice */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[9px] font-mono text-slate-500">
          <span>SYNTHETIC DEMO DATA</span>
          <span>JANSETU v2.4</span>
        </div>
      </div>

      {/* Bottom Telemetry Guide */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/85 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span>Rotate, zoom, or click nodes to trace causal evidence paths.</span>
        </div>
      </div>

    </div>
  );
};
