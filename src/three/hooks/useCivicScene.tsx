import React, { createContext, useContext, useState } from 'react';

export interface CivicSceneContextType {
  focusedClusterId: string | null;
  focusedNodeId: string | null;
  hoveredNodeId: string | null;
  pipelineStage: number; // 0: idle, 1: voice/signal, 2: cluster, 3: evidence, 4: priority, 5: action, 6: impact
  cameraMode: 'overview' | 'cluster' | 'evidence' | 'map' | 'cinematic';
  soundIntensity: number;
  setFocusedClusterId: (id: string | null) => void;
  setFocusedNodeId: (id: string | null) => void;
  setHoveredNodeId: (id: string | null) => void;
  setPipelineStage: (stage: number) => void;
  setCameraMode: (mode: 'overview' | 'cluster' | 'evidence' | 'map' | 'cinematic') => void;
  setSoundIntensity: (val: number) => void;
  resetFocus: () => void;
}

const CivicSceneContext = createContext<CivicSceneContextType | undefined>(undefined);

export const CivicSceneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [focusedClusterId, setFocusedClusterId] = useState<string | null>(null);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [pipelineStage, setPipelineStage] = useState<number>(0);
  const [cameraMode, setCameraMode] = useState<'overview' | 'cluster' | 'evidence' | 'map' | 'cinematic'>('overview');
  const [soundIntensity, setSoundIntensity] = useState<number>(0);

  const resetFocus = () => {
    setFocusedClusterId(null);
    setFocusedNodeId(null);
    setHoveredNodeId(null);
    setCameraMode('overview');
  };

  return (
    <CivicSceneContext.Provider
      value={{
        focusedClusterId,
        focusedNodeId,
        hoveredNodeId,
        pipelineStage,
        cameraMode,
        soundIntensity,
        setFocusedClusterId,
        setFocusedNodeId,
        setHoveredNodeId,
        setPipelineStage,
        setCameraMode,
        setSoundIntensity,
        resetFocus,
      }}
    >
      {children}
    </CivicSceneContext.Provider>
  );
};

export function useCivicScene(): CivicSceneContextType {
  const context = useContext(CivicSceneContext);
  if (!context) {
    return {
      focusedClusterId: null,
      focusedNodeId: null,
      hoveredNodeId: null,
      pipelineStage: 0,
      cameraMode: 'overview',
      soundIntensity: 0,
      setFocusedClusterId: () => {},
      setFocusedNodeId: () => {},
      setHoveredNodeId: () => {},
      setPipelineStage: () => {},
      setCameraMode: () => {},
      setSoundIntensity: () => {},
      resetFocus: () => {},
    };
  }
  return context;
}
