import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ErrorBoundary } from '../components/shared/ErrorBoundary';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';

interface CivicCanvasProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
}

export const CivicCanvas: React.FC<CivicCanvasProps> = ({
  children,
  className = '',
  cameraPosition = [0, 0, 10],
  fov = 45,
  style,
  fallback,
}) => {
  const perf = usePerformanceMonitor();
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  const defaultFallback = (
    <div className={`w-full h-full min-h-[240px] bg-gradient-to-b from-brand-950/20 to-transparent rounded-2xl border border-slate-800/40 flex items-center justify-center p-6 ${className}`}>
      <div className="flex items-center gap-2.5 text-xs font-mono text-cyan-400/80 bg-slate-950/80 px-4 py-2 rounded-xl border border-cyan-500/20 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>INITIALIZING CIVIC INTELLIGENCE...</span>
      </div>
    </div>
  );

  if (!isClient || !hasWebGL) {
    return (
      <div className={`relative w-full h-full ${className}`} style={style}>
        {fallback || defaultFallback}
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`} style={style}>
      <ErrorBoundary fallback={fallback || defaultFallback}>
        <Canvas
          camera={{ position: cameraPosition, fov, near: 0.1, far: 1000 }}
          dpr={perf.dpr}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};
