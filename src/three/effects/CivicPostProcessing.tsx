import React from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor';

interface CivicPostProcessingProps {
  bloomIntensity?: number;
}

export const CivicPostProcessing: React.FC<CivicPostProcessingProps> = ({
  bloomIntensity = 0.22,
}) => {
  const reducedMotion = useReducedMotion();
  const perf = usePerformanceMonitor();

  // If user prefers reduced motion or is on low-end device, skip post-processing
  if (reducedMotion || !perf.enablePostProcessing || perf.tier === 'low') {
    return null;
  }

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.55}
        luminanceSmoothing={0.6}
        intensity={bloomIntensity}
        mipmapBlur
      />
    </EffectComposer>
  );
};
