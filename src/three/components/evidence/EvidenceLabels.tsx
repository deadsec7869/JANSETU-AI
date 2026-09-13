import React from 'react';
import { Html } from '@react-three/drei';

interface EvidenceLabelsProps {
  clusterTitle: string;
  clusterId: string;
  priorityScore: number;
}

export const EvidenceLabels: React.FC<EvidenceLabelsProps> = ({
  clusterTitle,
  clusterId,
  priorityScore,
}) => {
  return (
    <Html position={[0, 3.4, 0]} center distanceFactor={14} style={{ pointerEvents: 'none' }}>
      <div className="flex flex-col items-center gap-1 text-center select-none">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 backdrop-blur-md shadow-glow-cyan">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[11px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
            {clusterId} • PRIORITY {priorityScore}
          </span>
        </div>
        <span className="text-xs font-semibold text-slate-300 max-w-xs drop-shadow-md">
          {clusterTitle}
        </span>
      </div>
    </Html>
  );
};
