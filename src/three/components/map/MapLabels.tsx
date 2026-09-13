import React from 'react';
import { Html } from '@react-three/drei';

interface MapLabelsProps {
  regionName: string;
}

export const MapLabels: React.FC<MapLabelsProps> = ({ regionName }) => {
  return (
    <Html position={[-3.6, 2.7, 0]} distanceFactor={14} style={{ pointerEvents: 'none' }}>
      <div className="flex items-center gap-2 select-none">
        <div className="px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/30 backdrop-blur-md shadow-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
            {regionName}
          </span>
        </div>
      </div>
    </Html>
  );
};
