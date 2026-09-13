import { useState, useEffect, useRef } from 'react';

export interface PerformanceTier {
  dpr: number;
  particleMultiplier: number;
  enablePostProcessing: boolean;
  enableHeavyPhysics: boolean;
  tier: 'high' | 'medium' | 'low';
}

export function usePerformanceMonitor(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>({
    dpr: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5),
    particleMultiplier: 1.0,
    enablePostProcessing: true,
    enableHeavyPhysics: true,
    tier: 'high',
  });

  const frameTimes = useRef<number[]>([]);
  const lastTime = useRef<number>(performance.now());

  useEffect(() => {
    let animId: number;
    let framesCounted = 0;

    const checkPerformance = () => {
      const now = performance.now();
      const delta = now - lastTime.current;
      lastTime.current = now;

      if (delta > 0 && delta < 200) {
        frameTimes.current.push(delta);
        if (frameTimes.current.length > 60) {
          frameTimes.current.shift();
        }
      }

      framesCounted++;

      // Check average FPS every ~120 frames
      if (framesCounted % 120 === 0 && frameTimes.current.length >= 30) {
        const avgDelta = frameTimes.current.reduce((a, b) => a + b, 0) / frameTimes.current.length;
        const estimatedFps = 1000 / avgDelta;

        if (estimatedFps < 35) {
          setTier({
            dpr: 1.0,
            particleMultiplier: 0.35,
            enablePostProcessing: false,
            enableHeavyPhysics: false,
            tier: 'low',
          });
        } else if (estimatedFps < 50) {
          setTier({
            dpr: 1.0,
            particleMultiplier: 0.65,
            enablePostProcessing: true,
            enableHeavyPhysics: true,
            tier: 'medium',
          });
        } else {
          setTier({
            dpr: Math.min(window.devicePixelRatio, 1.5),
            particleMultiplier: 1.0,
            enablePostProcessing: true,
            enableHeavyPhysics: true,
            tier: 'high',
          });
        }
      }

      animId = requestAnimationFrame(checkPerformance);
    };

    animId = requestAnimationFrame(checkPerformance);
    return () => cancelAnimationFrame(animId);
  }, []);

  return tier;
}
