import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor';

interface CivicPostProcessingProps {
  bloomIntensity?: number;
}

export const CivicPostProcessing: React.FC<CivicPostProcessingProps> = ({
  bloomIntensity = 0.38,
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
        luminanceThreshold={0.45}
        luminanceSmoothing={0.5}
        intensity={bloomIntensity}
        mipmapBlur
      />
      <Vignette
        eskil={false}
        offset={0.3}
        darkness={0.55}
      />
    </EffectComposer>
  );
};
